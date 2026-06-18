"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Quote } from "@/components/quote-editor/types";
import { acceptProposal } from "./actions";
import { getProposalTranslations } from "./proposal-translations";

type Props = {
  quote: Quote;
};

export default function ProposalActions({ quote }: Props) {
  const router = useRouter();
  const t = getProposalTranslations(quote.language);

  const cards = [
    {
      type: "action",
      number: "01",
      title: t.actions.acceptTitle,
      description: t.actions.acceptDescription,
    },
    {
      type: "action",
      number: "02",
      title: t.actions.clientTitle,
      description: t.actions.clientDescription,
    },
    {
      type: "information",
      number: "03",
      title: t.actions.contractTitle,
      description: t.actions.contractDescription,
    },
    {
      type: "information",
      number: "04",
      title: t.actions.briefTitle,
      description: t.actions.briefDescription,
    },
  ] as const;

  const [modalOpen, setModalOpen] = useState(false);
  const [accepted, setAccepted] = useState(quote.status === "accepted");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!quote.show_actions) return null;

  function handleAccept() {
    setError(null);

    startTransition(async () => {
      const result = await acceptProposal({
        quoteId: quote.id,
        token: quote.token || "",
      });

      if (!result.ok) {
        setError(result.error ?? t.actions.error);
        return;
      }

      setAccepted(true);
      setCompleted(true);
      router.refresh();
    });
  }

  function closeModal() {
    if (isPending) return;

    setModalOpen(false);
    setCompleted(false);
    setError(null);
  }

  return (
    <>
      <section className="px-10">
        <h2 className="font-display text-6xl font-bold">
          {t.actions.title}
        </h2>

        <div className="mt-24 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const firstCard = index === 0;
            const lastCard = index === cards.length - 1;

            return (
              <article
                key={card.number}
                className={`
                  flex min-h-[480px] flex-col justify-between gap-12
                  bg-prop-text p-10 text-prop-background
                  ${
                    firstCard
                      ? "rounded-[36px] xl:rounded-l-[36px] xl:rounded-r-xl"
                      : lastCard
                        ? "rounded-[36px] xl:rounded-l-xl xl:rounded-r-[36px]"
                        : "rounded-[36px] xl:rounded-xl"
                  }
                `}
              >
                <div>
                  <div className="flex items-center justify-between gap-6 text-xs uppercase">
                    <span>
                      {card.type === "action"
                        ? t.actions.action
                        : t.actions.information}
                    </span>

                    <span>{card.number}</span>
                  </div>

                  <h3 className="mt-12 text-3xl leading-none">
                    {card.title}
                  </h3>

                  <p className="mt-12 max-w-sm text-base leading-snug text-prop-background/70">
                    {card.description}
                  </p>
                </div>

                {index === 0 && (
                  <button
                    type="button"
                    disabled={accepted}
                    onClick={() => setModalOpen(true)}
                    className={`
                      flex min-h-16 w-full items-center justify-center rounded-md
                      px-6 text-center text-base transition
                      ${
                        accepted
                          ? "cursor-default bg-prop-background/25 text-prop-background/60"
                          : "cursor-pointer bg-prop-background text-prop-text hover:opacity-85"
                      }
                    `}
                  >
                    {accepted
                      ? t.actions.accepted
                      : t.actions.acceptButton}
                  </button>
                )}

                {index === 1 && (
                  <a
                    href="https://business.brandsummit.es/join/"
                    className="flex min-h-16 w-full items-center justify-center rounded-md bg-prop-background px-6 text-center text-base text-prop-text transition hover:opacity-85"
                  >
                    {t.actions.clientPortal}
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accept-proposal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="w-full max-w-xl rounded-[36px] bg-prop-text p-10 text-prop-background">
            {completed ? (
              <>
                <p className="text-xs uppercase">
                  {t.actions.successLabel}
                </p>

                <h3
                  id="accept-proposal-title"
                  className="mt-8 font-display text-5xl font-bold leading-none"
                >
                  {t.actions.successTitle}
                </h3>

                <p className="mt-8 text-base leading-snug text-prop-background/70">
                  {t.actions.successDescription}
                </p>

                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-12 min-h-14 w-full cursor-pointer rounded-md bg-prop-background px-6 text-prop-text"
                >
                  {t.actions.close}
                </button>
              </>
            ) : (
              <>
                <p className="text-xs uppercase">
                  {t.actions.confirmLabel}
                </p>

                <h3
                  id="accept-proposal-title"
                  className="mt-8 font-display text-5xl font-bold leading-none"
                >
                  {t.actions.thanksTitle}
                </h3>

                <p className="mt-8 text-base leading-snug text-prop-background/70">
                  {t.actions.confirmDescription}
                </p>

                <p className="mt-8 rounded-xl border border-prop-background/20 p-5 text-sm leading-snug text-prop-background/55">
                  {t.actions.legalNotice}
                </p>

                {error && (
                  <p className="mt-6 text-sm text-danger">
                    {error}
                  </p>
                )}

                <div className="mt-12 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={closeModal}
                    className="min-h-14 cursor-pointer rounded-md border border-prop-background/30 px-6 disabled:cursor-wait disabled:opacity-50"
                  >
                    {t.actions.back}
                  </button>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={handleAccept}
                    className="min-h-14 cursor-pointer rounded-md bg-prop-background px-6 text-prop-text disabled:cursor-wait disabled:opacity-50"
                  >
                    {isPending
                      ? t.actions.confirming
                      : t.actions.confirmButton}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}