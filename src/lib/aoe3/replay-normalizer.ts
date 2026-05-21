import type {
  CardAge,
  Confidence,
  NormalizedReplay,
  ReplayAgeUp,
  ReplayHeader,
  ReplayShipment,
  ReplayTimelineEvent,
} from "@/data/aoe3";

type RawPlayer = {
  name?: string;
  civ?: string;
  civilization?: string;
  result?: "Win" | "Loss" | "Unknown";
  deck?: string[];
  shipments?: Array<{ time?: string | number; card?: string; name?: string }>;
  ageUps?: Array<{ age?: string; time?: string | number; politician?: string }>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function cleanTime(value: unknown): string {
  if (typeof value === "number") {
    const minutes = Math.floor(value / 60);
    const secondsPart = Math.floor(value % 60).toString().padStart(2, "0");
    return `${minutes}:${secondsPart}`;
  }
  if (typeof value !== "string") return "?:??";
  const match = value.match(/\d{1,2}:\d{2}/);
  return match?.[0] ?? value.trim();
}

export function seconds(value: string): number {
  const [m, s] = value.split(":").map(Number);
  if (!Number.isFinite(m) || !Number.isFinite(s)) return 99999;
  return m * 60 + s;
}

export function normalizeAge(value: unknown): CardAge | "Age V" {
  const text = String(value ?? "").toLowerCase();
  if (text.includes("5") || text.includes("v")) return "Age V";
  if (text.includes("4") || text.includes("iv")) return "Age IV";
  if (text.includes("3") || text.includes("iii")) return "Age III";
  if (text.includes("2") || text.includes("ii")) return "Age II";
  return "Age I";
}

export function normalizeJson(raw: Record<string, unknown>): NormalizedReplay {
  const playersRaw = Array.isArray(raw.players) ? (raw.players as RawPlayer[]) : [];
  const players = playersRaw.map((player, index) => ({
    name: player.name ?? `Player ${index + 1}`,
    civ: player.civ ?? player.civilization,
    result: player.result ?? "Unknown",
    deck: Array.isArray(player.deck) ? player.deck : [],
  }));

  const header: ReplayHeader = {
    source: raw.source === "aoe3explorer" || raw.source === "freefoodparty" ? raw.source : "manual-json",
    map: typeof raw.map === "string" ? raw.map : undefined,
    mode: raw.mode === "Team" || raw.mode === "Treaty" || raw.mode === "Supremacy 1v1" ? raw.mode : "Supremacy 1v1",
    duration: typeof raw.duration === "string" ? raw.duration : undefined,
    patch: typeof raw.patch === "string" ? raw.patch : undefined,
    players,
  };

  const shipments: ReplayShipment[] = playersRaw.flatMap((player, index) =>
    Array.isArray(player.shipments)
      ? player.shipments.map((shipment) => ({
          player: players[index]?.name ?? `Player ${index + 1}`,
          civ: players[index]?.civ,
          time: cleanTime(shipment.time),
          card: shipment.card ?? shipment.name ?? "Unknown shipment",
        }))
      : [],
  );

  const ageUps: ReplayAgeUp[] = playersRaw.flatMap((player, index) =>
    Array.isArray(player.ageUps)
      ? player.ageUps.map((ageUp) => ({
          player: players[index]?.name ?? `Player ${index + 1}`,
          age: normalizeAge(ageUp.age),
          time: cleanTime(ageUp.time),
          politician: ageUp.politician,
        }))
      : [],
  );

  const timeline: ReplayTimelineEvent[] = [
    ...shipments.map((shipment) => ({
      time: shipment.time,
      player: shipment.player,
      type: "shipment" as const,
      label: shipment.card,
      confidence: "medium" as Confidence,
    })),
    ...ageUps.map((ageUp) => ({
      time: ageUp.time,
      player: ageUp.player,
      type: "age-up" as const,
      label: `${ageUp.age}${ageUp.politician ? ` / ${ageUp.politician}` : ""}`,
      confidence: "medium" as Confidence,
    })),
  ].sort((a, b) => seconds(a.time) - seconds(b.time));

  const warnings = [
    players.length < 2 ? "Faltan jugadores: para analisis competitivo hacen falta los dos lados." : "",
    shipments.length === 0 ? "No se detectaron shipments. Pega export JSON con players[].shipments[]." : "",
    ageUps.length === 0 ? "No se detectaron age-ups. El benchmark de opening quedara incompleto." : "",
    !header.map ? "Mapa no detectado." : "",
  ].filter(Boolean);

  return {
    header,
    shipments,
    ageUps,
    timeline,
    warnings,
    evidence: {
      sourceIds: [header.source === "freefoodparty" ? "freefoodparty-replayparser" : header.source === "aoe3explorer" ? "aoe3-explorer" : "academy-seed"],
      status: "seed",
      confidence: "medium",
      lastReviewed: "2026-05-18",
      patch: header.patch ?? "unknown",
      notes: "Replay normalizado desde texto pegado; guardar fixture antes de usar como canonical.",
    },
  };
}

export function normalizeText(text: string): NormalizedReplay {
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const shipments: ReplayShipment[] = [];
  const ageUps: ReplayAgeUp[] = [];

  for (const line of lines) {
    const time = cleanTime(line);
    const player = line.match(/\[(.*?)\]/)?.[1] ?? "Unknown";
    if (/ship|shipment|env[ií]o|card|carta/i.test(line)) {
      shipments.push({ player, time, card: line.replace(/\d{1,2}:\d{2}/, "").replace(/\[.*?\]/, "").trim() });
    } else if (/age|edad|fortress|colonial|industrial/i.test(line)) {
      ageUps.push({ player, time, age: normalizeAge(line), politician: line.includes("/") ? line.split("/").pop()?.trim() : undefined });
    }
  }

  const timeline: ReplayTimelineEvent[] = [
    ...shipments.map((shipment) => ({ time: shipment.time, player: shipment.player, type: "shipment" as const, label: shipment.card, confidence: "low" as Confidence })),
    ...ageUps.map((ageUp) => ({ time: ageUp.time, player: ageUp.player, type: "age-up" as const, label: ageUp.age, confidence: "low" as Confidence })),
  ].sort((a, b) => seconds(a.time) - seconds(b.time));

  return {
    header: { source: "manual-text", players: Array.from(new Set([...shipments, ...ageUps].map((event) => event.player))).map((name) => ({ name, result: "Unknown" })) },
    shipments,
    ageUps,
    timeline,
    warnings: ["Modo texto libre: confianza baja. Usa JSON de parser cuando exista.", shipments.length ? "" : "No se detectaron shipments."].filter(Boolean),
    evidence: {
      sourceIds: ["academy-seed"],
      status: "seed",
      confidence: "low",
      lastReviewed: "2026-05-18",
      patch: "unknown",
      notes: "Texto libre normalizado para diagnostico preliminar.",
    },
  };
}

export function parseReplay(text: string): NormalizedReplay {
  try {
    const parsed = JSON.parse(text) as unknown;
    if (isRecord(parsed)) return normalizeJson(parsed);
  } catch {
    return normalizeText(text);
  }
  return normalizeText(text);
}

export function detectDeterministicMistakes(report: NormalizedReplay): string[] {
  const mistakes: string[] = [];
  const ownPlayer = report.header.players[0]?.name;
  const ownShipments = report.shipments.filter((shipment) => shipment.player === ownPlayer);
  const enemyMilitaryEarly = report.shipments.some(
    (shipment) =>
      /hussar|janissar|longbow|rush|military|soldier/i.test(shipment.card) && seconds(shipment.time) < 420,
  );
  const greedyOwn = ownShipments.some(
    (shipment) =>
      /villager|cdb|coureur|company|economic|eco/i.test(shipment.card) && seconds(shipment.time) > 300,
  );
  const lateAge3 = report.ageUps.some(
    (age) => age.player === ownPlayer && age.age === "Age III" && seconds(age.time) > 540,
  );

  if (enemyMilitaryEarly && greedyOwn) {
    mistakes.push("Patron detectado: el rival mostro shipment militar temprano y tu lado mantuvo greed economico.");
  }
  if (lateAge3) {
    mistakes.push("Age III supera 9:00; para Semi-FF esto suele indicar presion, macro rota o coin tardio.");
  }
  if (ownShipments.length < 3) {
    mistakes.push("Menos de 3 shipments detectados para tu jugador; revisa XP/TP/tesoros o export incompleto.");
  }

  return mistakes.length ? mistakes : ["No hay error determinista fuerte con los campos disponibles."];
}
