import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createAIProvider } from "#/lib/ai";
import { buildSystemPrompt } from "#/lib/ai/prompt";
import type { AIMessage } from "#/lib/ai/types";

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

// Seuls les derniers messages sont envoyés au modèle pour éviter que le coût
// en tokens d'entrée n'augmente à chaque réplique.
const MAX_HISTORY_MESSAGES = 6;

function trimHistory(messages: AIMessage[]): AIMessage[] {
	const recent = messages.slice(-MAX_HISTORY_MESSAGES);
	// L'historique envoyé doit commencer par un message utilisateur
	const firstUserIndex = recent.findIndex((m) => m.role === "user");
	return firstUserIndex > 0 ? recent.slice(firstUserIndex) : recent;
}

export const chatFn = createServerFn({ method: "POST" })
	.validator((data: unknown) => chatInputSchema.parse(data))
	.handler(async ({ data }) => {
		const provider = createAIProvider();
		const systemPrompt = buildSystemPrompt();
		const reply = await provider.chat(trimHistory(data.messages), systemPrompt);
		return { reply };
	});
