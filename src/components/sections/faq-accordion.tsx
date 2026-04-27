import { FAQS } from '@/lib/faqs'
import { faqSchema } from '@/lib/schema'

export function FaqSection() {
  return (
    <section id="faq" className="container-fluid py-24 md:py-32 border-t border-line">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }}
      />

      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-32">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            FAQ
          </p>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance mb-6">
            Was Kunden mich oft fragen.
          </h2>
          <p className="text-paper-mute leading-relaxed">
            Antworten zu Preis, Ablauf und was nach dem Launch passiert. Sollte
            etwas fehlen, schreiben Sie mir kurz.
          </p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, idx) => (
            <details
              key={faq.question}
              className="group border-b border-line pb-2 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer py-5 list-none">
                <span className="flex items-start gap-4 min-w-0">
                  <span className="font-mono text-xs text-paper-dim mt-1.5 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-xl md:text-2xl text-paper group-hover:text-signal-2 transition-colors">
                    {faq.question}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 mt-3 w-5 h-5 relative text-paper-mute group-hover:text-signal-2 transition-colors"
                >
                  <span className="absolute top-1/2 left-0 w-full h-px bg-current -translate-y-1/2" />
                  <span className="absolute top-1/2 left-0 w-full h-px bg-current -translate-y-1/2 rotate-90 group-open:rotate-0 transition-transform duration-300" />
                </span>
              </summary>
              <div className="pl-10 pr-2 pb-5 text-paper-mute leading-relaxed text-pretty">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
