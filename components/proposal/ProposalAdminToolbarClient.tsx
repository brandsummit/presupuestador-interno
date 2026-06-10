"use client";

import { ArrowRight, Copy, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  token: string;
};

export default function ProposalAdminToolbarClient({ token }: Props) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const isSimple = pathname.endsWith("/simple");

  async function handleCopyUrl() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1600);
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 mb-10 flex w-full justify-center px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 items-center gap-1 rounded-xl bg-background-lighter p-1.5">
          <span className="px-3 text-xs text-text">Viewing:</span>

          <a
            href={`/proposal/${token}`}
            className={`
              flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs hover:opacity-60
              ${
                !isSimple
                  ? "border-success text-text"
                  : "border-input-border text-text-muted"
              }
            `}
          >
            <span
              className={`
                h-2 w-2 rounded-full border
                ${!isSimple ? "border-success bg-success" : "border-text-muted"}
              `}
            />
            Full
          </a>

          <a
            href={`/proposal/${token}/simple`}
            className={`
              flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs hover:opacity-60
              ${
                isSimple
                  ? "border-success text-text"
                  : "border-input-border text-text-muted"
              }
            `}
          >
            <span
              className={`
                h-2 w-2 rounded-full border
                ${isSimple ? "border-success bg-success" : "border-text-muted"}
              `}
            />
            Simplified
          </a>
        </div>

        <div className="flex h-11 items-center gap-1 rounded-xl bg-background-lighter p-1.5">
          <button
            type="button"
            onClick={handleCopyUrl}
            className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-input-border bg-text px-3 text-xs text-background hover:opacity-60"
          >
            <Copy size={14} />
            {copied ? "Copied" : "Copy URL"}
          </button>

          <button
            disabled
            className="flex h-8 cursor-not-allowed items-center gap-1.5 rounded-lg border border-input-border bg-success px-3 text-xs text-background opacity-50"
          >
            <Send size={14} />
            Send by email
          </button>
        </div>
      </div>
    </div>
  );
}