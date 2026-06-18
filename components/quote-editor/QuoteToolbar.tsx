import { ArrowRight, Copy } from "lucide-react";

import {
  cloneQuote,
  deleteQuote,
  rectifyQuote,
  updateQuoteLanguage,
} from "@/app/(admin)/quote/duplicate-actions";

import ConfirmDeleteButton from "@/components/ui/ConfirmDeleteButton";

type Props = {
  token: string | null;
  quoteId: string;
  language: "es" | "en";
};

export default function QuoteToolbar({
  quoteId,
  token,
  language,
}: Props) {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 z-50 mb-10 flex w-full justify-center pl-76">
      <div className="pointer-events-auto flex items-center gap-3">
        <div className="flex h-11 items-center gap-4 rounded-xl border border-border bg-background-lighter px-5">
          <form action={updateQuoteLanguage.bind(null, quoteId, "es")}>
            <button
              type="submit"
              className={`cursor-pointer text-xs ${
                language === "es"
                  ? "border-b border-text text-text"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Esp
            </button>
          </form>

          <form action={updateQuoteLanguage.bind(null, quoteId, "en")}>
            <button
              type="submit"
              className={`cursor-pointer text-xs ${
                language === "en"
                  ? "border-b border-text text-text"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Eng
            </button>
          </form>
        </div>

        <div className="flex h-11 items-center gap-1 rounded-xl bg-background-lighter p-1.5">
          <span className="px-3 text-xs text-text">Actions:</span>

          <form action={cloneQuote.bind(null, quoteId)}>
            <button
              type="submit"
              className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-input-border bg-text px-3 text-xs text-background hover:opacity-60"
            >
              <Copy size={14} />
              Clone
            </button>
          </form>

          <form action={rectifyQuote.bind(null, quoteId)}>
            <button
              type="submit"
              className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-input-border bg-text px-3 text-xs text-background hover:opacity-60"
            >
              <Copy size={14} />
              Rectify
            </button>
          </form>

          <ConfirmDeleteButton
            action={deleteQuote.bind(null, String(quoteId))}
          />
        </div>

        <div className="flex h-11 items-center gap-1 rounded-xl bg-background-lighter p-1.5">
          <span className="px-3 text-xs text-text">View quote:</span>

          <a
            href={token ? `/proposal/${token}` : "#"}
            target="_blank"
            rel="noreferrer"
            className="flex h-full items-center gap-1.5 rounded-lg border border-input-border bg-text px-3 text-xs text-background hover:opacity-60"
          >
            <ArrowRight size={14} />
            Full
          </a>

          <a
            href={token ? `/proposal/${token}?view=simplified` : "#"}
            target="_blank"
            rel="noreferrer"
            className="flex h-full items-center gap-1.5 rounded-lg border border-input-border bg-text px-3 text-xs text-background hover:opacity-60"
          >
            <ArrowRight size={14} />
            Simplified
          </a>

          <button
            disabled
            className="flex h-full cursor-not-allowed items-center gap-1.5 rounded-lg border border-input-border bg-text px-3 text-xs text-text-muted opacity-50"
          >
            <ArrowRight size={14} />
            Gen. PDF
          </button>
        </div>
      </div>
    </div>
  );
}