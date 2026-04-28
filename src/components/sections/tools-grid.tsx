'use client'

import { motion } from 'motion/react'
import { Lock, Wrench, FlaskConical } from 'lucide-react'
import type { Tool } from '@/lib/tools'

const STATUS_ICONS = {
  'Im Einsatz': Wrench,
  'In Entwicklung': FlaskConical,
  Privat: Lock,
} as const

export function ToolsGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      {tools.map((tool, idx) => {
        const StatusIcon = STATUS_ICONS[tool.status]
        return (
          <motion.article
            key={tool.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.5,
              delay: idx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative bg-deep-2 border border-line rounded-sm p-7 md:p-8 hover:border-paper-mute/30 transition-all duration-500"
          >
            {/* Visual identifier - subtle pattern */}
            <div
              aria-hidden
              className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] group-hover:opacity-[0.10] transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at top right, ${tool.brandColorAccent}, transparent 70%)`,
              }}
            />

            <div className="relative">
              {/* Header: Status + Visibility */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-wider text-paper-mute bg-deep border border-line rounded-sm">
                  <StatusIcon className="w-3 h-3" strokeWidth={1.75} />
                  {tool.status}
                </span>
                <span className="font-mono text-[0.65rem] text-paper-dim uppercase tracking-wider">
                  {tool.category}
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-paper mb-3 leading-tight">
                {tool.name}
              </h3>

              <p className="text-paper-mute leading-relaxed text-sm mb-6">
                {tool.shortDescription}
              </p>

              {/* Features list */}
              <div className="mb-6">
                <p className="text-[0.7rem] font-mono uppercase tracking-wider text-signal-2 mb-3">
                  Was es kann
                </p>
                <ul className="space-y-2">
                  {tool.features.slice(0, 4).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-paper-mute leading-snug"
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-signal-2 mt-2 shrink-0"
                        aria-hidden
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech-Stack */}
              <div className="mb-6">
                <p className="text-[0.7rem] font-mono uppercase tracking-wider text-paper-dim mb-2">
                  Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tool.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[0.65rem] font-mono text-paper-mute bg-deep border border-line rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visibility note - wenn privat */}
              {tool.visibility === 'private' && tool.visibilityNote && (
                <div className="mt-4 p-3 bg-deep border-l-2 border-paper-dim/40 rounded-sm">
                  <p className="text-xs text-paper-dim leading-relaxed italic">
                    <Lock
                      className="w-3 h-3 inline mr-1.5 -mt-0.5"
                      strokeWidth={1.75}
                    />
                    {tool.visibilityNote}
                  </p>
                </div>
              )}
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}
