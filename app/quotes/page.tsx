import { supabase } from '@/lib/supabase'

export default async function QuotesPage() {
  const { data: quotes, error } = await supabase
    .from('quotes')
    .select(`
      *,
      clients(*)
    `)
    .order('created_at', { ascending: false })

  if (error) return <div>Error: {error.message}</div>

  return (
    <main className="min-h-screen bg-[#f6f4ef] text-[#1f1f1f]">
      <div className="grid min-h-screen grid-cols-[240px_1fr]">
        <aside className="border-r border-black/10 bg-[#ebe7dc] p-6">
          <h1 className="mb-10 text-xl font-semibold">BS</h1>

          <nav className="space-y-3 text-sm">
            <a className="block rounded-full bg-black px-4 py-2 text-white" href="/quotes">
              Quotes
            </a>
            <a className="block rounded-full px-4 py-2 hover:bg-black/5" href="/clients">
              Clients
            </a>
            <a className="block rounded-full px-4 py-2 hover:bg-black/5" href="#">
              Map
            </a>
          </nav>
        </aside>

        <section className="p-10">
          <header className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-black/50">Dashboard</p>
              <h2 className="text-4xl font-semibold">Quotes</h2>
            </div>

            <button className="rounded-full bg-black px-5 py-3 text-sm text-white">
              New Quote
            </button>
          </header>

          <div className="mb-6">
            <input
              className="w-full rounded-full border border-black/10 bg-white px-5 py-3 text-sm outline-none"
              placeholder="Search quote..."
            />
          </div>

          <div className="space-y-4">
            {quotes?.map((quote) => (
              <article
                key={quote.id}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-wide text-black/40">
                      Quote #{quote.number}
                    </p>

                    <h3 className="text-2xl font-semibold">{quote.title}</h3>

                    <p className="mt-2 text-sm text-black/60">
                      {quote.clients?.name} · {quote.description}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#f0eee8] px-3 py-1 text-xs">
                    {quote.status}
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href={`/quote/${quote.id}`}
                    className="rounded-full border border-black/10 px-4 py-2 text-sm"
                  >
                    View
                  </a>

                  <button className="rounded-full border border-black/10 px-4 py-2 text-sm">
                    Clone
                  </button>

                  <button className="rounded-full border border-black/10 px-4 py-2 text-sm text-red-600">
                    Trash
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}