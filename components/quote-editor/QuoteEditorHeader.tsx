"use client";

import { updateQuoteField } from "@/app/(admin)/quote/[id]/actions";

import Input from "@/components/ui/Input";

import { Quote } from "./types";
import { ArrowLeft } from "lucide-react";

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
      <div className="flex items-center justify-between pb-6">
        <div className="flex align-center gap-4">
          <a href="/quotes" className="flex pt-1.5 hover:opacity-70">
            <ArrowLeft size={24} />
          </a>
          <h1 className="text-2xl">Edit Quote</h1>
        </div>
      </div>
      
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
