"use client";

import { updateClientField } from "@/app/(admin)/client/[id]/actions";
import { Client } from "./types";

type Props = {
  client: Client;
};

export default function ClientEditorHeader({
  client,
}: Props) {
  return (
    <header>
      <div className="space-y-2">
        <input
          defaultValue={client.name || ""}
          placeholder="Client name"
          onBlur={(event) =>
            updateClientField(
              client.id,
              "name",
              event.target.value,
            )
          }
          className="w-full rounded-lg border border-input-border bg-background-light/30 px-4 py-3 font-display text-3xl font-bold leading-none text-text outline-none placeholder:text-text-muted"
        />

        <input
          defaultValue={client.company || ""}
          placeholder="Company"
          onBlur={(event) =>
            updateClientField(
              client.id,
              "company",
              event.target.value,
            )
          }
          className="w-full rounded-lg border border-input-border bg-background-light/30 px-4 py-3 text-lg text-text outline-none placeholder:text-text-muted"
        />
      </div>
    </header>
  );
}