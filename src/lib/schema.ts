import { SITE } from './site'
import { COMPANY_PROFILE } from './company-profile'

function minimumPriceSpecification(price: number) {
  return {
    '@type': 'PriceSpecification',
    minPrice: price,
    priceCurrency: SITE.pricing.currency,
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.brand,
    description: COMPANY_PROFILE.summary,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    image: `${SITE.url}/opengraph-image`,
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
      '@id': `${SITE.url}/#robert`,
      url: `${SITE.url}/ueber-mich`,
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
    areaServed: [
      {
        '@type': 'City',
        name: 'Wien',
        '@id': 'https://www.wikidata.org/wiki/Q1741',
      },
      ...SITE.viennaDistricts.map((district) => ({
        '@type': 'AdministrativeArea',
        name: `${district.plz} Wien — ${district.name}`,
      })),
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: SITE.address.geo.lat,
        longitude: SITE.address.geo.lng,
      },
      geoRadius: '25000',
    },
    priceRange: `€${SITE.pricing.starter}–€${SITE.pricing.customFrom}+`,
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
    hasMap: COMPANY_PROFILE.mapsUrl,
    sameAs: [
      COMPANY_PROFILE.mapsUrl,
      COMPANY_PROFILE.facebookUrl,
      ...(SITE.social.linkedin ? [SITE.social.linkedin] : []),
      ...(SITE.social.xing ? [SITE.social.xing] : []),
    ].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Webdesign-Leistungen',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Basis-Homepage: einmaliger Projektpreis',
          url: `${SITE.url}/preise`,
          price: SITE.pricing.starter,
          priceCurrency: SITE.pricing.currency,
          itemOffered: {
            '@type': 'Service',
            '@id': `${SITE.url}/leistungen/website-erstellung#basis-homepage`,
            name: 'Basis-Homepage auf einer Seite',
            description:
              'Eine einfache Homepage mit bereitgestellten Inhalten, responsiver Darstellung und Basis-SEO. Kein Kontaktformular, keine Animationen, kein individuelles Komplettdesign und keine Erstellung von Rechtstexten. Domain, Hosting und Betreuung separat.',
            url: `${SITE.url}/leistungen/website-erstellung`,
          },
        },
        {
          '@type': 'Offer',
          name: 'Business-Website ab 1.490 €',
          url: `${SITE.url}/preise`,
          priceSpecification: minimumPriceSpecification(
            SITE.pricing.businessFrom,
          ),
          itemOffered: {
            '@type': 'Service',
            '@id': `${SITE.url}/leistungen/website-erstellung#business-website`,
            name: 'Business-Website',
            description:
              'Individuelles Design, bis zu fünf vereinbarte Seiten, Kontaktformular, technische SEO, Local-SEO-Grundlagen und strukturierte Daten.',
            url: `${SITE.url}/leistungen/website-erstellung`,
          },
        },
        {
          '@type': 'Offer',
          name: 'Premium-Website ab 2.490 €',
          url: `${SITE.url}/preise`,
          priceSpecification: minimumPriceSpecification(
            SITE.pricing.premiumFrom,
          ),
          itemOffered: {
            '@type': 'Service',
            '@id': `${SITE.url}/leistungen/website-erstellung#premium-website`,
            name: 'Premium-Website',
            description:
              'Strategie, bis zu zehn vereinbarte Seiten, vertiefte technische SEO und GEO sowie ein erweiterter Funktionsbereich nach Vereinbarung.',
            url: `${SITE.url}/leistungen/website-erstellung`,
          },
        },
        {
          '@type': 'Offer',
          name: 'Individuelle Web-App ab 3.900 €',
          url: `${SITE.url}/preise`,
          priceSpecification: minimumPriceSpecification(SITE.pricing.customFrom),
          itemOffered: {
            '@type': 'Service',
            name: 'Individuelle Web-App und Sonderentwicklung',
            description:
              'Eigene Abläufe, Portale oder Schnittstellen nach technischer Prüfung und schriftlich vereinbartem Umfang.',
            url: `${SITE.url}/leistungen/website-erstellung`,
          },
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
 * WebSite Schema für Site-Name und Publisher.
 * Die frühere SearchAction wurde entfernt, weil Google das Sitelinks-Suchfeld
 * seit November 2024 nicht mehr in den Suchergebnissen unterstützt.
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
  }
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#robert`,
    url: `${SITE.url}/ueber-mich`,
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
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
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
    '@id': `${params.url}#service`,
    mainEntityOfPage: params.url,
    name: params.name,
    description: params.description,
    url: params.url,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Wien' },
      ...SITE.viennaDistricts.map((district) => ({
        '@type': 'AdministrativeArea',
        name: `${district.plz} ${district.name}`,
      })),
    ],
    ...(params.price && {
      offers: {
        '@type': 'Offer',
        price: params.price,
        priceCurrency: SITE.pricing.currency,
        availability: 'https://schema.org/InStock',
        priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      },
    }),
  }
}

export function profilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE.url}/ueber-mich#webpage`,
    url: `${SITE.url}/ueber-mich`,
    name: `${SITE.founder.name} – die Person hinter ${SITE.name}`,
    description: COMPANY_PROFILE.summary,
    inLanguage: 'de-AT',
    isPartOf: { '@id': `${SITE.url}/#website` },
    mainEntity: personSchema(),
  }
}
