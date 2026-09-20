// import { MistralProvider } from "./mistral";
// import { GeminiProvider } from "./gemini";
// import { ClaudeProvider } from "./claude";
import { GeminiProvider } from "./gemini";
import type { AIProvider } from "./types";

// Pour changer de fournisseur IA : remplacer MistralProvider par une autre
// implémentation de AIProvider (OpenAI, Anthropic, Ollama…)
export function createAIProvider(): AIProvider {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) throw new Error("GEMINI KEY n'est pas configurée");
	return new GeminiProvider(apiKey);
}
