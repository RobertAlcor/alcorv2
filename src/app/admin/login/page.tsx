import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { LoginForm } from '@/components/admin/login-form'

export const metadata: Metadata = {
  title: 'Admin · Login',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  if (await isAdminLoggedIn()) {
    redirect('/admin')
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-signal-2 mb-3">
            Admin
          </p>
          <h1 className="font-serif text-3xl text-paper">
            Anmelden
          </h1>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
