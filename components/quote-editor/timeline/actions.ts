"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createTimelineArea(quoteId: number) {
  const { data: lastArea } = await supabase
    .from("timeline_areas")
    .select("position")
    .eq("quote_id", quoteId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextPosition = (lastArea?.position || 0) + 1;

  const { data: area, error } = await supabase
    .from("timeline_areas")
    .insert({
      quote_id: quoteId,
      title: "New area",
      position: nextPosition,
    })
    .select("*")
    .single();

  if (error || !area) {
    throw new Error(error?.message || "Area could not be created");
  }

  revalidatePath(`/quote/${quoteId}`);

  return {
    ...area,
    timeline_items: [],
  };
}

export async function updateTimelineArea(
  quoteId: number,
  areaId: number,
  title: string,
) {
  const { error } = await supabase
    .from("timeline_areas")
    .update({
      title,
    })
    .eq("id", areaId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function deleteTimelineArea(
  quoteId: number,
  areaId: number,
) {
  const { error } = await supabase
    .from("timeline_areas")
    .delete()
    .eq("id", areaId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function createTimelineItem(
  quoteId: number,
  areaId: number,
) {
  const { data: lastItem } = await supabase
    .from("timeline_items")
    .select("position")
    .eq("area_id", areaId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextPosition = (lastItem?.position || 0) + 1;

  const { data: item, error } = await supabase
    .from("timeline_items")
    .insert({
      area_id: areaId,
      title: "",
      start_week: 1,
      end_week: 1,
      type: "task",
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

export async function updateTimelineItem(
  quoteId: number,
  itemId: number,
  field:
    | "title"
    | "start_week"
    | "end_week"
    | "type",
  value: string | number,
) {
  const { error } = await supabase
    .from("timeline_items")
    .update({
      [field]: value,
    })
    .eq("id", itemId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function deleteTimelineItem(
  quoteId: number,
  itemId: number,
) {
  const { error } = await supabase
    .from("timeline_items")
    .delete()
    .eq("id", itemId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function reorderTimelineAreas(
  quoteId: number,
  orderedAreaIds: number[],
) {
  for (let index = 0; index < orderedAreaIds.length; index++) {
    const areaId = orderedAreaIds[index];

    await supabase
      .from("timeline_areas")
      .update({
        position: index + 1,
      })
      .eq("id", areaId);
  }

  revalidatePath(`/quote/${quoteId}`);
}

export async function reorderTimelineItems(
  quoteId: number,
  orderedItemIds: number[],
) {
  await Promise.all(
    orderedItemIds.map((itemId, index) =>
      supabase
        .from("timeline_items")
        .update({
          position: index + 1,
        })
        .eq("id", itemId),
    ),
  );

  revalidatePath(`/quote/${quoteId}`);
}