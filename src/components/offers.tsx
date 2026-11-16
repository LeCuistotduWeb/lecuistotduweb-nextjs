import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	CalendarDays,
	Check,
	Code2,
	LifeBuoy,
	type LucideIcon,
	Sparkles,
} from "lucide-react";
import { trackEvent } from "#/lib/analytics";
import { bookingUrl, openBooking } from "#/lib/booking";
import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import { CardTitle } from "./card-title";

// Le style global `a { color }` n'est pas dans un layer : la couleur du texte
// des liens est portée par un <span> interne.

const FEATURED = {
	title: "Renfort React / Next.js",
	text: "J'intègre votre équipe en régie pour développer, structurer ou accélérer votre produit.",
	benefits: [
		"Opérationnel rapidement sur votre base React / Next.js / TypeScript",
		"Architecture frontend, Design System et performances",
		"Code testé, revu et documenté, transmis à votre équipe",
		"À distance ou sur site : Paris et Rouen en ligne directe",
	],
	references: "Fnac Darty · Infogreffe · Blissim",
};

const SECONDARY: {
	icon: LucideIcon;
	title: string;
	text: string;
	benefits: string[];
}[] = [
	{
		icon: Code2,
		title: "Projet sur mesure",
		text: "Application web, SaaS, e-commerce ou site vitrine, de la conception à la mise en ligne.",
		benefits: [
			"Un seul interlocuteur, du besoin à la livraison",
			"Un site rapide, accessible et bien référencé",
			"Mise en ligne et prise en main incluses",
		],
	},
	{
		icon: LifeBuoy,
		title: "Maintenance et évolutions",
		text: "Votre site existe déjà ? Je le garde à jour et le fais évoluer.",
		benefits: [
			"Mises à jour et corrections",
			"Nouvelles fonctionnalités",
			"WordPress compris",
		],
	},
];

const STEPS = [
	{
		title: "Échange",
		text: "Un premier appel de 30 minutes pour comprendre votre besoin.",
	},
	{
		title: "Devis",
		text: "Une proposition claire : périmètre, délais et prix.",
	},
	{
		title: "Réalisation",
		text: "Des points réguliers et des livraisons fréquentes, jusqu'à la mise en ligne.",
	},
];

function ContactLink({ offer }: { offer: string }) {
	return (
		<Link
			to="/contact"
			onClick={() => trackEvent("click_offer_contact", { offer })}
			className="group/link mt-auto inline-flex w-fit items-center gap-1.5 pt-2 text-sm font-semibold"
		>
			<span className="text-[#b52f2f] dark:text-[#ff7a7a]">En parler</span>
			<ArrowRight
				aria-hidden="true"
				className="size-4 text-[#b52f2f] dark:text-[#ff7a7a] transition-transform group-hover/link:translate-x-0.5"
			/>
		</Link>
	);
}

export function FeaturedOffer({ className }: { className?: string }) {
	return (
		<section
			aria-labelledby="offer-featured"
			className={cn(
				"relative isolate flex flex-col gap-6 overflow-hidden rounded-2xl border border-[#253c59] dark:border-[#f25353]/40 bg-linear-to-br from-[#253c59] to-[#16253a] dark:from-[#1f3550] dark:to-[#0f1824] p-8 md:p-10 shadow-xl shadow-[#253c59]/20",
				className,
			)}
		>
			{/* Halo corail en fond */}
			<div
				aria-hidden="true"
				className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-[#f25353]/25 blur-3xl"
			/>

			<span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f25353] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
				<Sparkles aria-hidden="true" className="size-3.5" />
				Offre principale
			</span>

			<div className="flex flex-col gap-3">
				<h3
					id="offer-featured"
					className="display-title text-3xl md:text-4xl font-semibold leading-tight text-white"
				>
					{FEATURED.title}
				</h3>
				<p className="max-w-md text-[#c5d5e5] font-medium leading-relaxed">
					{FEATURED.text}
				</p>
			</div>

			<ul className="flex flex-col gap-3">
				{FEATURED.benefits.map((benefit) => (
					<li key={benefit} className="flex gap-3 text-white">
						<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f25353]/20">
							<Check aria-hidden="true" className="size-3.5 text-[#ff8a8a]" />
						</span>
						{benefit}
					</li>
				))}
			</ul>

			<div className="mt-auto flex flex-col gap-5 border-t border-white/10 pt-6">
				<p className="text-sm text-[#a1adbc]">
					Références :{" "}
					<span className="font-semibold text-white">
						{FEATURED.references}
					</span>
				</p>
				<div className="flex flex-wrap gap-3">
					{bookingUrl && (
						<a
							href={bookingUrl}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(event) => openBooking(event, "offer")}
							className="inline-flex items-center gap-2 rounded-full bg-[#f25353] px-5 py-2.5 font-semibold shadow-lg shadow-[#f25353]/30 hover:bg-[#e04444] transition-colors"
						>
							<CalendarDays aria-hidden="true" className="size-4 text-white" />
							<span className="text-white">Réserver un appel</span>
						</a>
					)}
					<Link
						to="/contact"
						onClick={() =>
							trackEvent("click_offer_contact", { offer: FEATURED.title })
						}
						className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-semibold hover:bg-white/10 transition-colors"
					>
						<span className="text-white">Écrire un message</span>
					</Link>
				</div>
			</div>
		</section>
	);
}

export function SecondaryOffer({
	index,
	className,
}: {
	index: number;
	className?: string;
}) {
	const { icon: Icon, title, text, benefits } = SECONDARY[index];
	return (
		<BentoCard
			className={cn(
				"group flex flex-col gap-4 p-6 md:p-8 hover:border-[#f25353]/50 dark:hover:border-[#f25353]/50 transition-colors",
				className,
			)}
		>
			<div className="flex items-center gap-3">
				<span className="flex size-10 items-center justify-center rounded-xl bg-[#f25353]/10 dark:bg-[#f25353]/15">
					<Icon aria-hidden="true" className="size-5 text-[#f25353]" />
				</span>
				<h3 className="display-title text-xl md:text-2xl font-semibold text-[#253c59] dark:text-white">
					{title}
				</h3>
			</div>
			<p className="text-[#4a6a8a] dark:text-[#a1adbc] font-medium leading-relaxed">
				{text}
			</p>
			<ul className="flex flex-col gap-2 text-sm text-[#3a5570] dark:text-[#c5d5e5]">
				{benefits.map((benefit) => (
					<li key={benefit} className="flex gap-2">
						<Check
							aria-hidden="true"
							className="mt-0.5 size-4 shrink-0 text-[#f25353]"
						/>
						{benefit}
					</li>
				))}
			</ul>
			<ContactLink offer={title} />
		</BentoCard>
	);
}

export function ProcessCard({ className }: { className?: string }) {
	return (
		<BentoCard className={cn("p-6 md:p-8", className)}>
			<div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
				<CardTitle className="mb-0">Comment ça se passe</CardTitle>
				<p className="text-xs font-medium text-[#4a6a8a] dark:text-[#a1adbc]">
					Sur devis, selon votre besoin.
				</p>
			</div>
			<ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
				{/* Frise reliant les étapes (à partir de 2 colonnes) */}
				<div
					aria-hidden="true"
					className="absolute top-4 right-[16.66%] left-[16.66%] hidden h-px bg-linear-to-r from-[#f25353]/60 via-[#d2c4a4] to-[#f25353]/60 dark:via-[#253c59] sm:block"
				/>
				{STEPS.map((step, i) => (
					<li
						key={step.title}
						className="relative flex gap-4 sm:flex-col sm:items-center sm:text-center"
					>
						<span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f25353] text-sm font-semibold tabular-nums text-white ring-4 ring-[#faf5ec] dark:ring-[#172231]">
							{i + 1}
						</span>
						<div>
							<p className="font-semibold text-[#253c59] dark:text-white">
								{step.title}
							</p>
							<p className="mt-1 text-sm text-[#4a6a8a] dark:text-[#a1adbc]">
								{step.text}
							</p>
						</div>
					</li>
				))}
			</ol>
		</BentoCard>
	);
}
