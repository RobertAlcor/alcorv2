import { SITE } from './site'

/**
 * Haupt-Schema: ProfessionalService + LocalBusiness Hybrid.
 * Wird im RootLayout eingebaut, gilt für die ganze Site.
 *
 * Hinweis: ProfessionalService erbt von LocalBusiness und ist daher
 * für lokale Suche genauso wirksam wie LocalBusiness selbst.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
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
      addressRegion: 'Wien',
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
    /**
     * AreaServed mit allen 23 Wiener Bezirken: stärkt das LocalBusiness-Signal
     * für Suchen wie "webdesign 1010 wien", "webdesign liesing", etc.
     */
    areaServed: [
      { '@type': 'City', name: 'Wien', '@id': 'https://www.wikidata.org/wiki/Q1741' },
      ...SITE.viennaDistricts.map((d) => ({
        '@type': 'AdministrativeArea',
        name: `${d.plz} Wien — ${d.name}`,
      })),
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: SITE.address.geo.lat,
        longitude: SITE.address.geo.lng,
      },
      geoRadius: '25000', // 25km um Berresgasse → ganz Wien + Umland
    },
    priceRange: `€${SITE.pricing.starter}+`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: SITE.openingHours.weekdays.open,
        closes: SITE.openingHours.weekdays.close,
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.contact.phone,
        contactType: 'customer service',
        areaServed: 'AT',
        availableLanguage: ['German', 'English'],
      },
    ],
    sameAs: [
      ...(SITE.social.linkedin ? [SITE.social.linkedin] : []),
      ...(SITE.social.xing ? [SITE.social.xing] : []),
    ].filter(Boolean),
    /**
     * OfferCatalog: zeigt Google die wichtigsten Leistungen strukturiert.
     */
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Webdesign-Leistungen',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website erstellen',
            url: `${SITE.url}/leistungen/website-erstellung`,
          },
          price: SITE.pricing.starter,
          priceCurrency: SITE.pricing.currency,
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Relaunch',
            url: `${SITE.url}/leistungen/relaunch`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Wien',
            url: `${SITE.url}/leistungen/seo-wien`,
          },
        },
      ],
    },
  }
}

/**
 * WebSite Schema mit potentialAction (SearchAction).
 * Damit zeigt Google ggf. die Sitelinks Search Box im Snippet.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'de-AT',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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
    areaServed: [
      { '@type': 'City', name: 'Wien' },
      ...SITE.viennaDistricts.map((d) => ({
        '@type': 'AdministrativeArea',
        name: `${d.plz} ${d.name}`,
      })),
    ],
    ...(params.price && {
      offers: {
        '@type': 'Offer',
        price: params.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      },
    }),
  }
}
