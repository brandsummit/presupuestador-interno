"use client";

import SectionHeader from "./SectionHeader";

type Props = {
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function TimelineSection({ enabled, onToggle }: Props) {
  return (
    <section className={`rounded-lg bg-background-light p-6 ${!enabled ? "opacity-50" : ""}`}>
      <SectionHeader title="Tiempos" enabled={enabled} onToggle={onToggle} />

      <p className="text-sm text-text-muted">
        Timeline generado a partir de fases y partidas activas.
      </p>
    </section>
  );
}