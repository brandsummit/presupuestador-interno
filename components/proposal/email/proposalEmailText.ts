type Props = {
  clientName?: string | null;
  quoteTitle?: string | null;
  message?: string | null;
  proposalUrl: string;
};

export function proposalEmailText({
  clientName,
  quoteTitle,
  message,
  proposalUrl,
}: Props) {
  return `
${clientName || "Hola"},

${message || "Te compartimos la propuesta que hemos preparado."}

${quoteTitle || "Propuesta"}:
${proposalUrl}

Gracias,

David Baldoví
Strategy & Management
Brandsummit
`;
}