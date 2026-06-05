'use client'

import { FileText, Users, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Sidebar() {
  const pathname = usePathname()

  const linkBase =
    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm'

  const active =
    'bg-text text-background'

  const inactive =
    'text-text hover:bg-background-light'

  return (
    <aside className="fixed top-0 left-0 flex h-screen w-76 flex-col justify-between border-r border-border bg-background p-10">
      <div>
        <div className="mb-10">
          <p className="text-lg font-display font-bold text-text">Brandsummit</p>
          <p className="text-xs text-text-muted">Quote system</p>
        </div>

        <nav className="space-y-2">
          <Link
            className={`${linkBase} ${
              pathname.startsWith('/quotes') ||
              pathname.startsWith('/quote')
                ? active
                : inactive
            }`}
            href="/quotes"
          >
            <FileText size={18} />
            Quotes
          </Link>

          <Link
            className={`${linkBase} ${
              pathname.startsWith('/clients') ||
              pathname.startsWith('/client')
                ? active
                : inactive
            }`}
            href="/clients"
          >
            <Users size={18} />
            Clients
          </Link>
        </nav>
      </div>

      <button className="flex items-center gap-3 rounded-lg bg-danger px-4 py-3 text-sm text-background hover:brightness-90">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  )
}