// =====================================================
// API AUTHENTICATION MIDDLEWARE
// =====================================================
// Server-side authentication middleware for API routes
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/auth';
import { securityLogger } from '@/lib/utils/security';
import { rateLimiters, addRateLimitHeaders, type RateLimitResult } from '@/lib/services/rate-limit-service';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role?: string;
    email_verified?: boolean;
  };
  session?: any;
}

export interface AuthMiddlewareOptions {
  requireAuth?: boolean;
  requireEmailVerified?: boolean;
  allowedRoles?: string[];
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
}

// =====================================================
// MAIN AUTH MIDDLEWARE
// =====================================================

export async function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
  options: AuthMiddlewareOptions = {}
) {
  return async (req: NextRequest) => {
    const startTime = Date.now();
    const clientIP = getClientIP(req);
    
    try {
      // Create authenticated request object
      const authReq = req as AuthenticatedRequest;
      
      // 1. Advanced rate limiting
      const rateLimitResult = await checkAdvancedRateLimit(authReq, clientIP, options);
      if (!rateLimitResult.allowed) {
        const response = new NextResponse(
          JSON.stringify({
            error: 'Too Many Requests',
            limit: rateLimitResult.limit,
            remaining: rateLimitResult.remaining,
            resetTime: new Date(rateLimitResult.resetTime).toISOString()
          }),
          {
            status: 429,
            headers: { 'Content-Type': 'application/json' }
          }
        );

        return addRateLimitHeaders(response, rateLimitResult);
      }

      // 2. Extract and validate authentication
      const authResult = await extractAuth(authReq);
      
      if (!authResult.success) {
        if (options.requireAuth) {
          securityLogger.log({
            type: 'auth',
            severity: 'medium',
            ip: clientIP,
            userAgent: req.headers.get('user-agent') || undefined,
            action: 'unauthorized_api_access',
            details: {
              path: req.nextUrl.pathname,
              error: authResult.error
            }
          });

          return new NextResponse(
            JSON.stringify({ error: 'Authentication required' }),
            { 
              status: 401,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
      } else {
        // 3. Set user data on request
        authReq.user = authResult.user;
        authReq.session = authResult.session;

        // 4. Check email verification
        if (options.requireEmailVerified && !authResult.user.email_verified) {
          return new NextResponse(
            JSON.stringify({ error: 'Email verification required' }),
            { 
              status: 403,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        // 5. Check user roles
        if (options.allowedRoles && options.allowedRoles.length > 0) {
          const userRole = authResult.user.role || 'user';
          if (!options.allowedRoles.includes(userRole)) {
            securityLogger.log({
              type: 'access',
              severity: 'high',
              ip: clientIP,
              userAgent: req.headers.get('user-agent') || undefined,
              userId: authResult.user.id,
              action: 'insufficient_permissions',
              details: {
                path: req.nextUrl.pathname,
                userRole,
                requiredRoles: options.allowedRoles
              }
            });

            return new NextResponse(
              JSON.stringify({ error: 'Insufficient permissions' }),
              { 
                status: 403,
                headers: { 'Content-Type': 'application/json' }
              }
            );
          }
        }

        // Log successful authentication
        securityLogger.log({
          type: 'auth',
          severity: 'low',
          ip: clientIP,
          userAgent: req.headers.get('user-agent') || undefined,
          userId: authResult.user.id,
          action: 'api_access_granted',
          details: {
            path: req.nextUrl.pathname,
            method: req.method
          }
        });
      }

      // 6. Call the actual handler
      const response = await handler(authReq);
      
      // 7. Add processing time header
      const processingTime = Date.now() - startTime;
      response.headers.set('X-Processing-Time', `${processingTime}ms`);
      
      return response;

    } catch (error) {
      console.error('Auth middleware error:', error);
      
      securityLogger.log({
        type: 'error',
        severity: 'high',
        ip: clientIP,
        userAgent: req.headers.get('user-agent') || undefined,
        action: 'auth_middleware_error',
        details: {
          path: req.nextUrl.pathname,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      return new NextResponse(
        JSON.stringify({ error: 'Internal server error' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  };
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

async function extractAuth(req: NextRequest): Promise<{
  success: boolean;
  user?: any;
  session?: any;
  error?: string;
}> {
  try {
    // Try Authorization header first
    const authorization = req.headers.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.substring(7);
      
      // Create Supabase client and verify token
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        return { success: false, error: 'Invalid token' };
      }

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email!,
          role: user.user_metadata?.role || 'user',
          email_verified: user.email_confirmed_at !== null
        },
        session: { access_token: token }
      };
    }

    // Try cookie-based auth as fallback
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return { success: false, error: 'No valid authentication found' };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email!,
        role: user.user_metadata?.role || 'user',
        email_verified: user.email_confirmed_at !== null
      }
    };

  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Auth extraction failed' 
    };
  }
}

async function checkAdvancedRateLimit(
  req: NextRequest,
  clientIP: string,
  options: AuthMiddlewareOptions
): Promise<RateLimitResult> {
  const { pathname } = req.nextUrl;

  // Determine which rate limiter to use based on endpoint
  let limiterName: keyof typeof rateLimiters = 'api';

  if (pathname.startsWith('/api/auth')) {
    limiterName = 'auth';
  } else if (pathname.startsWith('/api/chat') || pathname.includes('ai')) {
    limiterName = 'chat';
  } else if (pathname.includes('email') || pathname.includes('sms')) {
    limiterName = 'messaging';
  } else if (pathname.includes('upload') || pathname.includes('file')) {
    limiterName = 'upload';
  } else if (pathname.startsWith('/api/admin')) {
    limiterName = 'admin';
  }

  // Use custom rate limit if specified
  if (options.rateLimit) {
    const customLimiter = rateLimiters[limiterName];
    return await customLimiter.check(clientIP, pathname);
  }

  // Use default rate limiter
  const limiter = rateLimiters[limiterName];
  return await limiter.check(clientIP, pathname);
}

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const real = req.headers.get('x-real-ip');
  const cfConnecting = req.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (cfConnecting) {
    return cfConnecting;
  }
  if (real) {
    return real;
  }
  
  return req.ip || '127.0.0.1';
}

// =====================================================
// CONVENIENCE WRAPPERS
// =====================================================

// Basic auth requirement
export const requireAuth = (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) =>
  withAuth(handler, { requireAuth: true });

// Admin-only access
export const requireAdmin = (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) =>
  withAuth(handler, { 
    requireAuth: true, 
    allowedRoles: ['admin', 'super_admin'],
    requireEmailVerified: true 
  });

// Email verified users only
export const requireVerified = (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) =>
  withAuth(handler, { 
    requireAuth: true, 
    requireEmailVerified: true 
  });

// Rate limited endpoints
export const rateLimited = (
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
  maxRequests: number = 10,
  windowMs: number = 60000
) =>
  withAuth(handler, { 
    rateLimit: { maxRequests, windowMs }
  });

// =====================================================
// API RESPONSE HELPERS
// =====================================================

export function createApiResponse(
  data: any,
  status: number = 200,
  headers: Record<string, string> = {}
): NextResponse {
  const responseHeaders = {
    'Content-Type': 'application/json',
    ...headers
  };

  return new NextResponse(
    JSON.stringify({
      success: status < 400,
      data: status < 400 ? data : undefined,
      error: status >= 400 ? data : undefined,
      timestamp: new Date().toISOString()
    }),
    { status, headers: responseHeaders }
  );
}

export function createErrorResponse(
  message: string,
  status: number = 400,
  details?: any
): NextResponse {
  return createApiResponse(
    {
      message,
      details,
      code: `ERROR_${status}`
    },
    status
  );
}

export function createSuccessResponse(data: any, status: number = 200): NextResponse {
  return createApiResponse(data, status);
}

// =====================================================
// INPUT VALIDATION WRAPPER
// =====================================================

export function withValidation<T>(
  handler: (req: AuthenticatedRequest, validatedData: T) => Promise<NextResponse>,
  validator: (data: any) => { isValid: boolean; data?: T; errors?: any }
) {
  return async (req: AuthenticatedRequest) => {
    try {
      // Parse request body
      let body = {};
      
      if (req.method !== 'GET' && req.headers.get('content-type')?.includes('application/json')) {
        try {
          body = await req.json();
        } catch (error) {
          return createErrorResponse('Invalid JSON in request body', 400);
        }
      }

      // Add query parameters
      const query = Object.fromEntries(req.nextUrl.searchParams);
      const requestData = { ...body, ...query };

      // Validate input
      const validation = validator(requestData);
      if (!validation.isValid) {
        return createErrorResponse('Validation failed', 400, validation.errors);
      }

      // Call handler with validated data
      return await handler(req, validation.data!);

    } catch (error) {
      console.error('Validation wrapper error:', error);
      return createErrorResponse('Internal server error', 500);
    }
  };
}

// =====================================================
// EXPORT ALL
// =====================================================

export default {
  withAuth,
  requireAuth,
  requireAdmin,
  requireVerified,
  rateLimited,
  createApiResponse,
  createErrorResponse,
  createSuccessResponse,
  withValidation
};
