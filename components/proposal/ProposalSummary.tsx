import { Quote } from "@/components/quote-editor/types";
import { formatPrice, getProposalTotal } from "./utils";

type Props = {
  quote: Quote;
};

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  if (!value) return null;

  return (
    <div>
      <p className="mb-5 text-sm font-bold uppercase text-text-muted">
        {label}
      </p>
      <p className="whitespace-pre-wrap text-2xl leading-tight">{value}</p>
    </div>
  );
}

export default function ProposalSummary({ quote }: Props) {
  if (!quote.show_summary) return null;

  const total = getProposalTotal(quote);

  return (
    <section className="flex min-h-screen flex-col p-6">
      <div>
        <h2 className="font-display text-3xl uppercase">06 - Resumen</h2>
      </div>

      <div className="mt-40 flex flex-1 flex-col justify-between">
        <div className="grid gap-6 md:grid-cols-4">
          <SummaryItem label="Inicio" value={quote.start_at} />
          <SummaryItem label="Duración" value={quote.duration} />
          <SummaryItem label="Total" value={formatPrice(total)} />
          <SummaryItem label="Pagos" value={quote.payment_terms} />
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {quote.next_steps && (
            <div className="md:col-span-2">
              <p className="mb-5 text-sm font-bold uppercase text-text-muted">
                Próximos pasos
              </p>
              <p className="whitespace-pre-wrap text-2xl leading-tight">
                {quote.next_steps}
              </p>
            </div>
          )}

          <div className="hidden md:block" />

          <div>
            <div className="mb-10">
              <p className="font-display text-5xl leading-none">
                Brandsummit
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.22em]">
                Food Design Thinkers
              </p>
            </div>

            <div className="text-2xl leading-tight">
              <p>David Baldoví</p>
              <p>Strategy &amp; Management</p>
              <p>david@brandsummit.es</p>
              <p>677 485 946</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}