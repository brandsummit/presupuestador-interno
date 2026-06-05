"use client";

import { updateClientField } from "@/app/(admin)/client/[id]/actions";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Label from "@/components/ui/Label";

import { Client } from "./types";

type Props = {
  client: Client;
};

export default function ClientInfoGrid({ client }: Props) {
  return (
    <section className="rounded-lg bg-background-light p-6">
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <Label>Contacto</Label>
            <Input
              defaultValue={client.contact_name || ""}
              placeholder="Contacto"
              onBlur={(event) =>
                updateClientField(
                  client.id,
                  "contact_name",
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <Label>Cargo</Label>
            <Input
              defaultValue={client.contact_position || ""}
              placeholder="Cargo"
              onBlur={(event) =>
                updateClientField(
                  client.id,
                  "contact_position",
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              defaultValue={client.email || ""}
              placeholder="Email"
              onBlur={(event) =>
                updateClientField(
                  client.id,
                  "email",
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <Label>Teléfono</Label>
            <Input
              defaultValue={client.phone || ""}
              placeholder="Teléfono"
              onBlur={(event) =>
                updateClientField(
                  client.id,
                  "phone",
                  event.target.value,
                )
              }
            />
          </div>
        </div>

        <div>
          <Label>Notas</Label>

          <Textarea
            defaultValue={client.notes || ""}
            placeholder="Notas"
            onBlur={(event) =>
              updateClientField(
                client.id,
                "notes",
                event.target.value,
              )
            }
          />
        </div>
      </div>
    </section>
  );
}