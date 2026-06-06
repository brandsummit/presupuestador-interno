"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

type DbRecord = Record<string, unknown>;

function cleanRecord(record: DbRecord) {
  const { id, created_at, ...rest } = record;
  return rest;
}

async function getNextNumber() {
  const { data: counter, error } = await supabase
    .from("quote_counters")
    .select("last_number")
    .eq("id", "main")
    .limit(1)
    .maybeSingle();

  if (error || !counter) {
    throw new Error(error?.message || "Counter not found");
  }

  const nextNumber = counter.last_number + 1;

  const { error: updateError } = await supabase
    .from("quote_counters")
    .update({ last_number: nextNumber })
    .eq("id", "main");

  if (updateError) {
    throw new Error(updateError.message);
  }

  return nextNumber;
}

async function duplicateQuoteBase(quoteId: string, mode: "clone" | "rectify") {
  const { data: originalQuote, error: quoteError } = await supabase
    .from("quotes")
    .select("*")
    .eq("id", quoteId)
    .single();

  if (quoteError || !originalQuote) {
    throw new Error(quoteError?.message || "Quote not found");
  }

  let number = "";
  let sequenceNumber = originalQuote.sequence_number;

  if (mode === "clone") {
    const nextNumber = await getNextNumber();
    number = String(nextNumber);
    sequenceNumber = nextNumber;
  }

  if (mode === "rectify") {
    const { data: relatedQuotes, error: relatedError } = await supabase
      .from("quotes")
      .select("number")
      .eq("sequence_number", sequenceNumber);

    if (relatedError) {
      throw new Error(relatedError.message);
    }

    const existing = relatedQuotes?.map((q) => q.number) || [];
    const letters = "BCDEFGHIJKLMNOPQRSTUVWXYZ";

    const nextLetter = letters
      .split("")
      .find((letter) => !existing.includes(`${sequenceNumber}${letter}`));

    if (!nextLetter) {
      throw new Error("Too many rectifications");
    }

    number = `${sequenceNumber}${nextLetter}`;
  }

  const { data: newQuote, error: newQuoteError } = await supabase
    .from("quotes")
    .insert({
      ...cleanRecord(originalQuote),
      number,
      sequence_number: sequenceNumber,
      parent_quote_id: originalQuote.parent_quote_id || originalQuote.id,
      status: "draft",
      sent_at: null,
      token: randomUUID(),
    })
    .select("id")
    .single();

  if (newQuoteError || !newQuote) {
    throw new Error(newQuoteError?.message || "Quote could not be duplicated");
  }

  const { data: sections, error: sectionsError } = await supabase
    .from("quote_sections")
    .select("*")
    .eq("quote_id", quoteId)
    .order("position", { ascending: true });

  if (sectionsError) {
    throw new Error(sectionsError.message);
  }

  for (const section of sections || []) {
    const oldSectionId = section.id;

    const { data: newSection, error: newSectionError } = await supabase
      .from("quote_sections")
      .insert({
        ...cleanRecord(section),
        quote_id: newQuote.id,
      })
      .select("id")
      .single();

    if (newSectionError || !newSection) {
      throw new Error(newSectionError?.message || "Section could not be copied");
    }

    const { data: items, error: itemsError } = await supabase
      .from("quote_items")
      .select("*")
      .eq("section_id", oldSectionId)
      .order("position", { ascending: true });

    if (itemsError) {
      throw new Error(itemsError.message);
    }

    if (items?.length) {
      const itemsToInsert = items.map((item) => ({
        ...cleanRecord(item),
        section_id: newSection.id,
      }));

      const { error: itemsInsertError } = await supabase
        .from("quote_items")
        .insert(itemsToInsert);

      if (itemsInsertError) {
        throw new Error(itemsInsertError.message);
      }
    }
  }

  redirect(`/quote/${newQuote.id}`);
}

export async function cloneQuote(quoteId: string) {
  await duplicateQuoteBase(quoteId, "clone");
}

export async function rectifyQuote(quoteId: string) {
  await duplicateQuoteBase(quoteId, "rectify");
}

export async function deleteQuote(quoteId: string) {
  const { error } = await supabase.from("quotes").delete().eq("id", quoteId);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/quotes");
}