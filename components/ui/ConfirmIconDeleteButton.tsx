"use client";

import { useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";

type Props = {
  disabled?: boolean;
  onConfirm: () => void;
};

export default function ConfirmIconDeleteButton({
  disabled,
  onConfirm,
}: Props) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;

    const timeout = setTimeout(() => {
      setConfirming(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [confirming]);

  const handleClick = () => {
    if (disabled) return;

    if (!confirming) {
      setConfirming(true);
      return;
    }

    onConfirm();
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`flex items-center justify-center rounded-lg px-3 transition-colors ${
        confirming
          ? "border border-danger text-danger"
          : "border border-transparent text-danger hover:border hover:border-danger hover:bg-danger hover:text-background"
      }`}
    >
      {confirming ? <Check size={16} /> : <Trash2 size={16} />}
    </button>
  );
}