import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  habits: z.string().max(600),
  budget: z.number().min(500).max(100000),
  priorities: z.array(z.string().max(40)).max(8),
  usage: z.array(z.string().max(40)).max(8),
});

export const getSoundMatch = createServerFn({ method: "POST" })
  .validator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const { runSoundMatch } = await import("./sound-match.server");
    try {
      return { ok: true as const, result: await runSoundMatch(data) };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Something went wrong." };
    }
  });
