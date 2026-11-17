import { GraduationCap } from "lucide-react";
import { EXPERIENCES } from "#/data/experiences";
import { FORMATIONS } from "#/data/formations";
import { Reveal, useScrollProgress } from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";

// Chapitre Expérience.
// - Desktop : frise horizontale épinglée. La section est haute, son contenu
//   reste à l'écran et le scroll vertical fait glisser la frise de gauche à
//   droite (`--scroll-progress`, mode « pin »), de la plus ancienne expérience
//   à la plus récente ; le trait part du milieu de l'écran et finit plein.
// - Mobile : frise verticale dont le trait suit la lecture (mode « follow »).
// - Animations réduites (desktop) : frise horizontale à faire défiler.
// Les formations sont intégrées à la frise (pastille « diplôme ») : elles
// ouvrent le parcours et racontent la reconversion.

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";

/** Hauteur de scroll consacrée à chaque étape (desktop) */
const SCROLL_PER_ITEM = "40svh";

type Step = {
	kind: "experience" | "formation";
	/** Entreprise ou école */
	place: string;
	title: string;
	period: string;
	description?: string[];
};

const startYear = (period: string) => Number(period.match(/\d{4}/)?.[0] ?? 0);

/**
 * Étapes du parcours, de la plus récente à la plus ancienne : chaque formation
 * est placée avant la première expérience qui a commencé la même année ou plus
 * tôt.
 */
const STEPS: Step[] = (() => {
	const steps: Step[] = EXPERIENCES.map((xp) => ({
		kind: "experience",
		place: xp.company,
		title: xp.title,
		period: xp.period,
		description: xp.description,
	}));
	for (const f of FORMATIONS) {
		const index = steps.findIndex(
			(step) =>
				step.kind === "experience" &&
				startYear(step.period) <= startYear(f.period),
		);
		const step: Step = {
			kind: "formation",
			place: f.school,
			title: f.title,
			period: f.period,
		};
		if (index === -1) steps.push(step);
		else steps.splice(index, 0, step);
	}
	return steps;
})();

export function ExperienceTimeline() {
	const pin = useScrollProgress<HTMLDivElement>("pin");
	const follow = useScrollProgress<HTMLSpanElement>("follow");

	return (
		<div
			ref={pin}
			className="relative col-span-full md:h-(--pin-height) motion-reduce:md:h-auto"
			style={
				{
					"--pin-height": `calc(${STEPS.length} * ${SCROLL_PER_ITEM} + 100svh)`,
				} as React.CSSProperties
			}
		>
			{/* Desktop : pleine largeur d'écran, au-delà des marges de la page */}
			<div className="md:sticky md:top-0 md:mx-[calc(50%-50vw)] md:flex md:h-svh md:flex-col md:justify-center md:overflow-hidden motion-reduce:md:static motion-reduce:md:mx-0 motion-reduce:md:h-auto motion-reduce:md:overflow-x-auto">
				<ol
					aria-label="Parcours : expériences et formations"
					className={cn(
						"relative flex flex-col gap-10 py-2 pl-10",
						// Ordre chronologique de gauche à droite (la liste va du plus récent)
						"md:w-max md:flex-row-reverse md:items-start md:gap-0 md:px-[8vw] md:py-0 md:will-change-transform md:[translate:calc((100vw-100%)*var(--scroll-progress,0))_0]",
						"motion-reduce:md:[translate:none]",
					)}
				>
					{/* Mobile : trait vertical qui suit la lecture */}
					<span
						ref={follow}
						aria-hidden="true"
						className="absolute top-0 bottom-0 left-3 w-px bg-[#253c59]/15 md:hidden dark:bg-white/15"
					>
						<span className="absolute inset-0 origin-top scale-y-[var(--scroll-progress,1)] bg-linear-to-b from-[#f25353] to-[#e4b962]" />
					</span>
					{/* Desktop : trait horizontal, plein à la fin de la course */}
					<span
						aria-hidden="true"
						className="absolute top-[2.875rem] right-0 left-0 hidden h-px bg-[#253c59]/15 md:block dark:bg-white/15"
					>
						<span className="absolute inset-y-0 left-0 w-[calc(50vw+var(--scroll-progress,0)*(100%-50vw))] max-w-full bg-linear-to-r from-[#e4b962] to-[#f25353]" />
					</span>

					{STEPS.map((step) => {
						const formation = step.kind === "formation";
						return (
							<li
								key={`${step.place}-${step.period}`}
								className="relative md:flex md:w-[26rem] md:shrink-0 md:flex-col md:pr-14"
							>
								<p
									className={cn(
										"text-sm font-semibold tracking-wide",
										formation
											? "text-[#8a6a1f] dark:text-[#e4b962]"
											: "text-[#b52f2f] dark:text-[#ff7a7a]",
									)}
								>
									{step.period}
									{formation && (
										<span className="ml-2 text-xs uppercase tracking-widest opacity-80">
											· Formation
										</span>
									)}
								</p>
								<span
									aria-hidden="true"
									className={cn(
										"absolute top-0.5 -left-7 flex size-5 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-[#faf5ec] md:static md:my-4 md:translate-x-0 dark:bg-[#121e2a]",
										formation ? "border-[#e4b962]" : "border-[#f25353]",
									)}
								>
									{formation ? (
										<GraduationCap className="size-3 text-[#b8902e] dark:text-[#e4b962]" />
									) : (
										<span className="size-2.5 rounded-full bg-[#f25353]" />
									)}
								</span>
								<Reveal
									variant="rise"
									className="mt-2 flex flex-col gap-2 md:mt-0"
								>
									<h3
										className={`display-title text-2xl font-bold leading-tight md:text-4xl ${STRONG}`}
									>
										{step.place}
									</h3>
									<p className={`font-semibold ${TEXT}`}>{step.title}</p>
									{step.description && (
										<ul
											className={cn(
												"mt-2 flex max-w-md flex-col gap-1.5 text-sm leading-relaxed",
												TEXT,
											)}
										>
											{step.description.slice(0, 2).map((line) => (
												<li key={line}>{line}</li>
											))}
										</ul>
									)}
								</Reveal>
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);
}
