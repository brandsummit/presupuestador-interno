"use server";

import { Resend } from "resend";

import { supabase } from "@/lib/supabase";
import { proposalEmailTemplate } from "@/components/proposal/email/proposalEmailTemplate";
import { proposalEmailText } from "@/components/proposal/email/proposalEmailText";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendProposalEmailInput = {
  quoteId: number;
  to: string;
  subject: string;
  message?: string;
  proposalUrl: string;
};

export async function sendProposalEmail({
  quoteId,
  to,
  subject,
  message,
  proposalUrl,
}: SendProposalEmailInput) {
  if (!to || !subject || !proposalUrl) {
    return {
      ok: false,
      error: "Missing required fields",
    };
  }

  const { data: quote, error } = await supabase
    .from("quotes")
    .select(
      `
        id,
        title,
        number,
        language,
        clients(name)
      `,
    )
    .eq("id", quoteId)
    .single();

  if (error || !quote) {
    return {
      ok: false,
      error: "Quote not found",
    };
  }

  const client = Array.isArray(quote.clients)
    ? quote.clients[0]
    : quote.clients;

  const clientName =
    (client as { name?: string | null } | null)?.name || null;

  const language = quote.language === "en" ? "en" : "es";

  const quoteTitle =
    quote.title ||
    (language === "en"
      ? `Proposal ${quote.number}`
      : `Propuesta ${quote.number}`);

  const email = await resend.emails.send({
    from:
      process.env.PROPOSAL_EMAIL_FROM ||
      "Brandsummit <onboarding@resend.dev>",
    to,
    subject,
    html: proposalEmailTemplate({
      clientName,
      quoteTitle,
      message,
      proposalUrl,
      language,
    }),
    text: proposalEmailText({
      clientName,
      quoteTitle,
      message,
      proposalUrl,
      language,
    }),
  });

  if (email.error) {
    return {
      ok: false,
      error: email.error.message,
    };
  }

  await supabase
    .from("quotes")
    .update({
      status: "sent",
      sent_at: new Date().toISOString(),
    })
    .eq("id", quoteId);

  return {
    ok: true,
  };
}