import { SITE } from './site'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.brand,
    description: SITE.tagline,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    image: `${SITE.url}/og-default.jpg`,
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.address.geo.lat,
      longitude: SITE.address.geo.lng,
    },
    founder: {
      '@type': 'Person',
      name: SITE.founder.name,
      jobTitle: SITE.founder.role,
      knowsAbout: [
        'Webentwicklung',
        'SEO',
        'GEO',
        'Next.js',
        'TypeScript',
        'PHP',
        'Performance Optimization',
        'Local SEO',
        'Schema.org',
      ],
    },
    foundingDate: String(SITE.founder.foundedIn),
    areaServed: {
      '@type': 'City',
      name: 'Wien',
    },
    priceRange: '€€',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.contact.phone,
        contactType: 'customer service',
        areaServed: 'AT',
        availableLanguage: ['German', 'English'],
      },
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'de-AT',
  }
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#robert`,
    name: SITE.founder.name,
    jobTitle: SITE.founder.role,
    worksFor: { '@id': `${SITE.url}/#organization` },
    knowsAbout: [
      'Webentwicklung',
      'SEO',
      'Next.js',
      'TypeScript',
      'GEO Optimization',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.country,
    },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function serviceSchema(params: {
  name: string
  description: string
  url: string
  price?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: params.url,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: 'Wien',
    ...(params.price && {
      offers: {
        '@type': 'Offer',
        price: params.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
    }),
  }
}
