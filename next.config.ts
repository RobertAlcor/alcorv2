import type { NextConfig } from 'next'

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  experimental: {
    optimizePackageImports: ['motion'],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // Alte PHP-URLs zur neuen App-Router-Struktur
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/about.php', destination: '/ueber-mich', permanent: true },
      { source: '/ueber-uns.php', destination: '/ueber-mich', permanent: true },
      { source: '/services.php', destination: '/leistungen', permanent: true },
      { source: '/seo-wien.php', destination: '/leistungen/seo-wien', permanent: true },
      { source: '/webdesign-preise.php', destination: '/preise', permanent: true },
      { source: '/webdesign-aktion.php', destination: '/preise', permanent: true },
      { source: '/faq.php', destination: '/#faq', permanent: true },
      { source: '/kontakt.php', destination: '/kontakt', permanent: true },
      { source: '/referenzen.php', destination: '/referenzen', permanent: true },
      { source: '/datenschutz.php', destination: '/datenschutz', permanent: true },
      { source: '/impressum.php', destination: '/impressum', permanent: true },

      // Alte HTML Coming-Soon-URLs
      { source: '/impressum.html', destination: '/impressum', permanent: true },
      { source: '/datenschutz.html', destination: '/datenschutz', permanent: true },

      // Alte Blog-Struktur
      {
        source: '/blog/website-relaunch-2025.php',
        destination: '/blog/website-relaunch-2026',
        permanent: true,
      },
      {
        source: '/blog/handprogrammierte-webseiten-vs-wordpress.php',
        destination: '/blog/handprogrammierte-webseiten-vs-wordpress',
        permanent: true,
      },
      {
        source: '/blog/homepage-erstellen-lassen-wien.php',
        destination: '/blog/homepage-erstellen-lassen-wien',
        permanent: true,
      },
      {
        source: '/blog/webdesign-firma.php',
        destination: '/blog/webdesign-firma',
        permanent: true,
      },
      {
        source: '/blog/kostenlose-werbung-webdesign-agentur.php',
        destination: '/blog/kostenlose-werbung-webdesign-agentur',
        permanent: true,
      },
    ]
  },
}

export default config
