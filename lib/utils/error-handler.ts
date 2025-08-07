// =====================================================
// ERROR HANDLING UTILITIES
// =====================================================
// Comprehensive error handling, logging, and recovery utilities
// =====================================================

// =====================================================
// ERROR TYPES
// =====================================================

export enum ErrorType {
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NETWORK = 'network',
  API = 'api',
  DATABASE = 'database',
  TOKEN = 'token',
  FILE_UPLOAD = 'file_upload',
  PAYMENT = 'payment',
  RATE_LIMIT = 'rate_limit',
  UNKNOWN = 'unknown'
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface ApplicationError {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  userMessage: string;
  code?: string;
  details?: Record<string, any>;
  timestamp: string;
  context?: {
    userId?: string;
    endpoint?: string;
    component?: string;
    action?: string;
  };
  originalError?: Error;
  shouldRetry?: boolean;
  retryCount?: number;
  maxRetries?: number;
}

// =====================================================
// ERROR CLASSIFICATION
// =====================================================

export function classifyError(error: any, context?: Partial<ApplicationError['context']>): ApplicationError {
  const timestamp = new Date().toISOString();
  
  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      type: ErrorType.NETWORK,
      severity: ErrorSeverity.HIGH,
      message: 'Network connection failed',
      userMessage: 'İnternet bağlantınızı kontrol edin',
      timestamp,
      context,
      originalError: error,
      shouldRetry: true,
      maxRetries: 3
    };
  }

  // API errors with status codes
  if (error?.status || error?.response?.status) {
    const status = error.status || error.response.status;
    const data = error.data || error.response?.data;
    
    switch (status) {
      case 400:
        return {
          type: ErrorType.VALIDATION,
          severity: ErrorSeverity.MEDIUM,
          message: data?.message || 'Bad request',
          userMessage: 'Gönderilen veri geçersiz',
          code: 'BAD_REQUEST',
          timestamp,
          context,
          originalError: error,
          shouldRetry: false
        };
      
      case 401:
        return {
          type: ErrorType.AUTHENTICATION,
          severity: ErrorSeverity.HIGH,
          message: 'Authentication failed',
          userMessage: 'Giriş yapmanız gerekiyor',
          code: 'UNAUTHORIZED',
          timestamp,
          context,
          originalError: error,
          shouldRetry: false
        };
      
      case 403:
        return {
          type: ErrorType.AUTHORIZATION,
          severity: ErrorSeverity.HIGH,
          message: 'Insufficient permissions',
          userMessage: 'Bu işlem için yetkiniz bulunmuyor',
          code: 'FORBIDDEN',
          timestamp,
          context,
          originalError: error,
          shouldRetry: false
        };
      
      case 404:
        return {
          type: ErrorType.API,
          severity: ErrorSeverity.MEDIUM,
          message: 'Resource not found',
          userMessage: 'Aranan kaynak bulunamadı',
          code: 'NOT_FOUND',
          timestamp,
          context,
          originalError: error,
          shouldRetry: false
        };
      
      case 429:
        return {
          type: ErrorType.RATE_LIMIT,
          severity: ErrorSeverity.MEDIUM,
          message: 'Rate limit exceeded',
          userMessage: 'Çok fazla istek gönderdiniz, lütfen bekleyin',
          code: 'RATE_LIMIT',
          timestamp,
          context,
          originalError: error,
          shouldRetry: true,
          maxRetries: 5
        };
      
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          type: ErrorType.API,
          severity: ErrorSeverity.CRITICAL,
          message: 'Server error',
          userMessage: 'Sunucu hatası oluştu, lütfen daha sonra tekrar deneyin',
          code: 'SERVER_ERROR',
          timestamp,
          context,
          originalError: error,
          shouldRetry: true,
          maxRetries: 3
        };
      
      default:
        return {
          type: ErrorType.API,
          severity: ErrorSeverity.MEDIUM,
          message: `HTTP ${status} error`,
          userMessage: 'Bir hata oluştu, lütfen tekrar deneyin',
          code: `HTTP_${status}`,
          timestamp,
          context,
          originalError: error,
          shouldRetry: status >= 500
        };
    }
  }

  // Token related errors
  if (error.message?.includes('token') || error.message?.includes('insufficient')) {
    return {
      type: ErrorType.TOKEN,
      severity: ErrorSeverity.HIGH,
      message: 'Token validation failed',
      userMessage: 'Token yetersiz veya geçersiz',
      code: 'TOKEN_ERROR',
      timestamp,
      context,
      originalError: error,
      shouldRetry: false
    };
  }

  // Database errors
  if (error.message?.includes('database') || error.message?.includes('connection')) {
    return {
      type: ErrorType.DATABASE,
      severity: ErrorSeverity.CRITICAL,
      message: 'Database operation failed',
      userMessage: 'Veritabanı bağlantı hatası',
      code: 'DATABASE_ERROR',
      timestamp,
      context,
      originalError: error,
      shouldRetry: true,
      maxRetries: 2
    };
  }

  // File upload errors
  if (error.message?.includes('file') || error.message?.includes('upload')) {
    return {
      type: ErrorType.FILE_UPLOAD,
      severity: ErrorSeverity.MEDIUM,
      message: 'File operation failed',
      userMessage: 'Dosya yükleme hatası',
      code: 'FILE_ERROR',
      timestamp,
      context,
      originalError: error,
      shouldRetry: true,
      maxRetries: 2
    };
  }

  // Payment errors
  if (error.message?.includes('payment') || error.message?.includes('stripe')) {
    return {
      type: ErrorType.PAYMENT,
      severity: ErrorSeverity.HIGH,
      message: 'Payment processing failed',
      userMessage: 'Ödeme işlemi başarısız',
      code: 'PAYMENT_ERROR',
      timestamp,
      context,
      originalError: error,
      shouldRetry: false
    };
  }

  // Default unknown error
  return {
    type: ErrorType.UNKNOWN,
    severity: ErrorSeverity.MEDIUM,
    message: error.message || 'Unknown error occurred',
    userMessage: 'Bilinmeyen bir hata oluştu',
    code: 'UNKNOWN_ERROR',
    timestamp,
    context,
    originalError: error,
    shouldRetry: false
  };
}

// =====================================================
// ERROR HANDLING CLASS
// =====================================================

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: ApplicationError[] = [];
  private maxLogSize = 100;

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // =====================================================
  // ERROR LOGGING
  // =====================================================

  logError(error: ApplicationError): void {
    // Add to in-memory log
    this.errorLog.push(error);
    
    // Keep log size manageable
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(-this.maxLogSize);
    }

    // Console logging based on severity
    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
        console.error('🔴 CRITICAL ERROR:', error);
        break;
      case ErrorSeverity.HIGH:
        console.error('🟠 HIGH SEVERITY ERROR:', error);
        break;
      case ErrorSeverity.MEDIUM:
        console.warn('🟡 MEDIUM SEVERITY ERROR:', error);
        break;
      case ErrorSeverity.LOW:
        console.log('🟢 LOW SEVERITY ERROR:', error);
        break;
    }

    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorTracking(error);
    }
  }

  private async sendToErrorTracking(error: ApplicationError): Promise<void> {
    try {
      // In a real app, this would send to Sentry, LogRocket, etc.
      // For now, we'll just log it
      console.log('📊 Sending error to tracking service:', {
        type: error.type,
        severity: error.severity,
        message: error.message,
        timestamp: error.timestamp,
        context: error.context
      });
    } catch (trackingError) {
      console.error('Failed to send error to tracking service:', trackingError);
    }
  }

  // =====================================================
  // ERROR RECOVERY
  // =====================================================

  async handleError(
    error: any, 
    context?: Partial<ApplicationError['context']>,
    onRetry?: () => Promise<any>
  ): Promise<{ error: ApplicationError; shouldRetry: boolean; recovered?: any }> {
    const appError = classifyError(error, context);
    this.logError(appError);

    // Attempt recovery for retryable errors
    if (appError.shouldRetry && onRetry) {
      const retryCount = (appError.retryCount || 0) + 1;
      const maxRetries = appError.maxRetries || 3;

      if (retryCount <= maxRetries) {
        try {
          console.log(`🔄 Retrying operation (${retryCount}/${maxRetries})...`);
          
          // Exponential backoff
          const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 10000);
          await new Promise(resolve => setTimeout(resolve, delay));
          
          const result = await onRetry();
          
          console.log('✅ Retry successful');
          return { error: appError, shouldRetry: false, recovered: result };
        } catch (retryError) {
          const updatedError = { ...appError, retryCount };
          
          if (retryCount < maxRetries) {
            return { error: updatedError, shouldRetry: true };
          } else {
            console.log('❌ Max retries exceeded');
            return { error: updatedError, shouldRetry: false };
          }
        }
      }
    }

    return { error: appError, shouldRetry: false };
  }

  // =====================================================
  // ERROR ANALYSIS
  // =====================================================

  getErrorStats(): {
    total: number;
    byType: Record<ErrorType, number>;
    bySeverity: Record<ErrorSeverity, number>;
    recent: ApplicationError[];
  } {
    const byType = Object.values(ErrorType).reduce((acc, type) => {
      acc[type] = this.errorLog.filter(e => e.type === type).length;
      return acc;
    }, {} as Record<ErrorType, number>);

    const bySeverity = Object.values(ErrorSeverity).reduce((acc, severity) => {
      acc[severity] = this.errorLog.filter(e => e.severity === severity).length;
      return acc;
    }, {} as Record<ErrorSeverity, number>);

    const recent = this.errorLog.slice(-10);

    return {
      total: this.errorLog.length,
      byType,
      bySeverity,
      recent
    };
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }

  getRecentErrors(count: number = 10): ApplicationError[] {
    return this.errorLog.slice(-count);
  }
}

// =====================================================
// CONVENIENCE FUNCTIONS
// =====================================================

export const errorHandler = ErrorHandler.getInstance();

export async function handleAsync<T>(
  asyncFn: () => Promise<T>,
  context?: Partial<ApplicationError['context']>
): Promise<{ data?: T; error?: ApplicationError }> {
  try {
    const data = await asyncFn();
    return { data };
  } catch (error) {
    const { error: appError } = await errorHandler.handleError(error, context);
    return { error: appError };
  }
}

export function handleSync<T>(
  syncFn: () => T,
  context?: Partial<ApplicationError['context']>
): { data?: T; error?: ApplicationError } {
  try {
    const data = syncFn();
    return { data };
  } catch (error) {
    const appError = classifyError(error, context);
    errorHandler.logError(appError);
    return { error: appError };
  }
}

// =====================================================
// REACT ERROR BOUNDARY HELPER
// =====================================================

export function createErrorBoundaryConfig() {
  return {
    onError: (error: Error, errorInfo: any) => {
      const appError = classifyError(error, {
        component: errorInfo.componentStack?.split('\n')[1]?.trim()
      });
      errorHandler.logError(appError);
    },
    
    fallback: ({ error, resetError }: { error: Error; resetError: () => void }) => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Bir şeyler ters gitti
          </h3>
          <p className="text-gray-600 mb-4">
            Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya tekrar deneyin.
          </p>
          <button
            onClick={resetError}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  };
}

// =====================================================
// EXPORT ALL
// =====================================================

export default {
  ErrorType,
  ErrorSeverity,
  classifyError,
  ErrorHandler,
  errorHandler,
  handleAsync,
  handleSync,
  createErrorBoundaryConfig
};