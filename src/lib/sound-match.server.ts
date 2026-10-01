import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { PRODUCTS } from "@/data/products";

export type MatchInput = {
  habits: string;
  budget: number;
  priorities: string[];
  usage: string[];
};

export type MatchPick = { id: number; score: number; headline: string; reason: string };
export type MatchResult = { summary: string; picks: MatchPick[] };

function catalogFor(budget: number) {
  const ceiling = budget * 1.15;
  const pool = PRODUCTS.filter((p) => p.inStock && p.price <= ceiling);
  const list = (pool.length >= 6 ? pool : PRODUCTS).slice(0, 150);
  return list
    .map(
      (p) =>
        `${p.id}|${p.brand} ${p.name}|${p.category}|INR ${p.price}|ANC:${p.anc ? "y" : "n"}|battery ${p.batteryLife}|BT ${p.bluetooth}|rating ${p.rating}|${p.tagline}`,
    )
    .join("\n");
}

export async function runSoundMatch(input: MatchInput): Promise<MatchResult> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("AI is not configured.");

  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });

  const system = `You are PULSE's audio concierge. Recommend earbuds/headphones ONLY from the catalog below (format: id|name|category|price|ANC|battery|bluetooth|rating|tagline).
Respond with ONLY minified JSON, no markdown: {"summary":string,"picks":[{"id":number,"score":number 0-100,"headline":string max 6 words,"reason":string max 35 words}]}.
Give exactly 4 picks ranked best first. Respect the budget (small stretch allowed only if clearly worth it, mention it). Reasons must reference the shopper's stated needs and real spec values. Summary: 1-2 sentences.

CATALOG:
${catalogFor(input.budget)}`;

  const user = `Listening habits: ${input.habits || "not specified"}
Use cases: ${input.usage.join(", ") || "general"}
Priorities: ${input.priorities.join(", ") || "balanced"}
Budget: INR ${input.budget}`;

  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system,
    messages: [{ role: "user", content: user }],
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  let text: string;
  try {
    text = await result.text;
  } catch (e) {
    const status = (e as { statusCode?: number }).statusCode;
    if (status === 429) throw new Error("Too many requests right now — please try again in a minute.");
    if (status === 402) throw new Error("AI credits are used up for this workspace. Please add credits to continue.");
    if (status === 403) throw new Error("AI access is currently blocked for this workspace.");
    throw new Error("Couldn't reach the AI concierge. Please try again.");
  }

  const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  let parsed: MatchResult;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("The concierge returned an unexpected answer. Please try again.");
  }
  const valid = new Set(PRODUCTS.map((p) => p.id));
  parsed.picks = (parsed.picks ?? []).filter((p) => valid.has(Number(p.id))).map((p) => ({ ...p, id: Number(p.id) }));
  if (!parsed.picks.length) throw new Error("No matches found — try adjusting your budget.");
  return parsed;
}
