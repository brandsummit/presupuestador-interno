import { Eye } from "lucide-react";
import ConfirmDeleteButton from "@/components/ui/ConfirmDeleteButton";
import { deleteClient } from "@/app/(admin)/client/client-actions";

type ClientCardProps = {
  client: {
    id: number;
    name: string | null;
    company: string | null;
    email: string | null;
    phone: string | null;
  };
};

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <article className="grid grid-cols-[2fr_1.5fr_1.5fr_auto] items-center gap-4 rounded-lg bg-background-light py-5 pr-8 pl-5">
      <div>
        <h3 className="text-3xl font-display font-bold leading-none">
          {client.name}
        </h3>
        <p className="mt-2 text-md text-text">{client.company}</p>
      </div>

      <p className="text-md">{client.email}</p>

      <a href={`tel:${client.phone}`} className="text-md text-text">
        Phone: {client.phone}
      </a>

      <div className="flex gap-2">
        <ConfirmDeleteButton action={deleteClient.bind(null, String(client.id))} />

        <a
          href={`/client/${client.id}`}
          className="flex items-center gap-2 rounded-lg border border-text bg-text px-2 py-1 text-base text-background hover:border-text hover:bg-background-light hover:text-text"
        >
          <Eye size={14} />
          View / Edit
        </a>
      </div>
    </article>
  );
}
