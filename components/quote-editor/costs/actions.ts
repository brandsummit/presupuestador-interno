"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createQuoteCostCategory(quoteId: number) {
  const { data: lastSection } = await supabase
    .from("quote_sections")
    .select("position")
    .eq("quote_id", quoteId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextPosition = (lastSection?.position || 0) + 1;

  const { data: section, error } = await supabase
    .from("quote_sections")
    .insert({
      quote_id: quoteId,
      title: "New category",
      position: nextPosition,
    })
    .select("*")
    .single();

  if (error || !section) {
    throw new Error(error?.message || "Category could not be created");
  }

  revalidatePath(`/quote/${quoteId}`);

  return {
    ...section,
    quote_items: [],
  };
}

export async function updateQuoteCostCategory(
  quoteId: number,
  sectionId: number,
  title: string,
) {
  const { error } = await supabase
    .from("quote_sections")
    .update({
      title,
    })
    .eq("id", sectionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function deleteQuoteCostCategory(
  quoteId: number,
  sectionId: number,
) {
  const { error } = await supabase
    .from("quote_sections")
    .delete()
    .eq("id", sectionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function createQuoteCostItem(quoteId: number, sectionId: number) {
  const { data: lastItem } = await supabase
    .from("quote_items")
    .select("position")
    .eq("section_id", sectionId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextPosition = (lastItem?.position || 0) + 1;

  const { data: item, error } = await supabase
    .from("quote_items")
    .insert({
      section_id: sectionId,
      title: "",
      description: "",
      price: 0,
      position: nextPosition,
    })
    .select("*")
    .single();

  if (error || !item) {
    throw new Error(error?.message || "Item could not be created");
  }

  revalidatePath(`/quote/${quoteId}`);

  return item;
}

export async function updateQuoteCostItem(
  quoteId: number,
  itemId: number,
  field: "title" | "description" | "price",
  value: string | number,
) {
  const { error } = await supabase
    .from("quote_items")
    .update({
      [field]: value,
    })
    .eq("id", itemId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function deleteQuoteCostItem(
  quoteId: number,
  itemId: number,
) {
  const { error } = await supabase
    .from("quote_items")
    .delete()
    .eq("id", itemId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function reorderQuoteCostCategories(
  quoteId: number,
  orderedSectionIds: number[],
) {
  for (let index = 0; index < orderedSectionIds.length; index++) {
    const sectionId = orderedSectionIds[index];

    const { error } = await supabase
      .from("quote_sections")
      .update({
        position: index + 1,
      })
      .eq("id", sectionId);

    if (error) {
      throw new Error(error.message);
    }
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function reorderQuoteCostItems(
  quoteId: number,
  orderedItemIds: number[],
) {
  await Promise.all(
    orderedItemIds.map((itemId, index) =>
      supabase
        .from("quote_items")
        .update({ position: index + 1 })
        .eq("id", itemId),
    ),
  );

  revalidatePath(`/quote/${quoteId}`);
}