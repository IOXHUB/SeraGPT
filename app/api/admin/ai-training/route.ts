import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock training data
    const mockJobs = [
      {
        id: 'train-001',
        name: 'Sera Analizi Fine-Tuning',
        type: 'fine-tuning',
        status: 'running' as const,
        progress: 65,
        startTime: '2024-01-20 10:30',
        estimatedCompletion: '2024-01-20 14:45',
        datasetSize: 25000,
        epochs: 10,
        learningRate: 0.0001,
        batchSize: 32,
        cost: 89.50,
        logs: [
          'Eğitim başlatıldı',
          'Veri seti yüklendi: 25,000 örnek',
          'Epoch 1/10 tamamlandı',
          'Doğrulama kaybı: 0.245'
        ]
      },
      {
        id: 'train-002',
        name: 'Pazar Fiyat Tahmini',
        type: 'training',
        status: 'completed' as const,
        progress: 100,
        startTime: '2024-01-19 09:15',
        estimatedCompletion: '2024-01-19 11:30',
        datasetSize: 15000,
        epochs: 5,
        learningRate: 0.001,
        batchSize: 64,
        cost: 45.20,
        logs: [
          'Eğitim tamamlandı',
          'Final doğrulama skoru: 0.92',
          'Model kaydedildi'
        ]
      }
    ];

    const mockDatasets = [
      {
        id: 'dataset-001',
        name: 'Sera Analiz Verileri',
        type: 'Training',
        size: 2.5,
        quality: 92.5,
        lastUpdated: '2024-01-20',
        format: 'JSON',
        samples: 25000
      },
      {
        id: 'dataset-002',
        name: 'Pazar Fiyat Geçmişi',
        type: 'Validation',
        size: 1.8,
        quality: 88.0,
        lastUpdated: '2024-01-19',
        format: 'CSV',
        samples: 15000
      }
    ];

    return NextResponse.json({
      success: true,
      data: {
        jobs: mockJobs,
        datasets: mockDatasets,
        stats: {
          totalJobs: mockJobs.length,
          activeJobs: mockJobs.filter(j => j.status === 'running').length,
          totalCost: mockJobs.reduce((sum, job) => sum + job.cost, 0),
          successRate: (mockJobs.filter(j => j.status === 'completed').length / mockJobs.length) * 100
        }
      }
    });

  } catch (error) {
    console.error('AI Training API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch training data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, datasetId, epochs, learningRate, batchSize } = body;

    // Validate required fields
    if (!name || !type || !datasetId) {
      return NextResponse.json(
        { success: false, error: 'Name, type, and dataset are required' },
        { status: 400 }
      );
    }

    // Simulate creating a new training job
    const newJob = {
      id: `train-${Date.now()}`,
      name,
      type,
      status: 'pending' as const,
      progress: 0,
      startTime: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      estimatedCompletion: 'Hesaplanıyor...',
      datasetSize: Math.floor(Math.random() * 50000) + 10000,
      epochs: epochs || 5,
      learningRate: learningRate || 0.001,
      batchSize: batchSize || 32,
      cost: 0,
      logs: [
        'Yeni eğitim işi oluşturuldu',
        `Dataset: ${datasetId}`,
        'Eğitim başlatılmayı bekliyor...'
      ]
    };

    // In a real implementation, you would:
    // 1. Save to database
    // 2. Queue the training job
    // 3. Start the actual training process

    console.log('🚀 Yeni AI eğitimi başlatıldı:', newJob);

    return NextResponse.json({
      success: true,
      data: newJob,
      message: 'Eğitim işi başarıyla oluşturuldu'
    });

  } catch (error) {
    console.error('AI Training Creation Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create training job' },
      { status: 500 }
    );
  }
}
