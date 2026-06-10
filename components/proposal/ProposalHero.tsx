import Image from "next/image";

import { Quote } from "@/components/quote-editor/types";

type Props = {
  quote: Quote;
};

export default function ProposalHero({ quote }: Props) {
  return (
    <header className="relative flex min-h-screen flex-col justify-between overflow-hidden p-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="leading-snug text-sm">
          <p>Propuesta {quote.number}</p>
          <p>{quote.title || "Untitled proposal"}</p>
          <p>{quote.clients?.name || "Cliente"}</p>
        </div>

        <div className="dummy"></div>

        <p className="max-w-sm leading-snu text-sm">
          Brandsummit es un estudio especializado en la construcción, activación
          y gestión de marcas de alimentación y bebida, desde las áreas de
          branding, packaging, interior y digital.
        </p>

        <p className="max-w-sm leading-snug text-sm">
          Un estudio con una metodología propia de trabajo que garantiza
          tiempos, estrategia y creatividad. Con una profunda toma de decisiones
          para dotar de coherencia y consistencia a las marcas.
        </p>
      </div>

      <div className="space-y-14">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="dummy"></div>
          <div className="dummy"></div>
          <div className="dummy"></div>
          <p className="text-sm font-bold uppercase">Food Design Thinkers</p>
        </div>

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
      </div>
    </header>
  );
}
