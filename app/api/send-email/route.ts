import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/services/email-service';

export async function POST(request: NextRequest) {
  console.log('🔧 Email API - Request received');

  try {
    const body = await request.json();
    const { type, to, name, url } = body;

    console.log('📨 Email API request:', { type, to, name, hasUrl: !!url });

    if (!type || !to || !name) {
      console.error('❌ Missing required fields:', { type: !!type, to: !!to, name: !!name });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let success = false;

    switch (type) {
      case 'welcome':
        success = await emailService.sendWelcomeEmail({
          to,
          name,
          loginUrl: url || 'https://seragpt.com/auth/login'
        });
        break;

      case 'verification':
        if (!url) {
          return NextResponse.json(
            { error: 'Verification URL required' },
            { status: 400 }
          );
        }
        success = await emailService.sendVerificationEmail({
          to,
          name,
          verificationUrl: url
        });
        break;

      case 'password-reset':
        if (!url) {
          return NextResponse.json(
            { error: 'Reset URL required' },
            { status: 400 }
          );
        }
        success = await emailService.sendPasswordResetEmail({
          to,
          name,
          resetUrl: url
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
