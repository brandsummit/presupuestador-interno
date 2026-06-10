import {
  Quote,
  TimelineArea,
  TimelineItem,
} from "@/components/quote-editor/types";

type Props = {
  quote: Quote;
};

const colorGroups = [
  { area: "#AD7BDE", barBg: "#6A5B78", barAccent: "#C8B4DB" },
  { area: "#7BB8DE", barBg: "#5B6F78", barAccent: "#B4CEDB" },
  { area: "#DE7B7B", barBg: "#785B5B", barAccent: "#DBB4B4" },
  { area: "#83CF98", barBg: "#53755D", barAccent: "#C1E6CB" },
  { area: "#8397CF", barBg: "#5E6782", barAccent: "#C0C9E1" },
  { area: "#E09E5F", barBg: "#A17E5E", barAccent: "#EDD4BD" },
];

const MEETING_START_Y = 40;
const MEETING_GAP_Y = 30;
const MEETING_HEIGHT = 28;

const TASK_START_Y_MIN = 78;
const TASK_GAP_AFTER_MEETINGS = 40;
const TASK_HEIGHT = 48;
const TASK_GAP_Y = 52;

const AREA_BOTTOM_PADDING = 40;

function getColorGroup(index: number) {
  return colorGroups[index % colorGroups.length];
}

function getMaxWeek(areas: TimelineArea[]) {
  return Math.max(
    1,
    ...areas.flatMap(
      (area) =>
        area.timeline_items?.flatMap((item) => [
          Number(item.start_week || 1),
          Number(item.end_week || item.start_week || 1),
        ]) || [],
    ),
  );
}

function isMeeting(item: TimelineItem) {
  const type = item.type?.toLowerCase() || "";

  return (
    type.includes("online") ||
    type.includes("presential") ||
    type.includes("presencial") ||
    type.includes("meeting") ||
    !item.end_week
  );
}

function isPresential(item: TimelineItem) {
  const type = item.type?.toLowerCase() || "";

  return type.includes("presential") || type.includes("presencial");
}

function shouldAlignMeetingLeft(item: TimelineItem, maxWeek: number) {
  const startWeek = Number(item.start_week || 1);

  return startWeek >= maxWeek - 2;
}

function getLastMeetingY(meetings: TimelineItem[]) {
  if (!meetings.length) return 0;

  return (
    MEETING_START_Y +
    (meetings.length - 1) * MEETING_GAP_Y +
    MEETING_HEIGHT
  );
}

function getTaskStartY(meetings: TimelineItem[]) {
  const lastMeetingY = getLastMeetingY(meetings);

  return Math.max(TASK_START_Y_MIN, lastMeetingY + TASK_GAP_AFTER_MEETINGS);
}

function getAreaHeight(meetings: TimelineItem[], tasks: TimelineItem[]) {
  const lastMeetingY = getLastMeetingY(meetings);
  const taskStartY = getTaskStartY(meetings);

  const lastTaskY =
    tasks.length > 0
      ? taskStartY + (tasks.length - 1) * TASK_GAP_Y + TASK_HEIGHT
      : 0;

  return Math.max(lastMeetingY, lastTaskY) + AREA_BOTTOM_PADDING;
}

export default function ProposalTimeline({ quote }: Props) {
  if (!quote.show_timeline) return null;

  const areas =
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
      .sort((a, b) => (a.position || 0) - (b.position || 0)) || [];

  if (!areas.length) return null;

  const maxWeek = getMaxWeek(areas);
  const gridTemplateColumns = `220px repeat(${maxWeek + 1}, minmax(74px, 1fr))`;

  return (
    <section className="flex min-h-screen flex-col py-6">
      <div className="px-6">
        <h2 className="font-display text-3xl uppercase">05 - Tiempos</h2>
      </div>

      <div className="mt-16 hidden flex-1 flex-col justify-end md:flex">
        <div className="grid" style={{ gridTemplateColumns }}>
          <div />

          {Array.from({ length: maxWeek + 1 }).map((_, index) => {
            const week = index + 1;

            return (
              <div key={index} className="relative h-44 border-l border-border">
                {week <= maxWeek && (
                  <p
                    className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-sm text-text-muted"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    Semana {week}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div>
          {areas.map((area, areaIndex) => {
            const colors = getColorGroup(areaIndex);
            const meetings = area.timeline_items.filter(isMeeting);
            const tasks = area.timeline_items.filter((item) => !isMeeting(item));
            const areaHeight = getAreaHeight(meetings, tasks);
            const taskStartY = getTaskStartY(meetings);

            return (
              <div
                key={area.id}
                className="relative grid border-b border-border"
                style={{
                  gridTemplateColumns,
                  minHeight: `${areaHeight}px`,
                }}
              >
                <div className="z-10 flex items-start gap-3 pl-6 pt-10 text-xl text-text-muted">
                  <span
                    className="mt-2 h-3 w-3 rounded-full"
                    style={{ backgroundColor: colors.area }}
                  />
                  <span>{area.title}</span>
                </div>

                {Array.from({ length: maxWeek + 1 }).map((_, index) => (
                  <div
                    key={`${area.id}-${index}`}
                    className="border-l border-border"
                    style={{
                      gridColumn: index + 2,
                      gridRow: 1,
                    }}
                  />
                ))}

                {meetings.map((item, index) => {
                  const startWeek = Number(item.start_week || 1);
                  const presential = isPresential(item);
                  const alignLeft = shouldAlignMeetingLeft(item, maxWeek);
                  const meetingColor = presential ? "#43e5ca" : "#b8b8b8";

                  return (
                    <div
                      key={item.id}
                      className="relative z-20"
                      style={{
                        gridColumn: `${startWeek + 1} / ${startWeek + 2}`,
                        gridRow: 1,
                        marginTop: `${
                          MEETING_START_Y + index * MEETING_GAP_Y
                        }px`,
                        color: meetingColor,
                      }}
                    >
                      <span className="absolute left-1/2 top-0 -translate-x-1/2 text-2xl leading-none">
                        ◆
                      </span>

                      <span
                        className={`absolute top-1 whitespace-nowrap text-base leading-tight ${
                          alignLeft
                            ? "right-[calc(50%+18px)] text-right"
                            : "left-[calc(50%+18px)]"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  );
                })}

                {tasks.map((item, index) => {
                  const startWeek = Number(item.start_week || 1);
                  const endWeek = Number(item.end_week || startWeek);

                  return (
                    <div
                      key={item.id}
                      className="z-10 flex h-12 items-center rounded border px-4 text-base"
                      style={{
                        gridColumn: `${startWeek + 1} / ${endWeek + 2}`,
                        gridRow: 1,
                        marginTop: `${taskStartY + index * TASK_GAP_Y}px`,
                        marginLeft: "4.6px",
                        marginRight: "4px",
                        width: "calc(100% - 8px)",
                        boxSizing: "border-box",
                        backgroundColor: colors.barBg,
                        borderColor: colors.barAccent,
                        color: colors.barAccent,
                      }}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="mt-10 pl-6 text-sm">
          <div className="flex items-center gap-3 text-[#b8b8b8]">
            <span className="text-2xl leading-none">◆</span>
            <span className="pt-1 text-lg">Reunión online</span>
          </div>

          <div className="flex items-center gap-3 text-[#43e5ca]">
            <span className="text-2xl leading-none">◆</span>
            <span className="pt-1 text-lg">Reunión presencial</span>
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-10 md:hidden">
        {areas.map((area, index) => {
          const colors = getColorGroup(index);

          return (
            <div key={area.id} className="space-y-4 px-6">
              <div className="flex items-center gap-3 text-xl">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: colors.area }}
                />
                <h3>{area.title}</h3>
              </div>

              <div className="space-y-3">
                {area.timeline_items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border px-5 py-4"
                    style={{
                      backgroundColor: colors.barBg,
                      borderColor: colors.barAccent,
                      color: colors.barAccent,
                    }}
                  >
                    <p className="text-sm opacity-70">
                      Semana {item.start_week}
                      {!isMeeting(item) &&
                      item.end_week &&
                      item.end_week !== item.start_week
                        ? ` — Semana ${item.end_week}`
                        : ""}
                    </p>
                    <p className="mt-1">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}