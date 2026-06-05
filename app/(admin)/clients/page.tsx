import { supabase } from "@/lib/supabase";
import PageHeader from "@/components/PageHeader";
import SearchInput from '@/components/SearchInput'
import ClientCard from '@/components/ClientCard'
import { Plus } from 'lucide-react'

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
      <PageHeader
        title="Clients"
        buttonText="New Client" 
        icon={<Plus size={16} />}
      />
      
      <SearchInput placeholder="Search client..." />

      <div className="space-y-4">
        {clients?.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </>
  );
}
