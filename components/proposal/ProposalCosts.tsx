import { Quote, QuoteSection } from "@/components/quote-editor/types";

type Props = {
  quote: Quote;
};

function formatPrice(value?: number | null) {
  const number = Math.round(Number(value || 0));

  return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
}

function getSectionTotal(section: QuoteSection) {
  return (
    section.quote_items?.reduce((total, item) => {
      return total + Number(item.price || 0);
    }, 0) || 0
  );
}

function getProjectTotal(sections: QuoteSection[]) {
  return sections.reduce((total, section) => total + getSectionTotal(section), 0);
}

export default function ProposalCosts({ quote }: Props) {
  if (!quote.show_costs) return null;

  const sections =
    quote.quote_sections?.filter(
      (section) => section.quote_items && section.quote_items.length > 0,
    ) || [];

  if (!sections.length) return null;

  const projectTotal = getProjectTotal(sections);

  return (
    <section className="flex min-h-screen flex-col px-10">

      <div className="mt-40 flex flex-1 flex-col justify-end">
        <div className="grid gap-x-20 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            const sectionTotal = getSectionTotal(section);

            return (
              <article key={section.id} className="flex h-full flex-col">
                <h3 className="mb-10 font-display text-3xl">
                  {section.title}
                </h3>

                <div className="space-y-6">
                  {section.quote_items?.map((item) => (
                    <div key={item.id}>
                      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                        <h4 className="font-bold leading-tight">{item.title}</h4>
                        <p className="font-bold leading-tight">{formatPrice(item.price)}</p>
                      </div>

                      {item.description && (
                        <p className="mt-1 whitespace-pre-wrap text-sm leading-snug text-text">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-16">
                  <div className="border-t border-border py-4">
                    <div className="grid grid-cols-[1fr_auto] gap-4 font-bold">
                      <p>Total {section.title}</p>
                      <p>{formatPrice(sectionTotal)}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="grid gap-x-20 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
          <div className="mt-0 py-4 md:col-start-2 lg:col-start-3">
            <div className="grid grid-cols-[1fr_auto] gap-4 font-bold">
              <p>Total Proyecto</p>
              <p>{formatPrice(projectTotal)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}