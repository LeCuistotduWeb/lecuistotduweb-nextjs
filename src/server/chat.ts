import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createAIProvider } from "#/lib/ai";
import { buildSystemPrompt } from "#/lib/ai/prompt";

const chatInputSchema = z.object({
	messages: z
		.array(
			z.object({
				role: z.enum(["user", "assistant"]),
				content: z.string().min(1).max(4000),
			}),
		)
		.min(1)
		.max(50),
});

export const chatFn = createServerFn({ method: "POST" })
	.validator((data: unknown) => chatInputSchema.parse(data))
	.handler(async ({ data }) => {
		const provider = createAIProvider();
		const systemPrompt = buildSystemPrompt();
		const reply = await provider.chat(data.messages, systemPrompt);
		return { reply };
	});
