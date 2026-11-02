// Nur öffentliche GET-Anfragen; User-Agent-Tests ersetzen keine echten Crawler-Logs.
const assert = require('node:assert/strict')
const base = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const origin = 'https://webdesign-alcor.at'
let assertions = 0
const failures = []
function check(condition, message) { assertions++; if (!condition) failures.push(message) }
async function get(path, userAgent = 'ALCOR-GEO-Validation/1.0') {
  const response = await fetch(base + path, { headers: { 'User-Agent': userAgent }, redirect: 'manual', signal: AbortSignal.timeout(20000) })
  const html = await response.text()
  check(response.status === 200, `${userAgent} ${path}: HTTP ${response.status}`)
  return { response, html }
}
function schemas(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => {
    try { const value = JSON.parse(match[1]); return Array.isArray(value) ? value : [value] }
    catch (error) { check(false, `Ungültiges JSON-LD: ${error.message}`); return [] }
  })
}
function bodyText(html) { return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '') }
;(async () => {
  const { html: about } = await get('/ueber-mich')
  const visible = bodyText(about)
  for (const text of ['ALCOR auf einen Blick.', 'Robert Alchimowicz', '1220', 'Donaustadt', 'Basis-Homepage', '599', 'Business', 'Premium', 'Kontaktformular', 'keine Garantie']) check(visible.includes(text), `Anbieterprofil: ${text} fehlt im HTML`)
  const all = schemas(about)
  const profile = all.find((node) => node['@type'] === 'ProfilePage')
  const organization = all.find((node) => node['@id'] === origin + '/#organization')
  check(profile?.mainEntity?.['@type'] === 'Person', 'ProfilePage beschreibt keine Person')
  check(profile?.mainEntity?.['@id'] === origin + '/#robert', 'Uneinheitliche Personen-ID')
  check(profile?.mainEntity?.name === 'Robert Alchimowicz', 'Falscher Autorenname')
  check(profile?.mainEntity?.url === origin + '/ueber-mich', 'Personenprofil ohne Originalseite')
  check(profile?.mainEntity?.worksFor?.['@id'] === origin + '/#organization', 'Person ohne Organisationsbezug')
  check(organization?.founder?.['@id'] === origin + '/#robert', 'Abweichende Gründer-ID')
  check(visible.includes(organization?.description || '__missing__'), 'Organisationsbeschreibung nicht sichtbar')
  check(organization?.sameAs?.includes('https://maps.google.com/maps?cid=15767210286595001042'), 'Verifiziertes Google-Profil fehlt')
  const basic = organization?.hasOfferCatalog?.itemListElement?.find((offer) => offer.price === 599)
  check(basic?.itemOffered?.name === 'Basis-Homepage auf einer Seite', '599-Euro-Angebot ist nicht eindeutig eingegrenzt')
  check(basic?.itemOffered?.description?.includes('Kein Kontaktformular'), 'Basis-Leistungsgrenzen fehlen')
  const { html: service } = await get('/leistungen/website-erstellung')
  for (const slug of ['massagewelt-wien', 'cleankos', 'etikettendruck24']) check(bodyText(service).includes(`href="/referenzen/${slug}"`), `Projektbeleg ${slug} fehlt`)
  check(schemas(service).some((node) => node['@id'] === origin + '/leistungen/website-erstellung#service' && node.provider?.['@id'] === origin + '/#organization'), 'Service/Anbieter-Bezug fehlt')
  const { html: guide } = await get('/blog/geo-ai-search-google-2026')
  const article = schemas(guide).find((node) => node['@type'] === 'BlogPosting')
  check(article?.author?.['@id'] === origin + '/#robert', 'Artikel und Autor nicht verknüpft')
  check(article?.dateModified === '2026-11-02', 'Sachliche Aktualisierung nicht datiert')
  for (const source of ['developers.openai.com/api/docs/bots', 'docs.perplexity.ai/docs/resources/perplexity-crawlers', 'support.google.com/webmasters/answer/16908024', 'developers.google.com/search/docs/fundamentals/ai-optimization-guide']) check(bodyText(guide).includes(source), `Primärquelle fehlt: ${source}`)
  const { html: robots } = await get('/robots.txt')
  check(/User-Agent:\s*\*/i.test(robots) && /Allow:\s*\/\s*$/im.test(robots), 'Öffentlicher Crawl nicht freigegeben')
  check(!/^Disallow:\s*\/\s*$/im.test(robots), 'Gesamte Website gesperrt')
  for (const path of ['/admin', '/api/admin/', '/api/booking', '/api/lead']) check(robots.includes(`Disallow: ${path}`), `Bestehender Robots-Ausschluss fehlt: ${path}`)
  const agents = ['OAI-SearchBot', 'PerplexityBot', 'Googlebot', 'bingbot']
  for (const agent of agents) {
    for (const path of ['/', '/ueber-mich', '/leistungen/website-erstellung']) {
      const { response, html } = await get(path, agent)
      check(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), `${agent} ${path}: Header noindex`)
      check(bodyText(html).includes('<h1'), `${agent} ${path}: kein initiales HTML`)
    }
  }
  const { html: directory } = await get('/llms.txt')
  check(directory.startsWith('# Webdesign Alcor'), 'Textverzeichnis fehlt')
  for (const slug of ['massagewelt-wien', 'cleankos', 'etikettendruck24']) check(directory.includes(`/referenzen/${slug}`), `Verzeichnis: ${slug} fehlt`)
  check(directory.includes('keine Ranking- oder Empfehlungsgarantie'), 'Textverzeichnis verspricht Empfehlungen')
  console.log(JSON.stringify({ assertions, failures, simulatedUserAgents: agents, actualCrawlerIndexing: 'NOT VERIFIED', formSubmissions: 0 }, null, 2))
  assert.equal(failures.length, 0, 'GEO-Regression fehlgeschlagen')
})().catch((error) => { console.error(error.message); process.exit(1) })
