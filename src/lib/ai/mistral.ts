import type { AIMessage, AIProvider } from "./types";

const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";
const MISTRAL_MODEL = "mistral-small-latest";

export class MistralProvider implements AIProvider {
	constructor(private readonly apiKey: string) {}

	async chat(messages: AIMessage[], systemPrompt: string): Promise<string> {
		const response = await fetch(MISTRAL_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiKey}`,
			},
			body: JSON.stringify({
				model: MISTRAL_MODEL,
				messages: [{ role: "system", content: systemPrompt }, ...messages],
			}),
		});

		if (!response.ok) {
			throw new Error(
				`Mistral API error: ${response.status} ${response.statusText}`,
			);
		}

		const data = (await response.json()) as {
			choices: Array<{ message: { content: string } }>;
		};

		const content = data.choices[0]?.message?.content;
		if (!content) throw new Error("Empty response from Mistral");
		return content;
	}
}
