import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/services/email-service';

interface SupportTicketData {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'general' | 'bug';
}

const emailService = new EmailService();

export async function POST(request: NextRequest) {
  console.log('🎫 Support Ticket API - Request received');

  try {
    const body: SupportTicketData = await request.json();
    const { name, email, subject, message, priority, category } = body;

    console.log('📨 Support ticket request:', { 
      name, 
      email, 
      subject: subject?.substring(0, 50) + '...', 
      priority, 
      category 
    });

    // Validation
    if (!name || !email || !subject || !message) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Tüm alanları doldurunuz' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      console.error('❌ Invalid email format');
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      );
    }

    // Generate ticket ID
    const ticketId = `SERA-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Send email to support team
    const supportEmailSuccess = await emailService.sendSupportTicket({
      ticketId,
      customerName: name,
      customerEmail: email,
      subject,
      message,
      priority,
      category
    });

    // Send confirmation email to customer
    const confirmationEmailSuccess = await emailService.sendSupportConfirmation({
      to: email,
      name,
      ticketId,
      subject
    });

    if (supportEmailSuccess && confirmationEmailSuccess) {
      console.log('✅ Support ticket created successfully:', ticketId);
      return NextResponse.json({
        success: true,
        ticketId,
        message: 'Destek talebiniz başarıyla oluşturuldu'
      });
    } else {
      console.error('❌ Failed to send support emails');
      return NextResponse.json(
        { error: 'E-posta gönderilirken bir hata oluştu' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Support ticket API error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu' },
      { status: 500 }
    );
  }
}
