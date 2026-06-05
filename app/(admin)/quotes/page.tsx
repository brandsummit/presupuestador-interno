import { supabase } from "@/lib/supabase";
import PageHeader from "@/components/PageHeader";
import SearchInput from '@/components/SearchInput'
import QuoteCard from '@/components/QuoteCard'
import { Plus } from 'lucide-react'

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
      <PageHeader
        title="Quotes"
        buttonText="New Quote"
        icon={<Plus size={16} />}
      />
      
      <SearchInput placeholder="Search quote..." />

      <div className="space-y-4">
        {quotes?.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
    </>
  );
}
