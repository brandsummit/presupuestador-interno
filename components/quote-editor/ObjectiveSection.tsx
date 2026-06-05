"use client";

import { updateQuoteField } from "@/app/(admin)/quote/[id]/actions";
import Textarea from "@/components/ui/Textarea";
import { Quote } from "./types";
import SectionHeader from "./SectionHeader";

type Props = {
  quote: Quote;
  onToggle: (value: boolean) => void;
};

export default function ObjectiveSection({ quote, onToggle }: Props) {
  const enabled = quote.show_objective ?? true;

  return (
    <section className={`rounded-lg bg-background-light p-6 ${!enabled ? "opacity-50" : ""}`}>
      <SectionHeader title="Project Goal" enabled={enabled} onToggle={onToggle} />

      <Textarea
        defaultValue={quote.objective || ""}
        disabled={!enabled}
        placeholder="Describe the project goal..."
        onBlur={(event) =>
          updateQuoteField(quote.id, "objective", event.target.value)
        }
      />
    </section>
  );
}