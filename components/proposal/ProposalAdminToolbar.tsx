import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import ProposalAdminToolbarClient from "./ProposalAdminToolbarClient";

type Props = {
  token: string | null;
  quoteId: number;
  quoteNumber?: string | null;
  quoteTitle?: string | null;
  clientEmail?: string | null;
};

export default async function ProposalAdminToolbar({
  token,
  quoteId,
  quoteNumber,
  quoteTitle,
  clientEmail,
}: Props) {
  if (!token) return null;

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            //
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <ProposalAdminToolbarClient
      token={token}
      quoteId={quoteId}
      quoteNumber={quoteNumber}
      quoteTitle={quoteTitle}
      clientEmail={clientEmail}
    />
  );
}