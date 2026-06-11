import { Quote } from "@/components/quote-editor/types";

import ProposalAdminToolbar from "./ProposalAdminToolbar";
import ProposalSimplifiedCosts from "./ProposalSimplifiedCosts";
import ProposalSimplifiedSummary from "./ProposalSimplifiedSummary";

type Props = {
  quote: Quote;
};

export default function ProposalSimplifiedLayout({ quote }: Props) {
  return (
    <main className="min-h-screen bg-prop-background text-prop-text">
      <ProposalAdminToolbar
        token={quote.token}
        quoteId={quote.id}
        quoteNumber={quote.number}
        quoteTitle={quote.title}
        clientEmail={quote.clients?.email}
      />

      <div className="space-y-32 p-6">
        <section className="grid gap-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-5xl leading-none">Brandsummit</p>
            <p className="mt-3 text-sm uppercase tracking-[0.22em]">
              Food Design Thinkers
            </p>
          </div>

          <div />

          <div className="text-sm leading-snug text-prop-text-muted">
            <p>Propuesta {quote.number}</p>
            <p>{quote.title || "Untitled proposal"}</p>
            <p>{quote.clients?.name || "Cliente"}</p>
          </div>
        </section>

        {quote.show_objective && quote.objective && (
          <section className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="max-w-2xl whitespace-pre-wrap text-2xl leading-tight">
                {quote.objective}
              </p>
            </div>
          </section>
        )}

        <ProposalSimplifiedCosts quote={quote} />

        <ProposalSimplifiedSummary quote={quote} />
      </div>
    </main>
  );
}