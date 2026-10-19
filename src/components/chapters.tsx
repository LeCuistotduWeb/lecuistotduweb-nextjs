import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import type { ParcoursId } from "#/lib/views";
import { AvatarCard } from "./avatar-card";
import { BioCard } from "./bio-card";
import { ContactCard } from "./contact-card";
import { CvCard } from "./cv-card";
import { ExperiencesCard } from "./experiences-card";
import { FreelanceCard } from "./freelance-card";
import { LinkedInCard } from "./linkedin-card";
import { MissionsCard } from "./missions-card";
import ProjectCard from "./project-card";
import { SocialCard } from "./social-card";
import { StackCard } from "./stack-card";
import { ViewIntro } from "./view-intro";

const FULL = "col-span-1 sm:col-span-2 md:col-span-4";

// grid-flow-row-dense : à 2 colonnes, comble les trous laissés par une carte
// d'1 colonne suivie d'une carte plus large.
function Grid({ children }: { children: ReactNode }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 sm:grid-flow-row-dense">
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
	children,
}: {
	id: ParcoursId;
	className?: string;
	children: ReactNode;
}) {
	return (
		<section
			id={id}
			aria-labelledby={`${id}-title`}
			className={cn(
				"scroll-mt-20 flex flex-col gap-8 md:gap-12 pt-28 md:pt-44",
				className,
			)}
		>
			<ViewIntro view={id} />
			<Grid>{children}</Grid>
		</section>
	);
}

function ScrollCue() {
	return (
		<Reveal variant="fade" delay={900} className="flex justify-center">
			<Link
				to="/profil"
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
				aria-label="Accueil"
				className="scroll-mt-20 flex min-h-[calc(100svh-6rem)] md:min-h-[calc(100svh-9rem)] flex-col justify-center gap-10"
			>
				<Grid>
					<Item className="col-span-1 sm:col-span-2 md:col-span-3">
						<BioCard />
					</Item>
					{/* Pas de révélation : l'avatar de l'écran de chargement atterrit ici */}
					<div className="col-span-1 *:h-full">
						<AvatarCard />
					</div>
				</Grid>
				<ScrollCue />
			</section>

			<Chapter id="profil">
				<Item className="col-span-1">
					<div className="flex flex-col gap-3">
						<LinkedInCard />
						<CvCard />
					</div>
				</Item>
				<Item className="col-span-1 sm:col-span-2 md:col-span-2" delay={120}>
					<ExperiencesCard />
				</Item>
				<Item className="col-span-1" delay={240}>
					<div className="flex flex-col gap-3">
						<StackCard />
						<SocialCard />
					</div>
				</Item>
			</Chapter>

			<Chapter id="projets">
				<Item className={FULL}>
					<ProjectCard />
				</Item>
				<Item className={FULL} delay={120}>
					<MissionsCard />
				</Item>
			</Chapter>

			<Chapter id="freelance">
				<Item className={FULL}>
					<FreelanceCard />
				</Item>
			</Chapter>

			<Chapter id="contact" className="min-h-[80svh] pb-24">
				<Item className={FULL}>
					<ContactCard />
				</Item>
			</Chapter>
		</>
	);
}
