"use client";

import SectionHeader from "./SectionHeader";

type Props = {
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function ProcessSection({ enabled, onToggle }: Props) {
  return (
    <section className={`rounded-lg bg-background-light p-6 ${!enabled ? "opacity-50" : ""}`}>
      <SectionHeader title="Process" enabled={enabled} onToggle={onToggle} />

      <p className="text-sm text-text-muted">
        This section will be generated from a fixed structure in the code.
      </p>
    </section>
  );
}