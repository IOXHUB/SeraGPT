import Head from 'next/head';
import { SEOConfig } from '@/lib/seo';

interface SEOHeadProps {
  config: SEOConfig;
}

export default function SEOHead({ config }: SEOHeadProps) {
  const {
    title,
    description,
    keywords = [],
    canonicalUrl,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    author,
    publishedTime,
    modifiedTime,
    noindex = false,
    structuredData
  } = config;

  const siteName = 'SeraGPT';
  const twitterHandle = '@seragpt';
  const locale = 'tr_TR';

  const fullTitle = title.includes('SeraGPT') ? title : `${title} | ${siteName}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="tr" />
      <meta name="language" content="Turkish" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}
      {ogImage && <meta property="og:image:alt" content={title} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={author ? `@${author}` : twitterHandle} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {ogImage && <meta name="twitter:image:alt" content={title} />}
      
      {/* Article specific meta tags */}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && (
        <meta property="article:section" content="Sera Teknolojileri" />
      )}
      {ogType === 'article' && keywords.length > 0 && 
        keywords.map((keyword, index) => (
          <meta key={index} property="article:tag" content={keyword} />
        ))
      }
      
      {/* Additional Meta Tags for SEO */}
      <meta name="author" content={author || 'SeraGPT'} />
      <meta name="publisher" content={siteName} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Mobile Optimization */}
      <meta name="theme-color" content="#22c55e" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      {structuredData && Array.isArray(structuredData) && 
        structuredData.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(data)
            }}
          />
        ))
      }
      {structuredData && !Array.isArray(structuredData) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Performance and Loading Optimization */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.builder.io" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Geo Tags for Turkey */}
      <meta name="geo.region" content="TR" />
      <meta name="geo.placename" content="Türkiye" />
      <meta name="ICBM" content="39.925533, 32.866287" />
      
      {/* Contact and Business Info */}
      <meta name="contact" content="info@seragpt.com" />
      <meta name="copyright" content={`© ${new Date().getFullYear()} SeraGPT. Tüm hakları saklıdır.`} />
      
      {/* Feed Discovery */}
      <link rel="alternate" type="application/rss+xml" title="SeraGPT Blog RSS" href="/blog/rss.xml" />
      <link rel="alternate" type="application/atom+xml" title="SeraGPT Blog Atom" href="/blog/atom.xml" />
    </Head>
  );
}
