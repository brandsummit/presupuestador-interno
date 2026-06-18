import { Quote } from "@/components/quote-editor/types";

type Props = {
  quote: Quote;
};

type ProcessKey =
  | "idea"
  | "contacto-inicial"
  | "consultoria"
  | "brief-inicial"
  | "workshop-marca"
  | "posicionamiento"
  | "brandkey"
  | "publico-objetivo"
  | "territorio-personalidad"
  | "identidad-verbal"
  | "naming"
  | "eslogan"
  | "tono-voz"
  | "registro-marca"
  | "identidad-visual"
  | "logo-principal"
  | "universo-grafico"
  | "direccion-arte"
  | "aplicacion-corporativa"
  | "corporativo"
  | "redes"
  | "packaging"
  | "concepto-global"
  | "diseno-familia"
  | "arte-final"
  | "diseno-maestro"
  | "aaff"
  | "interiorismo"
  | "diseno-interiores"
  | "busqueda-mobiliario"
  | "contenido"
  | "fotografia"
  | "contenido-escrito"
  | "audiovisual"
  | "digital"
  | "web"
  | "tienda-online"
  | "desarrollo"
  | "universo-marca"
  | "revision-cierre-fase"
  | "activacion-gestion"
  | "activacion-marca"
  | "gestion-redes"
  | "gestion-influencers";

type ProcessItem = {
  label: string;
  keys: ProcessKey[];
};

type ProcessCardData = {
  id: string;
  title: string;
  description: string;
  keys: ProcessKey[];
  items: ProcessItem[];
  column: number;
  row: number;
};

function isAnyActive(quote: Quote, keys: ProcessKey[]) {
  return keys.some((key) =>
    quote.quote_process_items?.some(
      (item) => item.item_key === key && item.enabled,
    ),
  );
}

function ProcessCard({
  quote,
  card,
}: {
  quote: Quote;
  card: ProcessCardData;
}) {
  const cardActive =
    isAnyActive(quote, card.keys) ||
    card.items.some((item) => isAnyActive(quote, item.keys));

  return (
    <article
      className={`
        flex h-full min-w-0 flex-col rounded-xl border
        border-prop-text/40 bg-prop-background p-5
        transition-opacity
        ${cardActive ? "opacity-100" : "opacity-20"}
      `}
    >
      <div>
        <h3 className="text-lg leading-none">{card.title}</h3>

        <p className="mt-4 text-xs leading-snug text-prop-text/70">
          {card.description}
        </p>
      </div>

      <div className="mt-auto space-y-2 pt-8">
        {card.items.map((item) => {
          const active = isAnyActive(quote, item.keys);

          return (
            <div
              key={item.label}
              className={`
                flex min-h-10 items-center justify-between gap-4
                rounded-md border px-3 py-2 text-sm
                ${
                  active
                    ? "border-prop-text/60 text-prop-text"
                    : "border-prop-text/25 text-prop-text/40"
                }
              `}
            >
              <span>{item.label}</span>

              <span
                className={`
                  flex h-4 w-4 shrink-0 items-center justify-center
                  rounded-full border text-[10px] leading-none
                  ${
                    active
                      ? "border-success bg-success text-prop-background"
                      : "border-prop-text/40"
                  }
                `}
              >
                {active ? "✓" : ""}
              </span>
            </div>
          );
        })}
      </div>
    </article>
  );
}

const processCards: ProcessCardData[] = [
  {
    id: "idea",
    title: "Idea o necesidad",
    description:
      "Identificamos juntos el reto, la oportunidad o la necesidad que da origen al proyecto.",
    keys: ["idea"],
    items: [
      {
        label: "Contacto inicial",
        keys: ["contacto-inicial", "idea"],
      },
    ],
    column: 4,
    row: 1,
  },
  {
    id: "consultoria",
    title: "Consultoría",
    description:
      "Analizamos el contexto y definimos la dirección más adecuada para alcanzar objetivos.",
    keys: ["consultoria"],
    items: [
      {
        label: "Brief inicial",
        keys: ["brief-inicial"],
      },
      {
        label: "Workshop de marca",
        keys: ["workshop-marca", "consultoria"],
      },
    ],
    column: 2,
    row: 2,
  },
  {
    id: "posicionamiento",
    title: "Posicionamiento",
    description:
      "Definimos el territorio que la marca quiere ocupar y cómo diferenciarse en su categoría.",
    keys: ["posicionamiento"],
    items: [
      {
        label: "Brandkey",
        keys: ["brandkey"],
      },
      {
        label: "Público objetivo",
        keys: ["publico-objetivo"],
      },
      {
        label: "Territorio y personalidad",
        keys: ["territorio-personalidad"],
      },
    ],
    column: 3,
    row: 2,
  },
  {
    id: "identidad-verbal",
    title: "Identidad verbal",
    description:
      "Definimos cómo habla la marca, qué dice y la forma en que se relaciona con su público.",
    keys: ["identidad-verbal"],
    items: [
      {
        label: "Naming",
        keys: ["naming"],
      },
      {
        label: "Eslogan",
        keys: ["eslogan"],
      },
      {
        label: "Tono de voz",
        keys: ["tono-voz"],
      },
      {
        label: "Registro de marca",
        keys: ["registro-marca"],
      },
    ],
    column: 4,
    row: 3,
  },
  {
    id: "identidad-visual",
    title: "Identidad visual",
    description:
      "Definimos el sistema gráfico que permite reconocer, diferenciar y expresar la marca.",
    keys: ["identidad-visual"],
    items: [
      {
        label: "Logo principal",
        keys: ["logo-principal"],
      },
      {
        label: "Universo gráfico",
        keys: ["universo-grafico", "redes"],
      },
      {
        label: "Dirección de arte",
        keys: ["direccion-arte"],
      },
      {
        label: "Aplicación corporativa",
        keys: ["aplicacion-corporativa", "corporativo"],
      },
    ],
    column: 5,
    row: 3,
  },
  {
    id: "packaging",
    title: "Packaging",
    description:
      "Diseñamos el envase, combinando estrategia, funcionalidad y diferenciación.",
    keys: ["packaging"],
    items: [
      {
        label: "Concepto global",
        keys: ["concepto-global", "packaging"],
      },
      {
        label: "Diseño de familia",
        keys: ["diseno-familia", "diseno-maestro"],
      },
      {
        label: "Arte final",
        keys: ["arte-final", "aaff"],
      },
    ],
    column: 2,
    row: 4,
  },
  {
    id: "interiorismo",
    title: "Interiorismo",
    description:
      "Diseñamos el espacio del local adaptado a las necesidades del proyecto.",
    keys: ["interiorismo"],
    items: [
      {
        label: "Diseño de interiores",
        keys: ["diseno-interiores"],
      },
      {
        label: "Búsqueda de mobiliario",
        keys: ["busqueda-mobiliario"],
      },
    ],
    column: 3,
    row: 4,
  },
  {
    id: "contenido",
    title: "Contenido",
    description: "Creamos contenido para nutrir la marca.",
    keys: ["contenido"],
    items: [
      {
        label: "Fotografía",
        keys: ["fotografia"],
      },
      {
        label: "Contenido escrito",
        keys: ["contenido-escrito"],
      },
      {
        label: "Audiovisual",
        keys: ["audiovisual"],
      },
    ],
    column: 4,
    row: 4,
  },
  {
    id: "digital",
    title: "Digital",
    description:
      "Diseñamos y desarrollamos el entorno digital donde la marca se presenta, comunica y vende.",
    keys: ["digital"],
    items: [
      {
        label: "Web",
        keys: ["web"],
      },
      {
        label: "Tienda online",
        keys: ["tienda-online"],
      },
      {
        label: "Desarrollo",
        keys: ["desarrollo"],
      },
    ],
    column: 5,
    row: 4,
  },
  {
    id: "universo-marca",
    title: "Universo de marca",
    description:
      "Tenemos la marca definida a nivel estratégico, verbal y visual, lista para activarse.",
    keys: ["universo-marca"],
    items: [
      {
        label: "Revisión y cierre de fase",
        keys: ["revision-cierre-fase", "universo-marca"],
      },
    ],
    column: 3,
    row: 5,
  },
  {
    id: "activacion-gestion",
    title: "Activación y gestión",
    description:
      "Gestionamos el inicio y el manejo a largo plazo de la marca.",
    keys: ["activacion-gestion"],
    items: [
      {
        label: "Activación de marca",
        keys: ["activacion-marca", "activacion-gestion"],
      },
      {
        label: "Gestión de redes",
        keys: ["gestion-redes"],
      },
      {
        label: "Gestión de influencers",
        keys: ["gestion-influencers"],
      },
    ],
    column: 4,
    row: 5,
  },
];

function ProcessConnections() {
  return (
    <svg
      viewBox="0 0 1800 2084"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full text-prop-text"
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      >
        {/* Idea → Estrategia */}
        <path
          vectorEffect="non-scaling-stroke"
          d="
            M1290 170
            H1696
            C1728 170 1752 194 1752 226
            V332
            C1752 364 1728 388 1696 388
            H88
            C56 388 32 412 32 444
            V768
            C32 800 56 824 88 824
            H1712
          "
        />

        {/* Línea superior hacia estrategia */}
        <path
          vectorEffect="non-scaling-stroke"
          d="M303 388 V436"
        />

        <path
          vectorEffect="non-scaling-stroke"
          d="M701 388 V436"
        />

        {/* Salida de estrategia */}
        <path
          vectorEffect="non-scaling-stroke"
          d="M303 776 V824"
        />

        <path
          vectorEffect="non-scaling-stroke"
          d="M701 776 V824"
        />

        {/* Entrada hacia identidad */}
        <path
          vectorEffect="non-scaling-stroke"
          d="M1099 824 V872"
        />

        <path
          vectorEffect="non-scaling-stroke"
          d="M1497 824 V872"
        />

        {/* Línea única entre identidad y áreas */}
        <path
          vectorEffect="non-scaling-stroke"
          d="M88 1260 H1712"
        />

        {/* Salida de identidad */}
        <path
          vectorEffect="non-scaling-stroke"
          d="M1099 1212 V1260"
        />

        <path
          vectorEffect="non-scaling-stroke"
          d="M1497 1212 V1260"
        />

        {/* Entrada hacia las cuatro áreas */}
        <path
          vectorEffect="non-scaling-stroke"
          d="M303 1260 V1308"
        />

        <path
          vectorEffect="non-scaling-stroke"
          d="M701 1260 V1308"
        />

        <path
          vectorEffect="non-scaling-stroke"
          d="M1099 1260 V1308"
        />

        <path
          vectorEffect="non-scaling-stroke"
          d="M1497 1260 V1308"
        />

        {/* Salida de las cuatro áreas */}
        <path
          vectorEffect="non-scaling-stroke"
          d="M303 1648 V1696"
        />

        <path
          vectorEffect="non-scaling-stroke"
          d="M701 1648 V1696"
        />

        <path
          vectorEffect="non-scaling-stroke"
          d="M1099 1648 V1696"
        />

        <path
          vectorEffect="non-scaling-stroke"
          d="M1497 1648 V1696"
        />

        {/* Cierre final hacia Universo y Activación */}
        <path
          vectorEffect="non-scaling-stroke"
          d="
            M303 1696
            H1640
            C1680 1696 1712 1728 1712 1768
            V1842
            C1712 1882 1680 1914 1640 1914
            H1290
          "
        />

        {/* Entrada a Universo de marca */}
        <path
          vectorEffect="non-scaling-stroke"
          d="M701 1696 V1744"
        />
      </g>
    </svg>
  );
}

export default function ProposalProcess({ quote }: Props) {
  if (!quote.show_process) return null;

  return (
    <section className="px-10">
      <div className="grid gap-4 md:grid-cols-2">
        <div />

        <div>
          <h2 className="font-display text-6xl font-bold">Proceso</h2>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <p className="text-sm leading-snug">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-24 hidden w-full max-w-[1800px] lg:block">
        <ProcessConnections />

        <div
          className="relative z-10 grid gap-x-4 gap-y-24"
          style={{
            gridTemplateColumns:
              "96px repeat(4, minmax(0, 1fr)) 96px",
            gridTemplateRows: "repeat(5, 21.25rem)",
          }}
        >
          {processCards.map((card) => (
            <div
              key={card.id}
              className="min-w-0"
              style={{
                gridColumn: card.column,
                gridRow: card.row,
              }}
            >
              <ProcessCard quote={quote} card={card} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-4 md:grid-cols-2 lg:hidden">
        {processCards.map((card) => (
          <ProcessCard key={card.id} quote={quote} card={card} />
        ))}
      </div>
    </section>
  );
}