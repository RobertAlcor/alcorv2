// Öffentliche GET-Prüfungen. Keine Anfragen, E-Mails oder Buchungen absenden.
const assert = require('node:assert/strict')
const base = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const failures = []
let assertions = 0
function check(ok, message) { assertions++; if (!ok) failures.push(message) }
const paths = ['/', '/preise', '/kontakt', '/bewerbung', '/termin', '/webdesign/innere-stadt', '/webdesign/favoriten', '/webdesign/doebling', '/webdesign/donaustadt', '/webdesign/liesing', '/referenzen/psychotherapie-hrdlicka', '/referenzen/schmerzfrei-wien', '/blog/website-kosten-wien-2026', '/blog/wordpress-oder-handcodiert-2026', '/blog/handgeschriebener-code-erklaert']
const banned = ['Es gibt nichts zu aktualisieren', 'Updates sind keine laufende Pflicht', 'Sicherheits-Audits | empfohlen | nicht nötig', 'Millionen von Aufrufen ohne Mehrkosten', 'technisch ohne Schwachstellen', 'vollständig DSGVO-konform', 'Marketing-Bullshit', 'keine Update-Pflicht', 'konkurrenzfreie Top-Rankings', 'amortisiert sich oft in unter zwei Jahren']
function textOf(html) { return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ') }
;(async () => {
  const contents = new Map()
  for (const path of paths) {
    const response = await fetch(base + path, { signal: AbortSignal.timeout(20000) })
    const html = await response.text()
    const text = textOf(html)
    check(response.status === 200, `${path}: HTTP ${response.status}`)
    check((html.match(/<h1(?:\s|>)/g) || []).length === 1, `${path}: H1`)
    for (const phrase of banned) check(!text.includes(phrase), `${path}: veraltete Zusage: ${phrase}`)
    contents.set(path, { html, text })
  }
  const pricing = contents.get('/preise').text
  for (const expected of ['698', '599', '99', '85', 'Domain und Hosting', 'Pflege und spätere Änderungen', 'Inhalte und Übergabe', 'keine Umsatzsteuer', '60 %', '40 %']) check(pricing.includes(expected), `Preisklarheit: ${expected}`)
  check(contents.get('/').text.includes('Ausgewählte Projekte.'), 'Exklusive Positionierung fehlt')
  check(contents.get('/').text.includes('Kann ich Texte und Bilder später selbst ändern?'), 'Pflege-FAQ fehlt')
  check(contents.get('/kontakt').text.includes('Mit dem Absenden bestellen Sie noch keine Leistung.'), 'Kontakt: Unverbindlichkeit fehlt')
  check(contents.get('/termin').text.includes('Verbindlich wird er mit der persönlichen Bestätigung.'), 'Termin: Bestätigungsschritt fehlt')
  for (const path of ['/kontakt', '/bewerbung']) {
    const html = contents.get(path).html
    check(html.includes('<noscript>'), `${path}: JS-Alternative fehlt`)
    check(html.includes('office@webdesign-alcor.at'), `${path}: direkter Kontakt fehlt`)
  }
  const guide = contents.get('/blog/website-kosten-wien-2026').text
  check(guide.includes('1.094'), 'Fünfjahres-Rechenbeispiel fehlt')
  check(guide.includes('kein Fünfjahresvertrag'), 'Rechenannahme nicht abgegrenzt')
  for (const path of paths.filter((path) => path.startsWith('/blog/'))) {
    check(contents.get(path).html.includes('2026-11-02'), `${path}: Aktualisierungsdatum fehlt`)
  }
  const targets = new Set()
  for (const [path, { html }] of contents) {
    if (!path.startsWith('/blog/') && path !== '/preise') continue
    for (const match of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)"/g)) {
      if (!match[1].startsWith('/api/') && !match[1].startsWith('/admin')) targets.add(match[1])
    }
  }
  for (const path of targets) {
    const response = await fetch(base + path, { signal: AbortSignal.timeout(20000) })
    check(response.ok, `Interner Inhaltslink ${path}: HTTP ${response.status}`)
  }
  console.log(JSON.stringify({ assertions, pages: paths.length, linkTargets: targets.size, failures, liveMail: 'NOT SENT' }, null, 2))
  assert.equal(failures.length, 0, failures.join('\n'))
})().catch((error) => { console.error(error.message); process.exit(1) })
