import { NextRequest, NextResponse } from 'next/server';

interface SystemPrompt {
  id: string;
  name: string;
  description: string;
  content: string;
  category: 'core' | 'safety' | 'personality' | 'instructions';
  isActive: boolean;
  priority: number;
  lastModified: string;
  modifiedBy: string;
}

export async function GET() {
  try {
    // Mock system prompts data
    const mockSystemPrompts: SystemPrompt[] = [
      {
        id: 'core-identity',
        name: 'Ana Kimlik',
        description: 'SeraGPT\'nin temel kimlik ve rol tanımı',
        content: 'Sen SeraGPT\'sin, Türkiye\'nin en gelişmiş sera tarımı AI asistanısın. Sera tarımı konusunda uzman bilgi ve tavsiyelerde bulunursun. Her zaman Türkçe konuşur, pratik çözümler önerir ve kullanıcı güvenliğini önceleyesin.',
        category: 'core',
        isActive: true,
        priority: 1,
        lastModified: '2024-01-20T10:30:00Z',
        modifiedBy: 'admin@seragpt.com'
      },
      {
        id: 'safety-guidelines',
        name: 'Güvenlik Kuralları',
        description: 'Kullanıcı güvenliği ve etik kurallar',
        content: 'Her zaman kullanıcı güvenliğini önceleyesin. Zararlı kimyasallar, yanlış dozajlar veya tehlikeli uygulamalar konusunda uyarı ver. Sadece güvenli ve kanıtlanmış tarım yöntemlerini öner.',
        category: 'safety',
        isActive: true,
        priority: 2,
        lastModified: '2024-01-18T14:15:00Z',
        modifiedBy: 'admin@seragpt.com'
      },
      {
        id: 'personality-traits',
        name: 'Kişilik Özellikleri',
        description: 'AI\'nın iletişim tarzı ve davranışları',
        content: 'Kibar, profesyonel ve yardımsever ol. Karmaşık konuları basit terimlerle açıkla. Kullanıcının deneyim seviyesine göre cevap ver. Her zaman pozitif ve çözüm odaklı yaklaş.',
        category: 'personality',
        isActive: true,
        priority: 3,
        lastModified: '2024-01-15T09:45:00Z',
        modifiedBy: 'admin@seragpt.com'
      },
      {
        id: 'response-structure',
        name: 'Cevap Yapısı',
        description: 'Yanıtların format ve yapı kuralları',
        content: 'Cevapları net başlıklarla yapılandır. Önemli bilgileri vurgula. Gerekirse adım adım talimatlar ver. Kaynakları ve ek okuma önerilerini belirt.',
        category: 'instructions',
        isActive: true,
        priority: 4,
        lastModified: '2024-01-22T16:20:00Z',
        modifiedBy: 'admin@seragpt.com'
      },
      {
        id: 'data-privacy',
        name: 'Veri Gizliliği',
        description: 'Kullanıcı verilerinin korunması',
        content: 'Kullanıcının kişisel ve işletme bilgilerini koruyun. Hassas verileri kaydetme veya paylaşma. Her analiz sonunda kullanıcıya veri güvenliği konusunda bilgi ver.',
        category: 'safety',
        isActive: true,
        priority: 5,
        lastModified: '2024-01-19T11:10:00Z',
        modifiedBy: 'admin@seragpt.com'
      },
      {
        id: 'cultural-context',
        name: 'Kültürel Bağlam',
        description: 'Türkiye tarım koşulları ve kültürel özellikler',
        content: 'Türkiye\'nin iklim koşulları, tarım kültürü ve yerel uygulamalarını dikkate al. Bölgesel farklılıkları belirt. Mevsimsel değişimleri ve yerel pazarlama koşullarını göz önünde bulundur.',
        category: 'core',
        isActive: true,
        priority: 6,
        lastModified: '2024-01-17T13:30:00Z',
        modifiedBy: 'admin@seragpt.com'
      }
    ];

    const stats = {
      totalPrompts: mockSystemPrompts.length,
      activePrompts: mockSystemPrompts.filter(p => p.isActive).length,
      categories: {
        core: mockSystemPrompts.filter(p => p.category === 'core').length,
        safety: mockSystemPrompts.filter(p => p.category === 'safety').length,
        personality: mockSystemPrompts.filter(p => p.category === 'personality').length,
        instructions: mockSystemPrompts.filter(p => p.category === 'instructions').length
      },
      lastUpdate: mockSystemPrompts.sort((a, b) => 
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      )[0]?.lastModified
    };

    return NextResponse.json({
      success: true,
      data: {
        prompts: mockSystemPrompts,
        stats: stats
      }
    });

  } catch (error) {
    console.error('System Prompts API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch system prompts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, content, category, priority = 10 } = body;

    if (!name || !content || !category) {
      return NextResponse.json(
        { success: false, error: 'Name, content, and category are required' },
        { status: 400 }
      );
    }

    const newSystemPrompt: SystemPrompt = {
      id: `system-${Date.now()}`,
      name,
      description: description || '',
      content,
      category: category as any,
      isActive: true,
      priority,
      lastModified: new Date().toISOString(),
      modifiedBy: 'admin@seragpt.com'
    };

    console.log('⚙️ Yeni sistem promptu oluşturuldu:', newSystemPrompt);

    return NextResponse.json({
      success: true,
      data: newSystemPrompt,
      message: 'Sistem promptu başarıyla oluşturuldu'
    });

  } catch (error) {
    console.error('System Prompt Creation Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create system prompt' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, content, category, isActive, priority } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'System prompt ID is required' },
        { status: 400 }
      );
    }

    console.log('⚙️ Sistem promptu güncellendi:', { id, name, isActive });

    return NextResponse.json({
      success: true,
      message: 'Sistem promptu başarıyla güncellendi'
    });

  } catch (error) {
    console.error('System Prompt Update Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update system prompt' },
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
        { success: false, error: 'System prompt ID is required' },
        { status: 400 }
      );
    }

    console.log('⚙️ Sistem promptu silindi:', id);

    return NextResponse.json({
      success: true,
      message: 'Sistem promptu başarıyla silindi'
    });

  } catch (error) {
    console.error('System Prompt Delete Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete system prompt' },
      { status: 500 }
    );
  }
}
