"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

type EditableClientField =
  | "name"
  | "email"
  | "phone"
  | "company"
  | "logo_url"
  | "contact_name"
  | "contact_position"
  | "notes";

export async function updateClientField(
  clientId: number,
  field: EditableClientField,
  value: string,
) {
  const { error } = await supabase
    .from("clients")
    .update({
      [field]: value,
    })
    .eq("id", clientId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/client/${clientId}`);
}