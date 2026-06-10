import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Quote } from "@/components/quote-editor/types";

import ProposalLayout from "@/components/proposal/ProposalLayout";

type ProposalPageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function ProposalPage({ params }: ProposalPageProps) {
  const { token } = await params;

  const { data: quote, error } = await supabase
    .from("quotes")
    .select(
        `
        *,
        clients(*),
        quote_sections(
            *,
            quote_items(*)
        ),
        quote_process_items(*),
        timeline_areas(
            *,
            timeline_items(*)
        )
        `,
    )
    .eq("token", token)
    .single();

  if (error || !quote) {
    notFound();
  }

  return <ProposalLayout quote={quote as Quote} />;
}