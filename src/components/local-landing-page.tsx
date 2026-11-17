import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	CalendarDays,
	Check,
	ChefHat,
	ChevronDown,
	MapPin,
} from "lucide-react";
import { siteConfig } from "#/config";
import { getLocalPage, LOCAL_PAGES } from "#/data/local-pages";
import { WORKS } from "#/data/works";
import { trackEvent } from "#/lib/analytics";
import { bookingUrl, openBooking } from "#/lib/booking";
import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import { LocalShowcase } from "./local-showcase";
import { OrbitAvatar } from "./orbit-avatar";
import { ThemeToggle } from "./theme-toggle";

// Gabarit des pages d'atterrissage du référencement local (zones et métiers).
// Page autonome, sans l'écran de chargement ni les animations au scroll :
// tout le contenu est visible dès le rendu serveur.

const NAV = [
	{ to: "/projets", label: "Projets" },
	{ to: "/offre", label: "Offre" },
	{ to: "/contact", label: "Contact" },
] as const;

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";
const H2 = `display-title text-2xl font-semibold md:text-3xl ${STRONG}`;

const STORY =
	"Avant de devenir développeur en 2017, j'ai travaillé en cuisine professionnelle. J'en ai gardé le goût du travail bien fait, le sens du timing et l'envie de voir le client repartir content. C'est de là que vient LeCuistotduWeb.";

const STEPS = [
	{
		title: "On se rencontre",
		text: "30 minutes, chez vous ou en visio, pour comprendre votre activité.",
	},
	{
		title: "Vous recevez un devis",
		text: "Périmètre, délais et prix : clair et sans engagement.",
	},
	{
		title: "Je construis votre site",
		text: "Avec des points réguliers et un aperçu en ligne tout au long du projet.",
	},
	{
		title: "On le met en ligne",
		text: "Et je vous montre comment modifier vos contenus vous-même.",
	},
];

function ContactButtons({
	source,
	onDark = false,
}: {
	source: string;
	onDark?: boolean;
}) {
	return (
		<div className="flex flex-wrap gap-3">
			{bookingUrl && (
				<a
					href={bookingUrl}
					target="_blank"
					rel="noopener noreferrer"
					onClick={(event) => openBooking(event, source)}
					className="inline-flex items-center gap-2 rounded-full bg-[#f25353] px-5 py-2.5 font-semibold shadow-lg shadow-[#f25353]/30 transition-colors hover:bg-[#e04444]"
				>
					<CalendarDays aria-hidden="true" className="size-4 text-white" />
					<span className="text-white">Réserver un appel gratuit</span>
				</a>
			)}
			<Link
				to="/contact"
				onClick={() => trackEvent("click_local_contact", { page: source })}
				className={cn(
					"inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold transition-colors",
					onDark
						? "border-white/30 hover:bg-white/10"
						: "border-[#253c59]/25 hover:bg-[#253c59]/5 dark:border-white/25 dark:hover:bg-white/10",
				)}
			>
				<span className={onDark ? "text-white" : STRONG}>
					Demander un devis
				</span>
			</Link>
		</div>
	);
}

export function LocalLandingPage({ path }: { path: string }) {
	const page = getLocalPage(path);
	const { local } = siteConfig;
	const related = LOCAL_PAGES.filter((p) => p.path !== page.path);
	const works = page.works
		.map((label) => WORKS.find((work) => work.label === label))
		.filter((work) => work !== undefined);

	return (
		<div className="flex min-h-dvh flex-col">
			<header className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-5">
				<Link
					to="/"
					className="display-title text-xl font-bold text-[#253c59] dark:text-white"
				>
					<span className={STRONG}>{siteConfig.alias}</span>
				</Link>
				<nav aria-label="Navigation principale">
					<ul className="flex items-center gap-1 text-sm font-semibold">
						{NAV.map(({ to, label }) => (
							<li key={to}>
								<Link to={to} className="group rounded-md px-3 py-2">
									<span className="text-[#4a6a8a] group-hover:text-[#253c59] dark:text-[#a1adbc] dark:group-hover:text-white">
										{label}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
			<ThemeToggle />

			<main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 pb-24 md:gap-6">
				<nav aria-label="Fil d'Ariane" className={`text-sm ${TEXT}`}>
					<ol className="flex flex-wrap items-center gap-1.5">
						<li>
							<Link to="/" className="hover:underline">
								<span className={TEXT}>Accueil</span>
							</Link>
						</li>
						<li aria-hidden="true">/</li>
						<li aria-current="page" className="font-medium">
							{page.label}
						</li>
					</ol>
				</nav>

				<BentoCard
					as="header"
					className="relative grid items-center gap-10 overflow-hidden md:grid-cols-[1fr_auto] md:p-12"
				>
					<div className="flex flex-col gap-6">
						<p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f25353]/10 px-3 py-1 text-sm font-semibold text-[#b52f2f] dark:bg-[#f25353]/15 dark:text-[#ff7a7a]">
							<MapPin aria-hidden="true" className="size-4" />
							Développeur web à {local.city} ({local.postalCode.slice(0, 2)})
						</p>
						<h1 className="flex max-w-2xl flex-col gap-3">
							<span className="text-base font-semibold uppercase tracking-widest text-[#b52f2f] dark:text-[#ff7a7a]">
								{page.heading}
							</span>
							<span className="display-title text-4xl font-bold leading-[1.05] text-[#253c59] md:text-6xl dark:text-white">
								{page.hook}
							</span>
						</h1>
						<div
							className={`flex max-w-2xl flex-col gap-4 text-lg font-medium leading-relaxed ${TEXT}`}
						>
							{page.intro.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
						<ContactButtons source={page.path} />
					</div>
					<LocalShowcase page={page} />
				</BentoCard>

				<ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
					{page.highlights.map(({ icon: Icon, title, text }) => (
						<li key={title}>
							<BentoCard
								as="div"
								className="group h-full p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8"
							>
								<span className="flex size-12 items-center justify-center rounded-2xl bg-[#f25353]/10 transition-transform duration-300 group-hover:-rotate-6 dark:bg-[#f25353]/15">
									<Icon aria-hidden="true" className="size-6 text-[#f25353]" />
								</span>
								<h2
									className={`display-title mt-5 text-xl font-semibold ${STRONG}`}
								>
									{title}
								</h2>
								<p className={`mt-2 font-medium leading-relaxed ${TEXT}`}>
									{text}
								</p>
							</BentoCard>
						</li>
					))}
				</ul>

				<BentoCard className="flex flex-col items-center gap-6 p-6 text-center md:flex-row md:gap-10 md:p-10 md:text-left">
					<OrbitAvatar size={150} text="DE LA CUISINE AU CODE" />
					<div className="flex flex-col gap-3">
						<p className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#b52f2f] md:justify-start dark:text-[#ff7a7a]">
							<ChefHat aria-hidden="true" className="size-4" />
							Pourquoi « LeCuistotduWeb »
						</p>
						<blockquote
							className={`display-title text-xl leading-snug md:text-2xl ${STRONG}`}
						>
							« {page.story ?? STORY} »
						</blockquote>
						<p className={`text-sm font-semibold ${TEXT}`}>
							{siteConfig.name}, développeur web à {local.city}
						</p>
					</div>
				</BentoCard>

				{page.sections.map((section) => (
					<BentoCard key={section.title} className="p-6 md:p-10">
						<h2 className={H2}>{section.title}</h2>
						{section.paragraphs?.map((paragraph) => (
							<p
								key={paragraph}
								className={`mt-4 max-w-3xl font-medium leading-relaxed ${TEXT}`}
							>
								{paragraph}
							</p>
						))}
						{section.points && (
							<ul className="mt-6 grid gap-3 sm:grid-cols-2">
								{section.points.map((point) => (
									<li
										key={point}
										className="flex gap-3 rounded-xl bg-[#253c59]/[0.03] p-3 text-[#3a5570] dark:bg-white/[0.03] dark:text-[#c5d5e5]"
									>
										<Check
											aria-hidden="true"
											className="mt-0.5 size-5 shrink-0 text-[#f25353]"
										/>
										{point}
									</li>
								))}
							</ul>
						)}
					</BentoCard>
				))}

				<BentoCard className="p-6 md:p-10">
					<h2 className={H2}>Comment ça se passe</h2>
					<ol className="mt-8 grid gap-8 md:grid-cols-4 md:gap-6">
						{STEPS.map((step, index) => (
							<li key={step.title} className="relative flex gap-4 md:flex-col">
								{index < STEPS.length - 1 && (
									<span
										aria-hidden="true"
										className="absolute top-12 bottom-[-2rem] left-6 w-px bg-[#f25353]/30 md:top-6 md:right-[-1.5rem] md:bottom-auto md:left-14 md:h-px md:w-auto"
									/>
								)}
								<span className="display-title relative flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f25353] text-lg font-bold text-white shadow-lg shadow-[#f25353]/30">
									{index + 1}
								</span>
								<div>
									<h3 className={`font-semibold ${STRONG}`}>{step.title}</h3>
									<p className={`mt-1 text-sm leading-relaxed ${TEXT}`}>
										{step.text}
									</p>
								</div>
							</li>
						))}
					</ol>
				</BentoCard>

				<BentoCard className="p-6 md:p-10">
					<div className="flex flex-wrap items-end justify-between gap-4">
						<div>
							<h2 className={H2}>Quelques réalisations</h2>
							<p className={`mt-2 max-w-2xl font-medium ${TEXT}`}>
								De Fnac Darty aux sites d'indépendants, le même soin du détail.
							</p>
						</div>
						<Link
							to="/projets"
							className="group inline-flex shrink-0 items-center gap-1.5 font-semibold"
						>
							<span className="text-[#b52f2f] dark:text-[#ff7a7a]">
								Voir tous les projets
							</span>
							<ArrowRight
								aria-hidden="true"
								className="size-4 text-[#b52f2f] transition-transform group-hover:translate-x-0.5 dark:text-[#ff7a7a]"
							/>
						</Link>
					</div>
					<ul className="mt-6 grid gap-4 sm:grid-cols-3">
						{works.map((work) => (
							<li key={work.label}>
								<Link to="/projets" className="group block">
									<div className="overflow-hidden rounded-xl border border-[#d2c4a4] dark:border-[#253c59]">
										<img
											src={work.src}
											srcSet={work.srcSet}
											sizes="(min-width: 640px) 300px, 100vw"
											alt={`Aperçu du projet ${work.label}`}
											width={640}
											height={400}
											loading="lazy"
											className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>
									</div>
									<p className={`mt-3 font-semibold ${STRONG}`}>
										<span className={STRONG}>{work.label}</span>
									</p>
									<p className={`mt-1 text-sm leading-relaxed ${TEXT}`}>
										<span className={TEXT}>{work.description}</span>
									</p>
								</Link>
							</li>
						))}
					</ul>
				</BentoCard>

				<BentoCard className="p-6 md:p-10">
					<h2 className={H2}>Questions fréquentes</h2>
					<div className="mt-4 divide-y divide-[#d2c4a4] dark:divide-[#253c59]">
						{page.faq.map(({ question, answer }) => (
							<details key={question} className="group py-4">
								<summary
									className={`flex cursor-pointer list-none items-center justify-between gap-4 font-semibold ${STRONG}`}
								>
									<h3>{question}</h3>
									<ChevronDown
										aria-hidden="true"
										className="size-5 shrink-0 text-[#f25353] transition-transform group-open:rotate-180"
									/>
								</summary>
								<p className={`mt-3 max-w-3xl leading-relaxed ${TEXT}`}>
									{answer}
								</p>
							</details>
						))}
					</div>
				</BentoCard>

				<section className="relative overflow-hidden rounded-2xl bg-[#253c59] p-8 md:p-12 dark:bg-[#1c2d44]">
					<div
						aria-hidden="true"
						className="absolute -top-24 -right-24 size-72 rounded-full bg-[#f25353]/30 blur-3xl"
					/>
					<div className="relative flex flex-col gap-6">
						<h2 className="display-title max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl">
							On en parle autour d'un café ?
						</h2>
						<p className="max-w-2xl text-lg font-medium leading-relaxed text-[#d5e0ec]">
							Premier échange gratuit de 30 minutes, à {local.city}, chez vous
							ou en visio. Vous recevez ensuite un devis clair, sans engagement.
						</p>
						<ContactButtons source={`${page.path}-bottom`} onDark />
					</div>
				</section>

				<LocalLinks pages={related} title="Voir aussi" />
			</main>

			<LocalFooter />
		</div>
	);
}

/** Liens vers les pages locales (maillage interne). */
export function LocalLinks({
	pages = LOCAL_PAGES,
	title,
}: {
	pages?: typeof LOCAL_PAGES;
	title: string;
}) {
	const zones = pages.filter((p) => p.kind === "zone");
	const metiers = pages.filter((p) => p.kind === "metier");
	return (
		<BentoCard className="p-6 md:p-8">
			<h2 className="text-sm font-semibold uppercase tracking-widest text-[#93a8be] dark:text-[#7a8fa0]">
				{title}
			</h2>
			<div className="mt-4 grid gap-6 sm:grid-cols-2">
				{[
					{ label: "Par ville", items: zones },
					{ label: "Par métier", items: metiers },
				]
					.filter(({ items }) => items.length > 0)
					.map(({ label, items }) => (
						<div key={label}>
							<p className={`text-sm font-semibold ${STRONG}`}>{label}</p>
							<ul className="mt-2 flex flex-col gap-1.5">
								{items.map((p) => (
									<li key={p.path}>
										<Link to={p.path} className="group text-sm font-medium">
											<span className="text-[#4a6a8a] underline-offset-4 group-hover:text-[#253c59] group-hover:underline dark:text-[#a1adbc] dark:group-hover:text-white">
												{p.label}
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
			</div>
			{siteConfig.local.googleBusinessUrl && (
				<a
					href={siteConfig.local.googleBusinessUrl}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => trackEvent("click_google_business")}
					className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold"
				>
					<MapPin aria-hidden="true" className="size-4 text-[#f25353]" />
					<span className="text-[#b52f2f] group-hover:underline dark:text-[#ff7a7a]">
						Voir ma fiche et mes avis Google
					</span>
				</a>
			)}
		</BentoCard>
	);
}

/** Pied de page : nom, ville et contact identiques à la fiche Google (NAP). */
export function LocalFooter() {
	const { local } = siteConfig;
	return (
		<footer
			className={`mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 border-t border-[#d2c4a4] px-4 py-6 pb-24 text-sm sm:pb-6 dark:border-[#253c59] ${TEXT}`}
		>
			<p>
				<span className={`font-semibold ${STRONG}`}>{siteConfig.alias}</span> ·{" "}
				{siteConfig.name}, développeur web freelance à {local.city} (
				{local.department}, {local.region})
			</p>
			<div className="flex flex-wrap gap-4">
				{local.googleBusinessUrl && (
					<a
						href={local.googleBusinessUrl}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => trackEvent("click_google_business")}
						className="hover:underline"
					>
						<span className={TEXT}>Voir la fiche Google</span>
					</a>
				)}
				<a href={`mailto:${siteConfig.email}`} className="hover:underline">
					<span className={TEXT}>{siteConfig.email}</span>
				</a>
			</div>
		</footer>
	);
}
