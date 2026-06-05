"use client";

import { updateQuoteField } from "@/app/(admin)/quote/[id]/actions";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Textarea from "@/components/ui/Textarea";
import { Quote } from "./types";
import SectionHeader from "./SectionHeader";

type Props = {
  quote: Quote;
  costTotal: number;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

function formatDateInput(date: string | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function SummarySection({
  quote,
  costTotal,
  enabled,
  onToggle,
}: Props) {
  return (
    <section className={`rounded-lg bg-background-light p-6 ${!enabled ? "opacity-50" : ""}`}>
      <SectionHeader title="Resumen" enabled={enabled} onToggle={onToggle} />

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label>Start</Label>
            <Input
              type="date"
              defaultValue={formatDateInput(quote.start_at)}
              disabled={!enabled}
              onBlur={(event) =>
                updateQuoteField(quote.id, "start_at", event.target.value || null)
              }
            />
          </div>

          <div>
            <Label>Duration</Label>
            <Input
              defaultValue={quote.duration || ""}
              placeholder="From 8 to 10 weeks"
              disabled={!enabled}
              onBlur={(event) =>
                updateQuoteField(quote.id, "duration", event.target.value)
              }
            />
          </div>

          <div>
            <Label>Total</Label>
            <Input value={`${costTotal} €`} disabled />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Payment Terms</Label>
            <Textarea
              defaultValue={quote.payment_terms || ""}
              placeholder="50% in advance..."
              disabled={!enabled}
              onBlur={(event) =>
                updateQuoteField(quote.id, "payment_terms", event.target.value)
              }
            />
          </div>

          <div>
            <Label>Next Steps</Label>
            <Textarea
              defaultValue={quote.next_steps || ""}
              placeholder="Acceptance and/or negotiation of the proposal..."
              disabled={!enabled}
              onBlur={(event) =>
                updateQuoteField(quote.id, "next_steps", event.target.value)
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}