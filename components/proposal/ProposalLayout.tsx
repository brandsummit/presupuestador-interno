import { Quote } from "@/components/quote-editor/types";

import ProposalHero from "./ProposalHero";
import ProposalObjective from "./ProposalObjective";
import ProposalPhase from "./ProposalPhase";
import ProposalCosts from "./ProposalCosts";
import ProposalSummary from "./ProposalSummary";
import ProposalProcess from "./ProposalProcess";
import ProposalTimeline from "./ProposalTimeline";
import ProposalFooter from "./ProposalFooter";
import { normalizeProposalQuote } from "./utils";
import ProposalAdminToolbar from "./ProposalAdminToolbar";
import { supabase } from "@/lib/supabase";

type Props = {
  quote: Quote;
};

const {
  data: { user },
} = await supabase.auth.getUser();

export default function ProposalLayout({ quote }: Props) {
  const typedQuote = normalizeProposalQuote(quote);

  return (
    <main className="min-h-screen bg-prop-background text-prop-text">
      <ProposalAdminToolbar
        token={typedQuote.token}
        quoteId={typedQuote.id}
        quoteNumber={typedQuote.number}
        quoteTitle={typedQuote.title}
        clientEmail={typedQuote.clients?.email}
        />
      <div className="space-y-60">
        <ProposalHero quote={typedQuote} />
        <ProposalObjective quote={typedQuote} />
        <ProposalPhase quote={typedQuote} />
        <ProposalProcess quote={typedQuote} />
        <ProposalCosts quote={typedQuote} />
        <ProposalTimeline quote={typedQuote} />
        <ProposalSummary quote={typedQuote} />
        <ProposalFooter />
      </div>
    </main>
  );
}
