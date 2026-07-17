"use server";

import { revalidatePath } from "next/cache";

import { supabase } from "@/lib/supabase";

export async function updateQuoteStartAt(
  quoteId: number,
  startAt: string | null,
) {
  const { error } = await supabase
    .from("quotes")
    .update({
      start_at: startAt || null,
    })
    .eq("id", quoteId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function createSummaryPaymentItem(quoteId: number) {
  const { data: lastItem, error: lastItemError } = await supabase
    .from("summary_payment_items")
    .select("position")
    .eq("quote_id", quoteId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastItemError) {
    throw new Error(lastItemError.message);
  }

  const nextPosition = (lastItem?.position || 0) + 1;

  const { data: item, error } = await supabase
    .from("summary_payment_items")
    .insert({
      quote_id: quoteId,
      label: "",
      position: nextPosition,
    })
    .select("*")
    .single();

  if (error || !item) {
    throw new Error(error?.message || "Payment item could not be created");
  }

  revalidatePath(`/quote/${quoteId}`);

  return item;
}

export async function updateSummaryPaymentItem(
  quoteId: number,
  itemId: number,
  label: string,
) {
  const { error } = await supabase
    .from("summary_payment_items")
    .update({
      label,
    })
    .eq("id", itemId)
    .eq("quote_id", quoteId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function deleteSummaryPaymentItem(
  quoteId: number,
  itemId: number,
) {
  const { error } = await supabase
    .from("summary_payment_items")
    .delete()
    .eq("id", itemId)
    .eq("quote_id", quoteId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function reorderSummaryPaymentItems(
  quoteId: number,
  orderedItemIds: number[],
) {
  const results = await Promise.all(
    orderedItemIds.map((itemId, index) =>
      supabase
        .from("summary_payment_items")
        .update({
          position: index + 1,
        })
        .eq("id", itemId)
        .eq("quote_id", quoteId),
    ),
  );

  const failedResult = results.find((result) => result.error);

  if (failedResult?.error) {
    throw new Error(failedResult.error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}