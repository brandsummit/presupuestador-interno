"use client";

import { Quote } from "./types";
import SectionHeader from "./SectionHeader";

type Props = {
  quote: Quote;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function ActionsSection({
  enabled,
  onToggle,
}: Props) {
  return (
    <section className="rounded-lg bg-background-light p-6">
      <SectionHeader
        title="Actions"
        enabled={enabled}
        onToggle={onToggle}
      />

      <p className={enabled ? "text-base text-text-muted" : "text-base text-text-muted opacity-50"}>
        Nada que editar aquí. Este control solo sirve para mostrar u ocultar el
        módulo en la propuesta.
      </p>
    </section>
  );
}