import { Eye, Copy, Pencil } from "lucide-react";
import Link from "next/link";
import {
  cloneQuote,
  deleteQuote,
  rectifyQuote,
} from "@/app/(admin)/quote/duplicate-actions";
import ConfirmDeleteButton from "@/components/ui/ConfirmDeleteButton";

type QuoteStatus = "draft" | "sent" | "viewed" | "accepted" | "rejected";

type QuoteCardProps = {
  quote: {
    id: number;
    number: string;
    title: string;
    description: string | null;
    status: QuoteStatus | null;
    token: string | null;
    created_at: string | null;
    sent_at: string | null;
    clients?: {
      name: string | null;
    } | null;
  };
};

const statusColor: Record<QuoteStatus, string> = {
  draft: "text-text",
  sent: "text-text",
  viewed: "text-text",
  accepted: "text-success",
  rejected: "text-danger",
};

const statusBarColor: Record<QuoteStatus, string> = {
  draft: "bg-text",
  sent: "bg-text",
  viewed: "bg-text",
  accepted: "bg-success",
  rejected: "bg-danger",
};

function formatDate(date: string | null) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("es-ES");
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  const status = quote.status ?? "draft";

  return (
    <article className="relative grid grid-cols-[auto_2fr_1fr_0.5fr_0.5fr_auto] items-center gap-4 rounded-lg bg-background-light py-5 pr-8 pl-5">
      <span className={`h-full w-1 rounded-full ${statusBarColor[status]}`} />

      <div>
        <h3 className="text-3xl font-display font-bold leading-none">
          #{quote.number}
        </h3>
        <p className="mt-2 text-base">{quote.title}</p>
        <p className="text-sm text-text-muted">{quote.description}</p>
      </div>

      <div className="text-sm">
        <p>
          <span className="inline-block w-18">Created:</span>{" "}
          {formatDate(quote.created_at)}
        </p>
        <p className="text-text-muted">
          <span className="inline-block w-18">Sent:</span>{" "}
          {formatDate(quote.sent_at)}
        </p>
      </div>

      <p className="text-sm uppercase">{quote.clients?.name}</p>

      <p className={`text-xs font-semibold uppercase ${statusColor[status]}`}>
        {status}
      </p>

      <div className="flex flex-col gap-2 pl-4">
        <div className="flex justify-end gap-2">
          <Link
            href={`/quote/${quote.id}`}
            className="flex items-center justify-center gap-2 rounded-lg border border-input-border h-8 px-3 text-xs hover:border-text hover:bg-text hover:text-background-light"
          >
            <Pencil size={14} />
            Edit
          </Link>

          {quote.token && (
            <Link
              href={`/proposal/${quote.token}?view=full`}
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-lg border border-success bg-success h-8 px-3 text-xs text-background hover:border-success hover:bg-background-light hover:text-success"
            >
              <Eye size={14} />
              View & send
            </Link>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <form action={cloneQuote.bind(null, String(quote.id))}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-text border border-input-border px-3 h-8 text-xs text-background hover:opacity-60 cursor-pointer"
            >
              <Copy size={14} />
              Clone
            </button>
          </form>

          <form action={rectifyQuote.bind(null, String(quote.id))}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-text border border-input-border px-3 h-8 text-xs text-background hover:opacity-60 cursor-pointer"
            >
              <Copy size={14} />
              Rectify
            </button>
          </form>

          <ConfirmDeleteButton action={deleteQuote.bind(null, String(quote.id))} />
        </div>
      </div>
    </article>
  );
}