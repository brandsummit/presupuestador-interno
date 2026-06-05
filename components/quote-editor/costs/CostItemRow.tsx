"use client";

import { Trash2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { QuoteItem } from "../types";
import { updateQuoteCostItem, deleteQuoteCostItem } from "./actions";
import AutosizeTextarea from "@/components/ui/AutosizeTextarea";

type Props = {
  quoteId: number;
  item: QuoteItem;
  enabled: boolean;
};

export default function CostItemRow({ quoteId, item, enabled }: Props) {
  async function handleDelete() {
    const confirmed = window.confirm("¿Seguro que quieres borrar este item?");
    if (!confirmed) return;

    await deleteQuoteCostItem(quoteId, item.id);
  }

  return (
    <div className="grid gap-2 md:grid-cols-[1fr_1.5fr_140px_auto]">
      <Input
        defaultValue={item.title || ""}
        placeholder="Servicio"
        disabled={!enabled}
        onBlur={(event) =>
          updateQuoteCostItem(quoteId, item.id, "title", event.target.value)
        }
      />

      <AutosizeTextarea
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

      <Input
        type="number"
        defaultValue={item.price || 0}
        placeholder="0"
        disabled={!enabled}
        onBlur={(event) =>
          updateQuoteCostItem(
            quoteId,
            item.id,
            "price",
            Number(event.target.value),
          )
        }
      />

      <Button
        type="button"
        variant="danger"
        disabled={!enabled}
        onClick={handleDelete}
        className="px-3"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
