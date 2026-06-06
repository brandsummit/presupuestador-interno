"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export async function deleteClient(clientId: string) {
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", clientId);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/clients");
}