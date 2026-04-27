import packageJson from '../../package.json'

/**
 * App-Version aus package.json.
 *
 * Next.js inlined dies zur Build-Zeit. Bei jedem Build/Dev-Restart
 * wird der aktuelle Wert ausgelesen.
 *
 * Update via:
 *   npm version patch   → 1.0.0 → 1.0.1
 *   npm version minor   → 1.0.0 → 1.1.0
 *   npm version major   → 1.0.0 → 2.0.0
 *
 * Oder manuell in package.json "version" ändern.
 */
export const APP_VERSION: string = packageJson.version
