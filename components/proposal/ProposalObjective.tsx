import { Quote } from "@/components/quote-editor/types";

type Props = {
  quote: Quote;
};

export default function ProposalObjective({ quote }: Props) {
  if (!quote.show_objective || !quote.objective) {
    return null;
  }

  return (
    <section className="flex min-h-[40vh] flex-col gap-60 p-6">
      <div className="">
        <h2 className="font-display text-3xl uppercase">
          01 - Objetivo
        </h2>
      </div>

      <div className="grid flex-1 md:grid-cols-2">
        <div />

        <div className="flex items-end">
          <p className="max-w-3xl whitespace-pre-wrap text-lg leading-tight">
            {quote.objective}
          </p>
        </div>
      </div>
    </section>
  );
}