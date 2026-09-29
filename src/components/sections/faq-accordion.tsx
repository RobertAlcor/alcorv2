import { FAQS } from '@/lib/faqs'
import { faqSchema } from '@/lib/schema'
export function FaqSection() {
 return <section id="faq" className="container-fluid alcor-section border-t border-line" aria-labelledby="faq-title">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema([...FAQS])).replace(/</g,'\\u003c')}} />
  <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20"><div><p className="alcor-eyebrow">Gut zu wissen</p><h2 id="faq-title">Ihre Fragen.<br/>Klare Antworten.</h2><p className="alcor-intro">Über Umfang, Auswahl, Zusammenarbeit und die Zeit nach dem Launch.</p></div><div>{FAQS.map((item,index)=><details key={item.question} className="group border-b border-line py-3"><summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-5 py-3 text-lg font-semibold hover:text-signal-2 [&::-webkit-details-marker]:hidden"><span>{item.question}</span><span aria-hidden="true" className="shrink-0 text-2xl text-signal-2 group-open:rotate-45">+</span></summary><p className="pb-6 pt-3 text-base leading-relaxed text-paper-mute">{item.answer}</p></details>)}</div></div>
 </section>
}
