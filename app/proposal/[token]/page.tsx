import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

import { Quote } from "@/components/quote-editor/types";
import { getCostTotal } from "@/components/quote-editor/utils";

type ProposalPageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function ProposalPage({ params }: ProposalPageProps) {
  const { token } = await params;

  const { data: quote, error } = await supabase
    .from("quotes")
    .select(
      `
      *,
      clients(*),
      quote_sections(
        *,
        quote_items(*)
      )
    `,
    )
    .eq("token", token)
    .single();

  if (error || !quote) {
    notFound();
  }

  const typedQuote = quote as Quote;

  typedQuote.quote_sections = typedQuote.quote_sections
    ?.sort((a, b) => (a.position || 0) - (b.position || 0))
    .map((section) => ({
      ...section,
      quote_items: section.quote_items?.sort(
        (a, b) => (a.position || 0) - (b.position || 0),
      ),
    }));

  const costTotal = getCostTotal(typedQuote);

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
        <header className="space-y-4 border-b border-border pb-10">
          <p className="text-sm text-text-muted">
            Proposal #{typedQuote.number}
          </p>

          <h1 className="font-display text-5xl font-bold leading-none">
            {typedQuote.title || "Untitled proposal"}
          </h1>

          {typedQuote.description && (
            <p className="max-w-3xl text-lg text-text-muted">
              {typedQuote.description}
            </p>
          )}

          {typedQuote.clients && (
            <div className="pt-6 text-sm text-text-muted">
              <p>{typedQuote.clients.name}</p>
            </div>
          )}
        </header>

        {typedQuote.show_objective && typedQuote.objective && (
          <section className="space-y-4">
            <h2 className="font-display text-3xl font-bold">Objective</h2>
            <p className="whitespace-pre-wrap text-lg leading-relaxed text-text-muted">
              {typedQuote.objective}
            </p>
          </section>
        )}

        {typedQuote.show_phases && (
          <section className="space-y-4">
            <h2 className="font-display text-3xl font-bold">Phase</h2>
            <p className="text-lg text-text-muted">
              {typedQuote.current_phase || "Construcción"}
            </p>
          </section>
        )}

        {typedQuote.show_costs && (
          <section className="space-y-8">
            <h2 className="font-display text-3xl font-bold">Investment</h2>

            <div className="space-y-6">
              {typedQuote.quote_sections?.map((section) => (
                <div
                  key={section.id}
                  className="rounded-2xl bg-background-light p-6"
                >
                  <h3 className="mb-4 font-display text-2xl font-bold">
                    {section.title}
                  </h3>

                  <div className="space-y-4">
                    {section.quote_items?.map((item) => (
                      <div
                        key={item.id}
                        className="grid gap-4 border-t border-border pt-4 md:grid-cols-[1fr_auto]"
                      >
                        <div>
                          <h4 className="font-bold">{item.title}</h4>

                          {item.description && (
                            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-text-muted">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <p className="font-bold">
                          {Number(item.price || 0).toLocaleString("es-ES")} €
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {typedQuote.show_summary && (
          <section className="rounded-2xl bg-background-light p-8">
            <h2 className="mb-6 font-display text-3xl font-bold">Summary</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {typedQuote.start_at && (
                <div>
                  <p className="text-sm text-text-muted">Start date</p>
                  <p>{typedQuote.start_at}</p>
                </div>
              )}

              {typedQuote.duration && (
                <div>
                  <p className="text-sm text-text-muted">Duration</p>
                  <p>{typedQuote.duration}</p>
                </div>
              )}

              {typedQuote.payment_terms && (
                <div>
                  <p className="text-sm text-text-muted">Payment terms</p>
                  <p>{typedQuote.payment_terms}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-text-muted">Total</p>
                <p className="font-display text-3xl font-bold">
                  {costTotal.toLocaleString("es-ES")} €
                </p>
              </div>
            </div>

            {typedQuote.next_steps && (
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm text-text-muted">Next steps</p>
                <p className="mt-2 whitespace-pre-wrap leading-relaxed">
                  {typedQuote.next_steps}
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}