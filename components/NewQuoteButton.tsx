import { Plus } from "lucide-react";
import { createQuote } from "@/app/(admin)/quotes/actions";

export default function NewQuoteButton() {
  return (
    <form action={createQuote}>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg border border-text px-4 py-3 text-base bg-text text-background hover:bg-background hover:text-text"
      >
        <Plus size={16} />
        New Quote
      </button>
    </form>
  );
}