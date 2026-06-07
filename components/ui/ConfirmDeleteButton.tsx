"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

type ConfirmDeleteButtonProps = {
  action: () => void;
  label?: string;
  confirmLabel?: string;
};

export default function ConfirmDeleteButton({
  action,
  label = "Delete",
  confirmLabel = "Confirm?",
}: ConfirmDeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <form action={action}>
        <button
          type="submit"
          className="flex h-8 items-center gap-1.5 rounded-lg border border-danger bg-content px-3 text-xs text-danger hover:opacity-80"
        >
          <Trash2 size={14} />
          {confirmLabel}
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="flex h-8 items-center gap-1.5 rounded-lg border border-danger px-3 text-xs bg-danger text-background hover:opacity-70"
    >
      <Trash2 size={14} />
      {label}
    </button>
  );
}