import { Quote } from "@/components/quote-editor/types";

export function normalizeProposalQuote(quote: Quote): Quote {
  return {
    ...quote,

    quote_sections: quote.quote_sections
      ?.sort((a, b) => (a.position || 0) - (b.position || 0))
      .map((section) => ({
        ...section,
        quote_items: section.quote_items?.sort(
          (a, b) => (a.position || 0) - (b.position || 0),
        ),
      })),

    timeline_areas: quote.timeline_areas
      ?.sort((a, b) => (a.position || 0) - (b.position || 0))
      .map((area) => ({
        ...area,
        timeline_items: area.timeline_items?.sort(
          (a, b) => (a.position || 0) - (b.position || 0),
        ),
      })),
  };
}

export function formatPrice(value?: number | null) {
  const number = Math.round(Number(value || 0));

  return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
}

export function getProposalTotal(quote: Quote) {
  return (
    quote.quote_sections?.reduce((total, section) => {
      const sectionTotal =
        section.quote_items?.reduce(
          (subtotal, item) => subtotal + Number(item.price || 0),
          0,
        ) || 0;

      return total + sectionTotal;
    }, 0) || 0
  );
}