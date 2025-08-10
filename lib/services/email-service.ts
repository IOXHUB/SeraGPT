// Custom email service using Resend
// Professional emails from @seragpt.com domain

interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface WelcomeEmailData {
  to: string;
  name: string;
  loginUrl: string;
}

interface VerificationEmailData {
  to: string;
  name: string;
  verificationUrl: string;
}

interface PasswordResetEmailData {
  to: string;
  name: string;
  resetUrl: string;
}

interface SupportTicketEmailData {
  ticketId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'general' | 'bug';
}

interface SupportConfirmationEmailData {
  to: string;
  name: string;
  ticketId: string;
  subject: string;
}

export class EmailService {
  private apiKey: string;
  private from: string;

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY || '';
    // Using verified seragpt.com domain
    this.from = 'SeraGPT <no-reply@seragpt.com>';
  }

  private async sendEmail(data: EmailData): Promise<boolean> {
    console.log('🔧 Email Debug - Starting send process');
    console.log('API Key exists:', !!this.apiKey);
    console.log('API Key preview:', this.apiKey ? this.apiKey.substring(0, 10) + '...' : 'MISSING');
    console.log('From address:', this.from);
    console.log('To address:', data.to);
    console.log('Subject:', data.subject);

    if (!this.apiKey) {
      console.error('❌ Resend API key not configured');
      return false;
    }

    const payload = {
      from: data.from || this.from,
      to: [data.to],
      subject: data.subject,
      html: data.html,
    };

    console.log('📤 Sending email payload:', {
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      htmlLength: payload.html.length
    });

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('📨 Resend API response status:', response.status);
      console.log('📨 Resend API response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Email send failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        return false;
      }

      const result = await response.json();
      console.log('✅ Email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('💥 Email service exception:', error);
      return false;
    }
  }

  async sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { width: 120px; height: auto; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 8px; }
            .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800" alt="SeraGPT" class="logo">
            </div>
            
            <div class="content">
              <h2>Hoş Geldiniz ${data.name}!</h2>
              <p>SeraGPT ailesine katıldığınız için teşekkür ederiz. AI destekli tarımsal analizler ile seralarınızı daha verimli hale getirmeye hazır mısınız?</p>
              
              <p><strong>Neler yapabilirsiniz:</strong></p>
              <ul>
                <li>🤖 SeraGPT AI ile sohbet etme</li>
                <li>📊 ROI analizi ve simülasyonları</li>
                <li>🌡️ İklim analizi ve öneriler</li>
                <li>🛠️ Ekipman planlaması</li>
                <li>📈 Pazar analizi ve raporlar</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${data.loginUrl}" class="button">Dashboard'a Git</a>
              </div>
              
              <p>Herhangi bir sorunuz varsa <a href="mailto:destek@seragpt.com">destek@seragpt.com</a> adresinden bize ulaşabilirsiniz.</p>
            </div>
            
            <div class="footer">
              <p>Bu e-posta ${data.to} adresine gönderildi.<br>
              SeraGPT © 2025 - Tarımsal AI Çözümleri</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.to,
      subject: '🌱 SeraGPT\'e Hoş Geldiniz!',
      html,
    });
  }

  async sendVerificationEmail(data: VerificationEmailData): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { width: 120px; height: auto; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 8px; }
            .button { background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { background: #fef3cd; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800" alt="SeraGPT" class="logo">
            </div>
            
            <div class="content">
              <h2>E-posta Adresinizi Doğrulayın</h2>
              <p>Merhaba ${data.name},</p>
              <p>SeraGPT hesabınızı oluşturduğunuz için teşekkür ederiz. Hesabınızı aktif etmek için e-posta adresinizi doğrulamanız gerekiyor.</p>
              
              <div style="text-align: center;">
                <a href="${data.verificationUrl}" class="button">E-postamı Doğrula</a>
              </div>
              
              <div class="warning">
                <strong>⚠️ Güvenlik Uyarısı:</strong> Bu linki sadece siz talep ettiyseniz kullanın. Link 24 saat sonra geçersiz olacaktır.
              </div>
              
              <p>Link çalışmıyor mu? Aşağıdaki adresi tarayıcınıza kopyalayın:</p>
              <p style="word-break: break-all; color: #666; font-size: 14px;">${data.verificationUrl}</p>
            </div>
            
            <div class="footer">
              <p>Bu e-posta ${data.to} adresine gönderildi.<br>
              SeraGPT © 2025 - Tarımsal AI Çözümleri</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.to,
      subject: '✅ E-posta Adresinizi Doğrulayın - SeraGPT',
      html,
    });
  }

  async sendPasswordResetEmail(data: PasswordResetEmailData): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { width: 120px; height: auto; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 8px; }
            .button { background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { background: #fee2e2; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #ef4444; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800" alt="SeraGPT" class="logo">
            </div>
            
            <div class="content">
              <h2>Şifre Sıfırlama Talebi</h2>
              <p>Merhaba ${data.name},</p>
              <p>SeraGPT hesabınız için şifre sıfırlama talebinde bulundunuz. Aşağıdaki butona tıklayarak yeni şifrenizi oluşturabilirsiniz.</p>
              
              <div style="text-align: center;">
                <a href="${data.resetUrl}" class="button">Şifreyi Sıfırla</a>
              </div>
              
              <div class="warning">
                <strong>🔒 Güvenlik Uyarısı:</strong><br>
                • Bu talebi siz yapmadıysanız bu e-postayı görmezden gelin<br>
                • Link 1 saat sonra geçersiz olacaktır<br>
                • Kimseyle paylaşmayın
              </div>
              
              <p>Sorun yaşıyorsanız <a href="mailto:destek@seragpt.com">destek@seragpt.com</a> adresinden bize ulaşın.</p>
            </div>
            
            <div class="footer">
              <p>Bu e-posta ${data.to} adresine gönderildi.<br>
              SeraGPT © 2025 - Tarımsal AI Çözümleri</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.to,
      subject: '🔐 Şifre Sıfırlama - SeraGPT',
      html,
    });
  }

  async sendSupportTicket(data: SupportTicketEmailData): Promise<boolean> {
    const priorityColors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      urgent: '#dc2626'
    };

    const categoryLabels = {
      technical: 'Teknik Destek',
      billing: 'Faturalandırma',
      general: 'Genel Sorular',
      bug: 'Hata Raporu'
    };

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; }
            .priority { padding: 4px 12px; border-radius: 20px; color: white; font-size: 12px; font-weight: bold; }
            .ticket-info { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .customer-message { background: #fff; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎫 Yeni Destek Talebi</h1>
              <p>SeraGPT Destek Sistemi</p>
            </div>

            <div class="ticket-info">
              <h2>Talep Bilgileri</h2>
              <p><strong>Talep ID:</strong> ${data.ticketId}</p>
              <p><strong>Müşteri:</strong> ${data.customerName}</p>
              <p><strong>E-posta:</strong> ${data.customerEmail}</p>
              <p><strong>Konu:</strong> ${data.subject}</p>
              <p><strong>Kategori:</strong> ${categoryLabels[data.category]}</p>
              <p><strong>Öncelik:</strong> <span class="priority" style="background-color: ${priorityColors[data.priority]}">${data.priority.toUpperCase()}</span></p>
              <p><strong>Tarih:</strong> ${new Date().toLocaleString('tr-TR')}</p>
            </div>

            <div class="customer-message">
              <h3>Müşteri Mesajı:</h3>
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>

            <div class="footer">
              <p>Bu destek talebi SeraGPT sisteminden otomatik olarak oluşturulmuştur.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: 'info@isitmax.com', // Admin email
      subject: `[${data.priority.toUpperCase()}] Destek Talebi: ${data.subject} (#${data.ticketId})`,
      html,
    });
  }

  async sendSupportConfirmation(data: SupportConfirmationEmailData): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { width: 120px; height: auto; }
            .content { background: #f0f9ff; padding: 30px; border-radius: 8px; border: 1px solid #0ea5e9; }
            .ticket-box { background: #fff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px dashed #0ea5e9; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .timeline { margin: 20px 0; }
            .timeline-item { padding: 10px 0; border-left: 3px solid #0ea5e9; padding-left: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800" alt="SeraGPT" class="logo">
            </div>

            <div class="content">
              <h2>✅ Destek Talebiniz Alındı</h2>
              <p>Merhaba ${data.name},</p>
              <p>SeraGPT destek talebiniz başarıyla oluşturuldu. En kısa sürede size geri dönüş yapacağız.</p>

              <div class="ticket-box">
                <h3>🎫 Talep Numaranız</h3>
                <p style="font-size: 18px; font-weight: bold; color: #0ea5e9; margin: 0;">${data.ticketId}</p>
                <p style="font-size: 14px; color: #666;">Bu numarayı kaydetmeyi unutmayın</p>
              </div>

              <p><strong>Konu:</strong> ${data.subject}</p>
              <p><strong>Oluşturma Tarihi:</strong> ${new Date().toLocaleString('tr-TR')}</p>

              <div class="timeline">
                <h3>📋 Süreç Aşamaları</h3>
                <div class="timeline-item">
                  <strong>1. Talep Alındı</strong> ✅<br>
                  <small>Talebiniz sistemimize kaydedildi</small>
                </div>
                <div class="timeline-item">
                  <strong>2. İnceleme</strong> ⏳<br>
                  <small>Uzman ekibimiz talebinizi inceliyor</small>
                </div>
                <div class="timeline-item">
                  <strong>3. Yanıt</strong> ⏳<br>
                  <small>Size e-posta ile yanıt vereceğiz</small>
                </div>
              </div>

              <p><strong>Yanıt Süresi:</strong> 24 saat içinde (iş günleri)</p>
              <p><strong>Çalışma Saatleri:</strong> Hafta içi 09:00-18:00</p>
            </div>

            <div class="footer">
              <p>Bu e-posta ${data.to} adresine gönderildi.<br>
              SeraGPT © 2025 - Tarımsal AI Çözümleri</p>
              <p>Destek: info@isitmax.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.to,
      subject: `🎫 Destek Talebiniz Alındı - ${data.ticketId}`,
      html,
    });
  }
}

// Singleton instance
export const emailService = new EmailService();
