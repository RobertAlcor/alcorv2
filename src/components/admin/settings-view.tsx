'use client'

import { Settings } from 'lucide-react'
import { WorkingHoursForm } from './working-hours-form'
import { BusySlotsManager } from './busy-slots-manager'

export function SettingsView() {
  return (
    <div className="space-y-10">
      <header className="flex items-baseline gap-3">
        <Settings className="w-4 h-4 text-signal-2" strokeWidth={1.75} />
        <h2 className="font-serif text-xl text-paper">Einstellungen</h2>
      </header>

      <section>
        <h3 className="font-serif text-lg text-paper mb-1">Arbeitszeiten</h3>
        <p className="text-sm text-paper-mute mb-4">
          Globale Anfang- und End-Zeit für Termin-Slots (Mo–Fr).
        </p>
        <WorkingHoursForm />
      </section>

      <section className="pt-8 border-t border-line">
        <h3 className="font-serif text-lg text-paper mb-1">Verfügbarkeit</h3>
        <p className="text-sm text-paper-mute mb-4">
          Urlaub, blockierte Tage oder einzelne Stunden eintragen.
        </p>
        <BusySlotsManager />
      </section>
    </div>
  )
}
