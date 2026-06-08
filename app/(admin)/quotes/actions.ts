"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { generateToken } from "@/lib/generate-token";

export async function createQuote() {
  const { data: counter, error: counterError } = await supabase
    .from("quote_counters")
    .select("last_number")
    .eq("id", "main")
    .limit(1)
    .maybeSingle();

  if (counterError || !counter) {
    throw new Error(counterError?.message || "Counter not found");
  }

  const nextNumber = counter.last_number + 1;

  const { error: updateCounterError } = await supabase
    .from("quote_counters")
    .update({ last_number: nextNumber })
    .eq("id", "main");

  if (updateCounterError) {
    throw new Error(updateCounterError.message);
  }

  const { data: quote, error: quoteError } = await supabase
    .from("quotes")
    .insert({
      number: String(nextNumber),
      sequence_number: nextNumber,
      status: "draft",
      current_phase: "Construcción",
      token: generateToken(),
      show_objective: true,
      show_phases: true,
      show_process: true,
      show_costs: true,
      show_timeline: true,
      show_summary: true,
    })
    .select("id")
    .single();

  if (quoteError || !quote) {
    throw new Error(quoteError?.message || "Quote could not be created");
  }

  redirect(`/quote/${quote.id}`);
}
