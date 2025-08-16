import { NextRequest, NextResponse } from 'next/server';

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: 'roi' | 'climate' | 'equipment' | 'market' | 'layout' | 'system';
  version: string;
  isActive: boolean;
  createdAt: string;
  lastModified: string;
  usage: number;
  performance: number;
}

export async function GET() {
  try {
    // Mock prompts data
    const mockPrompts: Prompt[] = [
      {
        id: 'prompt-001',
        title: 'ROI Analizi Promptu',
        content: 'Sen bir sera tarımı uzmanısın. Kullanıcının verdiği bilgilere göre ROI (Yatırım Getirisi) analizi yap. Aşağıdaki faktörleri dikkate al:\n\n- İlk yatırım maliyeti\n- Yıllık işletme giderleri\n- Beklenen gelir\n- Pazar koşulları\n- Risk faktörleri\n\nDetaylı bir analiz raporu hazırla.',
        category: 'roi',
        version: '2.1',
        isActive: true,
        createdAt: '2024-01-10T09:00:00Z',
        lastModified: '2024-01-15T14:30:00Z',
        usage: 1247,
        performance: 92.5
      },
      {
        id: 'prompt-002',
        title: 'İklim Uygunluk Promptu',
        content: 'Sen bir meteoroloji ve tarım uzmanısın. Verilen lokasyon için sera tarımının iklim uygunluğunu analiz et. Değerlendirme kriterleri:\n\n- Sıcaklık değişimleri\n- Nem oranları\n- Yağış durumu\n- Rüzgar koşulları\n- Mevsimsel değişiklikler\n\nRisk seviyesi ve öneriler içeren rapor hazırla.',
        category: 'climate',
        version: '1.8',
        isActive: true,
        createdAt: '2024-01-12T11:15:00Z',
        lastModified: '2024-01-18T16:45:00Z',
        usage: 892,
        performance: 89.3
      },
      {
        id: 'prompt-003',
        title: 'Ekipman Seçim Promptu',
        content: 'Sen bir sera teknolojileri uzmanısın. Kullanıcının ihtiyaçlarına göre optimal ekipman listesi oluştur. Dikkate alınacak faktörler:\n\n- Sera boyutu ve tipi\n- Yetiştirilen ür��n\n- Bütçe kısıtları\n- Enerji verimliliği\n- Otomasyon seviyesi\n\nDetaylı ekipman listesi ve maliyet analizi sun.',
        category: 'equipment',
        version: '2.0',
        isActive: true,
        createdAt: '2024-01-08T13:20:00Z',
        lastModified: '2024-01-20T10:15:00Z',
        usage: 634,
        performance: 91.7
      },
      {
        id: 'prompt-004',
        title: 'Pazar Analizi Promptu',
        content: 'Sen bir tarım ekonomisti ve pazar analisti uzmanısın. Verilen ürün için pazar analizi yap:\n\n- Mevcut pazar fiyatları\n- Talep-arz durumu\n- Rekabet analizi\n- Sezonsal değişimler\n- Gelecek projeksiyonları\n\nSatış stratejileri ve fiyatlandırma önerileri içeren rapor hazırla.',
        category: 'market',
        version: '1.9',
        isActive: true,
        createdAt: '2024-01-14T08:30:00Z',
        lastModified: '2024-01-19T15:20:00Z',
        usage: 456,
        performance: 87.2
      },
      {
        id: 'prompt-005',
        title: 'Sera Layout Promptu',
        content: 'Sen bir sera tasarım uzmanısın. Verilen alan ve gereksinimler için optimal sera layout\'u tasarla:\n\n- Alan büyüklüğü ve şekli\n- Ürün türü ve miktarı\n- İş akışı optimizasyonu\n- Ekipman yerleşimi\n- Genişleme potansiyeli\n\n3D model önerisi ve verimlilik analizi sun.',
        category: 'layout',
        version: '2.2',
        isActive: true,
        createdAt: '2024-01-16T12:45:00Z',
        lastModified: '2024-01-21T09:10:00Z',
        usage: 378,
        performance: 94.1
      },
      {
        id: 'prompt-006',
        title: 'Sistem Yardım Promptu',
        content: 'Sen SeraGPT asistanısın. Kullanıcılara sera tarımı konusunda yardım et. Her zaman:\n\n- Kibar ve profesyonel ol\n- Doğru ve güncel bilgi ver\n- Pratik çözümler öner\n- Güvenlik uyarıları yap\n- Türkçe dil kurallarına uy\n\nKullanıcı memnuniyetini öncelikle düşün.',
        category: 'system',
        version: '3.0',
        isActive: true,
        createdAt: '2024-01-05T10:00:00Z',
        lastModified: '2024-01-22T14:30:00Z',
        usage: 2156,
        performance: 96.3
      }
    ];

    const stats = {
      totalPrompts: mockPrompts.length,
      activePrompts: mockPrompts.filter(p => p.isActive).length,
      categories: ['roi', 'climate', 'equipment', 'market', 'layout', 'system'].length,
      totalUsage: mockPrompts.reduce((sum, p) => sum + p.usage, 0),
      avgPerformance: Math.round(mockPrompts.reduce((sum, p) => sum + p.performance, 0) / mockPrompts.length * 10) / 10
    };

    return NextResponse.json({
      success: true,
      data: {
        prompts: mockPrompts,
        stats: stats,
        categories: [
          { id: 'roi', name: 'ROI Analizi', count: mockPrompts.filter(p => p.category === 'roi').length },
          { id: 'climate', name: 'İklim Analizi', count: mockPrompts.filter(p => p.category === 'climate').length },
          { id: 'equipment', name: 'Ekipman Seçimi', count: mockPrompts.filter(p => p.category === 'equipment').length },
          { id: 'market', name: 'Pazar Analizi', count: mockPrompts.filter(p => p.category === 'market').length },
          { id: 'layout', name: 'Sera Layout', count: mockPrompts.filter(p => p.category === 'layout').length },
          { id: 'system', name: 'Sistem', count: mockPrompts.filter(p => p.category === 'system').length }
        ]
      }
    });

  } catch (error) {
    console.error('Prompts API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category, version = '1.0' } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { success: false, error: 'Title, content, and category are required' },
        { status: 400 }
      );
    }

    const newPrompt: Prompt = {
      id: `prompt-${Date.now()}`,
      title,
      content,
      category: category as any,
      version,
      isActive: true,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      usage: 0,
      performance: 0
    };

    console.log('📝 Yeni prompt oluşturuldu:', newPrompt);

    return NextResponse.json({
      success: true,
      data: newPrompt,
      message: 'Prompt başarıyla oluşturuldu'
    });

  } catch (error) {
    console.error('Prompt Creation Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create prompt' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, content, category, version, isActive } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Prompt ID is required' },
        { status: 400 }
      );
    }

    console.log('📝 Prompt güncellendi:', { id, title, isActive });

    return NextResponse.json({
      success: true,
      message: 'Prompt başarıyla güncellendi'
    });

  } catch (error) {
    console.error('Prompt Update Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update prompt' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Prompt ID is required' },
        { status: 400 }
      );
    }

    console.log('📝 Prompt silindi:', id);

    return NextResponse.json({
      success: true,
      message: 'Prompt başarıyla silindi'
    });

  } catch (error) {
    console.error('Prompt Delete Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete prompt' },
      { status: 500 }
    );
  }
}
