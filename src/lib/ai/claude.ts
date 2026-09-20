import Anthropic from "@anthropic-ai/sdk";
import type { AIMessage, AIProvider } from "./types";

const CLAUDE_MODEL = "claude-opus-5";

export class ClaudeProvider implements AIProvider {
	private readonly client: Anthropic;

	constructor(apiKey: string) {
		this.client = new Anthropic({ apiKey });
	}

	async chat(messages: AIMessage[], systemPrompt: string): Promise<string> {
		const response = await this.client.messages.create({
			model: CLAUDE_MODEL,
			max_tokens: 4096,
			system: systemPrompt,
			messages: messages.map((message) => ({
				role: message.role,
				content: message.content,
			})),
		});

		const textBlock = response.content.find((block) => block.type === "text");
		if (!textBlock) throw new Error("Empty response from Claude");
		return textBlock.text;
	}
}
