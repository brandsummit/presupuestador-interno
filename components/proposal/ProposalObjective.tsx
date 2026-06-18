import { Quote } from "@/components/quote-editor/types";

type Props = {
  quote: Quote;
};

export default function ProposalObjective({ quote }: Props) {
  if (!quote.show_objective || !quote.objective) {
    return null;
  }

  return (
    <section className="px-10">
      <div className="grid gap-4 md:grid-cols-2">
        <div />

        <div>
          <h2 className="mb-8 font-display font-bold text-6xl">Planteamiento</h2>

          <p className="max-w-3xl whitespace-pre-wrap text-base leading-snug">
            {quote.objective}
          </p>
        </div>
      </div>
    </section>
  );
}