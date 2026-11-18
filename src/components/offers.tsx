import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	CalendarDays,
	Check,
	Code2,
	FileText,
	LifeBuoy,
	type LucideIcon,
	PhoneCall,
	Rocket,
} from "lucide-react";
import { FEATURED_OFFER, SECONDARY_OFFERS, STEPS } from "#/data/offers";
import { trackEvent } from "#/lib/analytics";
import { bookingUrl, openBooking } from "#/lib/booking";
import { requestContactTopic } from "#/lib/contact";
import { Reveal, useScrollProgress } from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import { Spotlight, trackSpotlight } from "./spotlight";

// Le style global `a { color }` n'est pas dans un layer : la couleur du texte
// des liens est portée par un <span> interne.

const SECONDARY_ICONS: LucideIcon[] = [Code2, LifeBuoy];
/** Pictos des étapes (Échange, Devis, Réalisation), dans l'ordre de STEPS */
const STEP_ICONS: LucideIcon[] = [PhoneCall, FileText, Rocket];

function ContactLink({ offer }: { offer: string }) {
	return (
		<Link
			to="/"
			hash="contact"
			resetScroll={false}
			hashScrollIntoView={false}
			onClick={() => {
				trackEvent("click_offer_contact", { offer });
				requestContactTopic(offer);
			}}
			className="group/link inline-flex w-fit items-center gap-1.5 text-sm font-semibold"
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
			onPointerMove={trackSpotlight}
			className={cn(
				"group relative isolate flex flex-col gap-6 overflow-hidden rounded-2xl border border-[#253c59] dark:border-[#f25353]/40 bg-linear-to-br from-[#253c59] to-[#16253a] dark:from-[#1f3550] dark:to-[#0f1824] p-8 md:p-10 shadow-xl shadow-[#253c59]/20",
				className,
			)}
		>
			<Spotlight color="rgba(242, 83, 83, 0.22)" />
			{/* Halo corail en fond */}
			<div
				aria-hidden="true"
				className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-[#f25353]/25 blur-3xl"
			/>

			<div className="flex flex-col gap-3">
				<h3
					id="offer-featured"
					className="display-title text-3xl md:text-4xl font-semibold leading-tight text-white"
				>
					{FEATURED_OFFER.title}
				</h3>
				<p className="max-w-md text-[#c5d5e5] font-medium leading-relaxed">
					{FEATURED_OFFER.text}
				</p>
			</div>

			<ul className="flex flex-col gap-3">
				{FEATURED_OFFER.benefits.map((benefit, index) => (
					<Reveal
						as="li"
						key={benefit}
						variant="rise"
						delay={250 + index * 110}
						className="flex gap-3 text-white"
					>
						<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f25353]/20">
							<Check aria-hidden="true" className="size-3.5 text-[#ff8a8a]" />
						</span>
						{benefit}
					</Reveal>
				))}
			</ul>

			<div className="mt-auto flex flex-col gap-5 border-t border-white/10 pt-6">
				<p className="text-sm text-[#a1adbc]">
					Références :{" "}
					<span className="font-semibold text-white">
						{FEATURED_OFFER.references}
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
							<span className="text-white">Discutons de votre projet</span>
						</a>
					)}
					<Link
						to="/"
						hash="contact"
						resetScroll={false}
						hashScrollIntoView={false}
						onClick={() => {
							trackEvent("click_offer_contact", {
								offer: FEATURED_OFFER.title,
							});
							requestContactTopic(FEATURED_OFFER.title);
						}}
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
	const { title, text, benefits } = SECONDARY_OFFERS[index];
	const Icon = SECONDARY_ICONS[index];
	return (
		<BentoCard
			onPointerMove={trackSpotlight}
			className={cn(
				"group relative isolate flex flex-col gap-4 overflow-hidden p-6 md:p-8 hover:border-[#f25353]/50 dark:hover:border-[#f25353]/50 transition-colors",
				className,
			)}
		>
			<Spotlight color="rgba(242, 83, 83, 0.12)" />
			<div className="flex items-center gap-3">
				<span className="flex size-10 items-center justify-center rounded-xl bg-[#f25353]/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 dark:bg-[#f25353]/15">
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
				{benefits.map((benefit, index) => (
					<Reveal
						as="li"
						key={benefit}
						variant="rise"
						delay={300 + index * 110}
						className="flex gap-2"
					>
						<Check
							aria-hidden="true"
							className="mt-0.5 size-4 shrink-0 text-[#f25353]"
						/>
						{benefit}
					</Reveal>
				))}
			</ul>
			<div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
				<ContactLink offer={title} />
				<Link
					to="/tarifs"
					hash={index === 0 ? "creation" : "maintenance"}
					onClick={() =>
						trackEvent("click_pricing", { from: "offer", offer: title })
					}
					className="group/link inline-flex w-fit items-center gap-1.5 text-sm font-semibold"
				>
					<span className="text-[#4a6a8a] underline-offset-4 group-hover/link:text-[#253c59] group-hover/link:underline dark:text-[#a1adbc] dark:group-hover/link:text-white">
						Voir les tarifs
					</span>
				</Link>
			</div>
		</BentoCard>
	);
}

export function ProcessCard({ className }: { className?: string }) {
	const progress = useScrollProgress<HTMLOListElement>();
	return (
		<BentoCard className={cn("flex flex-col gap-8 p-6 md:p-10", className)}>
			<h3 className="display-title text-2xl md:text-3xl font-semibold text-[#253c59] dark:text-white">
				Comment ça se passe
			</h3>
			<ol
				ref={progress}
				className="relative grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6"
			>
				{/* Frise reliant les étapes, qui se dessine au scroll (à partir de
				    2 colonnes ; sur mobile, chaque étape porte son segment) */}
				<div
					aria-hidden="true"
					className="absolute top-7 right-[16.66%] left-[16.66%] hidden h-0.5 rounded-full bg-[#d2c4a4] sm:block dark:bg-[#253c59]"
				>
					<div className="absolute inset-0 origin-left scale-x-[var(--scroll-progress,1)] bg-linear-to-r from-[#f25353] to-[#e4b962]" />
				</div>
				{STEPS.map((step, i) => {
					const Icon = STEP_ICONS[i];
					return (
						<Reveal
							as="li"
							key={step.title}
							variant="rise"
							delay={i * 180}
							className="group relative flex gap-5 sm:flex-col sm:items-center sm:gap-4 sm:text-center"
						>
							{i < STEPS.length - 1 && (
								<span
									aria-hidden="true"
									className="absolute top-14 -bottom-8 left-[1.6875rem] w-0.5 rounded-full bg-linear-to-b from-[#f25353]/70 to-[#e4b962]/70 sm:hidden"
								/>
							)}
							<span className="relative flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-[#f25353]/30 bg-[#fdf3ec] ring-6 ring-[#faf5ec] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 dark:bg-[#2a2a38] dark:ring-[#172231]">
								<Icon aria-hidden="true" className="size-6 text-[#f25353]" />
								<span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-[#f25353] text-xs font-semibold tabular-nums text-white shadow-md shadow-[#f25353]/30">
									{i + 1}
								</span>
							</span>
							<div className="flex flex-col gap-1.5 pt-2 sm:max-w-64 sm:pt-0">
								<p className="display-title text-lg md:text-xl font-semibold text-[#253c59] dark:text-white">
									{step.title}
								</p>
								<p className="text-[#4a6a8a] dark:text-[#a1adbc] leading-relaxed">
									{step.text}
								</p>
							</div>
						</Reveal>
					);
				})}
			</ol>
			<div className="flex flex-col items-start gap-4 border-t border-[#d2c4a4] pt-6 dark:border-[#253c59] sm:flex-row sm:items-center sm:justify-between">
				<p className="text-sm font-medium text-[#4a6a8a] dark:text-[#a1adbc]">
					Sur devis, selon votre besoin.
				</p>
				{bookingUrl && (
					<a
						href={bookingUrl}
						target="_blank"
						rel="noopener noreferrer"
						onClick={(event) => openBooking(event, "process")}
						className="group/link inline-flex items-center gap-2 rounded-full bg-[#253c59] px-5 py-2.5 font-semibold transition-colors hover:bg-[#1c2d44] dark:bg-white dark:hover:bg-[#e8eef5]"
					>
						<CalendarDays
							aria-hidden="true"
							className="size-4 text-white dark:text-[#253c59]"
						/>
						<span className="text-white dark:text-[#253c59]">
							Réserver l'appel découverte
						</span>
						<ArrowRight
							aria-hidden="true"
							className="size-4 text-white transition-transform group-hover/link:translate-x-0.5 dark:text-[#253c59]"
						/>
					</a>
				)}
			</div>
		</BentoCard>
	);
}
