type ProposalLanguage = "es" | "en";

type Props = {
  clientName?: string | null;
  quoteTitle?: string | null;
  message?: string | null;
  proposalUrl: string;
  language?: ProposalLanguage;
};

const translations = {
  es: {
    greeting: "Hola",
    proposal: "Propuesta",
    defaultMessage: "Te compartimos la propuesta que hemos preparado.",
    thanks: "Gracias",
  },
  en: {
    greeting: "Hello",
    proposal: "Proposal",
    defaultMessage: "We are sharing the proposal we have prepared for you.",
    thanks: "Thank you",
  },
} as const;

export function proposalEmailText({
  clientName,
  quoteTitle,
  message,
  proposalUrl,
  language = "es",
}: Props) {
  const locale = language === "en" ? "en" : "es";
  const t = translations[locale];

  return `
${clientName || t.greeting},

${message || t.defaultMessage}

${quoteTitle || t.proposal}:
${proposalUrl}

${t.thanks},

David Baldoví
Strategy & Management
Brandsummit
`;
}