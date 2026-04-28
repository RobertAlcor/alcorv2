'use client'

import { Check } from 'lucide-react'

type Props = {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function StepIndicator({ currentStep, totalSteps, labels }: Props) {
  return (
    <div
      className="flex items-center justify-between gap-2 mb-10"
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNumber = i + 1
        const isDone = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        const label = labels[i]

        return (
          <div
            key={stepNumber}
            className="flex items-center flex-1 last:flex-initial"
          >
            <div className="flex flex-col items-center gap-2 min-w-0">
              <div
                className={`relative flex items-center justify-center w-9 h-9 rounded-full text-sm font-mono transition-all ${
                  isDone
                    ? 'bg-signal-2 text-deep'
                    : isCurrent
                      ? 'bg-signal text-deep ring-4 ring-signal/20'
                      : 'bg-deep-2 border border-paper-dim/30 text-paper-mute'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isDone ? (
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`text-[0.65rem] font-mono uppercase tracking-wider whitespace-nowrap hidden sm:block ${
                  isCurrent
                    ? 'text-paper'
                    : isDone
                      ? 'text-paper-mute'
                      : 'text-paper-dim'
                }`}
              >
                {label}
              </span>
            </div>
            {stepNumber < totalSteps && (
              <div className="flex-1 h-px mx-2 bg-paper-dim/20 relative -mt-5">
                <div
                  className={`absolute inset-y-0 left-0 bg-signal-2 transition-all duration-500 ${
                    isDone ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
