# Update v4 – Carbon Copper Final + WCAG 2.2 + FAB + Promo

## ZIP entpacken im Projektordner

Überschreibt:
- `src/app/globals.css` – Carbon Copper als fixes Theme
- `src/app/layout.tsx` – ThemeSwitcher raus, FabStack + PromoModal rein
- `src/components/layout/header.tsx` – mit sticky "Anfragen"-Button
- `src/components/layout/mobile-menu.tsx` – theme-aware Glow
- `src/components/sections/hero.tsx` – Live-Indicator, Shimmer, 3 CTAs
- `public/favicon.svg` – Carbon Copper Farben
- `public/logo.svg` – Carbon Copper Farben
- `public/llms.txt` – erweitert für GEO

Neu angelegt:
- `src/components/layout/fab-stack.tsx` – WhatsApp/Tel/ScrollTop links unten
- `src/components/layout/promo-modal.tsx` – Foto-Shooting €99 Aktion
- `src/components/ui/animated-counter.tsx` – Zahlen zählen hoch
- `src/components/ui/live-indicator.tsx` – Verfügbarkeits-Badge

## Optional zu löschen (ehemals Theme-Switcher)

Falls noch da:
```powershell
Remove-Item src\components\layout\theme-switcher.tsx
Remove-Item src\components\layout\theme-script.tsx
Remove-Item src\components\layout\scroll-to-top.tsx
Remove-Item src\lib\themes.ts
```

Sind nicht mehr referenziert, Build funktioniert auch wenn sie liegen bleiben.

## Dann

```powershell
# Strg+C im Dev-Terminal
npm run dev
```

## Was zu testen ist

| Was | Wo |
|-----|-----|
| Theme bleibt fix Carbon Copper | jede Seite |
| Live-Indicator pulsiert | Hero oben |
| Shimmer-Animation auf "Alle sahen gleich aus" | Hero Headline |
| Counter zählen hoch beim Scrollen in Stats | Hero unten |
| Magnetic-Effekt am "Projekt anfragen" | Hero CTA (Desktop, Maus drüber) |
| WhatsApp-Button links unten pulsiert | jede Seite |
| Telefon-Button links unten | jede Seite |
| Tooltips rechts neben FAB-Buttons | Hover über FAB |
| Header "Anfragen"-Button sticky | beim Scrollen |
| Header Active-Underline | beim Wechseln zwischen Seiten |
| Promo-Modal nach 30 Sek ODER Exit-Intent ODER 40% Scroll | egal welche Seite |
| Promo-Modal nicht nochmal nach Schließen | localStorage merkt sich |

### Promo-Modal manuell triggern (zum Testen)

In der Browser-Console:
```js
localStorage.removeItem('alcor-promo-seen-photo-shoot-v1')
location.reload()
```

Dann 30 Sek warten, oder einfach nach unten scrollen, oder Maus zur Adressleiste bewegen.

## WCAG 2.2 AA Verbesserungen

- ✅ Focus-Ring 3px (war 2px)
- ✅ Touch-Targets min 44x44px (Header-Links, Buttons, FAB)
- ✅ Spacing zwischen FABs >24px
- ✅ Tooltips per aria-describedby
- ✅ Promo-Modal mit role=dialog, aria-modal, aria-labelledby
- ✅ Live-Indicator mit role=status, aria-live=polite
- ✅ Skip-Link bleibt drin

## Was als nächstes

Erstmal das hier durchklicken und Feedback geben. Was als nächstes Sinn macht:

1. **Glossar** (du wolltest später)
2. **Alle anderen Sektionen polish** (Process, Comparison, Bento bekommen den gleichen Lebendigkeit-Boost)
3. **Über-mich** überarbeiten mit echtem Foto
4. **Referenzen** mit echten Screenshots
5. **OG-Image** generieren (für Social-Cards)
6. **Vercel-Deploy** wenn alles steht
