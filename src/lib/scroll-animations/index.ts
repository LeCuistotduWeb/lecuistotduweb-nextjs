import { createIntersectionEngine } from "./intersection-engine";
import type { ScrollAnimationEngine } from "./types";

// Point de bascule du moteur : pour passer à GSAP + ScrollTrigger, créer
// gsap-engine.ts qui implémente ScrollAnimationEngine et le retourner ici.
let engine: ScrollAnimationEngine | null = null;

export function getScrollEngine(): ScrollAnimationEngine {
	engine ??= createIntersectionEngine();
	// Signale au script de secours (__root) que les animations ont démarré
	(window as unknown as { __lcdwAnim?: boolean }).__lcdwAnim = true;
	return engine;
}

export type {
	ParallaxOptions,
	RevealOptions,
	RevealVariant,
	ScrollAnimationEngine,
} from "./types";
