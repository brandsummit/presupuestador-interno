"use client";

import { updateQuoteField } from "@/app/(admin)/quote/[id]/actions";
import SectionHeader from "./SectionHeader";
import { Quote } from "./types";

const phases = ["Construcción", "Activación", "Gestión"];

type Props = {
  quote: Quote;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function PhasesSection({
  quote,
  enabled,
  onToggle,
}: Props) {
  async function handlePhaseChange(phase: string) {
    await updateQuoteField(quote.id, "current_phase", phase);
  }

  return (
    <section
      className={`rounded-lg bg-background-light p-6 ${
        !enabled ? "opacity-50" : ""
      }`}
    >
      <SectionHeader
        title="Project phase"
        enabled={enabled}
        onToggle={onToggle}
      />

      <div className="grid gap-3 md:grid-cols-3">
        {phases.map((phase) => {
          const selected = quote.current_phase === phase;

          return (
            <button
              key={phase}
              type="button"
              disabled={!enabled}
              onClick={() => handlePhaseChange(phase)}
              className={`
                flex items-center justify-between
                rounded-lg
                border
                p-5
                text-left
                transition
                cursor-pointer
                disabled:cursor-not-allowed
                ${
                  selected
                    ? "border-success"
                    : "border-input-border hover:border-text-muted"
                }
              `}
            >
              <span className="text-lg text-text">
                {phase}
              </span>

              <span
                className={`
                  flex h-5 w-5 items-center justify-center rounded-full border
                  ${
                    selected
                      ? "border-success"
                      : "border-input-border"
                  }
                `}
              >
                {selected && (
                  <span className="h-2 w-2 rounded-full bg-success" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}