import { Quote, QuoteSection } from "@/components/quote-editor/types";
import { formatPrice } from "./utils";

type Props = {
  quote: Quote;
};

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

export default function ProposalSimplifiedCosts({ quote }: Props) {
  if (!quote.show_costs) return null;

  const sections =
    quote.quote_sections?.filter(
      (section) => section.quote_items && section.quote_items.length > 0,
    ) || [];

  if (!sections.length) return null;

  const projectTotal = getProjectTotal(sections);

  return (
    <section>
      <div className="grid gap-x-20 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const sectionTotal = getSectionTotal(section);

          return (
            <article key={section.id} className="flex flex-col">
              <h2 className="mb-8 font-display text-3xl">{section.title}</h2>

              <div className="space-y-5">
                {section.quote_items?.map((item) => (
                  <div key={item.id}>
                    <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                      <h3 className="font-bold leading-tight">{item.title}</h3>
                      <p className="font-bold leading-tight">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {item.description && (
                      <p className="mt-1 whitespace-pre-wrap text-base leading-snug">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-14">
                <div className="border-t border-prop-border py-4">
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

      <div className="mt-2 grid gap-x-20 border-t border-prop-border md:grid-cols-2 lg:grid-cols-3">
        <div className="py-4 md:col-start-2 lg:col-start-3">
          <div className="grid grid-cols-[1fr_auto] gap-4 font-bold">
            <p>Total Proyecto</p>
            <p>{formatPrice(projectTotal)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}