"use client";

import { Plus } from "lucide-react";
import { Quote, QuoteSection } from "../types";
import SectionHeader from "../SectionHeader";
import Button from "@/components/ui/Button";
import CostCategoryCard from "./CostCategoryCard";
import { createQuoteCostCategory } from "./actions";

type Props = {
  quote: Quote;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function CostsSection({ quote, enabled, onToggle }: Props) {
  async function handleCreateCategory() {
    await createQuoteCostCategory(quote.id);
  }

  const hasCategories = Boolean(quote.quote_sections?.length);

  return (
    <section className={`rounded-lg bg-background-light p-6 ${!enabled ? "opacity-50" : ""}`}>
      <SectionHeader title="Costes" enabled={enabled} onToggle={onToggle} />

      {hasCategories ? (
        <div className="space-y-8 rounded-lg border border-input-border p-5">
          {quote.quote_sections?.map((section: QuoteSection) => (
            <CostCategoryCard
              key={section.id}
              quoteId={quote.id}
              section={section}
              enabled={enabled}
            />
          ))}

          <div className="flex justify-end">
            <Button type="button" disabled={!enabled} onClick={handleCreateCategory}>
              <Plus size={14} />
              Add category
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-input-border p-6">
          <div className="flex min-h-36 items-center justify-center gap-8">
            <p className="text-sm text-text-muted">No categories yet.</p>

            <Button type="button" disabled={!enabled} onClick={handleCreateCategory}>
              <Plus size={14} />
              Add category
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}