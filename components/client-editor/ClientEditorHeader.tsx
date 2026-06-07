"use client";

import { updateClientField } from "@/app/(admin)/client/[id]/actions";
import { Client } from "./types";
import { deleteClient } from "@/app/(admin)/client/client-actions";
import { ArrowLeft } from "lucide-react";
import ConfirmDeleteButton from "@/components/ui/ConfirmDeleteButton";

type Props = {
  client: Client;
};

export default function ClientEditorHeader({ client }: Props) {
  return (
    <header>

      <div className="flex items-center justify-between pb-6">
        <div className="flex align-center gap-4">
          <a
            href="/clients"
            className="flex pt-1.5 hover:opacity-70"
          >
            <ArrowLeft size={24} />
          </a>
          <h1 className="text-2xl">Edit Client</h1>
        </div>
        <ConfirmDeleteButton action={deleteClient.bind(null, String(client.id))} />
      </div>

      <div className="space-y-2">
        <input
          defaultValue={client.name || ""}
          placeholder="Client name"
          onBlur={(event) =>
            updateClientField(client.id, "name", event.target.value)
          }
          className="w-full rounded-lg border border-input-border bg-background-light/30 px-4 py-3 font-display text-3xl font-bold leading-none text-text outline-none placeholder:text-text-muted"
        />

        <input
          defaultValue={client.company || ""}
          placeholder="Company"
          onBlur={(event) =>
            updateClientField(client.id, "company", event.target.value)
          }
          className="w-full rounded-lg border border-input-border bg-background-light/30 px-4 py-3 text-lg text-text outline-none placeholder:text-text-muted"
        />
      </div>
    </header>
  );
}
