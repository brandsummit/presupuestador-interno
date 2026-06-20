import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { Quote } from "@/components/quote-editor/types";

import ProposalLayout from "@/components/proposal/ProposalLayout";

type ProposalPageProps = {
  params: Promise<{
    token: string;
  }>;
  searchParams: Promise<{
    view?: string;
  }>;
};

export default async function ProposalPage({
  params,
  searchParams,
}: ProposalPageProps) {
  const { token } = await params;
  const { view } = await searchParams;

  const { data: quote, error } = await supabase
    .from("quotes")
    .select(
      `
      *,
      clients (*),

      quote_sections (
        *,
        quote_items (*)
      ),

      quote_process_items (*),

      timeline_areas (
        *,
        timeline_items (*)
      ),

      summary_payment_items (*)
      `,
    )
    .eq("token", token)
    .single();

  if (error || !quote) {
    notFound();
  }

  const typedQuote = quote as Quote;

  typedQuote.quote_sections = typedQuote.quote_sections
    ?.sort((a, b) => (a.position || 0) - (b.position || 0))
    .map((section) => ({
      ...section,
      quote_items: section.quote_items?.sort(
        (a, b) => (a.position || 0) - (b.position || 0),
      ),
    }));

  typedQuote.timeline_areas = typedQuote.timeline_areas
    ?.sort((a, b) => (a.position || 0) - (b.position || 0))
    .map((area) => ({
      ...area,
      timeline_items: area.timeline_items?.sort(
        (a, b) => (a.position || 0) - (b.position || 0),
      ),
    }));

  typedQuote.summary_payment_items =
    typedQuote.summary_payment_items?.sort(
      (a, b) => (a.position || 0) - (b.position || 0),
    ) || [];

  return (
    <ProposalLayout
      quote={typedQuote}
      viewMode={view === "simplified" ? "simplified" : "full"}
    />
  );
}