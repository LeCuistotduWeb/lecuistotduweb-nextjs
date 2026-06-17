export type AIMessage = {
	role: "user" | "assistant";
	content: string;
};

export interface AIProvider {
	chat(messages: AIMessage[], systemPrompt: string): Promise<string>;
}
