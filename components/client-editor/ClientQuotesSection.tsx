import QuoteCard from "@/components/QuoteCard";
import { ClientQuote } from "./types";

type Props = {
  quotes?: ClientQuote[];
};

export default function ClientQuotesSection({ quotes }: Props) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-display font-bold text-text">
        Presupuestos asociados
      </h2>

      {quotes?.length ? (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-input-border p-8 text-center text-sm text-text-muted">
          No hay presupuestos asociados.
        </div>
      )}
    </section>
  );
}