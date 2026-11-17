import { ArrowRight, ArrowUpRight, Maximize2 } from "lucide-react";
import { useState } from "react";
import { WORKS, type Work } from "#/data/works";
import { trackEvent } from "#/lib/analytics";
import { useScrollProgress } from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import { ProjectDetailsDialog } from "./project-details-dialog";

// Chapitre Projets en défilement horizontal : la section est haute, son
// contenu reste épinglé et le scroll vertical fait glisser les projets de
// droite à gauche (`--scroll-progress`, mode « pin »). En mobile ou avec les
// animations réduites : carrousel natif à balayer, sans épinglage.

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";
const pad = (n: number) => String(n).padStart(2, "0");

/** Hauteur de scroll consacrée à chaque projet (desktop) */
const SCROLL_PER_PROJECT = "55svh";

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

function ProjectSlide({
	work,
	index,
	onDetails,
}: {
	work: Work;
	index: number;
	onDetails: () => void;
}) {
	return (
		<li className="w-[85vw] shrink-0 snap-center md:w-[min(78vw,68rem)] motion-reduce:md:snap-start">
			<article className="grid h-full items-center gap-5 rounded-3xl border border-[#d2c4a4] bg-[#faf5ec]/90 p-4 backdrop-blur-sm md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-8 md:p-6 dark:border-[#1c2a3a] dark:bg-[#172231]/90">
				<div className="group overflow-hidden rounded-2xl border border-[#d2c4a4] dark:border-[#253c59]">
					<img
						src={work.src}
						srcSet={work.srcSet}
						sizes="(min-width: 768px) 640px, 85vw"
						alt={`Aperçu du projet ${work.label}`}
						loading={index < 2 ? "eager" : "lazy"}
						decoding="async"
						width={640}
						height={360}
						className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
				</div>
				<div className="flex flex-col gap-4 md:pr-2">
					<p className="flex items-baseline gap-3">
						<span className="display-title text-5xl font-bold text-transparent [-webkit-text-stroke:1.5px_#f25353] md:text-6xl">
							{pad(index + 1)}
						</span>
						{work.details.period && (
							<span className={`text-sm font-semibold ${TEXT}`}>
								{work.details.period}
							</span>
						)}
					</p>
					<h3
						className={`display-title text-3xl font-bold leading-[1.05] md:text-4xl lg:text-5xl ${STRONG}`}
					>
						{work.label}
					</h3>
					<p className={`font-medium leading-relaxed md:text-lg ${TEXT}`}>
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
					<ProjectButtons work={work} onDetails={onDetails} />
				</div>
			</article>
		</li>
	);
}

export function ProjectsStory() {
	const pin = useScrollProgress<HTMLDivElement>("pin");
	const [details, setDetails] = useState<Work | null>(null);

	function openDetails(work: Work) {
		setDetails(work);
		trackEvent("open_project_details", { project: work.label });
	}

	return (
		<div className="col-span-full">
			<div
				ref={pin}
				className="relative md:h-(--pin-height) motion-reduce:md:h-auto"
				style={
					{
						"--pin-height": `calc(${WORKS.length} * ${SCROLL_PER_PROJECT} + 100svh)`,
					} as React.CSSProperties
				}
			>
				{/* Pleine largeur d'écran, au-delà des marges de la page */}
				<div className="flex flex-col gap-6 md:sticky md:top-0 md:mx-[calc(50%-50vw)] md:h-svh md:justify-center md:overflow-hidden motion-reduce:md:static motion-reduce:md:mx-0 motion-reduce:md:h-auto">
					<ol
						aria-label="Projets"
						className={cn(
							// Mobile / animations réduites : carrousel natif à balayer
							"-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
							// Desktop : piste qui glisse avec le scroll vertical
							"md:mx-0 md:w-max md:snap-none md:gap-8 md:overflow-visible md:px-[6vw] md:pb-0 md:will-change-transform md:[translate:calc((100vw-100%)*var(--scroll-progress,0))_0]",
							"motion-reduce:md:w-auto motion-reduce:md:snap-x motion-reduce:md:overflow-x-auto motion-reduce:md:[translate:none]",
						)}
					>
						{WORKS.map((work, index) => (
							<ProjectSlide
								key={work.label}
								work={work}
								index={index}
								onDetails={() => openDetails(work)}
							/>
						))}
					</ol>
					<div
						aria-hidden="true"
						className={`flex items-center justify-center gap-4 text-sm font-semibold ${TEXT}`}
					>
						<span className="md:hidden motion-reduce:md:inline">
							Glissez pour voir les {WORKS.length} projets
						</span>
						<span className="hidden items-center gap-4 md:flex motion-reduce:md:hidden">
							<span className="relative h-1 w-40 overflow-hidden rounded-full bg-[#253c59]/10 dark:bg-white/10">
								<span className="absolute inset-0 origin-left scale-x-[var(--scroll-progress,0)] rounded-full bg-[#f25353]" />
							</span>
							Continuez à défiler
						</span>
						<ArrowRight className="size-4 text-[#f25353]" />
					</div>
				</div>
			</div>

			{details && (
				<ProjectDetailsDialog
					work={details}
					open
					onOpenChange={(open) => {
						if (!open) setDetails(null);
					}}
				/>
			)}
		</div>
	);
}
