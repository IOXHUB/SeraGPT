export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  color: string;
}

// Mock data - in real app this would come from a database/CMS
const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: "Sera Yatırımları: 2025'te 500₺/m² Plan Değer mi? (Yeni Trend Analizi)",
    excerpt: "Sera maliyetleri analizi: 300₺ vs 500₺/m² planları. Yeni trend limitleri ne anlama geliyor ve sera yatırımcıları neden endişeli.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F3beecd14d0864cae823f643eeacb9705?format=webp&width=800",
    date: "29 Aralık 2025",
    category: "Yatırım",
    readTime: "8 dk okuma",
    slug: "sera-yatirimlari-2025-500tl-m2-plan-analizi",
    seoTitle: "Sera Yatırımları 2025: 500₺/m² Plan Değer mi? | SeraGPT",
    seoDescription: "2025 sera maliyetleri detaylı analizi. 300₺ vs 500₺/m² planları karşılaştırması ve yatırım önerileri.",
    author: "Volkan Şimşirkaya",
    tags: ["sera yatırımı", "maliyet analizi", "2025 trendleri"],
    featured: true,
    status: 'published',
    createdAt: "2025-01-02T10:00:00Z",
    updatedAt: "2025-01-02T10:00:00Z"
  },
  {
    id: 2,
    title: "UAT (Kullanıcı Kabul Testi) için Komple Rehber - Sera Projelerinde 2025",
    excerpt: "Sera projelerinde kullanıcı kabul testlerinin önemi ve uygulama rehberi. Adım adım test süreçleri ve en iyi uygulamalar.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F8f45e3a2b1234567890abcdef1234567?format=webp&width=800",
    date: "28 Aralık 2025",
    category: "Teknoloji",
    readTime: "6 dk okuma",
    slug: "uat-kullanici-kabul-testi-sera-projeleri-2025",
    seoTitle: "UAT Kullanıcı Kabul Testi: Sera Projeleri için Komple Rehber 2025",
    seoDescription: "Sera projelerinde UAT süreçleri, test senaryoları ve başarılı kabul testi uygulamaları için detaylı rehber.",
    author: "Volkan Şimşirkaya",
    tags: ["UAT", "test", "sera projeleri", "kalite kontrol"],
    featured: false,
    status: 'published',
    createdAt: "2025-01-01T14:00:00Z",
    updatedAt: "2025-01-01T14:00:00Z"
  },
  {
    id: 3,
    title: "2025'te En İyi 8 Sera Monitoring Alternatifi",
    excerpt: "FarmScope'un 250₺/aylık fiyatı cazip, alternatifler nasıl karşılaştırılır? Detaylı özellik ve fiyat karşılaştırması.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F9a56b7c8d9e0f1a2b3c4d5e6f7a8b9c0?format=webp&width=800",
    date: "27 Aralık 2025",
    category: "Araçlar",
    readTime: "10 dk okuma",
    slug: "en-iyi-8-sera-monitoring-alternatifi-2025",
    seoTitle: "2025'te En İyi 8 Sera Monitoring Alternatifi | Karşılaştırma",
    seoDescription: "FarmScope ve diğer sera monitoring çözümlerinin detaylı karşılaştırması. Fiyat, özellik ve performans analizi.",
    author: "Volkan Şimşirkaya",
    tags: ["sera monitoring", "araçlar", "karşılaştırma", "FarmScope"],
    featured: false,
    status: 'published',
    createdAt: "2024-12-30T16:00:00Z",
    updatedAt: "2024-12-30T16:00:00Z"
  },
  {
    id: 4,
    title: "2025'te En İyi 6 Sera Otomasyonu Alternatifi",
    excerpt: "Sera otomasyonu ücretleri 650₺/aylık başlıyor, hangi alternatifleri değerlendirmeli? Kapsamlı çözüm analizi.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F1b23c4d5e6f7a8b9c0d1e2f3a4b5c6d7?format=webp&width=800",
    date: "26 Aralık 2025",
    category: "Otomasyon",
    readTime: "7 dk okuma",
    slug: "en-iyi-6-sera-otomasyonu-alternatifi-2025",
    seoTitle: "2025'te En İyi 6 Sera Otomasyonu Alternatifi | Fiyat Karşılaştırması",
    seoDescription: "Sera otomasyonu çözümlerinin detaylı incelemesi. Maliyet, özellik ve verimlilik karşılaştırması.",
    author: "Volkan Şimşirkaya",
    tags: ["sera otomasyonu", "teknoloji", "verimlilik", "otomasyon"],
    featured: false,
    status: 'published',
    createdAt: "2024-12-29T12:00:00Z",
    updatedAt: "2024-12-29T12:00:00Z"
  },
  {
    id: 5,
    title: "Sera İçi Havalandırma Sistemleri: Doğru Seçim Rehberi",
    excerpt: "Sera verimliliği için kritik olan havalandırma sistemlerinin karşılaştırması ve seçim kriterleri.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F2c34d5e6f7a8b9c0d1e2f3a4b5c6d7e8?format=webp&width=800",
    date: "25 Aralık 2025",
    category: "Sera Yönetimi",
    readTime: "9 dk okuma",
    slug: "sera-ici-havalandirma-sistemleri-dogru-secim-rehberi",
    seoTitle: "Sera İçi Havalandırma Sistemleri: Doğru Seçim Rehberi | SeraGPT",
    seoDescription: "Sera havalandırma sistemleri karşılaştırması, seçim kriterleri ve verimlilik artırma yöntemleri.",
    author: "Volkan Şimşirkaya",
    tags: ["havalandırma", "sera yönetimi", "verimlilik", "sistem seçimi"],
    featured: false,
    status: 'published',
    createdAt: "2024-12-28T09:00:00Z",
    updatedAt: "2024-12-28T09:00:00Z"
  }
];

const mockCategories: BlogCategory[] = [
  { id: 1, name: "Yatırım", slug: "yatirim", count: 8, color: "bg-blue-100" },
  { id: 2, name: "Teknoloji", slug: "teknoloji", count: 15, color: "bg-purple-100" },
  { id: 3, name: "Sera Yönetimi", slug: "sera-yonetimi", count: 12, color: "bg-green-100" },
  { id: 4, name: "Araçlar", slug: "araclar", count: 6, color: "bg-yellow-100" },
  { id: 5, name: "Otomasyon", slug: "otomasyon", count: 4, color: "bg-red-100" }
];

export class BlogService {
  static async getLatestPosts(limit = 5): Promise<BlogPost[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return mockPosts
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  static async getFeaturedPost(): Promise<BlogPost | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const featuredPost = mockPosts.find(post => post.featured && post.status === 'published');
    return featuredPost || null;
  }

  static async getAllPosts(): Promise<BlogPost[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return mockPosts
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const post = mockPosts.find(post => post.slug === slug && post.status === 'published');
    return post || null;
  }

  static async getCategories(): Promise<BlogCategory[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return mockCategories;
  }

  static async getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const category = mockCategories.find(cat => cat.slug === categorySlug);
    if (!category) return [];
    
    return mockPosts
      .filter(post => post.category === category.name && post.status === 'published')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static async searchPosts(query: string): Promise<BlogPost[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const lowercaseQuery = query.toLowerCase();
    return mockPosts
      .filter(post => 
        post.status === 'published' && (
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.excerpt.toLowerCase().includes(lowercaseQuery) ||
          post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        )
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Admin functions (for future blog admin panel)
  static async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newPost: BlogPost = {
      ...post,
      id: Math.max(...mockPosts.map(p => p.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockPosts.unshift(newPost);
    return newPost;
  }

  static async updatePost(id: number, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const postIndex = mockPosts.findIndex(p => p.id === id);
    if (postIndex === -1) return null;
    
    mockPosts[postIndex] = {
      ...mockPosts[postIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    return mockPosts[postIndex];
  }

  static async deletePost(id: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const postIndex = mockPosts.findIndex(p => p.id === id);
    if (postIndex === -1) return false;
    
    mockPosts.splice(postIndex, 1);
    return true;
  }
}
