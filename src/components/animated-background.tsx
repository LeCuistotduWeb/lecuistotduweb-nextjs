import { useEffect, useRef } from "react";

// Fond animé : taches de couleur floues (« lave ») qui dérivent en continu,
// attirées par la souris et accélérées par le scroll. Dessiné en basse
// résolution puis agrandi par le navigateur : le flou est gratuit.

type Rgb = [number, number, number];

type Blob = {
	/** Position de repos, en fraction de l'écran */
	x: number;
	y: number;
	/** Amplitude de la dérive, en fraction de l'écran */
	ax: number;
	ay: number;
	/** Vitesses angulaires (rad/s) */
	sx: number;
	sy: number;
	phase: number;
	/** Rayon, en fraction de la plus grande dimension */
	r: number;
	/** Sensibilité à la souris */
	pull: number;
	light: { rgb: Rgb; a: number };
	dark: { rgb: Rgb; a: number };
};

const CORAL: Rgb = [242, 83, 83];
const AMBER: Rgb = [228, 185, 98];
const NAVY: Rgb = [37, 60, 89];
const SKY: Rgb = [80, 150, 230];
const STEEL: Rgb = [74, 106, 138];

const BLOBS: Blob[] = [
	{
		x: 0.15,
		y: 0.2,
		ax: 0.18,
		ay: 0.14,
		sx: 0.23,
		sy: 0.31,
		phase: 0,
		r: 0.42,
		pull: 0.18,
		light: { rgb: CORAL, a: 0.22 },
		dark: { rgb: CORAL, a: 0.16 },
	},
	{
		x: 0.85,
		y: 0.25,
		ax: 0.16,
		ay: 0.2,
		sx: 0.19,
		sy: 0.27,
		phase: 1.7,
		r: 0.46,
		pull: 0.1,
		light: { rgb: AMBER, a: 0.32 },
		dark: { rgb: SKY, a: 0.2 },
	},
	{
		x: 0.5,
		y: 0.75,
		ax: 0.22,
		ay: 0.12,
		sx: 0.17,
		sy: 0.24,
		phase: 3.1,
		r: 0.5,
		pull: 0.14,
		light: { rgb: STEEL, a: 0.16 },
		dark: { rgb: NAVY, a: 0.45 },
	},
	{
		x: 0.3,
		y: 0.85,
		ax: 0.15,
		ay: 0.16,
		sx: 0.29,
		sy: 0.21,
		phase: 4.4,
		r: 0.34,
		pull: 0.22,
		light: { rgb: AMBER, a: 0.24 },
		dark: { rgb: AMBER, a: 0.08 },
	},
	{
		x: 0.75,
		y: 0.65,
		ax: 0.14,
		ay: 0.2,
		sx: 0.33,
		sy: 0.18,
		phase: 5.6,
		r: 0.3,
		pull: 0.26,
		light: { rgb: CORAL, a: 0.16 },
		dark: { rgb: CORAL, a: 0.12 },
	},
];

/** Facteur de résolution du canvas (le reste est interpolé = flou) */
const SCALE = 0.25;

export function AnimatedBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		// Souris en fraction de l'écran, lissée ; centre par défaut
		const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
		let time = 0;
		let boost = 0;
		let lastScroll = window.scrollY;
		let last = performance.now();
		let frame = 0;

		function resize() {
			if (!canvas) return;
			canvas.width = Math.max(1, Math.round(window.innerWidth * SCALE));
			canvas.height = Math.max(1, Math.round(window.innerHeight * SCALE));
		}

		function draw() {
			if (!canvas || !ctx) return;
			const { width: w, height: h } = canvas;
			const size = Math.max(w, h);
			const dark = document.documentElement.classList.contains("dark");
			ctx.clearRect(0, 0, w, h);
			for (const b of BLOBS) {
				const t = time + b.phase;
				const fx =
					b.x + Math.sin(t * b.sx) * b.ax + (mouse.x - 0.5) * b.pull * 2;
				const fy =
					b.y + Math.cos(t * b.sy) * b.ay + (mouse.y - 0.5) * b.pull * 2;
				// Le rayon « respire »
				const r = b.r * size * (1 + Math.sin(t * 0.4) * 0.12);
				const { rgb, a } = dark ? b.dark : b.light;
				const color = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
				const g = ctx.createRadialGradient(
					fx * w,
					fy * h,
					0,
					fx * w,
					fy * h,
					r,
				);
				g.addColorStop(0, `rgba(${color}, ${a})`);
				g.addColorStop(0.5, `rgba(${color}, ${a * 0.45})`);
				g.addColorStop(1, `rgba(${color}, 0)`);
				ctx.fillStyle = g;
				ctx.fillRect(0, 0, w, h);
			}
		}

		function tick(now: number) {
			const dt = Math.min((now - last) / 1000, 0.1);
			last = now;
			// Le scroll accélère la dérive, puis l'élan retombe
			const scroll = window.scrollY;
			boost += Math.min(Math.abs(scroll - lastScroll) / 120, 3);
			lastScroll = scroll;
			boost *= 0.92;
			time += dt * (1 + boost);
			mouse.x += (mouse.tx - mouse.x) * 0.04;
			mouse.y += (mouse.ty - mouse.y) * 0.04;
			draw();
			frame = requestAnimationFrame(tick);
		}

		function onPointerMove(e: PointerEvent) {
			mouse.tx = e.clientX / window.innerWidth;
			mouse.ty = e.clientY / window.innerHeight;
		}

		function onVisibility() {
			cancelAnimationFrame(frame);
			if (!document.hidden) {
				last = performance.now();
				frame = requestAnimationFrame(tick);
			}
		}

		resize();
		window.addEventListener("resize", resize);
		if (reduceMotion) {
			draw();
			// Pas d'animation : on redessine seulement au changement de thème
			const observer = new MutationObserver(draw);
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["class"],
			});
			const redraw = () => draw();
			window.addEventListener("resize", redraw);
			return () => {
				observer.disconnect();
				window.removeEventListener("resize", resize);
				window.removeEventListener("resize", redraw);
			};
		}

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		document.addEventListener("visibilitychange", onVisibility);
		frame = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, []);

	return (
		// biome-ignore lint/a11y/noAriaHiddenOnFocusable: canvas décoratif, non focusable
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10 size-full"
		/>
	);
}
