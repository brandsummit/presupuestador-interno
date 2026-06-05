"use client";

import Switch from "@/components/ui/Switch";

type Props = {
  title: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function SectionHeader({ title, enabled, onToggle }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-xl font-display font-bold text-text">{title}</h2>
      <Switch enabled={enabled} onToggle={onToggle} />
    </div>
  );
}