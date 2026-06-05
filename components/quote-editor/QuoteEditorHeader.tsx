"use client";

import { updateQuoteField } from "@/app/(admin)/quote/[id]/actions";

import Input from "@/components/ui/Input";

import { Quote } from "./types";

type Props = {
  quote: Quote;
};

export default function QuoteEditorHeader({ quote }: Props) {
  async function handleUpdate(
    field: "number" | "title" | "description" | "status",
    value: string,
  ) {
    await updateQuoteField(quote.id, field, value);
  }

  return (
    <header>
      <div className="space-y-2">
        <Input
          variant="quoteNumber"
          defaultValue={quote.number || ""}
          placeholder="Quote number"
          onBlur={(event) => handleUpdate("number", event.target.value)}
        />

        <Input
          variant="quoteTitle"
          defaultValue={quote.title || ""}
          placeholder="Quote title"
          onBlur={(event) => handleUpdate("title", event.target.value)}
        />

        <Input
          defaultValue={quote.description || ""}
          placeholder="Quote description"
          onBlur={(event) => handleUpdate("description", event.target.value)}
        />
      </div>
    </header>
  );
}
