import { NextResponse } from "next/server";
import { SYSTEM_PROMPT, TOOL_SCHEMAS, tools, type ToolName } from "@/lib/aoe3/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_MODEL = "moonshotai/kimi-k2";
const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const MAX_TOOL_ITERATIONS = 4;

type ChatMessage =
  | { role: "system" | "user" | "assistant"; content: string; tool_calls?: ToolCall[] }
  | { role: "tool"; tool_call_id: string; content: string };

type ToolCall = {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
};

function runTool(name: string, rawArgs: string) {
  if (!(name in tools)) {
    return { ok: false as const, error: `Tool "${name}" no existe en esta academia.` };
  }
  let parsedArgs: Record<string, unknown> = {};
  try {
    parsedArgs = rawArgs ? JSON.parse(rawArgs) : {};
  } catch {
    return { ok: false as const, error: `Argumentos JSON inválidos para "${name}".` };
  }
  const fn = tools[name as ToolName] as (args: Record<string, unknown>) => unknown;
  try {
    return fn(parsedArgs as never);
  } catch (err) {
    return { ok: false as const, error: `Tool "${name}" falló: ${String(err)}` };
  }
}

function knowledgeOnlyFallback(messages: ChatMessage[]) {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const text = lastUser && "content" in lastUser ? String(lastUser.content) : "";
  const results = runTool("search_knowledge", JSON.stringify({ query: text }));
  return {
    mode: "knowledge-only",
    note: "Sin OPENROUTER_API_KEY configurado: el endpoint responde con búsqueda directa en el corpus, sin LLM. Define la variable de entorno para activar el coach con tools.",
    query: text,
    result: results,
  };
}

export async function POST(req: Request) {
  let body: { messages?: ChatMessage[]; model?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body no es JSON válido." }, { status: 400 });
  }

  const userMessages = Array.isArray(body.messages) ? body.messages : [];
  if (userMessages.length === 0) {
    return NextResponse.json({ error: "Falta 'messages: ChatMessage[]'." }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(knowledgeOnlyFallback(userMessages), { status: 200 });
  }

  const model = body.model ?? process.env.OPENROUTER_MODEL ?? DEFAULT_MODEL;
  const conv: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...userMessages,
  ];

  for (let iteration = 0; iteration < MAX_TOOL_ITERATIONS; iteration += 1) {
    const upstream = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://academia-aoe3.vercel.app",
        "X-Title": "Academia AoE3",
      },
      body: JSON.stringify({
        model,
        messages: conv,
        tools: TOOL_SCHEMAS.map((tool) => ({ type: "function", function: tool })),
        tool_choice: "auto",
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return NextResponse.json(
        { error: `Upstream ${upstream.status}: ${text}` },
        { status: 502 },
      );
    }

    const data = (await upstream.json()) as {
      choices?: Array<{ message?: ChatMessage & { tool_calls?: ToolCall[] } }>;
    };
    const msg = data.choices?.[0]?.message;
    if (!msg) {
      return NextResponse.json({ error: "LLM sin respuesta utilizable." }, { status: 502 });
    }
    conv.push(msg);

    if (!msg.tool_calls?.length) {
      return NextResponse.json({
        mode: "coach",
        model,
        message: "content" in msg ? msg.content : "",
        conversation: conv,
      });
    }

    for (const call of msg.tool_calls) {
      const result = runTool(call.function.name, call.function.arguments);
      conv.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(result),
      });
    }
  }

  return NextResponse.json(
    { error: `El coach excedió ${MAX_TOOL_ITERATIONS} iteraciones de tools.`, conversation: conv },
    { status: 504 },
  );
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/chat",
    method: "POST",
    body: { messages: "ChatMessage[]", model: "opcional" },
    tools: TOOL_SCHEMAS.map((t) => t.name),
    note: "Configura OPENROUTER_API_KEY para activar coach con LLM. Sin clave, devuelve búsqueda directa en corpus.",
  });
}
