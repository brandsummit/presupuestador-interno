"use client";

import { Copy, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { sendProposalEmail } from "@/app/actions/send-proposal-email";

type Props = {
  token: string;
  quoteId: number;
  quoteNumber?: string | null;
  quoteTitle?: string | null;
  clientEmail?: string | null;
};

export default function ProposalAdminToolbarClient({
  token,
  quoteId,
  quoteNumber,
  quoteTitle,
  clientEmail,
}: Props) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [to, setTo] = useState(clientEmail || "");
  const [message, setMessage] = useState(
    "Te compartimos la propuesta que hemos preparado. Puedes revisarla desde el siguiente enlace.",
  );
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isSimple = pathname.endsWith("/simple");

  const defaultSubject = `Propuesta ${quoteNumber || ""}${
    quoteTitle ? ` - ${quoteTitle}` : ""
  }`;

  const [subject, setSubject] = useState(defaultSubject);

  async function handleCopyUrl() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1600);
  }

  function handleSend() {
    setStatus(null);

    startTransition(async () => {
      const result = await sendProposalEmail({
        quoteId,
        to,
        subject,
        message,
        proposalUrl: window.location.href,
      });

      if (!result.ok) {
        setStatus(result.error || "Error sending email");
        return;
      }

      setStatus("Email sent");
      setModalOpen(false);
    });
  }

  return (
    <>
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
                  ${
                    !isSimple
                      ? "border-success bg-success"
                      : "border-text-muted"
                  }
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
                  ${
                    isSimple
                      ? "border-success bg-success"
                      : "border-text-muted"
                  }
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
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-input-border bg-success px-3 text-xs text-background hover:opacity-60"
            >
              <Send size={14} />
              Send by email
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-background/80 px-6">
          <div className="w-full max-w-md rounded-2xl bg-background-lighter p-5 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase text-text">
                Send proposal
              </h3>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-text-muted hover:text-text"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs text-text-muted">
                  Recipient email
                </label>
                <input
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                  placeholder="client@email.com"
                  className="h-10 w-full rounded-lg border border-input-border bg-background px-3 text-sm text-text outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-text-muted">
                  Subject
                </label>
                <input
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="h-10 w-full rounded-lg border border-input-border bg-background px-3 text-sm text-text outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-text-muted">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={5}
                  className="w-full resize-none rounded-lg border border-input-border bg-background px-3 py-3 text-sm text-text outline-none"
                />
              </div>

              {status && <p className="text-xs text-text-muted">{status}</p>}

              <button
                type="button"
                disabled={isPending || !to || !subject}
                onClick={handleSend}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-success px-4 text-sm text-background hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={14} />
                {isPending ? "Sending..." : "Send proposal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}