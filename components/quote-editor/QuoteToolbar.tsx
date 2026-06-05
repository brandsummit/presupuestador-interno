import { ArrowRight } from "lucide-react";

type Props = {
  token: string | null;
};

export default function QuoteToolbar({ token }: Props) {
  return (
    <div className="fixed bottom-0 mb-10 left-0 w-full z-50 pl-76 flex justify-center">
      <div className="flex items-center gap-4">
        <div className="flex bg-background-lighter items-center gap-6 rounded-xl border border-border px-6 h-14">
          <button className="border-b border-text text-sm text-text">
            Esp
          </button>

          <button className="text-sm text-text-muted">
            Eng
          </button>

          <button className="text-sm text-text-muted">
            Fra
          </button>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl h-14 p-1.5 bg-background-lighter">
          <span className="text-sm text-text px-5">
            View quote:
          </span>

          <a
            href={token ? `/proposal/${token}` : "#"}
            target="_blank"
            className="flex items-center gap-3 rounded-lg bg-text border border-input-border px-6 h-full text-sm text-background hover:opacity-60"
          >
            <ArrowRight size={18} />
            Full
          </a>

          <a
            href={token ? `/proposal/${token}/simple` : "#"}
            target="_blank"
            className="flex items-center gap-3 rounded-lg bg-text border border-input-border px-6 h-full text-sm text-background hover:opacity-60"
          >
            <ArrowRight size={18} />
            Simplified
          </a>

          <button
            disabled
            className="flex items-center gap-3 rounded-lg bg-text border border-input-border px-6 h-full text-sm text-text-muted opacity-50"
          >
            <ArrowRight size={18} />
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}