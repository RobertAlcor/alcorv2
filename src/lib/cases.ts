import { CASES as CORE_CASES, type Case as CoreCase } from './cases-core'
import { ADDITIONAL_CASES } from './cases-additional'

export type { CaseTestimonial } from './cases-core'

// Ein Projektjahr wird nur angezeigt, wenn es belegt ist.
export type Case = Omit<CoreCase, 'year'> & { year?: number }

export const CASES: Case[] = [...CORE_CASES, ...ADDITIONAL_CASES]

export function getCaseBySlug(slug: string): Case | undefined {
  return CASES.find((project) => project.slug === slug)
}
