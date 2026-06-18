"use client";

import SectionHeader from "./SectionHeader";

type Props = {
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function ProcessSection({ enabled, onToggle }: Props) {
  return (
    <section className="rounded-lg bg-background-light p-6">
      <SectionHeader title="Process" enabled={enabled} onToggle={onToggle} />
      <div className={!enabled ? "opacity-50 cursor-not-allowed" : ""}>
        <div className={!enabled ? "pointer-events-none" : ""}>
          <p className="text-base text-text-muted">
            This section will be generated from a fixed structure in the code.
          </p>
        </div>
      </div>
    </section>
  );
}
