import { useEffect, useRef, useState } from "react";
import { trackEvent } from "#/lib/analytics";
import { OrbitAvatar } from "./orbit-avatar";

const STORAGE_KEY = "lcdw-intro-seen";
const LOADER_SIZE = 220;
const TARGET_SIZE = 176; // taille de l'OrbitAvatar de la carte Avatar
const DURATION = 1400;

// Courbe « chargement » : démarre vite, marque une pause vers 70 %, finit.
function fakeProgress(t: number) {
	if (t < 0.45) return (t / 0.45) * 0.7;
	if (t < 0.65) return 0.7 + ((t - 0.45) / 0.2) * 0.04;
	return 0.74 + (1 - (1 - (t - 0.65) / 0.35) ** 3) * 0.26;
}

/**
 * Faux écran de chargement, une fois par session. Le HTML SSR le contient
 * toujours ; le script de tête (__root) le masque avant affichage s'il ne doit
 * pas jouer (classe intro-skip). À la fin, l'avatar « vole » jusqu'à la carte
 * Avatar puis l'écran s'efface.
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
	const [visible, setVisible] = useState(true);
	const [progress, setProgress] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const overlayRef = useRef<HTMLDivElement>(null);
	const avatarRef = useRef<HTMLDivElement>(null);
	const exiting = useRef(false);
	const onDoneRef = useRef(onDone);
	onDoneRef.current = onDone;

	useEffect(() => {
		const root = document.documentElement;
		if (!root.classList.contains("intro-playing")) {
			setVisible(false);
			onDoneRef.current();
			return;
		}

		const main = document.querySelector("main");
		main?.setAttribute("inert", "");
		root.style.overflow = "hidden";

		function finish() {
			try {
				sessionStorage.setItem(STORAGE_KEY, "1");
			} catch {
				// stockage indisponible : l'intro rejouera, sans gravité
			}
			root.classList.remove("intro-playing");
			root.classList.add("intro-skip");
			root.style.overflow = "";
			main?.removeAttribute("inert");
			window.removeEventListener("keydown", onKey);
			setVisible(false);
		}

		function exit(skipped: boolean) {
			if (exiting.current) return;
			exiting.current = true;
			cancelAnimationFrame(frame);
			setProgress(100);
			setLoaded(true);
			trackEvent("intro_end", { skipped: skipped ? 1 : 0 });
			// Les cartes de l'accueil se révèlent pendant le vol de l'avatar
			onDoneRef.current();

			const overlay = overlayRef.current;
			const avatar = avatarRef.current;
			const target = document.querySelector("[data-avatar-target]");
			if (!overlay || !avatar) return finish();

			const from = avatar.getBoundingClientRect();
			const to = target?.getBoundingClientRect();
			const targetVisible =
				to && to.bottom > 0 && to.top < window.innerHeight && to.width > 0;

			const fly = targetVisible
				? avatar.animate(
						[
							{ transform: "none" },
							{
								transform: `translate(${to.left + to.width / 2 - (from.left + from.width / 2)}px, ${to.top + to.height / 2 - (from.top + from.height / 2)}px) scale(${TARGET_SIZE / LOADER_SIZE})`,
							},
						],
						{
							duration: skipped ? 450 : 800,
							delay: skipped ? 0 : 100,
							easing: "cubic-bezier(0.65, 0, 0.35, 1)",
							fill: "forwards",
						},
					)
				: avatar.animate([{ opacity: 1 }, { opacity: 0, scale: 0.9 }], {
						duration: 400,
						fill: "forwards",
					});

			// Le fond s'efface pendant le vol, les textes du chargement d'abord
			for (const el of overlay.querySelectorAll("[data-intro-fade]")) {
				el.animate([{ opacity: 1 }, { opacity: 0 }], {
					duration: 250,
					fill: "forwards",
				});
			}
			const backdrop = overlay.querySelector<HTMLElement>(
				"[data-intro-backdrop]",
			);
			backdrop?.animate([{ opacity: 1 }, { opacity: 0 }], {
				duration: skipped ? 400 : 700,
				delay: skipped ? 0 : 150,
				easing: "ease-out",
				fill: "forwards",
			});

			fly.finished.then(finish, finish);
		}

		let frame = 0;
		const start = performance.now();
		function tick(now: number) {
			const t = Math.min((now - start) / DURATION, 1);
			setProgress(Math.round(fakeProgress(t) * 100));
			if (t < 1) frame = requestAnimationFrame(tick);
			else {
				setLoaded(true);
				setTimeout(() => exit(false), 200);
			}
		}
		frame = requestAnimationFrame(tick);

		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape" || e.key === "Enter" || e.key === " ") exit(true);
		}
		window.addEventListener("keydown", onKey);
		overlayRef.current?.addEventListener("click", () => exit(true));

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("keydown", onKey);
		};
	}, []);

	if (!visible) return null;

	return (
		<div ref={overlayRef} className="intro-loader">
			<div
				data-intro-backdrop
				aria-hidden="true"
				className="intro-loader-backdrop"
			/>
			<div ref={avatarRef} aria-hidden="true" className="will-change-transform">
				<OrbitAvatar
					size={LOADER_SIZE}
					text={loaded ? "OPEN TO WORK" : "CHARGEMENT"}
				/>
			</div>
			<div data-intro-fade className="flex w-48 flex-col items-center gap-3">
				<p
					aria-hidden="true"
					className="display-title text-3xl font-semibold tabular-nums text-[#253c59] dark:text-white"
				>
					{progress}
					<span className="text-[#b52f2f] dark:text-[#ff7a7a]">%</span>
				</p>
				<div className="h-0.5 w-full overflow-hidden rounded-full bg-[#d2c4a4] dark:bg-[#253c59]">
					<div
						className="h-full origin-left rounded-full bg-[#f25353]"
						style={{ transform: `scaleX(${progress / 100})` }}
					/>
				</div>
			</div>
			<button
				type="button"
				data-intro-fade
				className="absolute bottom-8 rounded-full border border-[#d2c4a4] dark:border-[#253c59] px-4 py-2 text-sm font-semibold text-[#4a6a8a] dark:text-[#a1adbc] hover:bg-[#e6d3ae] dark:hover:bg-[#1c2a3a] transition-colors cursor-pointer"
			>
				Passer l'intro
			</button>
		</div>
	);
}
