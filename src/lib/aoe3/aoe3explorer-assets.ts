/**
 * Helpers para usar assets del juego AoE3:DE hospedados por aoe3explorer.com.
 *
 * Estos assets son los originales del juego, servidos por la comunidad bajo uso justo
 * (fair community use). Academia AoE3 los usa por hotlinking — NO los redistribuye.
 *
 * Atribución obligatoria al pie + en /resources.
 *
 * Fuente: https://aoe3explorer.com — descubierta inspeccionando wiki pages.
 * Verificado 2026-05-21: 21/22 flags responden 200 OK.
 */

const CDN_BASE = "https://aoe3explorer.com";

/**
 * Civilizaciones con flag confirmada en aoe3explorer.com/assets/images/flags/{slug}.webp.
 * Verificado HEAD 200 OK con curl. `united-states` no está disponible (fallback al SVG seed local).
 */
const CIV_FLAG_AVAILABLE = new Set<string>([
  "british",
  "french",
  "ottomans",
  "spanish",
  "dutch",
  "germans",
  "portuguese",
  "russians",
  "swedes",
  "aztecs",
  "haudenosaunee",
  "lakota",
  "inca",
  "indians",
  "chinese",
  "japanese",
  "mexicans",
  "ethiopians",
  "hausa",
  "italians",
  "maltese",
]);

/**
 * URL de la flag oficial de una civilización si está disponible en aoe3explorer.com.
 * Devuelve null si no existe (caller debe usar fallback local).
 */
export function civFlagUrl(civId: string): string | null {
  if (!CIV_FLAG_AVAILABLE.has(civId)) return null;
  return `${CDN_BASE}/assets/images/flags/${civId}.webp`;
}

export function hasOfficialFlag(civId: string): boolean {
  return CIV_FLAG_AVAILABLE.has(civId);
}

/**
 * URL de un icono UI estadístico (siege/attack/hp/etc) si lo conocemos.
 */
const UI_STAT_ICONS = new Set<string>([
  "stat_icon_siege",
  "stat_icon_attack",
  "stat_icon_hp",
]);

export function statIconUrl(iconName: string): string | null {
  if (!UI_STAT_ICONS.has(iconName)) return null;
  return `${CDN_BASE}/assets/images/ui/${iconName}.webp`;
}

/**
 * URL de un icono de unidad bajo el árbol /resources/art/units/...
 * Path tiene que ser conocido — no hay forma genérica de calcular el slug.
 * Ejemplos:
 *  - "africans/ethiopians/gascenya/gascenya_icon.webp"
 *  - "az_warchief_portrait.webp"
 *  - "hc_az_jaguar_warrior_icon.webp"  (home city card art)
 */
export function unitArtUrl(relativePath: string): string {
  return `${CDN_BASE}/assets/images/resources/art/${relativePath.replace(/^\/+/, "")}`;
}

/**
 * URL de un icono de edificio (TC, barracks, native sites...) bajo /buildings.
 */
export function buildingIconUrl(slug: string): string {
  return `${CDN_BASE}/assets/images/resources/art/buildings/${slug}.webp`;
}

/**
 * Atribución legal/comunitaria. Mostrar siempre que se usen estos assets.
 */
export const AOE3_ASSET_ATTRIBUTION = {
  label: "Iconos oficiales del juego",
  source: "aoe3explorer.com",
  url: "https://aoe3explorer.com",
  notes:
    "Assets originales de Age of Empires III: Definitive Edition (© Microsoft/Xbox) hospedados por aoe3explorer.com como referencia comunitaria. Academia AoE3 los referencia por hotlinking, sin redistribuir.",
} as const;
