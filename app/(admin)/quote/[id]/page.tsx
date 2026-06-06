import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

import QuoteEditorHeader from "@/components/quote-editor/QuoteEditorHeader";
import QuoteInfoGrid from "@/components/quote-editor/QuoteInfoGrid";
import ObjectiveSection from "@/components/quote-editor/ObjectiveSection";
import PhasesSection from "@/components/quote-editor/PhasesSection";
import ProcessSection from "@/components/quote-editor/ProcessSection";
import CostsSection from "@/components/quote-editor/costs/CostsSection";
import TimelineSection from "@/components/quote-editor/TimelineSection";
import SummarySection from "@/components/quote-editor/SummarySection";
import QuoteToolbar from "@/components/quote-editor/QuoteToolbar";

import { Quote } from "@/components/quote-editor/types";
import { getCostTotal } from "@/components/quote-editor/utils";

type QuotePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params;

  const { data: quote, error } = await supabase
    .from("quotes")
    .select(
      `
      *,
      clients(*),
      quote_sections(
        *,
        quote_items(*)
        )
    `,
    )
    .eq("id", id)
    .single();

  if (error || !quote) {
    notFound();
  }

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name")
    .order("name", { ascending: true });

  const typedQuote = quote as Quote;

  typedQuote.quote_sections = typedQuote.quote_sections
    ?.sort((a, b) => (a.position || 0) - (b.position || 0))
    .map((section) => ({
      ...section,
      quote_items: section.quote_items?.sort(
        (a, b) => (a.position || 0) - (b.position || 0),
      ),
    }));

  const costTotal = getCostTotal(typedQuote);

  return (
    <div className="space-y-8 pb-16">
      <QuoteEditorHeader quote={typedQuote} />

      <QuoteInfoGrid
        quote={typedQuote}
        clients={clients || []}
        costTotal={costTotal}
      />

      <ObjectiveSection
        quote={typedQuote}
        onToggle={async (value) => {
          "use server";
          const { updateQuoteSectionVisibility } = await import("./actions");
          await updateQuoteSectionVisibility(
            typedQuote.id,
            "show_objective",
            value,
          );
        }}
      />

      <PhasesSection
        quote={typedQuote}
        enabled={typedQuote.show_phases ?? true}
        onToggle={async (value) => {
          "use server";
          const { updateQuoteSectionVisibility } = await import("./actions");
          await updateQuoteSectionVisibility(
            typedQuote.id,
            "show_phases",
            value,
          );
        }}
      />

      <ProcessSection
        enabled={typedQuote.show_process ?? true}
        onToggle={async (value) => {
          "use server";
          const { updateQuoteSectionVisibility } = await import("./actions");
          await updateQuoteSectionVisibility(
            typedQuote.id,
            "show_process",
            value,
          );
        }}
      />

      <CostsSection
        quote={typedQuote}
        enabled={typedQuote.show_costs ?? true}
        onToggle={async (value) => {
          "use server";
          const { updateQuoteSectionVisibility } = await import("./actions");
          await updateQuoteSectionVisibility(
            typedQuote.id,
            "show_costs",
            value,
          );
        }}
      />

      <TimelineSection
        enabled={typedQuote.show_timeline ?? true}
        onToggle={async (value) => {
          "use server";
          const { updateQuoteSectionVisibility } = await import("./actions");
          await updateQuoteSectionVisibility(
            typedQuote.id,
            "show_timeline",
            value,
          );
        }}
      />

      <SummarySection
        quote={typedQuote}
        costTotal={costTotal}
        enabled={typedQuote.show_summary ?? true}
        onToggle={async (value) => {
          "use server";
          const { updateQuoteSectionVisibility } = await import("./actions");
          await updateQuoteSectionVisibility(
            typedQuote.id,
            "show_summary",
            value,
          );
        }}
      />

      <QuoteToolbar token={String(typedQuote.token)} quoteId={String(typedQuote.id)} />
    </div>
  );
}
