import type {
	ParallaxOptions,
	RevealOptions,
	ScrollAnimationEngine,
} from "./types";

// Moteur sans dépendance : IntersectionObserver pour les révélations, un seul
// écouteur de scroll (rAF) pour le parallaxe. Les états visuels sont en CSS
// (attributs data-reveal / data-revealed, voir styles.css).

function prefersReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function createIntersectionEngine(): ScrollAnimationEngine {
	let started = false;
	let observer: IntersectionObserver | null = null;
	// Éléments déjà dans le viewport avant start() : révélés au démarrage
	const waiting = new Set<HTMLElement>();

	const parallaxItems = new Map<HTMLElement, ParallaxOptions>();
	let frame = 0;

	function show(element: HTMLElement) {
		element.dataset.revealed = "";
		observer?.unobserve(element);
		waiting.delete(element);
	}

	function getObserver() {
		observer ??= new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const element = entry.target as HTMLElement;
					if (!entry.isIntersecting) {
						waiting.delete(element);
					} else if (started) {
						show(element);
					} else {
						waiting.add(element);
					}
				}
			},
			// Déclenche un peu avant que l'élément soit vraiment visible
			{ rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
		);
		return observer;
	}

	function updateParallax() {
		frame = 0;
		const viewportCenter = window.innerHeight / 2;
		for (const [element, { speed }] of parallaxItems) {
			const rect = element.getBoundingClientRect();
			// Utilise la position sans la translation déjà appliquée
			const current = Number(element.dataset.parallaxY ?? 0);
			const center = rect.top - current + rect.height / 2;
			const y = Math.round((center - viewportCenter) * -speed * 10) / 10;
			element.dataset.parallaxY = String(y);
			element.style.translate = `0 ${y}px`;
		}
	}

	function onScroll() {
		if (!frame) frame = requestAnimationFrame(updateParallax);
	}

	return {
		reveal(element, { variant, delay = 0 }: RevealOptions) {
			element.dataset.reveal = variant;
			element.style.setProperty("--reveal-delay", `${delay}ms`);
			if (prefersReducedMotion()) {
				element.dataset.revealed = "";
				return () => {};
			}
			getObserver().observe(element);
			return () => {
				observer?.unobserve(element);
				waiting.delete(element);
			};
		},

		parallax(element, options) {
			if (prefersReducedMotion()) return () => {};
			if (parallaxItems.size === 0) {
				window.addEventListener("scroll", onScroll, { passive: true });
				window.addEventListener("resize", onScroll, { passive: true });
			}
			parallaxItems.set(element, options);
			onScroll();
			return () => {
				parallaxItems.delete(element);
				element.style.translate = "";
				delete element.dataset.parallaxY;
				if (parallaxItems.size === 0) {
					window.removeEventListener("scroll", onScroll);
					window.removeEventListener("resize", onScroll);
				}
			};
		},

		start() {
			if (started) return;
			started = true;
			for (const element of waiting) show(element);
		},
	};
}
