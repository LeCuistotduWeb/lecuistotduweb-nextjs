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
import { FEATURED_OFFER, SECONDARY_OFFERS, STEPS } from "#/data/offers";
import { trackEvent } from "#/lib/analytics";
import { bookingUrl, openBooking } from "#/lib/booking";
import { requestContactTopic } from "#/lib/contact";
import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import { CardTitle } from "./card-title";
import { FreelanceStatusBadge } from "./freelance-status-badge";
import { ProcessTimeline } from "./process-timeline";

// Le style global `a { color }` n'est pas dans un layer : la couleur du texte
// des liens est portée par un <span> interne.

const SECONDARY_ICONS: LucideIcon[] = [Code2, LifeBuoy];

function ContactLink({ offer }: { offer: string }) {
	return (
		<Link
			to="/contact"
			resetScroll={false}
			onClick={() => {
				trackEvent("click_offer_contact", { offer });
				requestContactTopic(offer);
			}}
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

			<div className="flex flex-wrap items-center justify-between gap-3">
				<span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f25353] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
					<Sparkles aria-hidden="true" className="size-3.5" />
					Offre principale
				</span>
				<FreelanceStatusBadge onDark />
			</div>

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
				{FEATURED_OFFER.benefits.map((benefit) => (
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
							<span className="text-white">Réserver un appel</span>
						</a>
					)}
					<Link
						to="/contact"
						resetScroll={false}
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
			<ProcessTimeline steps={STEPS} animated />
		</BentoCard>
	);
}
