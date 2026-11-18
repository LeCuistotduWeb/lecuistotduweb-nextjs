import type {
	ParallaxOptions,
	ProgressOptions,
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
	const progressItems = new Map<HTMLElement, ProgressOptions["mode"]>();
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

	function listen() {
		if (parallaxItems.size + progressItems.size > 0) return;
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
	}

	function unlisten() {
		if (parallaxItems.size + progressItems.size > 0) return;
		window.removeEventListener("scroll", onScroll);
		window.removeEventListener("resize", onScroll);
	}

	function update() {
		frame = 0;
		const vh = window.innerHeight;
		for (const [element, mode] of progressItems) {
			const rect = element.getBoundingClientRect();
			const raw =
				mode === "follow"
					? (vh * 0.55 - rect.top) / Math.max(1, rect.height)
					: mode === "pin"
						? -rect.top / Math.max(1, rect.height - vh)
						: (vh - rect.top) / (vh * 0.4 + rect.height);
			const value = Math.min(1, Math.max(0, raw));
			element.style.setProperty("--scroll-progress", value.toFixed(3));
		}
		const viewportCenter = vh / 2;
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
		if (!frame) frame = requestAnimationFrame(update);
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
			listen();
			parallaxItems.set(element, options);
			onScroll();
			return () => {
				parallaxItems.delete(element);
				element.style.translate = "";
				delete element.dataset.parallaxY;
				unlisten();
			};
		},

		progress(element, { mode = "enter" }: ProgressOptions = {}) {
			if (prefersReducedMotion()) {
				// Rien ne bouge : état final (frise dessinée), ou début si épinglé
				element.style.setProperty(
					"--scroll-progress",
					mode === "pin" ? "0" : "1",
				);
				return () => {};
			}
			listen();
			progressItems.set(element, mode);
			onScroll();
			return () => {
				progressItems.delete(element);
				element.style.removeProperty("--scroll-progress");
				unlisten();
			};
		},

		start() {
			if (started) return;
			started = true;
			for (const element of waiting) show(element);
		},
	};
}
