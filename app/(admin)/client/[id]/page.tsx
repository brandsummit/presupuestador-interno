import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabase";

import ClientEditorHeader from "@/components/client-editor/ClientEditorHeader";
import ClientInfoGrid from "@/components/client-editor/ClientInfoGrid";
import ClientQuotesSection from "@/components/client-editor/ClientQuotesSection";

import { Client } from "@/components/client-editor/types";

type ClientPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params;

  const { data: client, error } = await supabase
    .from("clients")
    .select(
      `
        *,
        quotes(
            id,
            number,
            title,
            description,
            status,
            created_at,
            sent_at,
            clients(name)
        )
`,
    )
    .eq("id", id)
    .single();

  if (error || !client) {
    notFound();
  }

  const typedClient = client as Client;

  return (
    <div className="space-y-8">
      <ClientEditorHeader client={typedClient} />
      <ClientInfoGrid client={typedClient} />
      <ClientQuotesSection quotes={typedClient.quotes} />
    </div>
  );
}
