import Sidebar from '@/components/Sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="grid min-h-screen pl-76">
        <Sidebar />

        <section className="p-10">
          {children}
        </section>
      </div>
    </main>
  )
}