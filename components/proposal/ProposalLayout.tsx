import { Quote } from "@/components/quote-editor/types";

import ProposalHero from "./ProposalHero";
import ProposalObjective from "./ProposalObjective";
import ProposalPhase from "./ProposalPhase";
import ProposalCosts from "./ProposalCosts";
import ProposalSummary from "./ProposalSummary";
import ProposalProcess from "./ProposalProcess";
import ProposalTimeline from "./ProposalTimeline";
import ProposalFooter from "./ProposalFooter";
import ProposalAdminToolbar from "./ProposalAdminToolbar";
import ProposalSimplifiedLayout from "./ProposalSimplifiedLayout";

import { normalizeProposalQuote } from "./utils";

type Props = {
  quote: Quote;
  viewMode?: "full" | "simplified";
};

export default function ProposalLayout({ quote, viewMode = "full" }: Props) {
  const typedQuote = normalizeProposalQuote(quote);

  if (viewMode === "simplified") {
    return <ProposalSimplifiedLayout quote={typedQuote} />;
  }

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