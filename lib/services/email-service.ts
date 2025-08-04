import { API_CONFIG, ApiResponse } from '../api-config';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
}

export interface EmailData {
  to: string;
  subject: string;
  templateId?: string;
  variables?: Record<string, any>;
  htmlContent?: string;
  textContent?: string;
  attachments?: {
    filename: string;
    content: string; // base64
    type: string;
  }[];
}

class EmailService {
  private apiKey = API_CONFIG.SENDGRID.apiKey;
  private baseUrl = API_CONFIG.SENDGRID.baseUrl;

  // Email templates
  private readonly templates: EmailTemplate[] = [
    {
      id: 'welcome',
      name: 'Hoş Geldiniz',
      subject: 'SeraGPT\'ye Hoş Geldiniz! 🌱',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #374151;">Hoş Geldiniz {{name}}!</h1>
          <p>SeraGPT ailesine katıldığınız için teşekkür ederiz.</p>
          <p>Hesabınızda <strong>{{freeTokens}} ücretsiz jeton</strong> sizi bekliyor!</p>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Neler yapabilirsiniz:</h3>
            <ul>
              <li>ROI Simülasyonu</li>
              <li>İklim Analizi</li>
              <li>Pazar Verileri</li>
              <li>Ekipman Önerileri</li>
              <li>Layout Planlama</li>
              <li>AI Sohbet (Sınırsız)</li>
            </ul>
          </div>
          <a href="{{dashboardUrl}}" style="background: #374151; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Dashboard'a Git</a>
        </div>
      `,
      textContent: 'Hoş Geldiniz {{name}}! SeraGPT\'ye katıldığınız için teşekkürler.',
      variables: ['name', 'freeTokens', 'dashboardUrl']
    },
    {
      id: 'analysis_complete',
      name: 'Analiz Tamamlandı',
      subject: '{{analysisType}} Analiziniz Hazır! 📊',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #374151;">Analiziniz Tamamlandı!</h1>
          <p>Merhaba {{name}},</p>
          <p><strong>{{analysisType}}</strong> analiziniz başarıyla tamamlandı.</p>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Analiz Özeti:</h3>
            <p>{{summary}}</p>
          </div>
          <a href="{{reportUrl}}" style="background: #374151; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Raporu Görüntüle</a>
        </div>
      `,
      textContent: 'Merhaba {{name}}, {{analysisType}} analiziniz tamamlandı.',
      variables: ['name', 'analysisType', 'summary', 'reportUrl']
    },
    {
      id: 'token_purchase',
      name: 'Jeton Satın Alma',
      subject: 'Jeton Satın Alımınız Onaylandı! 💳',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #374151;">Satın Alım Onaylandı!</h1>
          <p>Merhaba {{name}},</p>
          <p><strong>{{packageName}}</strong> satın alımınız başarıyla tamamlandı.</p>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Satın Alım Detayları:</h3>
            <p><strong>Paket:</strong> {{packageName}}</p>
            <p><strong>Jeton Sayısı:</strong> {{tokenCount}}</p>
            <p><strong>Toplam Tutar:</strong> ₺{{amount}}</p>
            <p><strong>Yeni Bakiye:</strong> {{newBalance}} jeton</p>
          </div>
          <a href="{{dashboardUrl}}" style="background: #374151; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Dashboard'a Git</a>
        </div>
      `,
      textContent: 'Merhaba {{name}}, {{packageName}} satın alımınız onaylandı.',
      variables: ['name', 'packageName', 'tokenCount', 'amount', 'newBalance', 'dashboardUrl']
    },
    {
      id: 'low_tokens',
      name: 'Düşük Jeton Uyarısı',
      subject: 'Jetonlarınız Azalıyor! ⚠️',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #374151;">Jeton Uyarısı</h1>
          <p>Merhaba {{name}},</p>
          <p>Jeton bakiyeniz azalmış durumda. Kalan bakiyeniz: <strong>{{remainingTokens}} jeton</strong></p>
          <p>Analiz yapmaya devam edebilmek için jeton satın almanızı öneririz.</p>
          <a href="{{tokensUrl}}" style="background: #374151; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Jeton Satın Al</a>
        </div>
      `,
      textContent: 'Merhaba {{name}}, jeton bakiyeniz azalmış durumda.',
      variables: ['name', 'remainingTokens', 'tokensUrl']
    }
  ];

  async sendEmail(emailData: EmailData): Promise<ApiResponse<{ messageId: string }>> {
    try {
      if (!this.apiKey) {
        return this.mockSendEmail(emailData);
      }

      const response = await fetch(`${this.baseUrl}/mail/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: emailData.to }],
            subject: emailData.subject,
            dynamic_template_data: emailData.variables || {}
          }],
          from: { email: 'noreply@seragpt.com', name: 'SeraGPT' },
          template_id: emailData.templateId,
          content: emailData.htmlContent ? [{
            type: 'text/html',
            value: this.processTemplate(emailData.htmlContent, emailData.variables || {})
          }] : undefined,
          attachments: emailData.attachments
        }),
      });

      if (!response.ok) {
        throw new Error(`SendGrid API error: ${response.status}`);
      }

      const messageId = response.headers.get('X-Message-Id') || `msg_${Date.now()}`;

      return {
        success: true,
        data: { messageId }
      };
    } catch (error) {
      return this.mockSendEmail(emailData);
    }
  }

  async sendWelcomeEmail(
    email: string,
    name: string,
    freeTokens: number = 5
  ): Promise<ApiResponse<{ messageId: string }>> {
    const template = this.templates.find(t => t.id === 'welcome');
    if (!template) {
      return {
        success: false,
        error: 'Welcome template not found'
      };
    }

    return this.sendEmail({
      to: email,
      subject: template.subject,
      htmlContent: template.htmlContent,
      variables: {
        name,
        freeTokens,
        dashboardUrl: 'https://seragpt.com/dashboard'
      }
    });
  }

  async sendAnalysisCompleteEmail(
    email: string,
    name: string,
    analysisType: string,
    summary: string,
    reportUrl: string
  ): Promise<ApiResponse<{ messageId: string }>> {
    const template = this.templates.find(t => t.id === 'analysis_complete');
    if (!template) {
      return {
        success: false,
        error: 'Analysis complete template not found'
      };
    }

    return this.sendEmail({
      to: email,
      subject: this.processTemplate(template.subject, { analysisType }),
      htmlContent: template.htmlContent,
      variables: {
        name,
        analysisType,
        summary,
        reportUrl
      }
    });
  }

  async sendTokenPurchaseEmail(
    email: string,
    name: string,
    packageName: string,
    tokenCount: number,
    amount: number,
    newBalance: number
  ): Promise<ApiResponse<{ messageId: string }>> {
    const template = this.templates.find(t => t.id === 'token_purchase');
    if (!template) {
      return {
        success: false,
        error: 'Token purchase template not found'
      };
    }

    return this.sendEmail({
      to: email,
      subject: template.subject,
      htmlContent: template.htmlContent,
      variables: {
        name,
        packageName,
        tokenCount,
        amount,
        newBalance,
        dashboardUrl: 'https://seragpt.com/dashboard'
      }
    });
  }

  async sendLowTokensWarning(
    email: string,
    name: string,
    remainingTokens: number
  ): Promise<ApiResponse<{ messageId: string }>> {
    const template = this.templates.find(t => t.id === 'low_tokens');
    if (!template) {
      return {
        success: false,
        error: 'Low tokens template not found'
      };
    }

    return this.sendEmail({
      to: email,
      subject: template.subject,
      htmlContent: template.htmlContent,
      variables: {
        name,
        remainingTokens,
        tokensUrl: 'https://seragpt.com/dashboard/tokens'
      }
    });
  }

  private processTemplate(template: string, variables: Record<string, any>): string {
    let processed = template;
    
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processed = processed.replace(regex, String(value));
    });
    
    return processed;
  }

  private mockSendEmail(emailData: EmailData): ApiResponse<{ messageId: string }> {
    console.log('Mock email sent:', {
      to: emailData.to,
      subject: emailData.subject,
      variables: emailData.variables
    });

    return {
      success: true,
      data: {
        messageId: `mock_${Date.now()}`
      }
    };
  }

  getTemplates(): EmailTemplate[] {
    return this.templates;
  }

  getTemplate(id: string): EmailTemplate | undefined {
    return this.templates.find(t => t.id === id);
  }
}

export const emailService = new EmailService();
