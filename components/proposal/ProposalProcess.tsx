import { Quote } from "@/components/quote-editor/types";

type Props = {
  quote: Quote;
};

type ProcessKey =
  | "idea"
  | "consultoria"
  | "posicionamiento"
  | "tono-voz"
  | "eslogan"
  | "naming"
  | "identidad-verbal"
  | "identidad-visual"
  | "corporativo"
  | "redes"
  | "packaging"
  | "diseno-maestro"
  | "aaff"
  | "interiorismo"
  | "contenido"
  | "digital"
  | "web"
  | "tienda-online"
  | "universo-marca"
  | "activacion-gestion";

type NodeProps = {
  quote: Quote;
  itemKey: ProcessKey;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  textX: number;
  textY: number;
  rx?: number;
};

function isActive(quote: Quote, itemKey: string) {
  return Boolean(
    quote.quote_process_items?.find(
      (item) => item.item_key === itemKey && item.enabled,
    ),
  );
}

function ProcessNode({
  quote,
  itemKey,
  x,
  y,
  width,
  height,
  label,
  textX,
  textY,
  rx = 11.5,
}: NodeProps) {
  const active = isActive(quote, itemKey);
  const lines = label.split(/\\n|\n|&#10;/);

  return (
    <g
      id={`process-${itemKey}`}
      className={active ? "opacity-100" : "opacity-25"}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        className="stroke-current"
      />
      <text
        className="fill-current"
        xmlSpace="preserve"
        fontSize="16"
        letterSpacing="0px"
      >
        {lines.map((line, index) => (
          <tspan key={line} x={textX} y={textY + index * 22}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function ProcessLine({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className="stroke-current opacity-40"
    />
  );
}

export default function ProposalProcess({ quote }: Props) {
  if (!quote.show_process) return null;

  return (
    <section className="flex min-h-screen flex-col p-6">
      <div>
        <h2 className="font-display text-3xl uppercase">03 - Proceso</h2>
      </div>

      <div className="mt-24 hidden w-full max-w-325 m-auto md:block">
        <svg
          viewBox="0 0 1416 657"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full text-text"
        >
          {/* Lines */}
          <ProcessLine x1={613.179} y1={90.7856} x2={646.893} y2={90.7856} />
          <ProcessLine x1={897.643} y1={111.857} x2={931.357} y2={111.857} />
          <ProcessLine x1={613.179} y1={151.893} x2={646.893} y2={151.893} />
          <ProcessLine x1={897.643} y1={172.964} x2={931.357} y2={172.964} />
          <ProcessLine x1={86.3928} y1={359.446} x2={153.821} y2={359.446} />
          <ProcessLine x1={296.053} y1={359.446} x2={363.482} y2={359.446} />
          <ProcessLine x1={613.179} y1={569.107} x2={646.893} y2={569.107} />
          <ProcessLine x1={897.643} y1={548.036} x2={931.357} y2={548.036} />
          <ProcessLine x1={808.089} y1={268.839} x2={841.804} y2={268.839} />
          <ProcessLine x1={808.089} y1={452.161} x2={841.804} y2={452.161} />
          <ProcessLine x1={808.089} y1={391.053} x2={841.804} y2={391.053} />
          <ProcessLine x1={808.089} y1={329.946} x2={841.804} y2={329.946} />
          <ProcessLine x1={974.554} y1={268.839} x2={1025.13} y2={268.839} />
          <ProcessLine x1={944} y1={452.161} x2={1025.12} y2={452.161} />
          <ProcessLine x1={975.607} y1={391.053} x2={1025.12} y2={391.053} />
          <ProcessLine x1={991.411} y1={329.946} x2={1025.12} y2={329.946} />
          <ProcessLine x1={613.179} y1={630.214} x2={646.893} y2={630.214} />
          <ProcessLine x1={897.643} y1={609.143} x2={931.357} y2={609.143} />
          <ProcessLine x1={613.179} y1={29.6785} x2={646.893} y2={29.6785} />
          <ProcessLine x1={545.75} y1={359.446} x2={614.232} y2={359.446} />
          <ProcessLine x1={614.232} y1={359.446} x2={808.089} y2={359.446} />
          <ProcessLine x1={1025.12} y1={359.446} x2={1092.55} y2={359.446} />
          <ProcessLine x1={1216.88} y1={359.446} x2={1284.3} y2={359.446} />
          <ProcessLine x1={613.679} y1={292.518} x2={613.679} y2={358.893} />
          <ProcessLine x1={613.679} y1={152.393} x2={613.679} y2={225.089} />
          <ProcessLine x1={898.143} y1={173.464} x2={898.143} y2={246.161} />
          <ProcessLine x1={613.679} y1={91.2856} x2={613.679} y2={151.339} />
          <ProcessLine x1={898.143} y1={112.357} x2={898.143} y2={172.411} />
          <ProcessLine x1={613.679} y1={30.1785} x2={613.679} y2={90.232} />
          <ProcessLine x1={613.679} y1={359.946} x2={613.679} y2={427.375} />
          <ProcessLine x1={808.589} y1={358.893} x2={808.589} y2={390.5} />
          <ProcessLine x1={808.589} y1={330.446} x2={808.589} y2={358.893} />
          <ProcessLine x1={808.589} y1={269.339} x2={808.589} y2={329.393} />
          <ProcessLine x1={808.589} y1={391.553} x2={808.589} y2={451.607} />
          <ProcessLine x1={613.679} y1={494.803} x2={613.679} y2={569.607} />
          <ProcessLine x1={898.143} y1={473.732} x2={898.143} y2={548.536} />
          <ProcessLine x1={613.679} y1={569.607} x2={613.679} y2={629.661} />
          <ProcessLine x1={898.143} y1={548.536} x2={898.143} y2={608.589} />
          <ProcessLine x1={1024.57} y1={358.893} x2={1024.57} y2={390.5} />
          <ProcessLine x1={1024.57} y1={330.446} x2={1024.57} y2={358.893} />
          <ProcessLine x1={1024.57} y1={269.34} x2={1024.5} y2={330.001} />
          <ProcessLine x1={1024.5} y1={390.999} x2={1024.57} y2={451.606} />

          {/* Nodes */}
          <ProcessNode quote={quote} itemKey="idea" x={0.5} y={337.268} width={85.3929} height={43.25} label="Idea" textX={24} textY={365.101} />
          <ProcessNode quote={quote} itemKey="consultoria" x={154.322} y={337.268} width={141.232} height={43.25} label="Consultoría" textX={177.822} textY={365.101} />
          <ProcessNode quote={quote} itemKey="posicionamiento" x={363.982} y={337.268} width={181.268} height={43.25} label="Posicionamiento" textX={387.482} textY={365.101} />

          <ProcessNode quote={quote} itemKey="tono-voz" x={647.393} y={7.5} width={144.393} height={43.25} label="Tono de voz" textX={670.893} textY={35.333} />
          <ProcessNode quote={quote} itemKey="eslogan" x={647.393} y={68.6072} width={112.786} height={43.25} label="Eslogan" textX={670.893} textY={96.4402} />
          <ProcessNode quote={quote} itemKey="naming" x={647.393} y={129.714} width={112.786} height={43.25} label="Naming" textX={670.893} textY={157.547} />

          <ProcessNode quote={quote} itemKey="identidad-verbal" x={549.411} y={225.589} width={126.482} height={66.4286} label="Identidad\nverbal" textX={572.911} textY={254.012} />
          <ProcessNode quote={quote} itemKey="identidad-visual" x={549.411} y={427.875} width={126.482} height={66.4286} label="Identidad\nvisual" textX={572.911} textY={456.297} />

          <ProcessNode quote={quote} itemKey="corporativo" x={647.393} y={546.928} width={143.339} height={43.25} label="Corporativo" textX={670.893} textY={574.761} />
          <ProcessNode quote={quote} itemKey="redes" x={647.393} y={608.036} width={98.0357} height={43.25} label="Redes" textX={670.893} textY={635.869} />

          <ProcessNode quote={quote} itemKey="packaging" x={842.304} y={246.661} width={131.75} height={43.25} label="Packaging" textX={865.804} textY={274.494} />
          <ProcessNode quote={quote} itemKey="interiorismo" x={842.304} y={307.768} width={148.607} height={43.25} label="Interiorismo" textX={865.804} textY={335.601} />
          <ProcessNode quote={quote} itemKey="contenido" x={842.304} y={368.875} width={132.804} height={43.25} label="Contenido" textX={865.804} textY={396.708} />
          <ProcessNode quote={quote} itemKey="digital" x={842.304} y={429.982} width={101.196} height={43.25} label="Digital" textX={865.804} textY={457.815} />

          <ProcessNode quote={quote} itemKey="diseno-maestro" x={931.857} y={89.6785} width={174.946} height={43.25} label="Diseño maestro" textX={955.357} textY={117.511} />
          <ProcessNode quote={quote} itemKey="aaff" x={931.857} y={150.786} width={89.6071} height={43.25} label="AAFF" textX={955.357} textY={178.619} />

          <ProcessNode quote={quote} itemKey="web" x={931.857} y={525.857} width={85.3929} height={43.25} label="Web" textX={955.357} textY={553.69} />
          <ProcessNode quote={quote} itemKey="tienda-online" x={931.857} y={586.964} width={157.036} height={43.25} label="Tienda online" textX={955.357} textY={614.797} />

          <ProcessNode quote={quote} itemKey="universo-marca" x={1093.05} y={325.678} width={123.321} height={66.4286} label="Universo\nde marca" textX={1116.55} textY={354.101} />
          <ProcessNode quote={quote} itemKey="activacion-gestion" x={1284.8} y={325.678} width={130.696} height={66.4286} label="Activación\ny gestión" textX={1308.3} textY={354.101} />
        </svg>
      </div>

      <div className="mt-16 grid gap-3 md:hidden">
        {quote.quote_process_items
          ?.filter((item) => item.enabled)
          .sort((a, b) => (a.position || 0) - (b.position || 0))
          .map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border px-5 py-3 text-base"
            >
              {item.title}
            </div>
          ))}
      </div>
    </section>
  );
}