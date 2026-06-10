"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";

import CostInput from "@/components/ui/CostInput";
import CostAutosizeTextarea from "@/components/ui/CostAutosizeTextarea";
import { QuoteItem } from "../types";
import { updateQuoteCostItem, deleteQuoteCostItem } from "./actions";

import ConfirmIconDeleteButton from "@/components/ui/ConfirmIconDeleteButton";

type Props = {
  quoteId: number;
  item: QuoteItem;
  enabled: boolean;
  onDeleted: () => void;
};

export default function CostItemRow({
  quoteId,
  item,
  enabled,
  onDeleted,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: !enabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  async function handleDelete() {
    await deleteQuoteCostItem(quoteId, item.id);
    onDeleted();
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-background rounded-lg p-2 grid gap-2 md:grid-cols-[40px_1fr_1.5fr_140px_auto] ${
        isDragging ? "opacity-60" : ""
      }`}
    >
      <button
        type="button"
        disabled={!enabled}
        className="flex items-center justify-center text-text-muted cursor-grab disabled:cursor-not-allowed"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} />
      </button>

      <CostInput
        defaultValue={item.title || ""}
        placeholder="Service"
        disabled={!enabled}
        onBlur={(event) =>
          updateQuoteCostItem(quoteId, item.id, "title", event.target.value)
        }
      />

      <CostAutosizeTextarea
        defaultValue={item.description || ""}
        placeholder="Descripción"
        disabled={!enabled}
        onBlur={(event) =>
          updateQuoteCostItem(
            quoteId,
            item.id,
            "description",
            event.target.value,
          )
        }
      />

      <CostInput
        type="number"
        defaultValue={item.price ?? ""}
        placeholder="Price"
        disabled={!enabled}
        onBlur={(event) => {
          const value = event.target.value;

          updateQuoteCostItem(
            quoteId,
            item.id,
            "price",
            value === "" ? "" : Number(value),
          );
        }}
      />

      <ConfirmIconDeleteButton disabled={!enabled} onConfirm={handleDelete} />
    </div>
  );
}