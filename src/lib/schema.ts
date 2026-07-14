export function webAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SocialHD Downloader',
    url: 'https://social-downloader.vercel.app',
    description: 'Download video HD dari TikTok, Instagram, YouTube, Facebook, Twitter tanpa watermark. Gratis & cepat!',
    applicationCategory: 'Multimedia',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      'Download TikTok tanpa watermark',
      'Download Instagram HD',
      'Download YouTube 4K',
      'Download Facebook video',
      'Konversi MP3',
      'Batch download',
    ],
  }
}

export function articleSchema(title: string, desc: string, slug: string, date: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: desc,
    url: `https://social-downloader.vercel.app/blog/${slug}`,
    datePublished: date,
    dateModified: new Date().toISOString(),
    author: { '@type': 'Organization', name: 'SocialHD Downloader' },
  }
}

export function faqSchema(questions: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.a },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function productSchema(name: string, price: number, currency = 'USD') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: `Download unlimited videos in 4K quality without watermark`,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SocialHD Downloader',
    url: 'https://social-downloader.vercel.app',
    logo: 'https://social-downloader.vercel.app/logo.png',
    sameAs: ['https://twitter.com/socialhd', 'https://instagram.com/socialhd'],
  }
}

export function howToSchema(steps: { text: string }[], name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: s.text,
    })),
  }
}
