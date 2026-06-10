import { ArrowRight, Copy } from "lucide-react";
import {
  cloneQuote,
  deleteQuote,
  rectifyQuote,
} from "@/app/(admin)/quote/duplicate-actions";

type Props = {
  token: string | null;
  quoteId: string;
};

import ConfirmDeleteButton from "@/components/ui/ConfirmDeleteButton";

export default function QuoteToolbar({ quoteId, token }: Props) {
  return (
    <div className="fixed bottom-0 mb-10 left-0 w-full z-50 pl-76 flex justify-center pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="flex bg-background-lighter items-center gap-4 rounded-xl border border-border px-5 h-11">
          <button className="border-b border-text text-xs text-text cursor-pointer">
            Esp
          </button>

          <button className="text-xs text-text-muted cursor-not-allowed">
            Eng
          </button>

          <button className="text-xs text-text-muted cursor-not-allowed">
            Fra
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-xl h-11 p-1.5 bg-background-lighter">
          <span className="text-xs text-text px-3">Actions:</span>

          <form action={cloneQuote.bind(null, quoteId)}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-text border border-input-border px-3 h-8 text-xs text-background hover:opacity-60 cursor-pointer"
            >
              <Copy size={14} />
              Clone
            </button>
          </form>

          <form action={rectifyQuote.bind(null, quoteId)}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-text border border-input-border px-3 h-8 text-xs text-background hover:opacity-60 cursor-pointer"
            >
              <Copy size={14} />
              Rectify
            </button>
          </form>

          <ConfirmDeleteButton
            action={deleteQuote.bind(null, String(quoteId))}
          />
        </div>

        <div className="flex items-center gap-1 rounded-xl h-11 p-1.5 bg-background-lighter">
          <span className="text-xs text-text px-3">View quote:</span>

          <a
            href={token ? `/proposal/${token}` : "#"}
            target="_blank"
            className="flex items-center gap-1.5 rounded-lg bg-text border border-input-border px-3 h-full text-xs text-background hover:opacity-60"
          >
            <ArrowRight size={14} />
            Full
          </a>

          <a
            href={token ? `/proposal/${token}/simple` : "#"}
            target="_blank"
            className="flex items-center gap-1.5 rounded-lg bg-text border border-input-border px-3 h-full text-xs text-background hover:opacity-60"
          >
            <ArrowRight size={14} />
            Simplified
          </a>

          <button
            disabled
            className="flex items-center gap-1.5 rounded-lg bg-text border border-input-border px-3 h-full text-xs text-text-muted opacity-50 cursor-not-allowed"
          >
            <ArrowRight size={14} />
            Gen. PDF
          </button>
        </div>
      </div>
    </div>
  );
}
