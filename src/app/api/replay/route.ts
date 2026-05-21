import { NextResponse } from "next/server";
import { replayImportSample, replaySeedReports } from "@/data/aoe3";
import {
  detectDeterministicMistakes,
  normalizeJson,
  normalizeText,
  parseReplay,
} from "@/lib/aoe3/replay-normalizer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ReplaySource = "manual-json" | "manual-text" | "aoe3explorer" | "freefoodparty";

type ReplayBody =
  | { source?: ReplaySource; payload?: unknown }
  | Record<string, unknown>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/replay",
    method: "POST",
    body: {
      source: "manual-json | manual-text | aoe3explorer | freefoodparty (opcional, default manual-json)",
      payload: "objeto JSON o string crudo",
    },
    seedReports: replaySeedReports,
    sampleInput: JSON.parse(replayImportSample),
    note: "Sin payload, devuelve los seedReports actuales. Con payload, devuelve NormalizedReplay + mistakes deterministas.",
  });
}

export async function POST(req: Request) {
  let body: ReplayBody;
  try {
    body = (await req.json()) as ReplayBody;
  } catch {
    const text = await req.text().catch(() => "");
    if (!text) {
      return NextResponse.json({ error: "Body vacío o no parseable." }, { status: 400 });
    }
    const normalized = normalizeText(text);
    return NextResponse.json({
      ...normalized,
      mistakes: detectDeterministicMistakes(normalized),
    });
  }

  const source = (isRecord(body) ? body.source : undefined) as ReplaySource | undefined;
  const payload = isRecord(body) && "payload" in body ? body.payload : body;

  try {
    let normalized;
    if (typeof payload === "string") {
      normalized = parseReplay(payload);
    } else if (isRecord(payload)) {
      normalized = normalizeJson(payload);
    } else {
      return NextResponse.json(
        { error: "payload debe ser objeto JSON o string del parser." },
        { status: 400 },
      );
    }

    if (source && normalized.header.source !== source) {
      normalized.header.source = source;
    }

    return NextResponse.json({
      ...normalized,
      mistakes: detectDeterministicMistakes(normalized),
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Fallo normalizando replay: ${String(err)}` },
      { status: 400 },
    );
  }
}
