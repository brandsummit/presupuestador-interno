"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function createClient() {
  const { data: client, error } = await supabase
    .from("clients")
    .insert({
      name: "New Client",
    })
    .select("id")
    .limit(1)
    .maybeSingle();

  if (error || !client) {
    throw new Error(error?.message || "Client could not be created");
  }

  redirect(`/client/${client.id}`);
}