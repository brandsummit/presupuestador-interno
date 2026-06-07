import { supabase } from "@/lib/supabase";
import SearchInput from "@/components/SearchInput";
import ClientCard from "@/components/ClientCard";
import NewClientButton from "@/components/NewClientButton";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function ClientsPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const search = q.toLowerCase().trim();

  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredClients = clients?.filter((client) => {
    if (!search) return true;

    return [
      client.name,
      client.company,
      client.email,
      client.phone,
      client.contact_name,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(search));
  });

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-4xl font-bold text-text">Clients</h1>

        <NewClientButton />
      </div>

      <SearchInput placeholder="Search client..." />

      <div className="space-y-4">
        {filteredClients?.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </>
  );
}