import { supabase } from "@/lib/supabase";
import SearchInput from "@/components/SearchInput";
import QuoteCard from "@/components/QuoteCard";
import NewQuoteButton from "@/components/NewQuoteButton";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function QuotesPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const search = q.toLowerCase().trim();

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

  const filteredQuotes = quotes?.filter((quote) => {
    if (!search) return true;

    return [
      quote.number,
      quote.title,
      quote.description,
      quote.status,
      quote.clients?.name,
      quote.clients?.company,
      quote.clients?.email,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(search));
  });

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-4xl font-bold text-text">Quotes</h1>

        <NewQuoteButton />
      </div>

      <SearchInput placeholder="Search quote..." />

      <div className="space-y-4">
        {filteredQuotes?.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
    </>
  );
}