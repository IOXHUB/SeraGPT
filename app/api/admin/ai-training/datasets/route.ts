import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const format = formData.get('format') as string;
    const description = formData.get('description') as string;
    const file = formData.get('file') as File;

    if (!name || !file) {
      return NextResponse.json({
        success: false,
        error: 'Veri seti adı ve dosya gerekli'
      }, { status: 400 });
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json({
        success: false,
        error: 'Dosya boyutu 100MB\'dan fazla olamaz'
      }, { status: 400 });
    }

    // Validate file format
    const allowedFormats = ['jsonl', 'csv', 'json', 'txt'];
    if (!allowedFormats.includes(format)) {
      return NextResponse.json({
        success: false,
        error: 'Desteklenmeyen dosya formatı'
      }, { status: 400 });
    }

    // In a real implementation, you would:
    // 1. Upload the file to cloud storage (AWS S3, Google Cloud Storage, etc.)
    // 2. Process and validate the dataset
    // 3. Store metadata in database
    // 4. Return the dataset information

    // For now, create a mock dataset response
    const fileContent = await file.text();
    const lines = fileContent.split('\n').filter(line => line.trim());
    const samples = lines.length;

    const newDataset = {
      id: `dataset_${Date.now()}`,
      name,
      type,
      format,
      description,
      size: file.size,
      samples,
      quality: Math.floor(Math.random() * 20) + 80, // Mock quality score 80-100
      lastUpdated: new Date().toLocaleDateString('tr-TR'),
      createdAt: new Date().toISOString(),
      status: 'ready'
    };

    console.log('✅ New dataset created:', {
      name,
      type,
      format,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      samples
    });

    return NextResponse.json({
      success: true,
      data: newDataset,
      message: 'Veri seti başarıyla eklendi'
    });

  } catch (error) {
    console.error('❌ Error creating dataset:', error);
    return NextResponse.json({
      success: false,
      error: 'Veri seti eklenirken hata oluştu'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Mock datasets for development
    const mockDatasets = [
      {
        id: 'dataset_sera_base',
        name: 'Sera Analizi Base Dataset',
        type: 'Training',
        format: 'jsonl',
        size: 15728640, // ~15MB
        samples: 12500,
        quality: 92,
        lastUpdated: '10.01.2025',
        description: 'Temel sera analizi eğitim verisi'
      },
      {
        id: 'dataset_climate_data',
        name: 'İklim Verisi Dataset',
        type: 'Validation',
        format: 'csv',
        size: 8421376, // ~8MB
        samples: 8200,
        quality: 88,
        lastUpdated: '08.01.2025',
        description: 'İklim şartları ve sera verimliliği korelasyonu'
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockDatasets,
      message: 'Veri setleri başarıyla getirildi'
    });

  } catch (error) {
    console.error('❌ Error fetching datasets:', error);
    return NextResponse.json({
      success: false,
      error: 'Veri setleri getirilirken hata oluştu'
    }, { status: 500 });
  }
}
