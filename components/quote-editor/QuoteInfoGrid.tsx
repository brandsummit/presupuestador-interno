"use client";

import { updateQuoteField } from "@/app/(admin)/quote/[id]/actions";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";

import { Client, Quote } from "./types";
import { formatDate } from "./utils";

type Props = {
  quote: Quote;
  clients: Client[];
  costTotal: number;
};

function formatDateInput(date: string | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function QuoteInfoGrid({ quote, clients, costTotal }: Props) {
  async function handleClientChange(value: string) {
    await updateQuoteField(
      quote.id,
      "client_id",
      value ? Number(value) : null,
    );
  }

  async function handleSentDateChange(value: string) {
    await updateQuoteField(
      quote.id,
      "sent_at",
      value ? `${value}T00:00:00` : null,
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-4">
      <Card>
        <Label>Client</Label>

        <Select
          defaultValue={quote.client_id || ""}
          onChange={(event) => handleClientChange(event.target.value)}
        >
          <option value="">No client</option>

          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </Select>
      </Card>

      <Card>
        <Label>Created</Label>

        <Input value={formatDate(quote.created_at)} disabled />
      </Card>

      <Card>
        <Label>Sent</Label>

        <Input
          type="date"
          defaultValue={formatDateInput(quote.sent_at)}
          onBlur={(event) => handleSentDateChange(event.target.value)}
        />
      </Card>

      <Card>
        <Label>Total</Label>

        <Input value={`${costTotal} €`} disabled />
      </Card>
    </section>
  );
}