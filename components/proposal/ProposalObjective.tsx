import { Quote } from "@/components/quote-editor/types";
import { getProposalTranslations } from "./proposal-translations";

type Props = {
  quote: Quote;
};

export default function ProposalObjective({ quote }: Props) {
  if (!quote.show_objective || !quote.objective) {
    return null;
  }

  const t = getProposalTranslations(quote.language);

  return (
    <section className="px-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div />

        <div>
          <h2 className="mb-8 font-display text-6xl font-bold">
            {t.objective.title}
          </h2>

          <p className="max-w-3xl whitespace-pre-wrap text-sm leading-snug">
            {quote.objective}
          </p>
        </div>
      </div>
    </section>
  );
}