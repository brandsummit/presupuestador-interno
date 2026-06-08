export type ProcessItemConfig = {
  key: string;
  title: string;
  parentKey?: string;
};

export type ProcessGroupConfig = {
  key: string;
  title: string;
  itemKeys: string[];
};

export const PROCESS_ITEMS: ProcessItemConfig[] = [
  { key: "idea", title: "Idea" },

  { key: "consultoria", title: "Consultoría" },
  { key: "posicionamiento", title: "Posicionamiento" },

  { key: "identidad-verbal", title: "Identidad verbal" },
  { key: "tono-voz", title: "Tono de voz", parentKey: "identidad-verbal" },
  { key: "eslogan", title: "Eslogan", parentKey: "identidad-verbal" },
  { key: "naming", title: "Naming", parentKey: "identidad-verbal" },

  { key: "identidad-visual", title: "Identidad visual" },
  { key: "corporativo", title: "Corporativo", parentKey: "identidad-visual" },
  { key: "redes", title: "Redes", parentKey: "identidad-visual" },

  { key: "packaging", title: "Packaging" },
  { key: "diseno-maestro", title: "Diseño maestro", parentKey: "packaging" },
  { key: "aaff", title: "AAFF", parentKey: "packaging" },

  { key: "interiorismo", title: "Interiorismo" },

  { key: "contenido", title: "Contenido" },

  { key: "digital", title: "Digital" },
  { key: "web", title: "Web", parentKey: "digital" },
  { key: "tienda-online", title: "Tienda online", parentKey: "digital" },

  { key: "universo-marca", title: "Universo de marca" },

  { key: "activacion-gestion", title: "Activación y gestión" },
];

export const PROCESS_GROUPS: ProcessGroupConfig[] = [
  { key: "arranque", title: "Arranque", itemKeys: ["idea"] },
  {
    key: "estrategia",
    title: "Estrategia",
    itemKeys: ["consultoria", "posicionamiento"],
  },
  {
    key: "branding",
    title: "Branding",
    itemKeys: [
      "identidad-verbal",
      "tono-voz",
      "eslogan",
      "naming",
      "identidad-visual",
      "corporativo",
      "redes",
    ],
  },
  {
    key: "packaging",
    title: "Packaging",
    itemKeys: ["packaging", "diseno-maestro", "aaff"],
  },
  {
    key: "interiorismo",
    title: "Interiorismo",
    itemKeys: ["interiorismo"],
  },
  {
    key: "contenido",
    title: "Contenido",
    itemKeys: ["contenido"],
  },
  {
    key: "digital",
    title: "Digital",
    itemKeys: ["digital", "web", "tienda-online"],
  },
  {
    key: "finalizacion",
    title: "Finalización",
    itemKeys: ["universo-marca"],
  },
  {
    key: "post-proyecto",
    title: "Post proyecto",
    itemKeys: ["activacion-gestion"],
  },
];