import { Plus } from "lucide-react";
import { createClient } from "@/app/(admin)/clients/actions";

export default function NewClientButton() {
  return (
    <form action={createClient}>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg border border-text px-4 py-3 text-base bg-text text-background hover:bg-background hover:text-text"
      >
        <Plus size={16} />
        New Client
      </button>
    </form>
  );
}