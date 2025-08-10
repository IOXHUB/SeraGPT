'use client';

import { DevMockSystem, MockAnalysis } from '@/lib/utils/dev-mock-system';

/**
 * Mock Analysis Service for Development
 * Provides realistic analysis data without backend dependencies
 */

export interface AnalysisFormData {
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  location?: {
    city: string;
    district?: string;
    coordinates?: { lat: number; lng: number };
  };
  cropType?: string;
  greenhouseSize?: number;
  investment?: {
    total: number;
    equipment: number;
    construction: number;
  };
  targetProduction?: number;
  operationPeriod?: number;
}

export interface AnalysisResult {
  id: string;
  type: string;
  title: string;
  status: 'completed' | 'processing' | 'failed';
  createdAt: string;
  completedAt?: string;
  data?: any;
  pdfUrl?: string;
  tokensUsed: number;
}

export class MockAnalysisService {
  
  // Create new analysis
  static async createAnalysis(formData: AnalysisFormData): Promise<AnalysisResult> {
    // Simulate API processing time
    await this.delay(1500);

    const analysisId = `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tokensUsed = 1;

    const analysis: AnalysisResult = {
      id: analysisId,
      type: formData.type,
      title: this.generateAnalysisTitle(formData),
      status: 'processing',
      createdAt: new Date().toISOString(),
      tokensUsed
    };

    // Simulate processing and completion
    setTimeout(async () => {
      analysis.status = 'completed';
      analysis.completedAt = new Date().toISOString();
      analysis.data = DevMockSystem.generateMockAnalysisResult(formData.type);
      analysis.pdfUrl = `/api/mock/pdf/${analysisId}`;
    }, 3000);

    return analysis;
  }

  // Get user analyses
  static async getUserAnalyses(userId: string): Promise<MockAnalysis[]> {
    await this.delay(500);
    return DevMockSystem.getUserAnalyses(userId);
  }

  // Get analysis by ID
  static async getAnalysis(analysisId: string): Promise<MockAnalysis | null> {
    await this.delay(300);
    return DevMockSystem.getAnalysis(analysisId);
  }

  // Get analysis by ID with alias for reports
  static async getAnalysisById(analysisId: string): Promise<MockAnalysis | null> {
    return this.getAnalysis(analysisId);
  }

  // Generate analysis preview/summary
  static async getAnalysisPreview(type: string, formData: AnalysisFormData): Promise<any> {
    await this.delay(800);

    switch (type) {
      case 'roi':
        return {
          estimatedROI: '18-25%',
          paybackPeriod: '2.5-3.2 yıl',
          riskLevel: 'Orta',
          confidence: 85
        };
      case 'climate':
        return {
          suitabilityScore: Math.floor(Math.random() * 30) + 70,
          riskFactors: Math.floor(Math.random() * 3) + 1,
          bestSeasons: ['İlkbahar', 'Sonbahar'],
          confidence: 92
        };
      case 'equipment':
        return {
          totalCost: '₺' + (Math.floor(Math.random() * 200000) + 100000).toLocaleString(),
          equipmentCount: Math.floor(Math.random() * 15) + 8,
          categories: 4,
          confidence: 88
        };
      case 'market':
        return {
          averagePrice: '₺' + (Math.random() * 5 + 3).toFixed(2) + '/kg',
          demandLevel: ['Yüksek', 'Orta', 'Düşük'][Math.floor(Math.random() * 3)],
          competitionLevel: 'Orta',
          confidence: 78
        };
      case 'layout':
        return {
          efficiency: Math.floor(Math.random() * 15) + 85 + '%',
          optimizationPotential: Math.floor(Math.random() * 20) + 10 + '%',
          layoutType: 'Modern Hibrit',
          confidence: 90
        };
      default:
        return {};
    }
  }

  // Delete analysis
  static async deleteAnalysis(analysisId: string): Promise<boolean> {
    await this.delay(400);
    // In a real app, this would delete from database
    console.log('🗑️ Deleted analysis:', analysisId);
    return true;
  }

  // Download PDF
  static async downloadPDF(analysisId: string): Promise<Blob> {
    await this.delay(2000);
    
    // Generate mock PDF content
    const pdfContent = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(SeraGPT Analysis Report - ${analysisId}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000200 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
293
%%EOF
    `;

    return new Blob([pdfContent], { type: 'application/pdf' });
  }

  // Private helpers
  private static generateAnalysisTitle(formData: AnalysisFormData): string {
    const location = formData.location?.city || 'Lokasyon';
    const crop = formData.cropType || 'Ürün';
    
    switch (formData.type) {
      case 'roi':
        return `${location} ${crop} ROI Analizi`;
      case 'climate':
        return `${location} İklim Uygunluk Analizi`;
      case 'equipment':
        return `${crop} Sera Ekipman Listesi`;
      case 'market':
        return `${crop} Pazar Analizi - ${location}`;
      case 'layout':
        return `${location} Sera Yerleşim Planı`;
      default:
        return `${location} Analiz Raporu`;
    }
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get analysis statistics
  static async getAnalysisStats(userId: string): Promise<any> {
    await this.delay(400);
    
    const analyses = DevMockSystem.getUserAnalyses(userId);
    
    return {
      total: analyses.length,
      completed: analyses.filter(a => a.status === 'completed').length,
      inProgress: analyses.filter(a => a.status === 'in_progress').length,
      byType: {
        roi: analyses.filter(a => a.type === 'roi').length,
        climate: analyses.filter(a => a.type === 'climate').length,
        equipment: analyses.filter(a => a.type === 'equipment').length,
        market: analyses.filter(a => a.type === 'market').length,
        layout: analyses.filter(a => a.type === 'layout').length,
      },
      thisMonth: analyses.filter(a => {
        const created = new Date(a.createdAt);
        const now = new Date();
        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
      }).length
    };
  }

  // Get popular analysis templates
  static async getAnalysisTemplates(): Promise<any[]> {
    await this.delay(300);
    
    return [
      {
        id: 'template-1',
        type: 'roi',
        title: 'Domates Serası ROI Şablonu',
        description: 'Akdeniz bölgesi domates serası için hazır ROI analizi',
        prefilledData: {
          cropType: 'Domates',
          greenhouseSize: 1000,
          location: { city: 'Antalya' }
        },
        popular: true
      },
      {
        id: 'template-2',
        type: 'climate',
        title: 'Salatalık İklim Analizi',
        description: 'Marmara bölgesi salatalık yetiştiriciliği iklim analizi',
        prefilledData: {
          cropType: 'Salatalık',
          location: { city: 'Bursa' }
        },
        popular: false
      },
      {
        id: 'template-3',
        type: 'equipment',
        title: 'Hidroponik Sistem Paketi',
        description: 'Modern hidroponik sera için ekipman listesi',
        prefilledData: {
          cropType: 'Marul',
          greenhouseSize: 500
        },
        popular: true
      }
    ];
  }
}
