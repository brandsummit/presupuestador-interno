import { Quote } from "@/components/quote-editor/types";

import { formatPrice, getProposalTotal } from "./utils";
import { getProposalTranslations } from "./proposal-translations";

type Props = {
  quote: Quote;
};

type SummaryCostItem = {
  id?: string | number;
  visible?: boolean;
  enabled?: boolean;
  quantity?: number | string | null;
  price?: number | string | null;
  unit_price?: number | string | null;
  total?: number | string | null;
};

type SummaryCostSection = {
  id?: string | number;
  title?: string | null;
  name?: string | null;
  visible?: boolean;
  enabled?: boolean;
  position?: number | null;
  total?: number | string | null;
  quote_items?: SummaryCostItem[] | null;
};

function toNumber(value: number | string | null | undefined) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function getTimelineAreas(quote: Quote) {
  return (
    quote.timeline_areas
      ?.filter((area) => area.visible !== false)
      .map((area) => ({
        ...area,
        timeline_items:
          area.timeline_items
            ?.filter((item) => item.visible !== false)
            .sort((a, b) => (a.position || 0) - (b.position || 0)) || [],
      }))
      .filter((area) => area.timeline_items.length > 0)
      .sort((a, b) => (a.position || 0) - (b.position || 0)) || []
  );
}

function getMaxWeek(quote: Quote) {
  const areas = getTimelineAreas(quote);

  return Math.max(
    1,
    ...areas.flatMap((area) =>
      area.timeline_items.flatMap((item) => [
        Number(item.start_week || 1),
        Number(item.end_week || item.start_week || 1),
      ]),
    ),
  );
}

function getDurationLabel(
  quote: Quote,
  language: "es" | "en",
  week: string,
  weeks: string,
) {
  const maxWeek = getMaxWeek(quote);

  if (maxWeek <= 3) {
    return `${maxWeek} ${maxWeek === 1 ? week : weeks}`;
  }

  return language === "en"
    ? `${maxWeek - 2} to ${maxWeek} ${weeks}`
    : `${maxWeek - 2} a ${maxWeek} ${weeks}`;
}

function getCostSections(quote: Quote, fallbackLabel: string) {
  const sections =
    (
      quote as unknown as {
        quote_sections?: SummaryCostSection[];
      }
    ).quote_sections || [];

  return sections
    .filter(
      (section) =>
        section.visible !== false &&
        section.enabled !== false &&
        (section.title || section.name),
    )
    .sort((a, b) => (a.position || 0) - (b.position || 0))
    .map((section) => {
      const items =
        section.quote_items?.filter(
          (item) => item.visible !== false && item.enabled !== false,
        ) || [];

      const calculatedTotal = items.reduce((total, item) => {
        if (item.total !== null && item.total !== undefined) {
          return total + toNumber(item.total);
        }

        const price = toNumber(item.price ?? item.unit_price);
        const quantity = Math.max(1, toNumber(item.quantity) || 1);

        return total + price * quantity;
      }, 0);

      return {
        id: section.id,
        label: section.title || section.name || fallbackLabel,
        total:
          section.total !== null && section.total !== undefined
            ? toNumber(section.total)
            : calculatedTotal,
      };
    })
    .filter((section) => section.total > 0);
}

function getPaymentPercentages(areaCount: number) {
  if (areaCount <= 0) return [];

  const remainingPercentage = 50;
  const basePercentage = Math.floor(remainingPercentage / areaCount);
  const remainder = remainingPercentage - basePercentage * areaCount;

  return Array.from({ length: areaCount }, (_, index) =>
    index < remainder ? basePercentage + 1 : basePercentage,
  );
}

function parseStartDate(value?: string | null) {
  if (!value) return null;

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (isoMatch) {
    const [, year, month, day] = isoMatch;

    return new Date(Number(year), Number(month) - 1, Number(day), 12);
  }

  const parsedDate = new Date(value);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);

  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
}

function formatMonth(date: Date, language: "es" | "en") {
  const locale = language === "en" ? "en-GB" : "es-ES";

  const month = new Intl.DateTimeFormat(locale, {
    month: "long",
  }).format(date);

  return month.charAt(0).toUpperCase() + month.slice(1);
}

function CalendarSideDay({
  date,
  language,
}: {
  date: Date;
  language: "es" | "en";
}) {
  return (
    <div className="flex h-44 w-full flex-col items-center justify-center rounded-xl bg-prop-background/20 text-center text-prop-background/55">
      <p className="font-display text-7xl leading-none">{date.getDate()}</p>

      <p className="mt-6 whitespace-nowrap text-sm">
        {formatMonth(date, language)} {date.getFullYear()}
      </p>
    </div>
  );
}

function CalendarMainDay({
  date,
  language,
}: {
  date: Date;
  language: "es" | "en";
}) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center rounded-xl bg-prop-background text-center text-prop-text">
      <p className="font-display text-[118px] leading-[0.75]">
        {date.getDate()}
      </p>

      <p className="mt-8 whitespace-nowrap text-lg">
        {formatMonth(date, language)} {date.getFullYear()}
      </p>
    </div>
  );
}

export default function ProposalSummary({ quote }: Props) {
  if (!quote.show_summary) return null;

  const language = quote.language === "en" ? "en" : "es";
  const t = getProposalTranslations(language);

  const timelineAreas = getTimelineAreas(quote);
  const costSections = getCostSections(quote, t.summary.area);
  const total = getProposalTotal(quote);
  const startDate = parseStartDate(quote.start_at);
  const paymentPercentages = getPaymentPercentages(costSections.length);

  return (
    <section className="px-10">
      <div className="grid gap-4 md:grid-cols-2">
        <div />

        <h2 className="font-display text-6xl font-bold">
          {t.summary.title}
        </h2>
      </div>

      <div className="mt-24 grid items-stretch gap-4 xl:grid-cols-3">
        <article className="flex flex-col justify-between gap-8 rounded-xl rounded-tl-[36px] border border-prop-text/60 p-10 xl:col-span-2">
          <div className="flex flex-1 flex-col justify-between gap-8">
            <h3 className="font-display text-3xl font-bold">
              {getDurationLabel(
                quote,
                language,
                t.summary.week,
                t.summary.weeks,
              )}
            </h3>

            <div className="flex flex-1 flex-col justify-center gap-3 overflow-hidden">
              {timelineAreas.map((area, index) => {
                const width = Math.max(
                  38,
                  Math.min(58, 48 + timelineAreas.length * 2),
                );

                const availableOffset =
                  timelineAreas.length > 1
                    ? Math.max(0, 100 - width) / (timelineAreas.length - 1)
                    : 0;

                return (
                  <div
                    key={area.id}
                    className="relative flex h-14 items-center"
                  >
                    <div className="absolute inset-x-0 border-t-2 border-dotted border-prop-text/25" />

                    <div
                      className="relative z-10 flex h-14 items-center rounded-md bg-prop-text px-5 text-prop-background"
                      style={{
                        width: `${width}%`,
                        marginLeft: `${index * availableOffset}%`,
                      }}
                    >
                      <span className="text-base">{area.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="max-w-2xl">
            <h4 className="text-base font-bold">
              {t.summary.duration}
            </h4>

            <p className="mt-3 text-sm leading-snug text-prop-text/65">
              {t.summary.durationDescription}
            </p>
          </div>
        </article>

        <article className="flex flex-col justify-between gap-8 overflow-hidden rounded-xl rounded-tr-[36px] bg-prop-text text-prop-background">
          <div className="flex min-h-[320px] flex-1 items-center overflow-hidden py-10">
            {startDate ? (
              <div className="flex w-full items-center justify-center gap-3">
                <div className="w-[40%] shrink-0">
                  <CalendarSideDay
                    date={addDays(startDate, -1)}
                    language={language}
                  />
                </div>

                <div className="z-10 w-[50%] shrink-0">
                  <CalendarMainDay
                    date={startDate}
                    language={language}
                  />
                </div>

                <div className="w-[40%] shrink-0">
                  <CalendarSideDay
                    date={addDays(startDate, 1)}
                    language={language}
                  />
                </div>
              </div>
            ) : (
              <p className="mx-auto text-lg text-prop-background/60">
                {t.summary.pendingDate}
              </p>
            )}
          </div>

          <div className="p-10 pt-0">
            <h4 className="text-base font-bold">
              {t.summary.startDate}
            </h4>

            <p className="mt-3 text-sm leading-snug text-prop-background/65">
              {t.summary.startDateDescription}
            </p>
          </div>
        </article>

        <article className="flex flex-col justify-between gap-8 rounded-xl rounded-bl-[36px] bg-prop-text p-10 text-prop-background">
          <div className="space-y-3">
            {costSections.map((section) => (
              <div
                key={section.id || section.label}
                className="flex min-h-16 items-center justify-between rounded-md bg-prop-background/20 px-4"
              >
                <span className="text-xs uppercase">{section.label}</span>

                <span className="font-display text-3xl">
                  {formatPrice(section.total)}
                </span>
              </div>
            ))}

            <div className="flex min-h-16 items-center justify-between rounded-md bg-prop-background px-4 text-prop-text">
              <span className="text-xs uppercase">
                {t.summary.projectTotal}
              </span>

              <span className="font-display text-3xl">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold">
              {t.summary.total}
            </h4>

            <p className="mt-3 text-sm leading-snug text-prop-background/65">
              {t.summary.totalDescription}
            </p>
          </div>
        </article>

        <article className="flex flex-col justify-between gap-8 rounded-xl rounded-br-[36px] border border-prop-text/60 p-10 xl:col-span-2">
          <div className="grid items-stretch gap-4 lg:grid-cols-2">
            <div
              className={`
                flex h-full flex-col justify-between gap-8 rounded-xl
                bg-prop-text p-6 text-prop-background
                ${costSections.length <= 1 ? "min-h-64" : ""}
              `}
            >
              <p className="font-display text-6xl leading-none">50%</p>

              <p className="text-base">
                {t.summary.projectStart}
              </p>
            </div>

            <div
              className="grid h-full gap-3"
              style={{
                gridTemplateRows: `repeat(${Math.max(
                  costSections.length,
                  1,
                )}, minmax(82px, 1fr))`,
              }}
            >
              {costSections.map((section, index) => (
                <div
                  key={section.id || section.label}
                  className="flex h-full min-h-[82px] items-center justify-between gap-6 rounded-xl border border-prop-text/60 px-6"
                >
                  <span className="font-display text-4xl">
                    {paymentPercentages[index]}%
                  </span>

                  <span className="text-right text-sm text-prop-text/70">
                    {t.summary.validate} {section.label.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl">
            <h4 className="text-base font-bold">
              {t.summary.paymentSplit}
            </h4>

            <p className="mt-3 text-sm leading-snug text-prop-text/65">
              {t.summary.paymentDescription}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}