"use client";

type Props = {
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function Switch({ enabled, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(!enabled)}
      className={`relative h-6 w-11 rounded-full transition cursor-pointer ${
        enabled ? "bg-success" : "bg-text-muted"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-background transition cursor-pointer ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}