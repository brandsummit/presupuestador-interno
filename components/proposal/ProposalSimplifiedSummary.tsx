import { Quote } from "@/components/quote-editor/types";

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
      <p className="mb-5 text-sm font-bold uppercase text-prop-text-muted">
        {label}
      </p>
      <p className="whitespace-pre-wrap text-2xl leading-tight">{value}</p>
    </div>
  );
}

export default function ProposalSimplifiedSummary({ quote }: Props) {
  if (!quote.show_summary) return null;

  return (
    <section className="grid gap-10 md:grid-cols-4">
      <SummaryItem label="Inicio" value={quote.start_at} />
      <SummaryItem label="Duración" value={quote.duration} />
      <div />
      <SummaryItem label="Pagos" value={quote.payment_terms} />
    </section>
  );
}