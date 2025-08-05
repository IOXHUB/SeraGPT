import { ApiResponse } from '../api-config';
import { ROICalculation } from './roi-calculator';
import { ClimateAnalysis } from './weather-service';
import { MarketAnalysis } from './market-service';

export interface ReportData {
  type: 'roi' | 'climate' | 'market' | 'equipment' | 'layout' | 'comprehensive';
  title: string;
  generatedAt: string;
  projectName: string;
  location: {
    city: string;
    region: string;
    coordinates: { lat: number; lon: number };
  };
  user: {
    name: string;
    email: string;
    company?: string;
  };
  data: any; // Specific data based on report type
}

export interface PDFOptions {
  includeCharts: boolean;
  includeRecommendations: boolean;
  includeRiskAnalysis: boolean;
  language: 'tr' | 'en';
  template: 'basic' | 'professional' | 'executive';
  branding: {
    logo?: string;
    companyName?: string;
    colors?: {
      primary: string;
      secondary: string;
    };
  };
}

class PDFService {
  private readonly templates = {
    basic: 'Temel Rapor Şablonu',
    professional: 'Profesyonel Rapor Şablonu',
    executive: 'Yönetici Özet Şablonu'
  };

  async generateROIReport(
    reportData: ReportData,
    roiData: ROICalculation,
    options: PDFOptions = this.getDefaultOptions()
  ): Promise<ApiResponse<{ url: string; filename: string }>> {
    try {
      // In a real implementation, this would use a PDF generation library
      // like jsPDF, PDFKit, or a service like Puppeteer
      
      const reportContent = this.generateROIContent(reportData, roiData, options);
      const filename = `roi-analizi-${reportData.projectName}-${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Mock PDF generation - in production, generate actual PDF
      const mockPdfUrl = await this.mockPDFGeneration(reportContent, filename);
      
      return {
        success: true,
        data: {
          url: mockPdfUrl,
          filename
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'PDF generation failed'
      };
    }
  }

  async generateClimateReport(
    reportData: ReportData,
    climateData: ClimateAnalysis,
    options: PDFOptions = this.getDefaultOptions()
  ): Promise<ApiResponse<{ url: string; filename: string }>> {
    try {
      const reportContent = this.generateClimateContent(reportData, climateData, options);
      const filename = `iklim-analizi-${reportData.projectName}-${new Date().toISOString().split('T')[0]}.pdf`;
      
      const mockPdfUrl = await this.mockPDFGeneration(reportContent, filename);
      
      return {
        success: true,
        data: {
          url: mockPdfUrl,
          filename
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'PDF generation failed'
      };
    }
  }

  async generateMarketReport(
    reportData: ReportData,
    marketData: MarketAnalysis,
    options: PDFOptions = this.getDefaultOptions()
  ): Promise<ApiResponse<{ url: string; filename: string }>> {
    try {
      const reportContent = this.generateMarketContent(reportData, marketData, options);
      const filename = `pazar-analizi-${reportData.projectName}-${new Date().toISOString().split('T')[0]}.pdf`;
      
      const mockPdfUrl = await this.mockPDFGeneration(reportContent, filename);
      
      return {
        success: true,
        data: {
          url: mockPdfUrl,
          filename
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'PDF generation failed'
      };
    }
  }

  async generateComprehensiveReport(
    reportData: ReportData,
    analysisData: {
      roi?: ROICalculation;
      climate?: ClimateAnalysis;
      market?: MarketAnalysis;
      equipment?: any;
      layout?: any;
    },
    options: PDFOptions = this.getDefaultOptions()
  ): Promise<ApiResponse<{ url: string; filename: string }>> {
    try {
      const reportContent = this.generateComprehensiveContent(reportData, analysisData, options);
      const filename = `kapsamli-analiz-${reportData.projectName}-${new Date().toISOString().split('T')[0]}.pdf`;
      
      const mockPdfUrl = await this.mockPDFGeneration(reportContent, filename);
      
      return {
        success: true,
        data: {
          url: mockPdfUrl,
          filename
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'PDF generation failed'
      };
    }
  }

  private generateROIContent(reportData: ReportData, roiData: ROICalculation, options: PDFOptions): string {
    return `
# ${reportData.title}

## Proje Bilgileri
- **Proje Adı:** ${reportData.projectName}
- **Lokasyon:** ${reportData.location.city}, ${reportData.location.region}
- **Rapor Tarihi:** ${new Date(reportData.generatedAt).toLocaleDateString('tr-TR')}
- **Rapor Türü:** ${this.templates[options.template]}

## Yatırım Analizi Özeti

### Başlangıç Yatırımı
- **İnşaat:** ₺${roiData.initialInvestment.construction.toLocaleString()}
- **Ekipman:** ₺${roiData.initialInvestment.equipment.toLocaleString()}
- **Otomasyon:** ₺${roiData.initialInvestment.automation.toLocaleString()}
- **Altyapı:** ₺${roiData.initialInvestment.infrastructure.toLocaleString()}
- **İzinler:** ₺${roiData.initialInvestment.permits.toLocaleString()}
- **TOPLAM:** ₺${roiData.initialInvestment.total.toLocaleString()}

### Finansal Analiz
- **Yatırımın Geri Dönüş Süresi:** ${roiData.analysis.paybackPeriod} yıl
- **ROI:** %${roiData.analysis.roi}
- **Net Bugünkü Değer (NPV):** ₺${roiData.analysis.npv.toLocaleString()}
- **İç Getiri Oranı (IRR):** %${roiData.analysis.irr}

### Yıllık Gelir Projeksiyonu
- **Brüt Gelir:** ₺${roiData.revenue.grossRevenue.toLocaleString()}
- **Net Gelir:** ₺${roiData.revenue.netRevenue.toLocaleString()}
- **Yıllık İşletme Maliyeti:** ₺${roiData.operationalCosts.annual.toLocaleString()}

${options.includeRecommendations ? this.formatRecommendations(roiData.recommendations) : ''}
${options.includeRiskAnalysis ? this.formatRisks(roiData.risks) : ''}

---
Rapor SeraGPT tarafından oluşturulmuştur.
`;
  }

  private generateClimateContent(reportData: ReportData, climateData: ClimateAnalysis, options: PDFOptions): string {
    return `
# ${reportData.title}

## Proje Bilgileri
- **Proje Adı:** ${reportData.projectName}
- **Lokasyon:** ${reportData.location.city}, ${reportData.location.region}
- **Koordinatlar:** ${reportData.location.coordinates.lat.toFixed(4)}, ${reportData.location.coordinates.lon.toFixed(4)}
- **Rapor Tarihi:** ${new Date(reportData.generatedAt).toLocaleDateString('tr-TR')}

## İklim Analizi Özeti

### Risk Değerlendirmesi
- **Genel Risk Skoru:** ${climateData.riskScore}/100
- **Risk Seviyesi:** ${climateData.riskScore < 30 ? 'Düşük' : climateData.riskScore < 60 ? 'Orta' : 'Yüksek'}

### Mevsimsel Uygunluk
${climateData.seasons.map(season => `
**${this.getSeasonName(season.season)}**
- Uygunluk: ${season.suitability}/100
- Fırsatlar: ${season.opportunities.join(', ')}
- Zorluklar: ${season.challenges.join(', ')}
`).join('')}

### Öneriler
${climateData.recommendations.map(rec => `- ${rec}`).join('\n')}

### Aylık İklim Verileri
${climateData.monthlyData.map(month => `
**${this.getMonthName(month.month)}**
- Ortalama Sıcaklık: ${month.avgTemp.toFixed(1)}°C
- Min/Max: ${month.minTemp.toFixed(1)}°C / ${month.maxTemp.toFixed(1)}°C
- Yağış: ${month.precipitation.toFixed(1)}mm
- Nem: %${month.humidity.toFixed(1)}
`).join('')}

---
Rapor SeraGPT tarafından oluşturulmuştur.
`;
  }

  private generateMarketContent(reportData: ReportData, marketData: MarketAnalysis, options: PDFOptions): string {
    return `
# ${reportData.title}

## Proje Bilgileri
- **Ürün:** ${marketData.product}
- **Lokasyon:** ${reportData.location.city}, ${reportData.location.region}
- **Rapor Tarihi:** ${new Date(reportData.generatedAt).toLocaleDateString('tr-TR')}

## Pazar Analizi Özeti

### Mevcut Pazar Durumu
- **Pazar Koşulu:** ${this.translateMarketCondition(marketData.analysis.currentMarketCondition)}
- **Fiyat Istikrarı:** ${marketData.analysis.priceStability}/100
- **Talep Seviyesi:** ${this.translateLevel(marketData.analysis.demandLevel)}
- **Arz Seviyesi:** ${this.translateLevel(marketData.analysis.supplyLevel)}
- **Mevsimsel Trend:** ${this.translateTrend(marketData.analysis.seasonalTrend)}

### Fiyat Tahminleri
**Gelecek Ay:**
- Tahmini Fiyat: ₺${marketData.predictions.nextMonth.price.toFixed(2)}
- Güven Seviyesi: %${marketData.predictions.nextMonth.confidence}
- Etkileyen Faktörler: ${marketData.predictions.nextMonth.factors.join(', ')}

**Gelecek Çeyrek:**
- Tahmini Fiyat: ₺${marketData.predictions.nextQuarter.price.toFixed(2)}
- Güven Seviyesi: %${marketData.predictions.nextQuarter.confidence}
- Etkileyen Faktörler: ${marketData.predictions.nextQuarter.factors.join(', ')}

### Öneriler
- **En Iyi Satış Dönemi:** ${marketData.recommendations.bestSellingPeriod}
- **Fiyatlama Stratejisi:** ${marketData.recommendations.pricingStrategy}

### Risk Faktörleri
${marketData.recommendations.riskFactors.map(risk => `- ${risk}`).join('\n')}

### Fırsatlar
${marketData.recommendations.opportunities.map(opp => `- ${opp}`).join('\n')}

---
Rapor SeraGPT tarafından oluşturulmuştur.
`;
  }

  private generateComprehensiveContent(
    reportData: ReportData,
    analysisData: any,
    options: PDFOptions
  ): string {
    const sections = [];

    sections.push(`
# ${reportData.title}

## Proje Bilgileri
- **Proje Adı:** ${reportData.projectName}
- **Lokasyon:** ${reportData.location.city}, ${reportData.location.region}
- **Rapor Tarihi:** ${new Date(reportData.generatedAt).toLocaleDateString('tr-TR')}
- **Rapor Türü:** Kapsamlı Analiz Raporu

## Yönetici Özeti
Bu rapor, ${reportData.projectName} sera projesi için kapsamlı bir fizibilite analizi sunmaktadır.
`);

    if (analysisData.roi) {
      sections.push(`
## Finansal Analiz
- **Toplam Yatırım:** ₺${analysisData.roi.initialInvestment.total.toLocaleString()}
- **Geri Dönüş Süresi:** ${analysisData.roi.analysis.paybackPeriod} yıl
- **ROI:** %${analysisData.roi.analysis.roi}
- **NPV:** ₺${analysisData.roi.analysis.npv.toLocaleString()}
`);
    }

    if (analysisData.climate) {
      sections.push(`
## İklim Uygunluğu
- **Risk Skoru:** ${analysisData.climate.riskScore}/100
- **Genel Değerlendirme:** ${analysisData.climate.riskScore < 30 ? 'Çok Uygun' : analysisData.climate.riskScore < 60 ? 'Uygun' : 'Dikkatli Planlama Gerekli'}
`);
    }

    if (analysisData.market) {
      sections.push(`
## Pazar Durumu
- **Pazar Koşulu:** ${this.translateMarketCondition(analysisData.market.analysis.currentMarketCondition)}
- **Talep Seviyesi:** ${this.translateLevel(analysisData.market.analysis.demandLevel)}
- **Fiyat Projeksiyonu:** ₺${analysisData.market.predictions.nextQuarter.price.toFixed(2)} (3 ay)
`);
    }

    sections.push(`
## Sonuç ve Öneriler
Bu proje analizi sonucunda aşağıdaki öneriler sunulmaktadır:

1. **Finansal Açıdan:** ${analysisData.roi?.analysis.roi > 15 ? 'Yatırım caziptir' : 'Dikkatli değerlendirme gereklidir'}
2. **İklim Açısından:** ${analysisData.climate?.riskScore < 40 ? 'Lokasyon uygundur' : 'Ek önlemler alınmalıdır'}
3. **Pazar Açısından:** ${analysisData.market?.analysis.demandLevel === 'high' ? 'Güçlü talep mevcuttur' : 'Pazarlama stratejisi geliştirilmelidir'}

---
Rapor SeraGPT tarafından oluşturulmuştur.
`);

    return sections.join('\n');
  }

  private async mockPDFGeneration(content: string, filename: string): Promise<string> {
    // In production, this would generate actual PDF and upload to storage
    // For now, return a mock URL
    return `https://seragpt-storage.s3.amazonaws.com/reports/${filename}`;
  }

  private formatRecommendations(recommendations: any[]): string {
    return `
### Öneriler
${recommendations.map(rec => `
**${rec.category}**
- ${rec.suggestion}
- Potansiyel Tasarruf: ₺${rec.potentialSaving.toLocaleString()}
- Öncelik: ${rec.priority === 'high' ? 'Yüksek' : rec.priority === 'medium' ? 'Orta' : 'Düşük'}
`).join('')}
`;
  }

  private formatRisks(risks: any[]): string {
    return `
### Risk Analizi
${risks.map(risk => `
**${risk.factor}**
- Etki: ${risk.impact === 'high' ? 'Yüksek' : risk.impact === 'medium' ? 'Orta' : 'Düşük'}
- Olasılık: %${(risk.probability * 100).toFixed(0)}
- Önlem: ${risk.mitigation}
`).join('')}
`;
  }

  private getDefaultOptions(): PDFOptions {
    return {
      includeCharts: true,
      includeRecommendations: true,
      includeRiskAnalysis: true,
      language: 'tr',
      template: 'professional',
      branding: {
        companyName: 'SeraGPT',
        colors: {
          primary: '#374151',
          secondary: '#6B7280'
        }
      }
    };
  }

  private getSeasonName(season: string): string {
    const names: Record<string, string> = {
      spring: 'İlkbahar',
      summer: 'Yaz',
      autumn: 'Sonbahar',
      winter: 'Kış'
    };
    return names[season] || season;
  }

  private getMonthName(month: number): string {
    const names = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return names[month - 1] || `Ay ${month}`;
  }

  private translateMarketCondition(condition: string): string {
    const translations: Record<string, string> = {
      excellent: 'Mükemmel',
      good: 'İyi',
      fair: 'Orta',
      poor: 'Zayıf'
    };
    return translations[condition] || condition;
  }

  private translateLevel(level: string): string {
    const translations: Record<string, string> = {
      high: 'Yüksek',
      medium: 'Orta',
      low: 'Düşük'
    };
    return translations[level] || level;
  }

  private translateTrend(trend: string): string {
    const translations: Record<string, string> = {
      peak: 'Zirve',
      growing: 'Yükselişte',
      declining: 'Düşüşte',
      'off-season': 'Sezon Dışı'
    };
    return translations[trend] || trend;
  }
}

export const pdfService = new PDFService();
