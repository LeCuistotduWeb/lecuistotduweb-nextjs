import type { AIMessage, AIProvider } from "./types";

const GEMINI_MODEL = "gemini-3.5-flash-lite";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export class GeminiProvider implements AIProvider {
	constructor(private readonly apiKey: string) {}

	async chat(messages: AIMessage[], systemPrompt: string): Promise<string> {
		const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				system_instruction: { parts: [{ text: systemPrompt }] },
				contents: messages.map((message) => ({
					role: message.role === "assistant" ? "model" : "user",
					parts: [{ text: message.content }],
				})),
				generationConfig: {
					// Plafonne les tokens de sortie (les plus chers) et limite le
					// raisonnement interne, facturé comme de la sortie
					// maxOutputTokens: 500,
					thinkingConfig: { thinkingLevel: "low" },
				},
			}),
		});

		if (!response.ok) {
			const errorBody = await response.text().catch(() => "");
			throw new Error(
				`Gemini API error: ${response.status} ${response.statusText} ${errorBody}`,
			);
		}

		const data = (await response.json()) as {
			candidates?: Array<{ content: { parts: Array<{ text: string }> } }>;
		};

		const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
		if (!content) throw new Error("Empty response from Gemini");
		return content;
	}
}
