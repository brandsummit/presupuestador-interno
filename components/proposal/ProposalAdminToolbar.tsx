import { supabase } from "@/lib/supabase";
import ProposalAdminToolbarClient from "./ProposalAdminToolbarClient";

type Props = {
  token: string | null;
};

export default async function ProposalAdminToolbar({ token }: Props) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !token) return null;

  return <ProposalAdminToolbarClient token={token} />;
}