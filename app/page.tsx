import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')

  return (
    <main>
      <h1>Conexión OK</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>

      <pre>{JSON.stringify(error, null, 2)}</pre>
    </main>
  )
}