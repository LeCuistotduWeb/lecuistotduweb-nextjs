import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import { CardTitle } from "./card-title";

const projects = [
	{
		src: "/works/miniature-site-web-laclassedefleur-1280.webp",
		srcSet:
			"/works/miniature-site-web-laclassedefleur-640.webp 640w, /works/miniature-site-web-laclassedefleur-1280.webp 1280w",
		label: "La Classe de Fleur",
		description:
			"Site pédagogique pour apprendre le français : vidéos, méthodologie et e-books.",
	},
	{
		src: "/works/miniature-site-web-portfolio-infogreffe-1280.webp",
		srcSet:
			"/works/miniature-site-web-portfolio-infogreffe-640.webp 640w, /works/miniature-site-web-portfolio-infogreffe-1280.webp 1280w",
		label: "Infogreffe",
		description:
			"Parcours utilisateurs, Design System et constructeur de pages Strapi.",
	},
	{
		src: "/works/miniature-site-web-1280.webp",
		srcSet:
			"/works/miniature-site-web-640.webp 640w, /works/miniature-site-web-1280.webp 1280w",
		label: "Blissim",
		description:
			"E-commerce beauté migré en PWA : abonnement, shop et box sur-mesure.",
	},
	{
		src: "/works/miniature-fnac-darty-765.webp",
		srcSet:
			"/works/miniature-fnac-darty-640.webp 640w, /works/miniature-fnac-darty-765.webp 765w",
		label: "Fnac Darty",
		description:
			"Architecture front React / Next.js, design system Storybook et i18n.",
	},
	{
		src: "/works/thumbnail-work-musee-du-louvre-symfony-1280.webp",
		srcSet:
			"/works/thumbnail-work-musee-du-louvre-symfony-640.webp 640w, /works/thumbnail-work-musee-du-louvre-symfony-1280.webp 1280w",
		label: "Musée du Louvre",
		description: "Billetterie en ligne développée avec Symfony.",
	},
	{
		src: "/works/thumbnail-worksite-web-nomad-education-1280.webp",
		srcSet:
			"/works/thumbnail-worksite-web-nomad-education-640.webp 640w, /works/thumbnail-worksite-web-nomad-education-1280.webp 1280w",
		label: "Nomad Education",
		description:
			"Refonte du site vitrine et migration d'Angular vers Nuxt / Vue.",
	},
	{
		src: "/works/mon-vdi-assistant-miniature-1280.webp",
		srcSet:
			"/works/mon-vdi-assistant-miniature-640.webp 640w, /works/mon-vdi-assistant-miniature-1280.webp 1280w",
		label: "Mon VDI Assistant",
		description: "SaaS pour gérer clients, commandes, produits et réunions.",
	},
];

const pad = (n: number) => String(n).padStart(2, "0");

const controlClass =
	"rounded-full border border-[#d2c4a4] dark:border-[#253c59] p-1.5 text-[#8a7560] dark:text-[#a1adbc] hover:bg-[#e6d3ae] dark:hover:bg-[#1c2a3a] transition-colors cursor-pointer";

// Barre de progression : sa fin d'animation (CSS) fait avancer le carrousel,
// ce qui la met en pause gratuitement au survol / focus / bouton pause.
function Progress({
	playing,
	onEnd,
	className,
}: {
	playing: boolean;
	onEnd: () => void;
	className?: string;
}) {
	return (
		<span
			onAnimationEnd={onEnd}
			className={cn(
				"project-progress absolute inset-0 origin-left rounded-full bg-[#f25353] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
				!playing && "[animation-play-state:paused]",
				className,
			)}
		/>
	);
}

export default function ProjectCard({ className }: { className?: string }) {
	const [current, setCurrent] = useState(0);
	const [playing, setPlaying] = useState(true);
	// Ne monte que les slides déjà affichées + la suivante, pour ne pas
	// télécharger toutes les images au chargement initial.
	const [mounted, setMounted] = useState(() => new Set([0, 1]));
	const touchStartX = useRef<number | null>(null);

	useEffect(() => {
		setMounted((prev) => {
			const next = (current + 1) % projects.length;
			if (prev.has(current) && prev.has(next)) return prev;
			return new Set(prev).add(current).add(next);
		});
	}, [current]);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setPlaying(false);
		}
	}, []);

	function goTo(index: number, method: string) {
		const next = (index + projects.length) % projects.length;
		setCurrent(next);
		trackEvent("view_project", { project: projects[next].label, method });
	}

	function handleTouchStart(e: React.TouchEvent) {
		touchStartX.current = e.touches[0].clientX;
	}

	function handleTouchEnd(e: React.TouchEvent) {
		if (touchStartX.current === null) return;
		const delta = touchStartX.current - e.changedTouches[0].clientX;
		touchStartX.current = null;
		if (Math.abs(delta) < 50) return;
		goTo(current + (delta > 0 ? 1 : -1), "swipe");
	}

	const advance = () => setCurrent((i) => (i + 1) % projects.length);

	return (
		<BentoCard
			className={cn("group p-4 md:p-6 flex flex-col gap-4", className)}
		>
			<div className="flex items-center justify-between gap-4 px-1">
				<CardTitle className="mb-0">Projets</CardTitle>
				<div className="flex items-center gap-2">
					<span className="mr-1 text-xs font-medium tabular-nums text-[#4a6a8a] dark:text-[#a1adbc]">
						{pad(current + 1)} / {pad(projects.length)}
					</span>
					<button
						type="button"
						onClick={() => goTo(current - 1, "arrow")}
						className={controlClass}
						aria-label="Projet précédent"
					>
						<ChevronLeft className="size-4" />
					</button>
					<button
						type="button"
						onClick={() => setPlaying((p) => !p)}
						className={controlClass}
						aria-label={
							playing
								? "Mettre le défilement en pause"
								: "Reprendre le défilement"
						}
					>
						{playing ? (
							<Pause className="size-4" />
						) : (
							<Play className="size-4" />
						)}
					</button>
					<button
						type="button"
						onClick={() => goTo(current + 1, "arrow")}
						className={controlClass}
						aria-label="Projet suivant"
					>
						<ChevronRight className="size-4" />
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-6">
				<ol className="hidden lg:flex flex-col justify-center gap-1 order-1">
					{projects.map((project, i) => (
						<li key={project.label}>
							<button
								type="button"
								onClick={() => goTo(i, "list")}
								aria-current={i === current ? "true" : undefined}
								className={cn(
									"w-full flex items-baseline gap-3 rounded-lg px-3 py-2.5 text-left transition-colors cursor-pointer",
									i === current
										? "bg-[#e6d3ae]/60 dark:bg-[#1c2a3a]"
										: "hover:bg-[#e6d3ae]/40 dark:hover:bg-[#1c2a3a]/60",
								)}
							>
								<span className="text-xs tabular-nums text-[#8a7560] dark:text-[#7a8fa0]">
									{pad(i + 1)}
								</span>
								<span className="flex-1 min-w-0">
									<span
										className={cn(
											"block font-semibold truncate",
											i === current
												? "text-[#253c59] dark:text-white"
												: "text-[#4a6a8a] dark:text-[#a1adbc]",
										)}
									>
										{project.label}
									</span>
									{/* Toujours rendue, dépliée seulement pour le projet actif :
									    la transition sur grid-template-rows anime la hauteur */}
									<span
										aria-hidden={i !== current}
										className={cn(
											"grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
											i === current
												? "grid-rows-[1fr] opacity-100"
												: "grid-rows-[0fr] opacity-0",
										)}
									>
										<span className="overflow-hidden">
											<span className="mt-0.5 block text-xs leading-snug text-[#4a6a8a] dark:text-[#a1adbc] line-clamp-2">
												{project.description}
											</span>
										</span>
									</span>
									{i === current && (
										<span className="relative mt-2 block h-0.5 rounded-full bg-[#d2c4a4] dark:bg-[#253c59]">
											<Progress
												key={current}
												playing={playing}
												onEnd={advance}
											/>
										</span>
									)}
								</span>
							</button>
						</li>
					))}
				</ol>

				<div
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
					className="relative aspect-video overflow-hidden rounded-xl border border-[#d2c4a4] dark:border-[#1c2a3a] bg-[#e6d3ae] dark:bg-[#1c2a3a] lg:order-2 lg:self-center"
				>
					{projects.map((project, i) =>
						mounted.has(i) ? (
							<img
								key={project.src}
								src={project.src}
								srcSet={project.srcSet}
								sizes="(min-width: 1024px) 760px, 100vw"
								alt={i === current ? `Aperçu du projet ${project.label}` : ""}
								aria-hidden={i !== current}
								fetchPriority={i === 0 ? "high" : undefined}
								decoding="async"
								className={cn(
									"absolute inset-0 w-full h-full object-cover transition-[opacity,scale] duration-700 ease-out",
									i === current
										? "opacity-100 scale-100"
										: "opacity-0 scale-[1.03]",
								)}
							/>
						) : null,
					)}
				</div>

				<div className="flex flex-col gap-3 px-1 lg:hidden">
					<p
						aria-live={playing ? "off" : "polite"}
						className="display-title text-xl font-semibold text-[#253c59] dark:text-white"
					>
						{projects[current].label}
					</p>
					<p className="-mt-2 text-sm text-[#4a6a8a] dark:text-[#a1adbc]">
						{projects[current].description}
					</p>
					<div className="flex gap-1">
						{projects.map((project, i) => (
							<button
								key={project.label}
								type="button"
								onClick={() => goTo(i, "dot")}
								aria-label={`Voir le projet ${project.label}`}
								aria-current={i === current ? "true" : undefined}
								className="flex-1 py-2 cursor-pointer"
							>
								<span
									className={cn(
										"relative block h-1 overflow-hidden rounded-full",
										i < current
											? "bg-[#f25353]"
											: "bg-[#d2c4a4] dark:bg-[#253c59]",
									)}
								>
									{i === current && (
										<Progress key={current} playing={playing} onEnd={advance} />
									)}
								</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</BentoCard>
	);
}
