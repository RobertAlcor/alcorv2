export type WebsiteServiceKey = 'soforthilfe' | 'betreuung'

type WebsiteService = {
  title: string
  path: string
  topic: 'relaunch' | 'other'
  price: string
  unit: string
  description: string
  headline: string
  scope: string[]
  limits: string
  examples: { title: string; text: string }[]
  faq: { question: string; answer: string }[]
  message: string
}

export const WEBSITE_SERVICES: Record<WebsiteServiceKey, WebsiteService> = {
  soforthilfe: {
    title: 'Website-Soforthilfe',
    path: '/website-soforthilfe',
    topic: 'relaunch',
    price: 'ab 59 €',
    unit: 'einmalig · nach Umfang',
    description: 'Ein Darstellungsfehler, ein defekter Link oder ein technisches Problem: gezielte Hilfe für Ihre bestehende Website.',
    headline: 'Ein konkretes Problem. Eine gezielte Lösung.',
    scope: [
      'Kurze Vorprüfung Ihrer Anfrage und ein vereinbarter Fixpreis vor Arbeitsbeginn.',
      'Das Einstiegspaket umfasst eine kleine, klar abgegrenzte Korrektur mit bis zu 30 Minuten Umsetzungszeit.',
      'Funktionskontrolle der vereinbarten Änderung und eine kurze Zusammenfassung.',
    ],
    limits: 'Größere Fehleranalysen, Schadsoftware-Bereinigung, neue Funktionen und komplette Relaunches sind nicht im Einstiegspreis enthalten. Zusätzlicher Aufwand wird vorab angeboten. Machbarkeit und Umsetzungstermin werden nach der Vorprüfung vereinbart; kein 24/7-Notdienst.',
    examples: [
      { title: 'Mobile Darstellung', text: 'Überlappende Elemente, abgeschnittene Texte oder ein schlecht bedienbarer Button.' },
      { title: 'Kleine Website-Fehler', text: 'Defekte interne Links, falsche Kontaktdaten oder einzelne HTML-/CSS-Korrekturen.' },
      { title: 'Next.js & Vercel', text: 'Ein konkreter Build-, Routing- oder Deployment-Fehler. Der Aufwand wird zuerst geprüft.' },
      { title: 'Technische SEO & Ladezeit', text: 'Einzelne Metadaten-, Weiterleitungs- oder Bildprobleme prüfen und gezielt korrigieren.' },
    ],
    faq: [
      { question: 'Gilt der Preis von 59 € für jeden Fehler?', answer: 'Nein. Der Einstiegspreis gilt für eine vereinbarte kleine Korrektur mit bis zu 30 Minuten Umsetzungszeit. Bei größerem Aufwand erhalten Sie vor Beginn ein eigenes Angebot. Ohne Ihre Zustimmung wird kein Zusatzaufwand ausgeführt.' },
      { question: 'Muss meine Website von ALCOR sein?', answer: 'Nein. Auch fremd erstellte Websites können angefragt werden. Ob ich Ihr System und das konkrete Problem übernehmen kann, klären wir anhand der Website, des Fehlers und der verfügbaren Zugänge.' },
      { question: 'Wird mein Problem noch heute behoben?', answer: 'Das wird nicht pauschal zugesagt. Ich prüfe zuerst Machbarkeit und Verfügbarkeit und vereinbare dann einen realistischen Termin mit Ihnen.' },
      { question: 'Brauchen Sie meine Passwörter?', answer: 'Bitte senden Sie keine Passwörter oder Zugangscodes im Formular. Falls Zugriff nötig ist, vereinbaren wir nach der Vorprüfung einen geeigneten, möglichst zeitlich begrenzten Zugang.' },
    ],
    message: 'Anfrage: Website-Soforthilfe\n\nDas funktioniert auf meiner Website nicht:\n\nSeit wann tritt das Problem auf?\n\nMein gewünschter Zeitrahmen:',
  },
  betreuung: {
    title: 'Website-Betreuung',
    path: '/website-betreuung',
    topic: 'other',
    price: 'ab 59 €',
    unit: 'pro Monat · nach Umfang',
    description: 'Ein fester Ansprechpartner für kleine Änderungen und vereinbarte technische Pflege Ihrer Website.',
    headline: 'Ihre Website bleibt nicht sich selbst überlassen.',
    scope: [
      'Ein klar vereinbarter Betreuungsumfang für eine bestehende Website.',
      'Im Einstiegspaket: insgesamt bis zu 30 Minuten pro Monat für vereinbarte Prüfungen und kleine Änderungen.',
      'Zum Beispiel Texte und Bilder austauschen, Links prüfen oder eine überschaubare technische Anpassung umsetzen.',
      'Eine kurze Übersicht der erledigten Aufgaben; Mehrarbeit nur nach Ihrer Freigabe.',
    ],
    limits: 'Das Zeitbudget gilt insgesamt, nicht je Aufgabe; ungenutzte Zeit wird nicht übertragen. Hosting, Domains, Lizenzen, neue Funktionen, laufendes Monitoring und ein 24/7-Bereitschaftsdienst sind nicht enthalten. Backups und Updates werden systemabhängig ausdrücklich vereinbart. Laufzeit, Kündigung und Übergabe werden vor Beginn schriftlich festgelegt.',
    examples: [
      { title: 'Inhalte aktuell halten', text: 'Öffnungszeiten, Leistungen, Ansprechpartner oder vorhandene Bilder aktualisieren.' },
      { title: 'Kleine Anpassungen', text: 'Einen Button, eine Verlinkung oder ein bestehendes Layout-Detail überarbeiten.' },
      { title: 'Vereinbarte Kontrollen', text: 'Zum Beispiel wichtige Links und die Darstellung zentraler Seiten überprüfen.' },
      { title: 'Technische Pflege', text: 'Notwendige technische Schritte priorisieren. Umfangreichere Updates oder Fehlerbehebungen separat abstimmen.' },
    ],
    faq: [
      { question: 'Ist die Betreuung unbegrenzt?', answer: 'Nein. Das Einstiegspaket umfasst insgesamt bis zu 30 Minuten pro Monat. Für weitere Aufgaben erhalten Sie vorab ein Angebot. Das verhindert unerwartete Zusatzkosten und unklare Erwartungen.' },
      { question: 'Kann ALCOR eine fremde Website übernehmen?', answer: 'Nach einer technischen Vorprüfung. Ich kläre zuerst das System, den Zustand und die benötigten Zugänge. Ein gegebenenfalls notwendiger einmaliger Übernahmeaufwand wird separat angeboten.' },
      { question: 'Sind Backups und alle Updates automatisch enthalten?', answer: 'Nein. Welche Sicherungen, Updates und Kontrollen sinnvoll und im vereinbarten Zeitbudget möglich sind, hängt vom System ab. Diese Leistungen werden ausdrücklich festgelegt. Eine vollständige Sicherheits- oder Verfügbarkeitsgarantie ist damit nicht verbunden.' },
      { question: 'Schließe ich mit der Anfrage bereits ein Abo ab?', answer: 'Nein. Die Anfrage ist unverbindlich. Umfang, Preis, Laufzeit und Kündigung werden vor Beginn schriftlich vereinbart. Erst danach kann eine Beauftragung erfolgen.' },
    ],
    message: 'Anfrage: Website-Betreuung\n\nDiese Aufgaben möchte ich abgeben:\n\nDas verwendete Website-System (falls bekannt):\n\nSo häufig brauche ich Änderungen:',
  },
}

export const WEBSITE_SERVICE_KEYS: WebsiteServiceKey[] = ['soforthilfe', 'betreuung']

export function getWebsiteService(value: string | null | undefined): WebsiteService | undefined {
  return value === 'soforthilfe' || value === 'betreuung' ? WEBSITE_SERVICES[value] : undefined
}

export function websiteServiceRequestPath(key: WebsiteServiceKey): string {
  return `/kontakt?thema=${WEBSITE_SERVICES[key].topic}&service=${key}`
}
