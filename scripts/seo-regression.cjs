// HTTP-Regression: keine Formulare senden, keine produktiven Datensätze ändern.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const base = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const canonicalOrigin = 'https://webdesign-alcor.at'
let assertions = 0
const failures = []
const pages = []
function check(condition, message) {
  assertions++
  if (!condition) failures.push(message)
}
function attrs(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w-]+)=["']([^"']*)["']/g)].map((match) => [match[1], match[2]]))
}
function nodes(value) {
  if (Array.isArray(value)) return value.flatMap(nodes)
  if (!value || typeof value !== 'object') return []
  return [value, ...Object.values(value).flatMap(nodes)]
}
async function request(path) {
  const response = await fetch(`${base}${path}`, { redirect: 'manual', signal: AbortSignal.timeout(20000) })
  return { status: response.status, html: await response.text(), headers: response.headers }
}
async function inspect(path) {
  const { status, html, headers } = await request(path)
  check(status === 200, `${path}: HTTP ${status}`)
  if (status !== 200) return
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => attrs(match[0]))
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attrs(match[0]))
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ''
  const description = meta.find((item) => item.name === 'description')?.content || ''
  const canonical = links.find((item) => item.rel === 'canonical')?.href
  check(title.length > 0, `${path}: fehlender Titel`)
  check(description.length > 0, `${path}: fehlende Beschreibung`)
  check((html.match(/<h1(?:\s|>)/g) || []).length === 1, `${path}: nicht genau eine H1`)
  check(Boolean(canonical) && new URL(canonical).href === new URL(path, canonicalOrigin).href, `${path}: Canonical ${canonical}`)
  check(!meta.some((item) => ['robots', 'googlebot'].includes(item.name) && /noindex/i.test(item.content || '')), `${path}: noindex in Sitemap`)
  check(!/noindex/i.test(headers.get('x-robots-tag') || ''), `${path}: X-Robots-Tag noindex`)
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => attrs(match[0]))
  check(images.every((item) => Object.hasOwn(item, 'alt')), `${path}: Bild ohne alt-Attribut`)
  const structured = []
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { structured.push(...nodes(JSON.parse(match[1]))) } catch { check(false, `${path}: ungültiges JSON-LD`) }
  }
  if (['/leistungen/website-erstellung', '/leistungen/seo-wien', '/leistungen/relaunch'].includes(path)) {
    check(structured.some((node) => node['@type'] === 'Service' && node.url === `${canonicalOrigin}${path}`), `${path}: Service-Schema fehlt`)
    check(structured.some((node) => node['@type'] === 'FAQPage'), `${path}: FAQ-Schema fehlt`)
    check(html.includes('<details'), `${path}: sichtbare FAQs fehlen`)
  }
  if (/^\/blog\/[^/]+$/.test(path)) {
    check(structured.some((node) => node['@type'] === 'BlogPosting' && node.publisher?.logo?.url === `${canonicalOrigin}/logo.svg`), `${path}: Publisher-Logo fehlt`)
    check(html.includes('Passende Leistungen zum Ratgeber'), `${path}: thematische Leistungslinks fehlen`)
  }
  pages.push({ path, status, titleLength: title.length, descriptionLength: description.length, images: images.length })
}
async function main() {
  const sitemap = await request('/sitemap.xml')
  check(sitemap.status === 200, 'Sitemap nicht abrufbar')
  const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  check(urls.length > 20, 'Sitemap unerwartet klein')
  check(new Set(urls).size === urls.length, 'Doppelte Sitemap-URLs')
  const paths = []
  for (const url of urls) {
    const parsed = new URL(url)
    check(parsed.origin === canonicalOrigin && !parsed.search && !parsed.hash, `Unerwartete Sitemap-URL: ${url}`)
    paths.push(parsed.pathname)
  }
  for (let offset = 0; offset < paths.length; offset += 2) await Promise.all(paths.slice(offset, offset + 2).map(inspect))
  for (const path of ['/nicht-vorhanden-seo-test', '/webdesign/leopoldstadt']) check((await request(path)).status === 404, `${path}: keine echte 404`)
  const robots = await request('/robots.txt')
  check(robots.status === 200 && robots.html.includes(`${canonicalOrigin}/sitemap.xml`), 'Robots-Sitemap-Verweis fehlt')
  const image = await request('/opengraph-image')
  check(image.status === 200 && /image\//.test(image.headers.get('content-type') || ''), 'Organisationsbild nicht abrufbar')
  const report = { base, checkedAt: new Date().toISOString(), assertions, sitemapUrls: urls.length, pages, failures, liveMail: 'NOT SENT', adminLogin: 'NOT TESTED' }
  fs.writeFileSync(process.env.REPORT_PATH || '/tmp/alcor-seo-report.json', JSON.stringify(report, null, 2))
  console.log(JSON.stringify({ assertions, sitemapUrls: urls.length, pagesChecked: pages.length, failures, liveMail: report.liveMail }, null, 2))
  assert.equal(failures.length, 0, 'SEO-Regression fehlgeschlagen')
}
main().catch((error) => { console.error(error.message); process.exitCode = 1 })
