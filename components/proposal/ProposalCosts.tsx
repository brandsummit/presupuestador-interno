import { Quote, QuoteSection } from "@/components/quote-editor/types";
import { getProposalTranslations } from "./proposal-translations";

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
  return sections.reduce(
    (total, section) => total + getSectionTotal(section),
    0,
  );
}

export default function ProposalCosts({ quote }: Props) {
  if (!quote.show_costs) return null;

  const t = getProposalTranslations(quote.language);

  const sections =
    quote.quote_sections?.filter(
      (section) => section.quote_items && section.quote_items.length > 0,
    ) || [];

  if (!sections.length) return null;

  const projectTotal = getProjectTotal(sections);

  return (
    <section className="px-10">
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
                      <h4 className="font-bold leading-tight">
                        {item.title}
                      </h4>

                      <p className="font-bold leading-tight">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {item.description && (
                      <p className="mt-1 whitespace-pre-wrap text-base leading-snug text-text">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-16">
                <div className="border-t border-border py-4">
                  <div className="grid grid-cols-[1fr_auto] gap-4 font-bold">
                    <p>
                      {t.costs.totalSection} {section.title}
                    </p>

                    <p>{formatPrice(sectionTotal)}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid border-t border-border md:grid-cols-2 md:gap-x-20 lg:grid-cols-3">
        <div className="py-4 md:col-start-2 lg:col-start-3">
          <div className="grid grid-cols-[1fr_auto] gap-4 font-bold">
            <p>{t.costs.totalProject}</p>
            <p>{formatPrice(projectTotal)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}