import type { ReactNode } from 'react'

export function Section({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="font-serif text-2xl md:text-3xl text-paper mb-5 leading-tight">
        {title}
      </h2>
      <div className="space-y-4 text-paper-mute leading-relaxed">{children}</div>
    </section>
  )
}

export function SubSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="mt-8">
      <h3 className="font-serif text-xl text-paper mb-3">{title}</h3>
      <div className="space-y-3 text-paper-mute leading-relaxed">{children}</div>
    </div>
  )
}

export function P({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`text-paper-mute leading-relaxed${className ? ` ${className}` : ''}`}
    >
      {children}
    </p>
  )
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="text-paper font-medium">{children}</strong>
}

export function DefList({
  items,
}: {
  items: { term: string; def: ReactNode }[]
}) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-3">
      {items.map((it) => (
        <div key={it.term} className="contents">
          <dt className="text-xs font-semibold tracking-[0.12em] uppercase text-paper-mute pt-1">
            {it.term}
          </dt>
          <dd className="text-paper">{it.def}</dd>
        </div>
      ))}
    </dl>
  )
}

export function UnorderedList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 list-disc pl-5 marker:text-paper-dim">
      {items.map((item, i) => (
        <li key={i} className="text-paper-mute leading-relaxed pl-1">
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ContactBlock({
  name,
  address,
  email,
  phone,
}: {
  name: string
  address: string
  email: string
  phone: string
}) {
  return (
    <address className="not-italic bg-deep-2 border border-line rounded-sm p-5 my-4">
      <p className="text-paper font-medium mb-1">{name}</p>
      <p className="text-paper-mute text-sm whitespace-pre-line mb-3">
        {address}
      </p>
      <p className="text-sm">
        <a
          href={`mailto:${email}`}
          className="text-signal-2 hover:text-signal underline underline-offset-2"
        >
          {email}
        </a>
      </p>
      <p className="text-sm">
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="text-signal-2 hover:text-signal underline underline-offset-2"
        >
          {phone}
        </a>
      </p>
    </address>
  )
}
