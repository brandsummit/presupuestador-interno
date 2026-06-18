import Image from "next/image";

import { Quote } from "@/components/quote-editor/types";
import { getProposalTranslations } from "./proposal-translations";

type Props = {
  quote: Quote;
};

export default function ProposalFooter({ quote }: Props) {
  const t = getProposalTranslations(quote.language);

  return (
    <footer className="px-10 pb-10">
      <div className="grid gap-16 md:grid-cols-2">
        <div />

        <div>
          <h2 className="font-display text-6xl font-bold">
            {t.footer.title}
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <p className="text-base leading-snug md:col-span-2">
              {t.footer.description}
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <a
              href="tel:+34677485946"
              className="flex min-h-16 items-center justify-center rounded-md bg-prop-text px-6 text-center text-base text-prop-background transition hover:opacity-85"
            >
              {t.footer.phonePrefix} +34 677 48 59 46
            </a>

            <a
              href="mailto:david@brandsummit.es"
              className="flex min-h-16 items-center justify-center rounded-md bg-prop-text px-6 text-center text-base text-prop-background transition hover:opacity-85"
            >
              david@brandsummit.es
            </a>
          </div>
        </div>
      </div>

      <div className="mt-60 grid items-start gap-16 md:grid-cols-2">
        <div>
          <Image
            src="/brandsummit-logo-slogan.svg"
            alt="Brandsummit — Food Design Thinkers"
            width={420}
            height={110}
            className="h-auto w-full max-w-[320px]"
          />
        </div>

        <p className="max-w-4xl text-4xl leading-[1.18] md:text-5xl xl:text-6xl">
          {t.footer.manifesto}
        </p>
      </div>
    </footer>
  );
}