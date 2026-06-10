import ProposalAdminToolbarClient from "./ProposalAdminToolbarClient";

type Props = {
  token: string | null;
  quoteId: number;
  quoteNumber?: string | null;
  quoteTitle?: string | null;
  clientEmail?: string | null;
};

export default function ProposalAdminToolbar({
  token,
  quoteId,
  quoteNumber,
  quoteTitle,
  clientEmail,
}: Props) {
  if (!token) return null;

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