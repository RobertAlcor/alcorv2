type Props = {
  text: string
  variant?: 'available' | 'busy'
}

export function LiveIndicator({ text, variant = 'available' }: Props) {
  const dotColor =
    variant === 'available' ? 'bg-success' : 'bg-amber'

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 bg-deep-2 border border-line rounded-full text-[0.7rem] font-medium text-paper-mute"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex w-1.5 h-1.5">
        <span
          className={`absolute inset-0 rounded-full ${dotColor} pulse-dot`}
          aria-hidden
        />
        <span
          className={`relative w-1.5 h-1.5 rounded-full ${dotColor}`}
          aria-hidden
        />
      </span>
      {text}
    </span>
  )
}
