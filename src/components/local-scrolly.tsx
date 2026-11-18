import type { LocalPage, PhoneScreen, ZonePanelId } from "#/data/local-pages";
import {
	RevealWords,
	useActiveStep,
	useParallax,
} from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import { ZonePanel, ZonePanels } from "./local-panels";
import { PhoneMockup } from "./local-showcase";

// Récit au scroll des pages locales : le téléphone (métiers) ou le panneau
// (zones) reste épinglé à droite pendant que les étapes défilent à gauche ;
// l'écran du téléphone et le contenu du panneau suivent l'étape lue.
// Tout le texte est dans le HTML serveur ; le JS ne fait que la mise en scène.

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";

type Step = NonNullable<LocalPage["scrolly"]>[number];

export function ScrollyStory({
	steps,
	hero,
	initialScreen,
	mapArea,
	numbered = true,
}: {
	steps: Step[];
	hero: React.ReactNode;
	initialScreen: PhoneScreen;
	/** Pages de zone : carte épinglée, communes visées mises en avant */
	mapArea?: string[];
	/** Numéros 01, 02… devant les étapes (absents du nouveau gabarit) */
	numbered?: boolean;
}) {
	const { active, register } = useActiveStep(steps.length);
	const parallax = useParallax<HTMLDivElement>(0.06);
	const screens = [
		initialScreen,
		...steps.flatMap((step) => (step.screen ? [step.screen] : [])),
	];
	const current =
		(active >= 0 ? steps[active].screen : undefined) ?? initialScreen;
	// Pages de zone : panneau de l'étape lue (carte avant la 1re étape)
	const panels = [
		...new Set<ZonePanelId>(["map", ...steps.flatMap((s) => s.panel ?? [])]),
	];
	const currentPanel: ZonePanelId =
		(active >= 0 ? steps[active].panel : undefined) ?? "map";

	return (
		<div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-x-12 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-x-16 xl:grid-cols-[minmax(0,1fr)_34rem] xl:gap-x-20 2xl:grid-cols-2">
			<div className="flex min-w-0 flex-col gap-4 md:gap-6">
				<div className="flex flex-col justify-center md:min-h-[calc(100svh-7rem)]">
					{hero}
				</div>
				<ol className="flex flex-col">
					{steps.map((step, index) => (
						<li
							key={step.title}
							ref={register(index)}
							className={cn(
								"flex flex-col justify-center gap-4 py-10 transition-opacity duration-500 md:min-h-svh md:py-0",
								active === index ? "md:opacity-100" : "md:opacity-30",
							)}
						>
							{numbered && (
								<p className="display-title text-6xl font-bold text-transparent [-webkit-text-stroke:1.5px_#f25353] md:text-7xl">
									{String(index + 1).padStart(2, "0")}
								</p>
							)}
							<RevealWords
								text={step.title}
								className={`display-title text-3xl font-bold leading-[1.05] md:text-6xl lg:text-7xl ${STRONG}`}
							/>
							<p
								className={`max-w-2xl text-lg font-medium leading-relaxed md:text-xl ${TEXT}`}
							>
								{step.text}
							</p>
							{/* Mobile : pas d'épinglage, le panneau de l'étape (la carte est
							    déjà affichée dans l'en-tête) */}
							{mapArea && step.panel && step.panel !== "map" && (
								<div className="mt-4 md:hidden">
									<ZonePanel id={step.panel} area={mapArea} />
								</div>
							)}
							{/* Mobile : pas d'épinglage, un téléphone par étape */}
							{step.screen && (
								<PhoneMockup
									screens={[step.screen]}
									active={step.screen}
									className="mt-4 md:hidden"
								/>
							)}
						</li>
					))}
				</ol>
			</div>

			<div className="hidden md:block">
				<div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-10">
					<div
						ref={parallax}
						className={cn("w-full", !mapArea && "lg:scale-125 2xl:scale-150")}
					>
						{mapArea ? (
							<ZonePanels
								panels={panels}
								active={currentPanel}
								area={mapArea}
								// Carte présente dans le récit : elle s'allume cercle par cercle ;
								// sinon (carte du seul en-tête), les communes visées sont allumées
								reach={
									steps.some((step) => step.panel === "map")
										? active + 1
										: undefined
								}
							/>
						) : (
							<PhoneMockup screens={screens} active={current} />
						)}
					</div>
					<ol aria-hidden="true" className="flex gap-2">
						{steps.map((step, index) => (
							<li
								key={step.title}
								className={cn(
									"h-1.5 rounded-full transition-all duration-500",
									active === index
										? "w-8 bg-[#f25353]"
										: "w-1.5 bg-[#253c59]/20 dark:bg-white/20",
								)}
							/>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
}
