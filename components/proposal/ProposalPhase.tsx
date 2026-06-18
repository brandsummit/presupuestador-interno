import { Quote } from "@/components/quote-editor/types";
import { getProposalTranslations } from "./proposal-translations";

type Props = {
  quote: Quote;
};

export default function ProposalPhase({ quote }: Props) {
  if (!quote.show_phases) {
    return null;
  }

  const t = getProposalTranslations(quote.language);

  const phases = [
    t.phase.construction,
    t.phase.activation,
    t.phase.management,
  ];

  return (
    <section className="px-10">
      <h2 className="font-display text-6xl font-bold">
        {t.phase.title}
      </h2>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        <p className="text-sm leading-snug">
          {t.phase.intro}
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {phases.map((phase, index) => {
          const selected =
            quote.current_phase === phase.title ||
            quote.current_phase ===
              ["Construcción", "Activación", "Gestión"][index];

          const borderRadius =
            index === 0
              ? "rounded-l-[36px] rounded-r-xl"
              : index === phases.length - 1
                ? "rounded-l-xl rounded-r-[36px]"
                : "rounded-xl";

          return (
            <article
              key={phase.title}
              className={`
                flex min-h-110 flex-col justify-between border p-10
                ${borderRadius}
                ${
                  selected
                    ? "border-prop-text bg-prop-text text-prop-background"
                    : "border-prop-text/25 text-prop-text/30"
                }
              `}
            >
              <div>
                <h3 className="text-2xl leading-none">
                  {phase.title}
                </h3>

                <p className="mt-6 max-w-md text-sm leading-snug">
                  {phase.description}
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span
                  className={`
                    h-3 w-3 rounded-full border
                    ${
                      selected
                        ? "border-prop-background bg-success"
                        : "border-prop-text/30"
                    }
                  `}
                />

                <span>
                  {t.phase.label} {index + 1}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}