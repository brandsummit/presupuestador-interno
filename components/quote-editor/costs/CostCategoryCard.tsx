"use client";

import { Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { QuoteItem, QuoteSection } from "../types";
import CostItemRow from "./CostItemRow";
import {
  createQuoteCostItem,
  deleteQuoteCostCategory,
  updateQuoteCostCategory,
} from "./actions";

type Props = {
  quoteId: number;
  section: QuoteSection;
  enabled: boolean;
};

export default function CostCategoryCard({ quoteId, section, enabled }: Props) {
  async function handleUpdateTitle(value: string) {
    await updateQuoteCostCategory(quoteId, section.id, value);
  }

  async function handleDeleteCategory() {
    const confirmed = window.confirm(
      "¿Seguro que quieres borrar esta categoría? También se borrarán sus items.",
    );

    if (!confirmed) return;

    await deleteQuoteCostCategory(quoteId, section.id);
  }

  async function handleCreateItem() {
    await createQuoteCostItem(quoteId, section.id);
  }

  const hasItems = Boolean(section.quote_items?.length);

  return (
    <article className="rounded-lg bg-background p-4">
      <div className="mb-3 flex items-center gap-3">
        <Input
          defaultValue={section.title || ""}
          placeholder="Categoría"
          disabled={!enabled}
          onBlur={(event) => handleUpdateTitle(event.target.value)}
          className="font-semibold"
        />

        <Button
          type="button"
          variant="danger"
          disabled={!enabled}
          onClick={handleDeleteCategory}
          className="px-3"
        >
          <Trash2 size={16} />
        </Button>
      </div>

      <div className="rounded-lg border border-input-border p-4">
        {hasItems ? (
          <div className="space-y-2">
            {section.quote_items?.map((item: QuoteItem) => (
              <CostItemRow
                key={item.id}
                quoteId={quoteId}
                item={item}
                enabled={enabled}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-input-border p-6">
            <div className="flex min-h-24 items-center justify-center gap-8">
              <p className="text-sm text-text-muted">No cost items yet.</p>

              <Button type="button" disabled={!enabled} onClick={handleCreateItem}>
                <Plus size={14} />
                Add item
              </Button>
            </div>
          </div>
        )}

        {hasItems && (
          <div className="mt-5 flex justify-end">
            <Button type="button" disabled={!enabled} onClick={handleCreateItem}>
              <Plus size={14} />
              Add item
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}