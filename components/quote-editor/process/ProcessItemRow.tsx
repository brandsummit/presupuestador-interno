"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { toggleProcessItem } from "./actions";

type Props = {
  quoteId: number;
  item: {
    id: number;
    title: string;
    enabled: boolean;
    parent_key: string | null;
    item_key: string;
  };
  disabled?: boolean;
};

export default function ProcessItemRow({
  quoteId,
  item,
  disabled = false,
}: Props) {
  const [checked, setChecked] = useState(item.enabled);

  async function handleChange(value: boolean) {
    setChecked(value);

    await toggleProcessItem(item.id, quoteId, item.item_key, value);

    if (!value) {
      window.location.reload();
    }
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => handleChange(!checked)}
      className={`flex gap-2 items-center justify-between text-left text-base transition ${
        item.parent_key ? "ml-2" : "pt-3"
      } ${
        checked
          ? "text-text"
          : "text-text-muted"
      } ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-success"}`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded border ${
          checked
            ? "border-success bg-success text-background"
            : "border-input-border"
        }`}
      >
        {checked && <Check size={12} />}
      </span>

      <span>{item.title}</span>
    </button>
  );
}
