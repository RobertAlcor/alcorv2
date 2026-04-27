import Link from 'next/link'
import { SITE } from '@/lib/site'

export function AuthorBox() {
  return (
    <aside className="mt-16 pt-10 border-t border-line">
      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        <div className="shrink-0">
          <div className="w-20 h-20 rounded-full bg-deep-2 border border-line flex items-center justify-center font-serif italic text-3xl text-signal-2">
            R
          </div>
        </div>
        <div className="flex-1">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper-dim mb-2">
            Geschrieben von
          </p>
          <h3 className="font-serif text-2xl text-paper mb-2">
            {SITE.founder.name}
          </h3>
          <p className="text-paper-mute leading-relaxed mb-4">
            {SITE.founder.role}. Seit {SITE.founder.foundedIn} in Wien.
            Handgeschriebener Code, keine Frameworks der Mode, kein Marketing-Geschwafel.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ueber-mich"
              className="text-sm text-signal-2 hover:underline underline-offset-4"
            >
              Mehr über mich
            </Link>
            <span className="text-paper-dim text-sm">·</span>
            <Link
              href="/kontakt"
              className="text-sm text-signal-2 hover:underline underline-offset-4"
            >
              Direkt fragen
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
