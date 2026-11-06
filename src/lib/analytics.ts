declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
		aiAgentSignal?: (agent?: string, method?: string) => boolean;
	}
}

export function trackEvent(
	name: string,
	params?: Record<string, string | number>,
) {
	window.gtag?.("event", name, params);
}
