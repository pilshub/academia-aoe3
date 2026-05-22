import type { ReviewStatus } from "./schema";

export type HotkeyCategory =
  | "tc"
  | "production"
  | "explorer"
  | "shipment"
  | "control-group"
  | "economy"
  | "ui";

export type HotkeyEntry = {
  id: string;
  category: HotkeyCategory;
  action: string;
  defaultBinding: string;
  whyItMatters: string;
  drill: string;
  sourceId: string;
  reviewStatus: ReviewStatus;
};

export const aoe3Hotkeys: HotkeyEntry[] = [
  {
    id: "go-to-tc",
    category: "tc",
    action: "Centrar camara en Town Center principal",
    defaultBinding: "H",
    whyItMatters: "Acceso instantaneo para producir aldeanos y revisar idle.",
    drill: "Cada 30s, pulsar H y producir aldeano si TC esta idle. Sin excusa.",
    sourceId: "academy-seed",
    reviewStatus: "needs-review",
  },
  {
    id: "train-villager",
    category: "tc",
    action: "Entrenar aldeano",
    defaultBinding: "Shift+C (con TC seleccionado)",
    whyItMatters: "Sin queue continua de aldeanos no hay eco; cero idle TC es la regla.",
    drill: "Practica con Shift+queue de 5 aldeanos al inicio de la partida.",
    sourceId: "academy-seed",
    reviewStatus: "needs-review",
  },
  {
    id: "idle-villager",
    category: "economy",
    action: "Seleccionar aldeano idle",
    defaultBinding: "Period (.)",
    whyItMatters: "Cualquier aldeano idle es eco perdida.",
    drill: "Cada minuto, pulsar period y reasignar tarea. Objetivo: 0 idle al minuto 5.",
    sourceId: "academy-seed",
    reviewStatus: "needs-review",
  },
  {
    id: "explorer",
    category: "explorer",
    action: "Seleccionar explorer",
    defaultBinding: "Home / Comma",
    whyItMatters: "El explorer es scout + XP + tesoros; mover lo cada 10s en colonial.",
    drill: "Practica selecting + movement order encadenado sin pausa.",
    sourceId: "academy-seed",
    reviewStatus: "needs-review",
  },
  {
    id: "send-shipment",
    category: "shipment",
    action: "Abrir Home City y enviar shipment",
    defaultBinding: "F1 (Home City) + click",
    whyItMatters: "El primer envio define la curva; retrasarlo es perder tempo.",
    drill: "Tras escuchar el ding del shipment listo, envia en menos de 3s.",
    sourceId: "academy-seed",
    reviewStatus: "needs-review",
  },
  {
    id: "control-group-army",
    category: "control-group",
    action: "Asignar grupo de control al ejercito",
    defaultBinding: "Ctrl+1 (asignar), 1 (seleccionar)",
    whyItMatters: "Sin grupos no hay micro; pelea queda dispersa.",
    drill: "Asigna grupo 1 al ejercito al salir de barracks. Selecciona y mueve constantemente.",
    sourceId: "academy-seed",
    reviewStatus: "needs-review",
  },
  {
    id: "control-group-tc",
    category: "control-group",
    action: "Asignar grupo de control al TC",
    defaultBinding: "Ctrl+0",
    whyItMatters: "Producir villagers sin perder mapa: solo grupo 0 + Shift+C.",
    drill: "Producir 3 aldeanos sin mirar el TC.",
    sourceId: "academy-seed",
    reviewStatus: "needs-review",
  },
  {
    id: "barracks-train",
    category: "production",
    action: "Producir unidad en barracks (primera)",
    defaultBinding: "Q (Musketeer), W (Pikeman), etc",
    whyItMatters: "Produccion militar continua bajo presion sin parar TC.",
    drill: "Tras primer batch, asigna grupo 2 a barracks y produce sin verlo.",
    sourceId: "academy-seed",
    reviewStatus: "needs-review",
  },
  {
    id: "select-all-army",
    category: "control-group",
    action: "Seleccionar todo el ejercito",
    defaultBinding: "Ctrl+A o seleccionar con doble-click",
    whyItMatters: "Reagrupar tras batalla sin perder unidades dispersas.",
    drill: "Practica tras una pelea: Ctrl+A, comando atras, regroup.",
    sourceId: "academy-seed",
    reviewStatus: "needs-review",
  },
  {
    id: "find-idle-military",
    category: "production",
    action: "Encontrar unidades militares idle",
    defaultBinding: "Comma (variante)",
    whyItMatters: "Unidades idle = inversion perdida y mapa cedido.",
    drill: "Cada minuto entre 4:00 y 10:00, verifica idle.",
    sourceId: "academy-seed",
    reviewStatus: "needs-review",
  },
];

export function getHotkeysByCategory(category: HotkeyCategory): HotkeyEntry[] {
  return aoe3Hotkeys.filter((h) => h.category === category);
}

export const hotkeyCategories: HotkeyCategory[] = [
  "tc",
  "production",
  "explorer",
  "shipment",
  "control-group",
  "economy",
  "ui",
];
