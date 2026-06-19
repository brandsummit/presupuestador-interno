export type ProcessItemDefinition = {
  key: string;
  title: string;
  children?: ProcessItemDefinition[];
};

export type ProcessGroupDefinition = {
  title: string;
  items: ProcessItemDefinition[];
};

export const PROCESS_GROUPS: ProcessGroupDefinition[] = [
  {
    title: "Arranque",
    items: [
      {
        key: "idea",
        title: "Idea o necesidad",
        children: [
          {
            key: "contacto-inicial",
            title: "Contacto inicial",
          },
        ],
      },
    ],
  },
  {
    title: "Estrategia",
    items: [
      {
        key: "consultoria",
        title: "Consultoría",
        children: [
          {
            key: "brief-inicial",
            title: "Brief inicial",
          },
          {
            key: "workshop-marca",
            title: "Workshop de marca",
          },
        ],
      },
      {
        key: "posicionamiento",
        title: "Posicionamiento",
        children: [
          {
            key: "brandkey",
            title: "Brandkey",
          },
          {
            key: "publico-objetivo",
            title: "Público objetivo",
          },
          {
            key: "territorio-personalidad",
            title: "Territorio y personalidad",
          },
        ],
      },
    ],
  },
  {
    title: "Identidad verbal",
    items: [
      {
        key: "identidad-verbal",
        title: "Identidad verbal",
        children: [
          {
            key: "naming",
            title: "Naming",
          },
          {
            key: "eslogan",
            title: "Eslogan",
          },
          {
            key: "tono-voz",
            title: "Tono de voz",
          },
          {
            key: "registro-marca",
            title: "Registro de marca",
          },
        ],
      },
    ],
  },
  {
    title: "Identidad visual",
    items: [
      {
        key: "identidad-visual",
        title: "Identidad visual",
        children: [
          {
            key: "logo-principal",
            title: "Logo principal",
          },
          {
            key: "universo-grafico",
            title: "Universo gráfico",
          },
          {
            key: "direccion-arte",
            title: "Dirección de arte",
          },
          {
            key: "aplicacion-corporativa",
            title: "Aplicación corporativa",
          },
        ],
      },
    ],
  },
  {
    title: "Packaging",
    items: [
      {
        key: "packaging",
        title: "Packaging",
        children: [
          {
            key: "concepto-global",
            title: "Concepto global",
          },
          {
            key: "diseno-familia",
            title: "Diseño de familia",
          },
          {
            key: "arte-final",
            title: "Arte final",
          },
        ],
      },
    ],
  },
  {
    title: "Interiorismo",
    items: [
      {
        key: "interiorismo",
        title: "Interiorismo",
        children: [
          {
            key: "diseno-interiores",
            title: "Diseño de interiores",
          },
          {
            key: "busqueda-mobiliario",
            title: "Búsqueda de mobiliario",
          },
          {
            key: "senaletica",
            title: "Señalética",
          },
          {
            key: "aplicacion-marca",
            title: "Aplicación de marca",
          },
        ],
      },
    ],
  },
  {
    title: "Contenido",
    items: [
      {
        key: "contenido",
        title: "Contenido",
        children: [
          {
            key: "fotografia",
            title: "Fotografía",
          },
          {
            key: "contenido-escrito",
            title: "Contenido escrito",
          },
          {
            key: "audiovisual",
            title: "Audiovisual",
          },
        ],
      },
    ],
  },
  {
    title: "Digital",
    items: [
      {
        key: "digital",
        title: "Digital",
        children: [
          {
            key: "web",
            title: "Web",
          },
          {
            key: "tienda-online",
            title: "Tienda online",
          },
          {
            key: "desarrollo",
            title: "Desarrollo",
          },
          {
            key: "modulo-reservas",
            title: "Módulo de reservas",
          },
        ],
      },
    ],
  },
  {
    title: "Finalización",
    items: [
      {
        key: "universo-marca",
        title: "Universo de marca",
        children: [
          {
            key: "revision-cierre-fase",
            title: "Revisión y cierre de fase",
          },
        ],
      },
    ],
  },
  {
    title: "Post proyecto",
    items: [
      {
        key: "activacion-gestion",
        title: "Activación y gestión",
        children: [
          {
            key: "activacion-marca",
            title: "Activación de marca",
          },
          {
            key: "gestion-redes",
            title: "Gestión de redes",
          },
          {
            key: "gestion-influencers",
            title: "Gestión de influencers",
          },
        ],
      },
    ],
  },
];

export const PROCESS_ITEMS = PROCESS_GROUPS.flatMap((group) =>
  group.items.flatMap((item) => [item, ...(item.children ?? [])]),
).map((item, index) => ({
  key: item.key,
  title: item.title,
  position: index + 1,
}));
