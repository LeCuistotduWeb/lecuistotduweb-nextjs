import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import type { ParcoursId } from "#/lib/views";
import { ContactCard } from "./contact-card";
import { CvCard } from "./cv-card";
import { ExperienceTimeline } from "./experience-timeline";
import { FormationsCard } from "./formations-card";
import { HomeHero } from "./home-hero";
import { LinkedInCard } from "./linkedin-card";
import { LocalFooter, LocalLinks } from "./local-landing-page";
import { MissionsCard } from "./missions-card";
import { FeaturedOffer, ProcessCard, SecondaryOffer } from "./offers";
import { ProjectsStory } from "./projects-story";
import { SocialCard } from "./social-card";
import { StackCard } from "./stack-card";
import { ViewIntro } from "./view-intro";

const FULL = "col-span-1 sm:col-span-2 md:col-span-4";

// grid-flow-row-dense : à 2 colonnes, comble les trous laissés par une carte
// d'1 colonne suivie d'une carte plus large.
// Les grilles de cartes restent à largeur de lecture ; seuls les chapitres en
// récit au scroll (`wide`) occupent toute la largeur de l'écran.
const READABLE = "mx-auto w-full max-w-7xl";

function Grid({ children, wide }: { children: ReactNode; wide?: boolean }) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 sm:grid-flow-row-dense",
				!wide && READABLE,
			)}
		>
			{children}
		</div>
	);
}

// Emplacement de grille révélé au scroll ; la carte qu'il contient prend
// toute sa hauteur.
function Item({
	className,
	delay,
	children,
}: {
	className: string;
	delay?: number;
	children: ReactNode;
}) {
	return (
		<Reveal delay={delay} className={cn("*:h-full", className)}>
			{children}
		</Reveal>
	);
}

function Chapter({
	id,
	className,
	wide,
	children,
}: {
	id: ParcoursId;
	className?: string;
	wide?: boolean;
	children: ReactNode;
}) {
	return (
		<section
			id={id}
			aria-labelledby={`${id}-title`}
			className={cn(
				"scroll-mt-4 sm:scroll-mt-20 flex flex-col gap-8 md:gap-12 pt-28 md:pt-44",
				className,
			)}
		>
			<ViewIntro view={id} className={wide ? undefined : READABLE} />
			<Grid wide={wide}>{children}</Grid>
		</section>
	);
}

function ScrollCue() {
	return (
		<Reveal variant="fade" delay={900} className="flex justify-center">
			<Link
				to="/experience"
				resetScroll={false}
				className="group flex flex-col items-center gap-1 text-sm font-semibold"
			>
				<span className="text-[#4a6a8a] dark:text-[#a1adbc] group-hover:text-[#253c59] dark:group-hover:text-white transition-colors">
					Découvrir mon parcours
				</span>
				<ChevronDown
					aria-hidden="true"
					className="scroll-cue-arrow size-5 text-[#f25353]"
				/>
			</Link>
		</Reveal>
	);
}

export function Chapters() {
	return (
		<>
			<section
				id="accueil"
				aria-label="Présentation"
				className="scroll-mt-4 sm:scroll-mt-20 flex min-h-[calc(100svh-6rem)] md:min-h-[calc(100svh-9rem)] flex-col justify-center gap-10"
			>
				<HomeHero />
				<ScrollCue />
			</section>

			<Chapter id="experience">
				<ExperienceTimeline />
				<Item className="col-span-1">
					<div className="flex flex-col gap-3">
						<LinkedInCard />
						<CvCard />
					</div>
				</Item>
				<Item className="col-span-1 sm:col-span-2 md:col-span-2" delay={120}>
					<div className="flex flex-col gap-3">
						<FormationsCard />
						<StackCard />
					</div>
				</Item>
				<Item className="col-span-1" delay={240}>
					{/* Hauteur naturelle : ne s'étire pas sur toute la rangée */}
					<div>
						<SocialCard />
					</div>
				</Item>
			</Chapter>

			<Chapter id="projets" wide>
				{/* Pas de Reveal autour : l'écran épinglé (sticky) doit rester libre */}
				<ProjectsStory />
				<Item className={cn(FULL, READABLE)} delay={120}>
					<MissionsCard />
				</Item>
			</Chapter>

			<Chapter id="offre">
				<Item className="col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2">
					<FeaturedOffer />
				</Item>
				<Item className="col-span-1 md:col-span-2" delay={120}>
					<SecondaryOffer index={0} />
				</Item>
				<Item className="col-span-1 md:col-span-2" delay={240}>
					<SecondaryOffer index={1} />
				</Item>
				<Item className={FULL} delay={120}>
					<ProcessCard />
				</Item>
			</Chapter>

			<Chapter id="contact" className="min-h-svh justify-center pb-16">
				<Item className={FULL}>
					<ContactCard />
				</Item>
			</Chapter>

			{/* Pied de page : zones d'intervention (maillage vers les pages
			    locales) et nom, ville, contact identiques à la fiche Google */}
			<div className={cn(READABLE, "flex flex-col gap-4 pt-8")}>
				<LocalLinks title="Près de chez vous : Vernon, Évreux et l'Eure" />
				<LocalFooter className="max-w-none px-1 pb-2 sm:pb-2" />
			</div>
		</>
	);
}
