"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function toggleProcessItem(
  id: number,
  quoteId: number,
  itemKey: string,
  enabled: boolean,
) {
  const { error } = await supabase
    .from("quote_process_items")
    .update({ enabled })
    .eq("id", id);

  if (error) throw new Error(error.message);

  if (!enabled) {
    const { error: childrenError } = await supabase
      .from("quote_process_items")
      .update({ enabled: false })
      .eq("quote_id", quoteId)
      .eq("parent_key", itemKey);

    if (childrenError) throw new Error(childrenError.message);
  }

  revalidatePath(`/quote/${quoteId}`);
}