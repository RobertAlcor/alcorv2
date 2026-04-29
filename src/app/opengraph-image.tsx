import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const runtime = 'edge'

export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Dynamisches Open-Graph-Bild für Social-Media-Previews.
 * Wird unter /opengraph-image bereitgestellt (Next.js Convention).
 *
 * Carbon Copper Theme:
 * - bg: #161618 (deep)
 * - accent: #cf8755 (signal)
 * - text: #fafaf9 (paper)
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#161618',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        {/* Subtiler Akzent-Streifen oben */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '160px',
            height: '6px',
            background: '#cf8755',
            display: 'flex',
          }}
        />

        {/* Brand-Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: '#cf8755',
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '2px',
              background: '#cf8755',
              display: 'flex',
            }}
          />
          {SITE.brand}
        </div>

        {/* Hauptzeile */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              color: '#fafaf9',
              fontSize: '88px',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-2px',
              maxWidth: '900px',
              display: 'flex',
            }}
          >
            Webdesign Wien.
          </div>
          <div
            style={{
              color: '#cf8755',
              fontSize: '88px',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-2px',
              fontStyle: 'italic',
              maxWidth: '900px',
              display: 'flex',
            }}
          >
            Handgeschrieben.
          </div>
        </div>

        {/* Footer-Zeile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#999999',
            fontSize: '24px',
            fontWeight: 400,
            paddingTop: '32px',
            borderTop: '1px solid #333',
          }}
        >
          <div style={{ display: 'flex' }}>
            Lieferung in {SITE.pricing.deliveryDays} Tagen ab €{SITE.pricing.starter}
          </div>
          <div style={{ color: '#cf8755', display: 'flex' }}>
            {SITE.domain}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
