import { MistralProvider } from "./mistral";
import type { AIProvider } from "./types";

// Pour changer de fournisseur IA : remplacer MistralProvider par une autre
// implémentation de AIProvider (OpenAI, Anthropic, Ollama…)
export function createAIProvider(): AIProvider {
	const apiKey = process.env.MISTRAL_API_KEY;
	if (!apiKey) throw new Error("MISTRAL KEY n'est pas configurée");
	return new MistralProvider(apiKey);
}
