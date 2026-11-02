import type { BlogPost } from './blog'

type SearchCopy = { title: string; description: string }
const SEARCH_COPY: Record<string, SearchCopy> = {
  'homepage-erstellen-lassen-wien': {
    title: 'Homepage erstellen lassen Wien: Kosten & Ablauf | ALCOR',
    description: 'Homepage in Wien planen: Kosten, Anbieter und Ablauf vergleichen. Mit Checkliste, klaren Website-Paketen und persönlichem Erstgespräch.',
  },
  'google-unternehmensprofil-wien': {
    title: 'Google-Unternehmensprofil Wien: Anleitung | ALCOR',
    description: 'Google-Unternehmensprofil für Wiener Betriebe einrichten: Kategorien, Leistungen, Bilder und Bewertungen. Mit praktischer Checkliste.',
  },
  'website-fuer-handwerker-wien': {
    title: 'Website für Handwerker Wien: Inhalte & Anfragen | ALCOR',
    description: 'Was eine Handwerker-Website braucht: klare Leistungen, echte Referenzen, lokale Inhalte und einfache Kontaktwege. Leitfaden für Wiener Betriebe.',
  },
  'website-kosten-wien-2026': {
    title: 'Website-Kosten Wien: Budget richtig planen | ALCOR',
    description: 'Website-Kosten nachvollziehen: Welche Leistungen, Funktionen und Folgekosten das Budget bestimmen. Mit Orientierung zu den ALCOR-Paketen.',
  },
  'webdesigner-wien-auswaehlen': {
    title: 'Webdesigner in Wien auswählen: Checkliste | ALCOR',
    description: 'Den passenden Webdesigner finden: Referenzen, Leistungsumfang, Kommunikation und Folgekosten prüfen. Eine Checkliste für Unternehmen in Wien.',
  },
  'website-relaunch-2026': {
    title: 'Website-Relaunch planen: Ablauf & SEO | ALCOR',
    description: 'Website-Relaunch vorbereiten: Ziele, Inhalte, bestehende URLs und Weiterleitungen berücksichtigen. So entsteht ein nachvollziehbarer Projektplan.',
  },
  'seo-fuer-kmu-wien-2026': {
    title: 'SEO für KMU in Wien: Grundlagen & Prioritäten | ALCOR',
    description: 'SEO für kleine Unternehmen in Wien: technische Grundlagen, hilfreiche Inhalte und lokale Sichtbarkeit. Maßnahmen sinnvoll priorisieren.',
  },
  'geo-ai-search-google-2026': {
    title: 'GEO und Google KI-Suche: SEO ohne Hype | ALCOR',
    description: 'GEO und KI-Suche einordnen: Welche SEO-Grundlagen wichtig bleiben und wie Unternehmen Inhalte verständlich und auffindbar aufbereiten.',
  },
}

export function getBlogSearchCopy(post: Pick<BlogPost, 'slug' | 'title' | 'description' | 'excerpt'>) {
  const heading = post.title.replace(/\s*\|\s*ALCOR$/, '')
  return { heading, ...(SEARCH_COPY[post.slug] || { title: post.title, description: post.description || post.excerpt }) }
}

export function getBlogService(post: Pick<BlogPost, 'slug' | 'tags'>) {
  if (post.slug === 'website-relaunch-2026') {
    return { href: '/leistungen/relaunch', label: 'Website-Relaunch in Wien planen' }
  }
  if (['google-unternehmensprofil-wien', 'seo-fuer-kmu-wien-2026', 'geo-ai-search-google-2026', 'core-web-vitals-2026'].includes(post.slug)) {
    return { href: '/leistungen/seo-wien', label: 'Technische SEO in Wien besprechen' }
  }
  return { href: '/leistungen/website-erstellung', label: 'Website in Wien erstellen lassen' }
}
