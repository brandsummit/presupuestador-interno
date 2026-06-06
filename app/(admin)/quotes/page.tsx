import { supabase } from "@/lib/supabase";
import SearchInput from "@/components/SearchInput";
import QuoteCard from "@/components/QuoteCard";
import NewQuoteButton from "@/components/NewQuoteButton";

export default async function QuotesPage() {
  const { data: quotes, error } = await supabase
    .from("quotes")
    .select(
      `
      *,
      clients(*)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-4xl font-bold text-text">Quotes</h1>

        <NewQuoteButton />
      </div>

      <SearchInput placeholder="Search quote..." />

      <div className="space-y-4">
        {quotes?.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
    </>
  );
}
