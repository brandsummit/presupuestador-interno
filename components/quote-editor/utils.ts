import { Quote, QuoteItem, QuoteSection } from "./types";

export function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("es-ES");
}

export function getCostTotal(quote: Quote) {
  return (
    quote.quote_sections?.reduce((sectionAcc: number, section: QuoteSection) => {
      const sectionTotal =
        section.quote_items?.reduce((itemAcc: number, item: QuoteItem) => {
          return itemAcc + Number(item.price || 0);
        }, 0) || 0;

      return sectionAcc + sectionTotal;
    }, 0) || 0
  );
}