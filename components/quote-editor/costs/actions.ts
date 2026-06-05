"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createQuoteCostCategory(quoteId: number) {
  const { data: sections, error: sectionsError } = await supabase
    .from("quote_sections")
    .select("position")
    .eq("quote_id", quoteId);

  if (sectionsError) {
    throw new Error(sectionsError.message);
  }

  const nextPosition =
    sections?.length
      ? Math.max(...sections.map((section) => section.position || 0)) + 1
      : 1;

  const { error } = await supabase.from("quote_sections").insert({
    quote_id: quoteId,
    title: "Nueva categoría",
    position: nextPosition,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
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

export async function createQuoteCostItem(
  quoteId: number,
  sectionId: number,
) {
  const { data: items, error: itemsError } = await supabase
    .from("quote_items")
    .select("position")
    .eq("section_id", sectionId);

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  const nextPosition =
    items?.length
      ? Math.max(...items.map((item) => item.position || 0)) + 1
      : 1;

  const { error } = await supabase.from("quote_items").insert({
    section_id: sectionId,
    title: "Nuevo item",
    description: "",
    price: 0,
    position: nextPosition,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
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