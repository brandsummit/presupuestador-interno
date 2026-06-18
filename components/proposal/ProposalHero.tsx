import Image from "next/image";

import { Quote } from "@/components/quote-editor/types";

type Props = {
  quote: Quote;
};

export default function ProposalHero({ quote }: Props) {
  return (
    <header className="overflow-hidden px-10 pt-10">
      <div className="relative w-full">
        <Image
          src="/brandsummit-logo.svg"
          alt="Brandsummit"
          width={1600}
          height={260}
          priority
          className="h-auto w-full"
        />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        <div className="text-base leading-snug">
          <p>Propuesta {quote.number}</p>
          <p>{quote.title || "Untitled proposal"}</p>
          <p>{quote.clients?.name || "Cliente"}</p>
        </div>

        <div />

        <p className="max-w-sm text-base leading-snug">
          Brandsummit es un estudio especializado en la construcción, activación
          y gestión de marcas de alimentación y bebida, desde las áreas de
          branding, packaging, interior y digital.
        </p>

        <p className="max-w-sm text-base leading-snug">
          Un estudio con una metodología propia de trabajo que garantiza
          tiempos, estrategia y creatividad. Con una profunda toma de decisiones
          para dotar de coherencia y consistencia a las marcas.
        </p>
      </div>
    </header>
  );
}