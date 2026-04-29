#!/usr/bin/env node
/**
 * apply-seo-metadata.js
 *
 * Updated automatisch 11 Page-Files mit der zentralen PAGE_META metadata.
 *
 * Was es macht:
 * 1. Liest jede Page-Datei
 * 2. Falls bereits PAGE_META importiert → skip
 * 3. Sonst:
 *    - Backup als .bak-Datei
 *    - Import-Zeile nach den anderen Imports einfügen
 *    - Bestehenden "export const metadata" Block ersetzen
 *    - (oder neue Zeile einfügen falls keine metadata existiert)
 * 4. Logging am Ende
 *
 * Aufruf:
 *   node scripts/apply-seo-metadata.js
 *
 * Rollback (falls was schiefgeht):
 *   node scripts/apply-seo-metadata.js --rollback
 */

const fs = require('fs')
const path = require('path')

const PAGES = [
  { file: 'src/app/page.tsx', meta: 'home' },
  { file: 'src/app/leistungen/page.tsx', meta: 'leistungen' },
  { file: 'src/app/leistungen/website-erstellung/page.tsx', meta: 'websiteErstellung' },
  { file: 'src/app/leistungen/relaunch/page.tsx', meta: 'relaunch' },
  { file: 'src/app/leistungen/seo-wien/page.tsx', meta: 'seoWien' },
  { file: 'src/app/preise/page.tsx', meta: 'preise' },
  { file: 'src/app/referenzen/page.tsx', meta: 'referenzen' },
  { file: 'src/app/ueber-mich/page.tsx', meta: 'uebermich' },
  { file: 'src/app/blog/page.tsx', meta: 'blog' },
  { file: 'src/app/termin/page.tsx', meta: 'termin' },
  { file: 'src/app/kontakt/page.tsx', meta: 'kontakt' },
]

const IMPORT_LINE = "import { PAGE_META } from '@/lib/seo-metadata'"

function rollback() {
  let restored = 0
  for (const p of PAGES) {
    const file = path.resolve(p.file)
    const backup = file + '.bak'
    if (fs.existsSync(backup)) {
      fs.copyFileSync(backup, file)
      fs.unlinkSync(backup)
      console.log(`  ✓ Restored: ${p.file}`)
      restored++
    }
  }
  console.log(`\n${restored} files restored from backup.`)
}

function findMetadataBlock(source) {
  // Findet "export const metadata" und matched bis zum closing }
  // mit Brace-Counting (weil regex kein nested matching kann)
  const startMatch = source.match(/export\s+const\s+metadata\s*(?::\s*Metadata)?\s*=\s*/)
  if (!startMatch) return null

  const startIdx = startMatch.index
  const afterEqualsIdx = startIdx + startMatch[0].length
  const firstChar = source[afterEqualsIdx]

  if (firstChar !== '{') {
    // Schon eine simple Zuweisung wie "export const metadata = PAGE_META.x"
    // → finde Ende der Zeile
    const eolIdx = source.indexOf('\n', afterEqualsIdx)
    return { start: startIdx, end: eolIdx === -1 ? source.length : eolIdx }
  }

  // Brace-Counting für Object-Literal
  let depth = 0
  let inString = null // null, '"', "'", "`"
  let escape = false

  for (let i = afterEqualsIdx; i < source.length; i++) {
    const c = source[i]

    if (escape) { escape = false; continue }
    if (c === '\\' && inString) { escape = true; continue }

    if (inString) {
      if (c === inString) inString = null
      continue
    }

    if (c === '"' || c === "'" || c === '`') {
      inString = c
      continue
    }

    if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) {
        // Auch ggf. das nachfolgende Semikolon mitnehmen
        let endIdx = i + 1
        if (source[endIdx] === ';') endIdx++
        return { start: startIdx, end: endIdx }
      }
    }
  }
  return null // unausgeglichene Klammern
}

function findLastImportEnd(source) {
  // Findet die letzte import-Zeile und gibt deren Ende zurück (Zeilen-Index)
  const lines = source.split('\n')
  let lastImportLine = -1
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (trimmed.startsWith('import ')) {
      // Multi-line imports? Suche bis zur Zeile die mit ' from' oder ; endet
      lastImportLine = i
    }
  }
  if (lastImportLine === -1) return 0
  // Index nach der letzten Import-Zeile
  let charIdx = 0
  for (let i = 0; i <= lastImportLine; i++) charIdx += lines[i].length + 1
  return charIdx
}

function processFile(p) {
  const file = path.resolve(p.file)

  if (!fs.existsSync(file)) {
    console.log(`  ✗ Skipped (file not found): ${p.file}`)
    return { status: 'not-found' }
  }

  const original = fs.readFileSync(file, 'utf-8')

  // Skip wenn schon PAGE_META importiert
  if (original.includes('PAGE_META')) {
    console.log(`  ⊘ Already updated: ${p.file}`)
    return { status: 'already-done' }
  }

  // Skip wenn generateMetadata() statt metadata
  if (/export\s+(async\s+)?function\s+generateMetadata\s*\(/.test(original)) {
    console.log(`  ⊘ Skipped (uses generateMetadata): ${p.file}`)
    return { status: 'has-generate-metadata' }
  }

  let updated = original

  // Schritt 1: bestehenden metadata-Block entfernen (falls vorhanden)
  const block = findMetadataBlock(updated)
  if (block) {
    const before = updated.substring(0, block.start)
    const after = updated.substring(block.end)
    // Whitespace-Cleanup: Doppelt-Leerzeile zu einer
    updated = before + after
  }

  // Schritt 2: Import-Zeile nach den bestehenden Imports einfügen
  const importInsertIdx = findLastImportEnd(updated)
  updated =
    updated.substring(0, importInsertIdx) +
    IMPORT_LINE + '\n' +
    updated.substring(importInsertIdx)

  // Schritt 3: export const metadata-Zeile davor einfügen
  // Suche die erste 'export default function ' und füge davor ein
  const defaultExportIdx = updated.search(/export\s+default\s+(async\s+)?function/)
  const exportLine = `export const metadata = PAGE_META.${p.meta}\n\n`

  if (defaultExportIdx !== -1) {
    updated =
      updated.substring(0, defaultExportIdx) +
      exportLine +
      updated.substring(defaultExportIdx)
  } else {
    // Fallback: ans Ende
    updated = updated.trimEnd() + '\n\n' + exportLine
  }

  // Backup + Schreiben
  fs.writeFileSync(file + '.bak', original, 'utf-8')
  fs.writeFileSync(file, updated, 'utf-8')

  console.log(`  ✓ Updated: ${p.file} → PAGE_META.${p.meta}`)
  return { status: 'updated' }
}

function run() {
  if (process.argv.includes('--rollback')) {
    console.log('=== ROLLBACK MODE ===\n')
    rollback()
    return
  }

  console.log('=== Apply SEO Metadata ===\n')

  // Sicherheits-Check: Existiert seo-metadata.ts?
  const helperFile = path.resolve('src/lib/seo-metadata.ts')
  if (!fs.existsSync(helperFile)) {
    console.error('ERROR: src/lib/seo-metadata.ts not found.')
    console.error('       Bitte zuerst v20-ZIP entpacken.')
    process.exit(1)
  }

  let updated = 0, skipped = 0, missing = 0
  for (const p of PAGES) {
    const r = processFile(p)
    if (r.status === 'updated') updated++
    else if (r.status === 'not-found') missing++
    else skipped++
  }

  console.log(`\n${updated} updated, ${skipped} skipped, ${missing} not found.`)
  if (updated > 0) {
    console.log(`\nBackups als .bak-Files gespeichert.`)
    console.log(`Rollback bei Bedarf: node scripts/apply-seo-metadata.js --rollback`)
    console.log(`\nNaechste Schritte:`)
    console.log(`  1. npm run type-check`)
    console.log(`  2. npm run dev`)
    console.log(`  3. .bak-Files loeschen wenn alles ok: Get-ChildItem -Recurse src/app -Filter *.bak | Remove-Item`)
  }
}

run()
