export type ItServiceKey =
  | 'remote-support'
  | 'software-email-office'
  | 'troubleshooting'
  | 'pc-setup'
  | 'network-printer'
  | 'data-backup'
  | 'windows-installation'

export type ItService = {
  title: string
  shortTitle: string
  price: string
  priceFrom: number
  unit: string
  description: string
  topic: 'it-service'
  message: string
  includes: string[]
}

export const IT_SERVICES: Record<ItServiceKey, ItService> = {
  'remote-support': {
    title: 'Fernwartung & Online-PC-Hilfe',
    shortTitle: 'Fernwartung',
    price: 'ab 39 €',
    priceFrom: 39,
    unit: 'einmalig · nach Umfang',
    description:
      'Schnelle Hilfe per Fernzugriff, wenn der Computer startet und eine stabile Internetverbindung vorhanden ist.',
    topic: 'it-service',
    message:
      'Anfrage: Fernwartung & Online-PC-Hilfe\n\nDieses Problem tritt auf:\n\nBetriebssystem und Gerät (falls bekannt):\n\nWann bin ich erreichbar?',
    includes: [
      'Kurze Fehleranalyse und vereinbarte Unterstützung per Fernzugriff',
      'Software-, E-Mail- oder Einstellungsprobleme nach Vorprüfung',
      'Preis und Umfang werden vor Beginn vereinbart',
    ],
  },
  'software-email-office': {
    title: 'Software, E-Mail & Office einrichten',
    shortTitle: 'Software & E-Mail',
    price: 'ab 49 €',
    priceFrom: 49,
    unit: 'einmalig · nach Umfang',
    description:
      'Programme, Outlook, Thunderbird, Microsoft 365, Druck- und PDF-Programme sowie bestehende E-Mail-Konten korrekt einrichten.',
    topic: 'it-service',
    message:
      'Anfrage: Software, E-Mail & Office\n\nWas soll eingerichtet werden?\n\nGerät und Betriebssystem (falls bekannt):\n\nVor Ort oder Fernwartung?',
    includes: [
      'Installation und Grundeinrichtung vereinbarter Software',
      'Einrichtung vorhandener E-Mail-Konten und Programme',
      'Prüfung der vereinbarten Funktionen nach der Einrichtung',
    ],
  },
  troubleshooting: {
    title: 'Fehlerdiagnose & PC-Optimierung',
    shortTitle: 'Fehlerdiagnose',
    price: 'ab 59 €',
    priceFrom: 59,
    unit: 'einmalig · nach Umfang',
    description:
      'Langsame Systeme, Windows-Fehler, Updateprobleme, Treiberkonflikte und auffällige Programme strukturiert prüfen.',
    topic: 'it-service',
    message:
      'Anfrage: Fehlerdiagnose & PC-Optimierung\n\nFehler oder Auffälligkeit:\n\nSeit wann tritt das Problem auf?\n\nGerät und Betriebssystem (falls bekannt):',
    includes: [
      'System-, Update- und Treiberprüfung im vereinbarten Umfang',
      'Bereinigung unnötiger Autostarts und nachvollziehbare Optimierung',
      'Empfehlung, wenn ein Hardwaredefekt wahrscheinlich ist',
    ],
  },
  'pc-setup': {
    title: 'PC- und Laptop-Einrichtung',
    shortTitle: 'PC-Einrichtung',
    price: 'ab 69 €',
    priceFrom: 69,
    unit: 'einmalig · nach Umfang',
    description:
      'Einen neuen oder zurückgesetzten Computer mit Benutzerkonto, Updates, Browser, E-Mail, Drucker und vereinbarter Software startklar machen.',
    topic: 'it-service',
    message:
      'Anfrage: PC- und Laptop-Einrichtung\n\nWelches Gerät soll eingerichtet werden?\n\nWelche Programme, Konten und Geräte werden benötigt?\n\nGewünschter Termin:',
    includes: [
      'Benutzerkonto, Updates und grundlegende Systemeinstellungen',
      'Browser, E-Mail und vereinbarte Standardprogramme',
      'Anbindung vorhandener Drucker oder Cloud-Dienste nach Prüfung',
    ],
  },
  'network-printer': {
    title: 'WLAN, Router & Drucker einrichten',
    shortTitle: 'WLAN & Drucker',
    price: 'ab 69 €',
    priceFrom: 69,
    unit: 'einmalig · nach Umfang',
    description:
      'Vorhandene Router, WLAN-Geräte, Drucker und Scanner verbinden, konfigurieren und gemeinsam testen.',
    topic: 'it-service',
    message:
      'Anfrage: WLAN, Router & Drucker\n\nWelche Geräte sollen verbunden werden?\n\nWas funktioniert derzeit nicht?\n\nAdresse beziehungsweise Bezirk:',
    includes: [
      'Einrichtung vorhandener Router-, WLAN- und Druckerfunktionen',
      'Verbindung der vereinbarten Computer und Mobilgeräte',
      'Funktionsprüfung und kurze Erklärung der Einrichtung',
    ],
  },
  'data-backup': {
    title: 'Datenübertragung & Backup-Einrichtung',
    shortTitle: 'Daten & Backup',
    price: 'ab 79 €',
    priceFrom: 79,
    unit: 'einmalig · nach Datenmenge',
    description:
      'Dokumente, Bilder und Benutzerdateien auf ein neues Gerät übertragen oder eine nachvollziehbare Sicherung mit vorhandenen Speichern einrichten.',
    topic: 'it-service',
    message:
      'Anfrage: Datenübertragung & Backup\n\nVon welchem auf welches Gerät?\n\nUngefähre Datenmenge (falls bekannt):\n\nSind die Datenträger funktionsfähig?',
    includes: [
      'Übertragung zugänglicher Benutzerdateien nach Vorprüfung',
      'Einrichtung einer vereinbarten lokalen oder Cloud-Sicherung',
      'Kontrolle ausgewählter Ordner nach der Übertragung',
    ],
  },
  'windows-installation': {
    title: 'Windows installieren & einrichten',
    shortTitle: 'Windows-Installation',
    price: 'ab 99 €',
    priceFrom: 99,
    unit: 'einmalig · ohne Lizenz',
    description:
      'Eine unterstützte Windows-Version neu installieren oder zurücksetzen, aktualisieren und mit den verfügbaren Treibern grundlegend einrichten.',
    topic: 'it-service',
    message:
      'Anfrage: Windows-Installation\n\nGerät und aktuelle Windows-Version (falls bekannt):\n\nNeuinstallation oder Zurücksetzen?\n\nMüssen vorher Daten gesichert werden?',
    includes: [
      'Neuinstallation oder Zurücksetzen nach technischer Vorprüfung',
      'Verfügbare Windows-Updates und geeignete Gerätetreiber',
      'Grundlegende Einrichtung und vereinbarte Standardprogramme',
    ],
  },
}

export const IT_SERVICE_KEYS = Object.keys(IT_SERVICES) as ItServiceKey[]

export function getItService(
  value: string | null | undefined,
): ItService | undefined {
  return value && value in IT_SERVICES
    ? IT_SERVICES[value as ItServiceKey]
    : undefined
}

export function itServiceRequestPath(key?: ItServiceKey): string {
  return key
    ? `/kontakt?thema=it-service&service=${key}`
    : '/kontakt?thema=it-service'
}
