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
    // Use verified Resend domain until seragpt.com is verified
    // TODO: Change to 'SeraGPT <noreply@seragpt.com>' after domain verification
    this.from = 'SeraGPT <onboarding@resend.dev>'; // Verified domain that works
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
}

// Singleton instance
export const emailService = new EmailService();
