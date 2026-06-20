"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { generateToken } from "@/lib/generate-token";
import { supabase } from "@/lib/supabase";

type DbRecord = Record<string, unknown>;

function cleanRecord(record: DbRecord) {
  const copy = { ...record };

  delete copy.id;
  delete copy.created_at;
  delete copy.updated_at;

  return copy;
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
    .update({
      last_number: nextNumber,
    })
    .eq("id", "main");

  if (updateError) {
    throw new Error(updateError.message);
  }

  return nextNumber;
}

async function duplicateQuoteSections(
  originalQuoteId: string,
  newQuoteId: string,
) {
  const { data: sections, error: sectionsError } = await supabase
    .from("quote_sections")
    .select("*")
    .eq("quote_id", originalQuoteId)
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
        quote_id: newQuoteId,
      })
      .select("id")
      .single();

    if (newSectionError || !newSection) {
      throw new Error(
        newSectionError?.message || "Section could not be copied",
      );
    }

    const { data: items, error: itemsError } = await supabase
      .from("quote_items")
      .select("*")
      .eq("section_id", oldSectionId)
      .order("position", { ascending: true });

    if (itemsError) {
      throw new Error(itemsError.message);
    }

    if (!items?.length) {
      continue;
    }

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

async function duplicateTimeline(
  originalQuoteId: string,
  newQuoteId: string,
) {
  const { data: timelineAreas, error: timelineAreasError } = await supabase
    .from("timeline_areas")
    .select("*")
    .eq("quote_id", originalQuoteId)
    .order("position", { ascending: true });

  if (timelineAreasError) {
    throw new Error(timelineAreasError.message);
  }

  for (const timelineArea of timelineAreas || []) {
    const oldTimelineAreaId = timelineArea.id;

    const { data: newTimelineArea, error: newTimelineAreaError } =
      await supabase
        .from("timeline_areas")
        .insert({
          ...cleanRecord(timelineArea),
          quote_id: newQuoteId,
        })
        .select("id")
        .single();

    if (newTimelineAreaError || !newTimelineArea) {
      throw new Error(
        newTimelineAreaError?.message ||
          "Timeline area could not be copied",
      );
    }

    const { data: timelineItems, error: timelineItemsError } =
      await supabase
        .from("timeline_items")
        .select("*")
        .eq("area_id", oldTimelineAreaId)
        .order("position", { ascending: true });

    if (timelineItemsError) {
      throw new Error(timelineItemsError.message);
    }

    if (!timelineItems?.length) {
      continue;
    }

    const timelineItemsToInsert = timelineItems.map((timelineItem) => ({
      ...cleanRecord(timelineItem),
      area_id: newTimelineArea.id,
    }));

    const { error: timelineItemsInsertError } = await supabase
      .from("timeline_items")
      .insert(timelineItemsToInsert);

    if (timelineItemsInsertError) {
      throw new Error(timelineItemsInsertError.message);
    }
  }
}

async function duplicateQuoteBase(
  quoteId: string,
  mode: "clone" | "rectify",
) {
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

    const existingNumbers =
      relatedQuotes?.map((quote) => quote.number) || [];

    const letters = "BCDEFGHIJKLMNOPQRSTUVWXYZ";

    const nextLetter = letters
      .split("")
      .find(
        (letter) =>
          !existingNumbers.includes(`${sequenceNumber}${letter}`),
      );

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
      parent_quote_id:
        originalQuote.parent_quote_id || originalQuote.id,
      status: "draft",
      sent_at: null,
      token: generateToken(),
    })
    .select("id")
    .single();

  if (newQuoteError || !newQuote) {
    throw new Error(
      newQuoteError?.message || "Quote could not be duplicated",
    );
  }

  await duplicateQuoteSections(quoteId, newQuote.id);
  await duplicateTimeline(quoteId, newQuote.id);

  redirect(`/quote/${newQuote.id}`);
}

export async function cloneQuote(quoteId: string) {
  await duplicateQuoteBase(quoteId, "clone");
}

export async function rectifyQuote(quoteId: string) {
  await duplicateQuoteBase(quoteId, "rectify");
}

export async function deleteQuote(quoteId: string) {
  const { error } = await supabase
    .from("quotes")
    .delete()
    .eq("id", quoteId);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/quotes");
}

export async function updateQuoteLanguage(
  quoteId: string,
  language: "es" | "en",
) {
  if (!["es", "en"].includes(language)) {
    throw new Error("Invalid language");
  }

  const { error } = await supabase
    .from("quotes")
    .update({
      language,
    })
    .eq("id", quoteId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}