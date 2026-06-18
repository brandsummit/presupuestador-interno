import Image from "next/image";

import { Quote } from "@/components/quote-editor/types";
import { getProposalTranslations } from "./proposal-translations";

type Props = {
  quote: Quote;
};

export default function ProposalHero({ quote }: Props) {
  const t = getProposalTranslations(quote.language);

  return (
    <header className="overflow-hidden px-6 pt-6">
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

      <div className="mt-10 grid gap-10 md:grid-cols-4 md:gap-4">
        <div className="text-sm leading-snug">
          <p>
            {t.hero.proposal} {quote.number}
          </p>

          <p>{quote.title || t.hero.untitled}</p>

          <p>{quote.clients?.name || t.hero.client}</p>
        </div>

        <div />

        <p className="max-w-sm text-sm leading-snug">
          {t.hero.description}
        </p>

        <p className="max-w-sm text-sm leading-snug">
          {t.hero.methodology}
        </p>
      </div>
    </header>
  );
}