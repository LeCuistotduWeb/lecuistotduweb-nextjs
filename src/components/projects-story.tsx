import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FEATURED_WORKS as WORKS, type Work } from "#/data/works";
import { trackEvent } from "#/lib/analytics";
import {
	RevealWords,
	useActiveStep,
	useParallax,
} from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import { ProjectDetailsDialog } from "./project-details-dialog";

// Chapitre Projets en récit au scroll : un écran d'ordinateur reste épinglé à
// droite et affiche le projet lu à gauche. Tout le texte est dans le HTML
// serveur ; en mobile, chaque projet a son image, sans épinglage.
// Seuls les projets mis en avant y figurent ; la liste complète est sur
// /realisations.

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";
const pad = (n: number) => String(n).padStart(2, "0");

function Laptop({ active, mounted }: { active: number; mounted: Set<number> }) {
	return (
		<div aria-hidden="true" className="relative w-full select-none">
			<div className="absolute -inset-10 -z-10 rounded-[4rem] bg-[#f25353]/15 blur-3xl" />
			<div className="relative aspect-video overflow-hidden rounded-t-2xl border-[10px] border-b-[14px] border-[#253c59] bg-[#1c2a3a] shadow-2xl shadow-[#253c59]/30 dark:border-[#0d1520]">
				{WORKS.map((work, i) =>
					mounted.has(i) ? (
						<img
							key={work.src}
							src={work.src}
							srcSet={work.srcSet}
							sizes="(min-width: 1536px) 900px, 60vw"
							alt=""
							decoding="async"
							className={cn(
								"absolute inset-0 h-full w-full object-cover transition-[opacity,scale] duration-700 ease-out",
								i === active
									? "scale-100 opacity-100"
									: "scale-[1.04] opacity-0",
							)}
						/>
					) : null,
				)}
			</div>
			<div className="relative -mx-[6%] h-4 rounded-b-2xl bg-[linear-gradient(#c9d3de,#93a3b5)] shadow-xl dark:bg-[linear-gradient(#3a4c60,#1c2a3a)]">
				<div className="absolute top-0 left-1/2 h-1.5 w-1/6 -translate-x-1/2 rounded-b-lg bg-[#253c59]/25" />
			</div>
		</div>
	);
}

/** Lien vers la page de toutes les réalisations, sous le carrousel. */
function AllProjectsButton({ className }: { className?: string }) {
	return (
		<Link
			to="/realisations"
			onClick={() => trackEvent("click_all_projects")}
			className={cn(
				"group inline-flex w-fit shrink-0 items-center gap-3 text-sm font-semibold",
				className,
			)}
		>
			<span
				className={`underline-offset-4 decoration-[#f25353] group-hover:underline ${STRONG}`}
			>
				Voir toutes les réalisations
			</span>
			<span className="flex size-10 items-center justify-center rounded-full border border-[#253c59]/25 transition-[background-color,border-color,rotate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:border-[#f25353] group-hover:bg-[#f25353] dark:border-white/25">
				<ArrowUpRight
					aria-hidden="true"
					className="size-4 text-[#253c59] transition-colors group-hover:text-white dark:text-white"
				/>
			</span>
		</Link>
	);
}

function ProjectButtons({
	work,
	onDetails,
}: {
	work: Work;
	onDetails: () => void;
}) {
	return (
		<div className="flex flex-wrap gap-3">
			<button
				type="button"
				onClick={onDetails}
				className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#253c59] px-5 py-2.5 font-semibold text-white transition-colors hover:bg-[#1c2d44] dark:bg-white dark:text-[#253c59] dark:hover:bg-[#e8eef5]"
			>
				<Maximize2 aria-hidden="true" className="size-4" />
				Voir le projet
				<span className="sr-only"> {work.label}</span>
			</button>
			{work.details.url && (
				<a
					href={work.details.url}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() =>
						trackEvent("click_project_site", { project: work.label })
					}
					className="group inline-flex items-center gap-1.5 rounded-full border border-[#253c59]/25 px-5 py-2.5 font-semibold transition-colors hover:bg-[#253c59]/5 dark:border-white/25 dark:hover:bg-white/10"
				>
					<span className={STRONG}>Voir le site</span>
					<ArrowUpRight aria-hidden="true" className={`size-4 ${STRONG}`} />
				</a>
			)}
		</div>
	);
}

export function ProjectsStory() {
	const { active, register } = useActiveStep(WORKS.length);
	// Projets du récit, pour y faire défiler depuis les points
	const items = useRef<(HTMLElement | null)[]>([]);
	const current = Math.max(active, 0);
	const parallax = useParallax<HTMLDivElement>(0.04);
	const [details, setDetails] = useState<Work | null>(null);
	// Images montées au fil du récit (projet lu + suivant) : pas de
	// téléchargement de toutes les captures au chargement de l'accueil.
	const [mounted, setMounted] = useState(() => new Set([0, 1]));

	useEffect(() => {
		setMounted((prev) => {
			const next = Math.min(current + 1, WORKS.length - 1);
			if (prev.has(current) && prev.has(next)) return prev;
			return new Set(prev).add(current).add(next);
		});
		if (active >= 0) {
			trackEvent("view_project", {
				project: WORKS[active].label,
				method: "scroll",
			});
		}
	}, [active, current]);

	function openDetails(work: Work) {
		setDetails(work);
		trackEvent("open_project_details", { project: work.label });
	}

	return (
		<div className="col-span-full grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-x-12 lg:gap-x-20">
			<div className="flex min-w-0 flex-col">
				<ol className="flex flex-col">
					{WORKS.map((work, index) => (
						<li
							key={work.label}
							ref={(el) => {
								register(index)(el);
								items.current[index] = el;
							}}
							className={cn(
								"flex flex-col justify-center gap-4 py-10 transition-opacity duration-500 md:min-h-[85svh] md:py-0",
								current === index ? "md:opacity-100" : "md:opacity-30",
							)}
						>
							<p className="flex items-baseline gap-4">
								<span className="display-title text-6xl font-bold text-transparent [-webkit-text-stroke:1.5px_#f25353] md:text-7xl">
									{pad(index + 1)}
								</span>
								{work.details.period && (
									<span className={`text-sm font-semibold ${TEXT}`}>
										{work.details.period}
									</span>
								)}
							</p>
							<RevealWords
								as="h3"
								text={work.label}
								className={`display-title text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl ${STRONG}`}
							/>
							<p
								className={`max-w-xl text-lg font-medium leading-relaxed md:text-xl ${TEXT}`}
							>
								{work.description}
							</p>
							{work.details.stack && (
								<ul className="flex flex-wrap gap-2">
									{work.details.stack.map((tech) => (
										<li
											key={tech}
											className="rounded-full border border-[#d2c4a4] px-3 py-1 text-xs font-semibold text-[#4a6a8a] dark:border-[#253c59] dark:text-[#a1adbc]"
										>
											{tech}
										</li>
									))}
								</ul>
							)}
							{/* Mobile : pas d'épinglage, une image par projet */}
							<img
								src={work.src}
								srcSet={work.srcSet}
								sizes="100vw"
								alt={`Aperçu du projet ${work.label}`}
								loading="lazy"
								decoding="async"
								width={640}
								height={360}
								className="aspect-video w-full rounded-xl border border-[#d2c4a4] object-cover md:hidden dark:border-[#253c59]"
							/>
							<ProjectButtons work={work} onDetails={() => openDetails(work)} />
						</li>
					))}
				</ol>
			</div>

			<div className="hidden md:block">
				<div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-8">
					<div ref={parallax} className="w-full">
						<Laptop active={current} mounted={mounted} />
					</div>
					{/* Barre du carrousel, alignée sur l'écran : points et compteur à
					    gauche, lien vers toutes les réalisations à droite */}
					<div className="flex w-full items-center justify-between gap-6">
						<div className="flex min-w-0 items-center gap-4">
							{/* Points : suivent le projet lu au scroll */}
							<div className="-ml-1.5 flex shrink-0 items-center">
								{WORKS.map((work, index) => (
									<button
										key={work.label}
										type="button"
										aria-label={`Projet ${index + 1} : ${work.label}`}
										aria-current={index === current ? "true" : undefined}
										onClick={() =>
											items.current[index]?.scrollIntoView({
												behavior: window.matchMedia(
													"(prefers-reduced-motion: reduce)",
												).matches
													? "instant"
													: "smooth",
												block: "center",
											})
										}
										className="group/dot cursor-pointer p-1.5"
									>
										<span
											className={cn(
												"block h-2 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
												index === current
													? "w-8 bg-[#f25353]"
													: "w-2 bg-[#253c59]/25 group-hover/dot:bg-[#253c59]/50 dark:bg-white/25 dark:group-hover/dot:bg-white/50",
											)}
										/>
									</button>
								))}
							</div>
							<p
								className={`truncate text-sm font-semibold tabular-nums ${TEXT}`}
							>
								<span className="text-[#f25353]">{pad(current + 1)}</span> /{" "}
								{pad(WORKS.length)} · {WORKS[current].label}
							</p>
						</div>
						<AllProjectsButton />
					</div>
				</div>
			</div>

			{/* Mobile : pas de carrousel épinglé, le lien suit le dernier projet */}
			<AllProjectsButton className="mb-10 text-base md:hidden" />

			{details && (
				<ProjectDetailsDialog
					work={details}
					open={details !== null}
					onOpenChange={(open) => {
						if (!open) setDetails(null);
					}}
				/>
			)}
		</div>
	);
}
