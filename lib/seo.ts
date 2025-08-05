export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  structuredData?: any;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export class SEOService {
  private static readonly defaultConfig = {
    siteName: 'SeraGPT',
    siteUrl: 'https://seragpt.com',
    defaultTitle: 'SeraGPT - Sera Yatırım Analizi ve Uzman Görüşleri',
    defaultDescription: 'Sera yatırımlarınız için merkezi analiz platformu. Mühendisler analiz yapar, oy verir ve projeleri tartışır. Güvenilir sera yatırım kararları için SeraGPT.',
    defaultImage: 'https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=1200',
    twitterHandle: '@seragpt',
    locale: 'tr_TR',
    type: 'website'
  };

  static generateMetaTags(config: SEOConfig) {
    const {
      title,
      description,
      keywords = [],
      canonicalUrl,
      ogImage = this.defaultConfig.defaultImage,
      ogType = 'website',
      twitterCard = 'summary_large_image',
      author,
      publishedTime,
      modifiedTime,
      noindex = false
    } = config;

    const fullTitle = title.includes('SeraGPT') ? title : `${title} | ${this.defaultConfig.siteName}`;
    const fullCanonicalUrl = canonicalUrl || this.defaultConfig.siteUrl;

    return {
      title: fullTitle,
      description,
      keywords: keywords.join(', '),
      canonical: fullCanonicalUrl,
      robots: noindex ? 'noindex, nofollow' : 'index, follow',
      
      // Open Graph
      'og:title': fullTitle,
      'og:description': description,
      'og:image': ogImage,
      'og:url': fullCanonicalUrl,
      'og:type': ogType,
      'og:site_name': this.defaultConfig.siteName,
      'og:locale': this.defaultConfig.locale,
      
      // Twitter Card
      'twitter:card': twitterCard,
      'twitter:title': fullTitle,
      'twitter:description': description,
      'twitter:image': ogImage,
      'twitter:site': this.defaultConfig.twitterHandle,
      'twitter:creator': author ? `@${author}` : this.defaultConfig.twitterHandle,
      
      // Article specific (if ogType is article)
      ...(ogType === 'article' && {
        'article:author': author,
        'article:published_time': publishedTime,
        'article:modified_time': modifiedTime,
        'article:section': 'Sera Teknolojileri',
        'article:tag': keywords.join(',')
      })
    };
  }

  static generateStructuredData(type: 'website' | 'article' | 'breadcrumb' | 'organization', data: any) {
    const baseUrl = this.defaultConfig.siteUrl;
    
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: this.defaultConfig.siteName,
          url: baseUrl,
          description: this.defaultConfig.defaultDescription,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/blog?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          },
          publisher: {
            '@type': 'Organization',
            name: this.defaultConfig.siteName,
            logo: {
              '@type': 'ImageObject',
              url: this.defaultConfig.defaultImage
            }
          }
        };

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          image: data.image,
          datePublished: data.publishedTime,
          dateModified: data.modifiedTime || data.publishedTime,
          author: {
            '@type': 'Person',
            name: data.author || 'Volkan Şimşirkaya',
            url: `${baseUrl}/yazar/${(data.author || 'volkan-simsirkaya').toLowerCase().replace(/\s+/g, '-')}`
          },
          publisher: {
            '@type': 'Organization',
            name: this.defaultConfig.siteName,
            logo: {
              '@type': 'ImageObject',
              url: this.defaultConfig.defaultImage
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url
          },
          keywords: data.keywords,
          articleSection: data.category || 'Sera Teknolojileri',
          wordCount: data.wordCount || 1000,
          inLanguage: 'tr-TR'
        };

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.items.map((item: BreadcrumbItem, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
          }))
        };

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: this.defaultConfig.siteName,
          url: baseUrl,
          logo: this.defaultConfig.defaultImage,
          description: this.defaultConfig.defaultDescription,
          foundingDate: '2025',
          industry: 'Tarım Teknolojileri',
          knowsAbout: ['Sera Yönetimi', 'Tarım Teknolojileri', 'Yatırım Analizi', 'Sera Otomasyonu'],
          areaServed: {
            '@type': 'Country',
            name: 'Türkiye'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Müşteri Hizmetleri',
            availableLanguage: 'Turkish'
          },
          sameAs: [
            'https://twitter.com/seragpt',
            'https://linkedin.com/company/seragpt',
            'https://github.com/seragpt'
          ]
        };

      default:
        return null;
    }
  }

  static generateHomepageSEO(): SEOConfig {
    return {
      title: this.defaultConfig.defaultTitle,
      description: this.defaultConfig.defaultDescription,
      keywords: [
        'sera yatırımı',
        'sera analizi',
        'tarım teknolojileri',
        'sera projesi',
        'sera mühendisliği',
        'yatırım analizi',
        'sera otomasyonu',
        'sera yönetimi',
        'sera danışmanlığı',
        'tarım yatırımı'
      ],
      canonicalUrl: this.defaultConfig.siteUrl,
      ogImage: this.defaultConfig.defaultImage,
      ogType: 'website',
      structuredData: [
        this.generateStructuredData('website', {}),
        this.generateStructuredData('organization', {})
      ]
    };
  }

  static generateBlogPageSEO(): SEOConfig {
    return {
      title: 'Blog - Sera Teknolojileri ve Yatırım Analizi',
      description: 'Sera teknolojileri, yatırım analizi ve tarım inovasyonu üzerine uzman görüşleri. En güncel sera yönetimi trendleri ve teknolojileri.',
      keywords: [
        'sera blog',
        'tarım teknolojileri blog',
        'sera yönetimi makaleleri',
        'yatırım analizi yazıları',
        'sera teknolojileri',
        'tarım inovasyonu'
      ],
      canonicalUrl: `${this.defaultConfig.siteUrl}/blog`,
      ogType: 'website',
      structuredData: [
        this.generateStructuredData('breadcrumb', {
          items: [
            { name: 'Ana Sayfa', url: '/' },
            { name: 'Blog', url: '/blog' }
          ]
        })
      ]
    };
  }

  static generateBlogPostSEO(post: any): SEOConfig {
    const wordCount = post.content ? post.content.split(' ').length : 1000;
    
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      keywords: post.tags || [],
      canonicalUrl: `${this.defaultConfig.siteUrl}/blog/${post.slug}`,
      ogImage: post.image,
      ogType: 'article',
      author: post.author,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      structuredData: [
        this.generateStructuredData('article', {
          title: post.title,
          description: post.excerpt,
          image: post.image,
          publishedTime: post.createdAt,
          modifiedTime: post.updatedAt,
          author: post.author,
          url: `${this.defaultConfig.siteUrl}/blog/${post.slug}`,
          keywords: post.tags,
          category: post.category,
          wordCount
        }),
        this.generateStructuredData('breadcrumb', {
          items: [
            { name: 'Ana Sayfa', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${post.slug}` }
          ]
        })
      ]
    };
  }

  static generateDashboardSEO(): SEOConfig {
    return {
      title: 'Dashboard - Sera Projelerinizi Yönetin',
      description: 'SeraGPT dashboard ile sera projelerinizi takip edin, analiz sonuçlarını görüntüleyin ve yatırım kararlarınızı optimize edin.',
      keywords: [
        'sera dashboard',
        'proje yönetimi',
        'sera analizi',
        'yatırım takibi'
      ],
      canonicalUrl: `${this.defaultConfig.siteUrl}/dashboard`,
      ogType: 'website',
      noindex: true // Dashboard pages are typically not indexed
    };
  }

  static generateLegalPageSEO(type: 'privacy' | 'terms'): SEOConfig {
    const titles = {
      privacy: 'Gizlilik Politikası - SeraGPT',
      terms: 'Kullanım Koşulları - SeraGPT'
    };

    const descriptions = {
      privacy: 'SeraGPT gizlilik politikası. Kişisel verilerinizin korunması ve KVKK uyumluluğu hakkında detaylı bilgiler.',
      terms: 'SeraGPT kullanım koşulları ve hizmet şartları. Platform kullanımı ile ilgili kurallar ve sorumluluklarınız.'
    };

    return {
      title: titles[type],
      description: descriptions[type],
      canonicalUrl: `${this.defaultConfig.siteUrl}/${type}`,
      ogType: 'website',
      structuredData: [
        this.generateStructuredData('breadcrumb', {
          items: [
            { name: 'Ana Sayfa', url: '/' },
            { name: type === 'privacy' ? 'Gizlilik Politikası' : 'Kullanım Koşulları', url: `/${type}` }
          ]
        })
      ]
    };
  }

  static optimizeImageUrl(url: string, width = 1200, format = 'webp'): string {
    if (url.includes('cdn.builder.io')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}format=${format}&width=${width}`;
    }
    return url;
  }

  static generateSitemap(pages: Array<{ url: string; lastModified?: string; priority?: number; changeFreq?: string }>) {
    const baseUrl = this.defaultConfig.siteUrl;
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastModified || new Date().toISOString()}</lastmod>
    <changefreq>${page.changeFreq || 'weekly'}</changefreq>
    <priority>${page.priority || 0.5}</priority>
  </url>`).join('\n')}
</urlset>`;

    return xml;
  }

  static generateRobotsTxt(): string {
    const baseUrl = this.defaultConfig.siteUrl;
    
    return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /_next/
Disallow: /auth/

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/blog-sitemap.xml

Host: ${baseUrl}`;
  }
}
