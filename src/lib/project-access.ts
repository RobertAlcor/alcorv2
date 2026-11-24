export const PROJECT_DEMO_REQUESTS = {
  alcorleads: 'ALCOR Leads – CRM & Akquise',
  'therapieplan-android': 'Therapieplan – Android-App',
} as const

export function requestedProject(slug: string | null): string | undefined {
  return slug && Object.hasOwn(PROJECT_DEMO_REQUESTS, slug)
    ? PROJECT_DEMO_REQUESTS[slug as keyof typeof PROJECT_DEMO_REQUESTS]
    : undefined
}

export function projectAccessHref(slug: string): string {
  return `/kontakt?projekt=${encodeURIComponent(slug)}`
}
