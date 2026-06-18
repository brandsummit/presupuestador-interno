import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { login } from "./actions";

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/quotes");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-text">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl bg-background-light p-6"
      >
        <div className="mb-10">
          <h1 className="font-display text-2xl">Login</h1>
          <p className="mt-2 text-base text-text-muted">
            Acceso administrador
          </p>
        </div>

        {params.error && (
          <p className="mb-6 rounded-lg border border-danger px-4 py-3 text-base text-danger">
            Email o contraseña incorrectos.
          </p>
        )}

        <div className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-lg bg-text px-4 py-3 font-bold text-background"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}