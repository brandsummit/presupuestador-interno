import { Eye, Copy, Pencil } from "lucide-react";
import Link from "next/link";
import {
  cloneQuote,
  deleteQuote,
  rectifyQuote,
} from "@/app/(admin)/quote/duplicate-actions";
import ConfirmDeleteButton from "@/components/ui/ConfirmDeleteButton";

type QuoteStatus = "draft" | "sent" | "accepted" | "rejected";

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
    quote_sections?: {
      quote_items?: {
        price?: number | null;
      }[];
    }[];
  };
};

const statusColor: Record<QuoteStatus, string> = {
  draft: "text-text",
  sent: "text-warning",
  accepted: "text-success",
  rejected: "text-danger",
};

const statusBgColor: Record<QuoteStatus, string> = {
  draft: "bg-text",
  sent: "bg-warning",
  accepted: "bg-success",
  rejected: "bg-danger",
};

const statusGradColor: Record<QuoteStatus, string> = {
  draft: "bg-grad-gray",
  sent: "bg-grad-warning",
  accepted: "bg-grad-success",
  rejected: "bg-grad-danger",
};

function formatDate(date: string | null) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("es-ES");
}

function formatPrice(value: number) {
  const number = Math.round(Number(value || 0));

  return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
}

function getQuoteTotal(quote: QuoteCardProps["quote"]) {
  return (
    quote.quote_sections?.reduce((sum, section) => {
      const sectionTotal =
        section.quote_items?.reduce((itemSum, item) => {
          return itemSum + Number(item.price || 0);
        }, 0) || 0;

      return sum + sectionTotal;
    }, 0) || 0
  );
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  const status = quote.status ?? "draft";
  const total = getQuoteTotal(quote);

  return (
    <article className={`relative flex flex-col gap-6 rounded-lg bg-background-light py-5 p-6 ${statusGradColor[status]}`}>
      
      <div className="flex justify-between items-end pb-6 text-text border-b border-border-light">{/* Main */}
        
        <div className="space-y-6">
          <h3 className="text-3xl font-display font-bold leading-none">#{quote.number}</h3>
          <div>
            <p className="text-lg">{quote.title}</p>
            <p className="text-sm">{quote.description}</p>
          </div>
        </div>

        <div className="flex gap-6 text-right">
            <div className="w-50">
              <p className="text-xs uppercase">Date</p>
              <p className="text-lg">{formatDate(quote.created_at)}</p>
            </div>

            <div className="w-50">
              <p className="text-xs uppercase">Client</p>
              <p className="text-lg">{quote.clients?.name || "—"}</p>
            </div>

            <div className="w-50">
              <p className="text-xs uppercase">Total</p>
              <p className="text-lg">{formatPrice(total)}</p>
            </div>
        </div>

      </div>{/* Main */}
      
      <div className="flex justify-between text-text">{/* Tools */}
        <div className="flex gap-2 items-center">
          <span className={`size-2 rounded-4xl ${statusBgColor[status]}`}></span>
          <p className={`text-xs font-semibold uppercase ${statusColor[status]}`}>{status}</p>
        </div>

        <div className="flex gap-8">
          <div className="flex gap-3 items-center">
            <p className="text-xs">View:</p>
            <div className="flex gap-2">

            {quote.token && (
              <Link
                href={`/proposal/${quote.token}?view=full`}
                target="_blank"
                className="flex items-center gap-1.5 rounded-lg bg-text border border-input-border px-3 h-8 text-xs text-background hover:opacity-60 cursor-pointer"
              >
                <Eye size={14} />
                Full version
              </Link>
            )}

            {quote.token && (
              <Link
                href={`/proposal/${quote.token}?view=simplified`}
                target="_blank"
                className="flex items-center gap-1.5 rounded-lg bg-text border border-input-border px-3 h-8 text-xs text-background hover:opacity-60 cursor-pointer"
              >
                <Eye size={14} />
                Simple version
              </Link>
            )}

            </div>
          </div>

          <div className="flex gap-3 items-center">
            <p className="text-xs">Actions:</p>
            <div className="flex gap-2">

              <Link
                href={`/quote/${quote.id}`}
                className="flex items-center gap-1.5 rounded-lg bg-text border border-input-border px-3 h-8 text-xs text-background hover:opacity-60 cursor-pointer"
              >
                <Pencil size={14} />
                Edit
              </Link>

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

              <ConfirmDeleteButton
                action={deleteQuote.bind(null, String(quote.id))}
              />

            </div>
          </div>
        </div>
      </div>{/* Tools */}
    </article>
  );
}