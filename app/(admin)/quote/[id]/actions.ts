"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

type VisibilityField =
  | "show_objective"
  | "show_phases"
  | "show_process"
  | "show_costs"
  | "show_timeline"
  | "show_summary";

type EditableQuoteField =
  | "number"
  | "title"
  | "description"
  | "status"
  | "client_id"
  | "sent_at"
  | "current_phase"
  | "start_at"
  | "duration"
  | "payment_terms"
  | "objective"
  | "next_steps";

export async function updateQuoteSectionVisibility(
  quoteId: number,
  field: VisibilityField,
  value: boolean,
) {
  await supabase.from("quotes").update({ [field]: value }).eq("id", quoteId);

  revalidatePath(`/quote/${quoteId}`);
}

export async function updateQuoteField(
  quoteId: number,
  field: EditableQuoteField,
  value: string | number | null,
) {
  await supabase.from("quotes").update({ [field]: value }).eq("id", quoteId);

  revalidatePath(`/quote/${quoteId}`);
}