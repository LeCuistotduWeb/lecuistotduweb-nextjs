import {
	ArrowRight,
	Check,
	FileText,
	KeyRound,
	MapPin,
	Unlock,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { siteConfig } from "#/config";
import {
	EXTRAS,
	FORMULAS,
	type Formula,
	formatEuros,
	OPTIONS,
	PLANS,
	type PriceLine,
} from "#/data/pricing";
import { trackEvent } from "#/lib/analytics";
import {
	Reveal,
	RevealWords,
	useStartScrollAnimations,
} from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import { ContactButtons, QuoteDialog } from "./contact-actions";
import { LocalFooter, SiteHeader } from "./site-chrome";

// Page Tarifs, dans la DA éditoriale des pages locales : sections ouvertes
// séparées par des filets, grands titres précédés d'un sur-titre rouge. Les
// options et les petites interventions sont présentées comme une carte de
// restaurant (clin d'œil au Cuistot), avec des points de conduite.

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";
const EYEBROW =
	"text-xs font-semibold uppercase tracking-widest text-[#b52f2f] dark:text-[#ff7a7a]";
const RULE = "border-t border-[#d2c4a4] dark:border-[#253c59]";
const H2 = `display-title text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl ${STRONG}`;

function SectionHead({
	eyebrow,
	title,
	intro,
}: {
	eyebrow: string;
	title: string;
	intro?: ReactNode;
}) {
	return (
		<div className="flex flex-col gap-4">
			<Reveal as="p" variant="fade" className={EYEBROW}>
				{eyebrow}
			</Reveal>
			<RevealWords as="h2" text={title} delay={100} className={H2} />
			{intro && (
				<Reveal
					as="p"
					delay={250}
					className={`max-w-2xl text-lg font-medium leading-relaxed ${TEXT}`}
				>
					{intro}
				</Reveal>
			)}
		</div>
	);
}

/** Bouton « Demander un devis » d'une formule : sujet pré-rempli. */
function QuoteButton({ topic, onDark }: { topic: string; onDark?: boolean }) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button
				type="button"
				aria-haspopup="dialog"
				onClick={() => {
					setOpen(true);
					trackEvent("open_quote_dialog", { page: "/tarifs", offer: topic });
				}}
				className={cn(
					"group/quote mt-auto inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors",
					onDark
						? "bg-[#d93a3a] shadow-lg shadow-[#f25353]/30 hover:bg-[#c93434]"
						: "border border-[#253c59]/25 hover:bg-[#253c59]/5 dark:border-white/25 dark:hover:bg-white/10",
				)}
			>
				<span className={onDark ? "text-white" : STRONG}>
					Demander un devis
				</span>
				<ArrowRight
					aria-hidden="true"
					className={cn(
						"size-4 transition-transform group-hover/quote:translate-x-0.5",
						onDark ? "text-white" : STRONG,
					)}
				/>
			</button>
			{open && (
				<QuoteDialog
					open={open}
					onOpenChange={setOpen}
					topic={`Devis — ${topic}`}
				/>
			)}
		</>
	);
}

/** Lien « Parlons-en » : formulaire de contact, sujet « Renfort ». */
function RenfortLink() {
	const [open, setOpen] = useState(false);
	const topic = "Renfort fullstack React / Node.js";
	return (
		<>
			<button
				type="button"
				aria-haspopup="dialog"
				onClick={() => {
					setOpen(true);
					trackEvent("open_quote_dialog", { page: "/tarifs", offer: topic });
				}}
				className="cursor-pointer font-semibold text-[#b52f2f] underline underline-offset-4 hover:no-underline dark:text-[#ff7a7a]"
			>
				Parlons-en
			</button>
			{open && <QuoteDialog open={open} onOpenChange={setOpen} topic={topic} />}
		</>
	);
}

function FormulaCard({ formula, index }: { formula: Formula; index: number }) {
	const dark = formula.highlighted;
	return (
		<Reveal
			delay={150 + index * 120}
			className={cn(
				"relative isolate flex flex-col gap-6 overflow-hidden rounded-3xl p-7 md:p-8",
				dark
					? "border border-[#253c59] bg-linear-to-br from-[#253c59] to-[#16253a] shadow-2xl dark:border-[#f25353]/40 shadow-[#253c59]/25 lg:-my-6 lg:py-12 dark:from-[#1f3550] dark:to-[#0f1824]"
					: "border border-[#d2c4a4] bg-[#faf5ec]/70 dark:border-[#253c59] dark:bg-[#172231]/60",
			)}
		>
			{dark && (
				<div
					aria-hidden="true"
					className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-[#f25353]/25 blur-3xl"
				/>
			)}
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between gap-3">
					<h3
						className={cn(
							"text-sm font-semibold uppercase tracking-widest",
							dark ? "text-[#ff9a9a]" : "text-[#b52f2f] dark:text-[#ff7a7a]",
						)}
					>
						{formula.title}
					</h3>
					{dark && (
						<span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
							Recommandé
						</span>
					)}
				</div>
				<p
					className={cn(
						"flex items-baseline gap-2",
						dark ? "text-white" : STRONG,
					)}
				>
					<span
						className={cn(
							"text-base font-medium",
							dark ? "text-[#c5d5e5]" : TEXT,
						)}
					>
						dès
					</span>
					<span className="display-title text-5xl font-bold tracking-tight md:text-6xl">
						{formatEuros(formula.from)}
					</span>
				</p>
				<p
					className={cn(
						"font-medium leading-relaxed",
						dark ? "text-[#c5d5e5]" : TEXT,
					)}
				>
					{formula.tagline}
				</p>
			</div>
			<ul
				className={cn(
					"flex flex-col gap-3 border-t pt-6 text-[15px] leading-snug",
					dark ? "border-white/15" : "border-[#d2c4a4] dark:border-[#253c59]",
				)}
			>
				{formula.features.map((feature) => (
					<li key={feature} className="flex gap-3">
						<Check
							aria-hidden="true"
							className="mt-0.5 size-4 shrink-0 text-[#f25353]"
						/>
						<span className={dark ? "text-white" : STRONG}>{feature}</span>
					</li>
				))}
			</ul>
			{formula.note && (
				<p
					className={cn("text-sm font-medium", dark ? "text-[#c5d5e5]" : TEXT)}
				>
					{formula.note}
				</p>
			)}
			<QuoteButton topic={formula.title} onDark={dark} />
		</Reveal>
	);
}

/** Ligne de carte : libellé, points de conduite, prix. */
function MenuList({ lines }: { lines: PriceLine[] }) {
	return (
		<ul className="flex flex-col">
			{lines.map((line, index) => (
				<Reveal
					as="li"
					key={line.label}
					delay={index * 60}
					className={cn(
						"group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-4",
						index > 0 && RULE,
					)}
				>
					<div className="flex min-w-0 flex-col sm:max-w-[60%]">
						<span
							className={`text-lg font-semibold leading-snug transition-colors group-hover:text-[#d93a3a] dark:group-hover:text-[#ff7a7a] ${STRONG}`}
						>
							{line.label}
						</span>
						{line.detail && (
							<span className={`text-sm font-medium ${TEXT}`}>
								{line.detail}
							</span>
						)}
					</div>
					<span
						aria-hidden="true"
						className="hidden min-w-8 flex-1 translate-y-[-0.3em] border-b-2 border-dotted border-[#d2c4a4] sm:block dark:border-[#253c59]"
					/>
					<span
						className={cn(
							"display-title text-xl font-semibold text-[#b52f2f] sm:text-right dark:text-[#ff7a7a]",
							// Prix courts sur une ligne ; les longs passent à la ligne
							line.price.length <= 16
								? "whitespace-nowrap"
								: "text-balance sm:max-w-[40%]",
						)}
					>
						{line.price}
					</span>
				</Reveal>
			))}
		</ul>
	);
}

const PROMISES = [
	{
		icon: Unlock,
		title: "Sans engagement",
		text: "Vous arrêtez quand vous voulez, sans frais.",
	},
	{
		icon: MapPin,
		title: "Hébergé en France",
		text: "Vos données et celles de vos clients restent en France.",
	},
	{
		icon: KeyRound,
		title: "Vous gardez tout",
		text: "Domaine à votre nom. Si vous partez, je vous remets votre site complet, code et données.",
	},
];

function Plans() {
	return (
		<div className="flex flex-col gap-10">
			<div className="grid gap-px overflow-hidden rounded-3xl border border-[#d2c4a4] bg-[#d2c4a4] md:grid-cols-2 dark:border-[#253c59] dark:bg-[#253c59]">
				{PLANS.map((plan, index) => (
					<Reveal
						key={plan.title}
						delay={index * 120}
						className="flex flex-col gap-5 bg-[#faf5ec] p-7 md:p-8 dark:bg-[#121e2a]"
					>
						<h3 className={EYEBROW}>{plan.title}</h3>
						<p className={`flex items-baseline gap-1.5 ${STRONG}`}>
							<span className="display-title text-5xl font-bold tracking-tight">
								{formatEuros(plan.monthly)}
							</span>
							<span className={`font-medium ${TEXT}`}>/ mois</span>
						</p>
						<ul className="flex flex-col gap-2.5 text-[15px] leading-snug">
							{plan.features.map((feature) => (
								<li key={feature} className="flex gap-3">
									<Check
										aria-hidden="true"
										className="mt-0.5 size-4 shrink-0 text-[#f25353]"
									/>
									<span className={STRONG}>{feature}</span>
								</li>
							))}
						</ul>
					</Reveal>
				))}
			</div>
			<ul className="grid gap-8 md:grid-cols-3">
				{PROMISES.map(({ icon: Icon, title, text }, index) => (
					<Reveal
						as="li"
						key={title}
						delay={200 + index * 100}
						className="flex gap-4"
					>
						<span
							aria-hidden="true"
							className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f25353]/10 text-[#d93a3a] dark:bg-[#f25353]/15 dark:text-[#ff7a7a]"
						>
							<Icon className="size-5" />
						</span>
						<div className="flex flex-col gap-1">
							<p className={`font-semibold ${STRONG}`}>{title}</p>
							<p className={`text-sm font-medium leading-relaxed ${TEXT}`}>
								{text}
							</p>
						</div>
					</Reveal>
				))}
			</ul>
		</div>
	);
}

export function PricingPage() {
	useStartScrollAnimations(true);
	return (
		<div className="flex min-h-dvh flex-col">
			<SiteHeader className="max-w-7xl" />
			<main className="mx-auto w-full max-w-7xl flex-1 px-4">
				<header className="grid gap-8 pt-10 pb-16 md:pt-16 md:pb-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-20">
					<div className="flex flex-col gap-5">
						<Reveal instant as="p" variant="fade" className={EYEBROW}>
							Tarifs
						</Reveal>
						<RevealWords
							instant
							as="h1"
							text="Des prix clairs, avant même d'en parler."
							delay={100}
							className={`display-title text-5xl font-semibold leading-[1.02] tracking-tight text-balance md:text-7xl ${STRONG}`}
						/>
					</div>
					<Reveal
						instant
						as="p"
						delay={300}
						className={`text-lg font-medium leading-relaxed ${TEXT}`}
					>
						Des prix « à partir de » pour vous faire une idée. Chaque projet
						fait ensuite l'objet d'un devis détaillé, gratuit et sans
						engagement.
					</Reveal>
				</header>

				<section
					id="creation"
					className={`${RULE} flex flex-col gap-14 py-20 md:py-28`}
				>
					<div>
						<SectionHead
							eyebrow="01 · Création de site"
							title="Trois formules, un site à votre image."
						/>
					</div>
					<div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
						{FORMULAS.map((formula, index) => (
							<FormulaCard
								key={formula.title}
								formula={formula}
								index={index}
							/>
						))}
					</div>
					<Reveal
						as="p"
						variant="fade"
						className={`text-sm font-medium lg:pt-2 ${TEXT}`}
					>
						Textes et photos fournis par vos soins, ou rédaction en option.
					</Reveal>
				</section>

				<section
					id="options"
					className={`${RULE} grid gap-10 py-20 md:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20`}
				>
					<div>
						<SectionHead
							eyebrow="02 · À la carte"
							title="Les options."
							intro="À ajouter à n'importe quelle formule, selon vos besoins."
						/>
					</div>
					<MenuList lines={OPTIONS} />
				</section>

				<section
					id="maintenance"
					className={`${RULE} flex flex-col gap-14 py-20 md:py-28`}
				>
					<div>
						<SectionHead
							eyebrow="03 · Hébergement et maintenance"
							title="Votre site entre de bonnes mains."
							intro="Une fois en ligne, je m'occupe de l'hébergement, des mises à jour et des sauvegardes, pour que vous n'ayez pas à y penser."
						/>
					</div>
					<Plans />
				</section>

				<section
					id="hors-contrat"
					className={`${RULE} grid gap-10 py-20 md:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20`}
				>
					<div>
						<SectionHead
							eyebrow="04 · Hors contrat"
							title="Les petits plus."
							intro="Évolutions, corrections et ajouts ponctuels, avec ou sans maintenance."
						/>
					</div>
					<MenuList lines={EXTRAS} />
				</section>

				<Reveal
					as="div"
					className={`${RULE} flex flex-col gap-3 py-10 text-sm font-medium md:flex-row md:items-start md:justify-between md:gap-10 ${TEXT}`}
				>
					<p className="flex items-start gap-2">
						<FileText
							aria-hidden="true"
							className="mt-0.5 size-4 shrink-0 text-[#f25353]"
						/>
						<span>
							Prix nets en euros : {siteConfig.legal.vat}. Prestations réservées
							aux professionnels.
						</span>
					</p>
					<p>
						Une mission de renfort React / Node.js ? <RenfortLink />
					</p>
				</Reveal>

				<Reveal variant="scale" className="pb-24">
					<section className="relative overflow-hidden rounded-3xl bg-[#253c59] p-8 md:p-14 dark:bg-[#1c2d44]">
						<div
							aria-hidden="true"
							className="absolute -top-24 -right-24 size-80 rounded-full bg-[#f25353]/30 blur-3xl"
						/>
						<div
							aria-hidden="true"
							className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-[#e4b962]/15 blur-3xl"
						/>
						<div className="relative flex flex-col gap-6">
							<p className="text-xs font-semibold uppercase tracking-widest text-[#ff9a9a]">
								Premier échange gratuit
							</p>
							<h2 className="display-title max-w-3xl text-4xl font-bold leading-[1.05] text-white md:text-6xl">
								Pas sûr de la formule ?
							</h2>
							<p className="max-w-2xl text-lg font-medium leading-relaxed text-[#d5e0ec]">
								30 minutes pour parler de votre activité, et je vous dis ce dont
								vous avez vraiment besoin. Vous recevez ensuite un devis clair,
								sans engagement.
							</p>
							<ContactButtons source="/tarifs-bottom" onDark />
						</div>
					</section>
				</Reveal>
			</main>
			<LocalFooter className="max-w-7xl" />
		</div>
	);
}
