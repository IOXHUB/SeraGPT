import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock analysis results data
    const mockResults = [
      {
        id: 'analysis-001',
        userId: 'user-001',
        userName: 'Ahmet Yılmaz',
        type: 'roi',
        title: 'Antalya Domates Serası ROI',
        status: 'completed',
        createdAt: '2024-01-20T10:30:00Z',
        completedAt: '2024-01-20T10:45:00Z',
        duration: 15,
        results: {
          roiPercentage: 24.5,
          paybackPeriod: 2.8,
          netPresentValue: 450000
        },
        rating: 4.8,
        isPublic: false
      },
      {
        id: 'analysis-002',
        userId: 'user-002',
        userName: 'Fatma Demir',
        type: 'climate',
        title: 'İzmir İklim Uygunluk Analizi',
        status: 'completed',
        createdAt: '2024-01-19T14:20:00Z',
        completedAt: '2024-01-19T14:35:00Z',
        duration: 15,
        results: {
          climateScore: 85,
          riskLevel: 'low',
          recommendations: ['Sonbahar ekimi öneriliyor']
        },
        rating: 4.6,
        isPublic: true
      }
    ];

    const stats = {
      totalAnalyses: mockResults.length,
      completedToday: 12,
      avgRating: 4.7,
      avgDuration: 18,
      typeDistribution: {
        roi: 45,
        climate: 32,
        equipment: 28,
        market: 15,
        layout: 8
      }
    };

    return NextResponse.json({
      success: true,
      data: {
        results: mockResults,
        stats: stats
      }
    });

  } catch (error) {
    console.error('Analysis Results API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analysis results' },
      { status: 500 }
    );
  }
}
