import { supabase } from "@/lib/supabase";
import SearchInput from "@/components/SearchInput";
import ClientCard from "@/components/ClientCard";
import NewClientButton from "@/components/NewClientButton";

export default async function ClientsPage() {
  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-4xl font-bold text-text">Clients</h1>

        <NewClientButton />
      </div>

      <SearchInput placeholder="Search client..." />

      <div className="space-y-4">
        {clients?.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </>
  );
}
