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

function isCardActive(quote: Quote, card: ProcessCardData) {
  return (
    isAnyActive(quote, card.keys) ||
    card.items.some((item) => isAnyActive(quote, item.keys))
  );
}

function ProcessCard({
  quote,
  card,
}: {
  quote: Quote;
  card: ProcessCardData;
}) {
  const cardActive = isCardActive(quote, card);

  return (
    <article
      className={`
        h-full min-h-0 min-w-0 rounded-xl border bg-prop-background
        p-[clamp(12px,1.1vw,20px)] transition-colors
        ${
          cardActive
            ? "border-prop-text/40"
            : "border-prop-text/20"
        }
      `}
    >
      <div
        className={`
          flex h-full min-h-0 flex-col transition-opacity
          ${cardActive ? "opacity-100" : "opacity-25"}
        `}
      >
        <div>
          <h3 className="text-[clamp(15px,1.15vw,18px)] leading-none">
            {card.title}
          </h3>

          <p
            className={`
              mt-4 text-[clamp(10px,0.75vw,12px)] leading-snug
              ${
                cardActive
                  ? "text-prop-text/70"
                  : "text-prop-text"
              }
            `}
          >
            {card.description}
          </p>
        </div>

        <div className="mt-auto space-y-2 pt-5">
          {card.items.map((item) => {
            const active = isAnyActive(quote, item.keys);

            return (
              <div
                key={item.label}
                className={`
                  flex min-h-[clamp(32px,2.5vw,40px)] items-center
                  justify-between gap-3 rounded-md border
                  px-[clamp(8px,0.8vw,12px)] py-1.5
                  text-[clamp(11px,0.85vw,14px)]
                  ${
                    active
                      ? "border-prop-text/60 text-prop-text"
                      : cardActive
                        ? "border-prop-text/25 text-prop-text/40"
                        : "border-prop-text text-prop-text"
                  }
                `}
              >
                <span className="min-w-0">{item.label}</span>

                <span
                  className={`
                    flex h-4 w-4 shrink-0 items-center justify-center
                    rounded-full border text-[10px] leading-none
                    ${
                      active
                        ? "border-success bg-success text-prop-background"
                        : cardActive
                          ? "border-prop-text/40"
                          : "border-prop-text"
                    }
                  `}
                >
                  {active ? "✓" : ""}
                </span>
              </div>
            );
          })}
        </div>
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
    column: 3,
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
    column: 1,
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
    column: 2,
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
    column: 3,
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
    column: 4,
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
    column: 1,
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
    column: 2,
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
    column: 3,
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
    column: 4,
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
    column: 2,
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
    column: 3,
    row: 5,
  },
];

function getCardActive(quote: Quote, id: string) {
  const card = processCards.find((item) => item.id === id);

  return card ? isCardActive(quote, card) : false;
}

function ProcessConnections({ quote }: Props) {
  const ideaActive = getCardActive(quote, "idea");
  const consultoriaActive = getCardActive(quote, "consultoria");
  const posicionamientoActive = getCardActive(quote, "posicionamiento");
  const verbalActive = getCardActive(quote, "identidad-verbal");
  const visualActive = getCardActive(quote, "identidad-visual");
  const packagingActive = getCardActive(quote, "packaging");
  const interiorismoActive = getCardActive(quote, "interiorismo");
  const contenidoActive = getCardActive(quote, "contenido");
  const digitalActive = getCardActive(quote, "digital");
  const universoActive = getCardActive(quote, "universo-marca");
  const activacionActive = getCardActive(quote, "activacion-gestion");

  const estrategiaActive = consultoriaActive || posicionamientoActive;
  const identidadActive = verbalActive || visualActive;
  const aplicacionesActive =
    packagingActive ||
    interiorismoActive ||
    contenidoActive ||
    digitalActive;

  const opacity = (active: boolean) => (active ? 0.4 : 0.08);

  return (
    <svg
      viewBox="0 0 1800 2460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full text-prop-text"
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(ideaActive) }}
          d="
            M1290 190
            H1704
            C1730.51 190 1752 211.49 1752 238
            V402
            C1752 428.51 1730.51 450 1704 450
            H96
          "
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(estrategiaActive) }}
          d="
            M96 450
            C69.49 450 48 471.49 48 498
            V922
            C48 948.51 69.49 970 96 970
            H1704
          "
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(identidadActive) }}
          d="
            M1704 970
            C1730.51 970 1752 991.49 1752 1018
            V1442
            C1752 1468.51 1730.51 1490 1704 1490
            H96
          "
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(aplicacionesActive) }}
          d="
            M96 1490
            C69.49 1490 48 1511.49 48 1538
            V1962
            C48 1988.51 69.49 2010 96 2010
            H701
          "
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(activacionActive) }}
          d="
            M701 2010
            H1047
            Q1099 2010 1099 2080
          "
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(consultoriaActive) }}
          d="M303 450 V540"
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(posicionamientoActive) }}
          d="M701 450 V540"
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(verbalActive) }}
          d="M1099 970 V1060"
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(visualActive) }}
          d="M1497 970 V1060"
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(packagingActive) }}
          d="M303 1490 V1580"
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(interiorismoActive) }}
          d="M701 1490 V1580"
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(contenidoActive) }}
          d="M1099 1490 V1580"
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(digitalActive) }}
          d="M1497 1490 V1580"
        />

        <path
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-300"
          style={{ opacity: opacity(universoActive) }}
          d="M701 2010 V2080"
        />
      </g>
    </svg>
  );
}

export default function ProposalProcess({ quote }: Props) {
  if (!quote.show_process) return null;

  return (
    <section className="overflow-hidden px-10">
      <div className="grid gap-4 md:grid-cols-2">
        <div />

        <div>
          <h2 className="font-display text-6xl font-bold">Proceso</h2>

          <div className="mt-8">
            <p className="text-base leading-snug">
              Más allá de los entregables, entendemos cada proyecto como un proceso de toma de decisiones. Nuestro objetivo es aportar claridad en cada etapa, asegurando que las decisiones estratégicas, creativas y técnicas respondan a una misma dirección. Para ello, estructuramos el trabajo en diferentes fases que nos permiten avanzar de forma ordenada, validar cada paso y construir soluciones coherentes, sólidas y preparadas para evolucionar junto al negocio.
            </p>
          </div>
        </div>
      </div>

      <div
        className="relative mx-auto mt-24 hidden w-full max-w-[1800px] xl:block"
        style={{
          aspectRatio: "1800 / 2460",
        }}
      >
        <ProcessConnections quote={quote} />

        <div
          className="absolute inset-0 z-10 grid"
          style={{
            gridTemplateColumns:
              "96fr 16fr 382fr 16fr 382fr 16fr 382fr 16fr 382fr 16fr 96fr",
            gridTemplateRows:
              "380fr 140fr 380fr 140fr 380fr 140fr 380fr 140fr 380fr",
          }}
        >
          {processCards.map((card) => (
            <div
              key={card.id}
              className="min-h-0 min-w-0"
              style={{
                gridColumn: card.column * 2 + 1,
                gridRow: card.row * 2 - 1,
              }}
            >
              <ProcessCard quote={quote} card={card} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-4 md:grid-cols-2 xl:hidden">
        {processCards.map((card) => (
          <ProcessCard key={card.id} quote={quote} card={card} />
        ))}
      </div>
    </section>
  );
}