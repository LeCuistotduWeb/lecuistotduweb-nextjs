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
import { LocalLinks } from "./local-landing-page";
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

// Offres empilées : chaque carte se fixe un peu plus bas que la précédente
// et la suivante vient la recouvrir au scroll (pas d'épinglage en mobile).
const OFFER_CARDS = [
	<FeaturedOffer key="featured" />,
	<SecondaryOffer key="custom" index={0} />,
	<SecondaryOffer key="maintenance" index={1} />,
];

function OfferStack() {
	return (
		<div className="col-span-full mx-auto flex w-full max-w-4xl flex-col gap-4 md:gap-0">
			{OFFER_CARDS.map((card, index) => (
				<Reveal
					key={card.key}
					className="md:sticky md:mb-[20svh] md:last:mb-0 md:*:bg-[#faf5ec] md:*:shadow-2xl md:*:shadow-[#253c59]/15 dark:md:*:bg-[#172231]"
					style={{ top: `calc(6rem + ${index * 2}rem)` }}
				>
					{card}
				</Reveal>
			))}
		</div>
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
				<OfferStack />
				<Item className={FULL} delay={120}>
					<ProcessCard />
				</Item>
				<Item className={FULL} delay={120}>
					<LocalLinks title="Près de chez vous : Vernon, Évreux et l'Eure" />
				</Item>
			</Chapter>

			<Chapter id="contact" className="min-h-svh justify-center pb-24">
				<Item className={FULL}>
					<ContactCard />
				</Item>
			</Chapter>
		</>
	);
}
