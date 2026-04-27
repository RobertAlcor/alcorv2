# Update-Anleitung – Sprint 2.5 (Bug Fixes + Erweiterungen)

## Was du machst

**1. ZIP entpacken** im Projektordner `C:\Projekte\webdesign-alcor\v2-nextjs\`. Folgende Files werden ersetzt oder neu angelegt:

### Neu angelegt
- `src/app/impressum/page.tsx` (Next.js Page)
- `src/app/datenschutz/page.tsx`
- `src/app/blog/page.tsx`
- `src/components/layout/skip-link.tsx`
- `src/components/layout/scroll-to-top.tsx`
- `src/components/sections/comparison-section.tsx`
- `src/components/sections/process-section.tsx`
- `public/logo.svg`

### Ersetzt (überschreibt existierende)
- `package.json` (React 19 stable, Next 15.1, Tailwind 4 stable)
- `src/app/layout.tsx` (mit SkipLink + ScrollToTop)
- `src/app/page.tsx` (mit Process + Comparison Section)
- `src/app/globals.css` (sr-only utility)
- `src/components/layout/header.tsx` (Active-Route, MobileMenu Integration)
- `src/components/layout/footer.tsx` (kleiner Polish, WhatsApp-Link)
- `src/components/layout/mobile-menu.tsx` (animierter Burger, Spring-Physics, Slide-In)
- `src/components/sections/hero.tsx` (ehrliche Trust-Points, Cursor-Glow Effekt)

## 2. WICHTIG: Manuell löschen

```powershell
del src\app\impressum\impressum.html
```

Das alte HTML-File ist obsolet – die neue `page.tsx` ersetzt es vollständig.

## 3. Dependencies neu installieren

```powershell
# package.json wurde geändert, deshalb sauber neu installieren
rmdir /s /q node_modules
del package-lock.json
npm install
```

## 4. Dev-Server starten

```powershell
npm run dev
```

## 5. Browser-Tests

| URL | Was checken |
|-----|-------------|
| `/` | Process + Comparison Sektionen sichtbar, Hero-Cursor-Glow auf Desktop |
| `/impressum` | Neue Seite, kein 404 mehr |
| `/datenschutz` | Neue Seite, kein 404 mehr |
| `/blog` | Coming-Soon mit geplanten Artikeln |
| Mobile Menü | Burger animiert sich zu X, Slide-In von rechts mit Spring |
| Header | Aktive Seite ist unterstrichen mit blauer Linie |
| Beim Scrollen >600px | Scroll-Up-Button rechts unten erscheint |
| Tab-Taste auf jeder Seite | "Zum Hauptinhalt springen" Button erscheint |

## 6. Git Commit

```powershell
git add .
git commit -m "feat: bug fixes + comparison + process + mobile menu professional"
git push
```

## Was wurde gefixt

🔴 **Kritische Bugs:**
- Footer-Link "Impressum" führte zu 404 (alte HTML-Datei)
- Footer-Link "Datenschutz" führte zu 404 (Ordner leer)
- Header/Footer-Link "Blog" führte zu 404
- Header hatte alten Coming-Soon-Code statt MobileMenu Integration
- React 19 RC statt stable in package.json

🟡 **Verbesserungen:**
- Mobile Menu: animierter Burger zu X, Slide-In von rechts, Spring-Physics
- Hero: Trust-Points jetzt ehrlich und prüfbar
- Hero: subtiler Cursor-Glow-Effekt auf Desktop
- Header: aktive Route wird visuell hervorgehoben
- Logo-Hover: A rotiert und skaliert dezent

🟢 **Neue Features:**
- Process-Sektion: visualisierter 4-Schritt-Ablauf auf Home
- Comparison-Sektion: ehrlicher Vergleich Alcor vs WordPress-Agentur
- ScrollToTop-Button (erscheint nach 600px Scroll)
- SkipLink für Accessibility (sichtbar bei Tab-Navigation)
- Logo.svg im public-Ordner

## Was als nächstes ansteht (Sprint 3)

- MDX-Blog-System
- Migration der 5 alten Blog-Artikel
- 2 neue Artikel
