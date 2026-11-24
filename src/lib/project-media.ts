import type { Case } from './cases'

export function projectScreenshot(project: Case): string | undefined {
  return project.screenshot
}
