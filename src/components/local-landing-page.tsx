import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	CalendarDays,
	Check,
	ChevronDown,
	MapPin,
} from "lucide-react";
import { siteConfig } from "#/config";
import { getLocalPage, LOCAL_PAGES } from "#/data/local-pages";
import { trackEvent } from "#/lib/analytics";
import { bookingUrl, openBooking } from "#/lib/booking";
import { BentoCard } from "./bento-card";
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

function ContactButtons({ source }: { source: string }) {
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
				className="inline-flex items-center gap-2 rounded-full border border-[#253c59]/25 px-5 py-2.5 font-semibold transition-colors hover:bg-[#253c59]/5 dark:border-white/25 dark:hover:bg-white/10"
			>
				<span className={STRONG}>Demander un devis</span>
			</Link>
		</div>
	);
}

export function LocalLandingPage({ path }: { path: string }) {
	const page = getLocalPage(path);
	const { local } = siteConfig;
	const related = LOCAL_PAGES.filter((p) => p.path !== page.path);

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

				<BentoCard as="header" className="flex flex-col gap-6 md:p-12">
					<p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f25353]/10 px-3 py-1 text-sm font-semibold text-[#b52f2f] dark:bg-[#f25353]/15 dark:text-[#ff7a7a]">
						<MapPin aria-hidden="true" className="size-4" />
						{siteConfig.name} · Développeur web à {local.city} (
						{local.postalCode.slice(0, 2)})
					</p>
					<h1 className="display-title max-w-3xl text-4xl font-bold leading-tight text-[#253c59] md:text-5xl dark:text-white">
						{page.heading}
					</h1>
					<div
						className={`flex max-w-3xl flex-col gap-4 text-lg font-medium leading-relaxed ${TEXT}`}
					>
						{page.intro.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>
					<ContactButtons source={page.path} />
				</BentoCard>

				<ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
					{page.highlights.map((item) => (
						<li key={item.title}>
							<BentoCard as="div" className="h-full p-6 md:p-8">
								<h2 className={`display-title text-xl font-semibold ${STRONG}`}>
									{item.title}
								</h2>
								<p className={`mt-2 font-medium leading-relaxed ${TEXT}`}>
									{item.text}
								</p>
							</BentoCard>
						</li>
					))}
				</ul>

				{page.sections.map((section) => (
					<BentoCard key={section.title} className="p-6 md:p-10">
						<h2
							className={`display-title text-2xl font-semibold md:text-3xl ${STRONG}`}
						>
							{section.title}
						</h2>
						{section.paragraphs?.map((paragraph) => (
							<p
								key={paragraph}
								className={`mt-4 max-w-3xl font-medium leading-relaxed ${TEXT}`}
							>
								{paragraph}
							</p>
						))}
						{section.points && (
							<ul className="mt-5 grid gap-3 sm:grid-cols-2">
								{section.points.map((point) => (
									<li
										key={point}
										className="flex gap-3 text-[#3a5570] dark:text-[#c5d5e5]"
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

				<BentoCard className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-10">
					<div>
						<h2
							className={`display-title text-2xl font-semibold md:text-3xl ${STRONG}`}
						>
							Mes réalisations
						</h2>
						<p className={`mt-2 max-w-2xl font-medium leading-relaxed ${TEXT}`}>
							E-commerce, SaaS, sites vitrines et applications : découvrez les
							projets sur lesquels j'ai travaillé, de Fnac Darty aux sites
							d'indépendants.
						</p>
					</div>
					<Link
						to="/projets"
						className="group inline-flex shrink-0 items-center gap-1.5 font-semibold"
					>
						<span className="text-[#b52f2f] dark:text-[#ff7a7a]">
							Voir les projets
						</span>
						<ArrowRight
							aria-hidden="true"
							className="size-4 text-[#b52f2f] transition-transform group-hover:translate-x-0.5 dark:text-[#ff7a7a]"
						/>
					</Link>
				</BentoCard>

				<BentoCard className="p-6 md:p-10">
					<h2
						id="faq-title"
						className={`display-title text-2xl font-semibold md:text-3xl ${STRONG}`}
					>
						Questions fréquentes
					</h2>
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

				<BentoCard className="flex flex-col gap-6 p-6 md:p-10">
					<div>
						<h2
							className={`display-title text-2xl font-semibold md:text-3xl ${STRONG}`}
						>
							Parlons de votre projet
						</h2>
						<p className={`mt-2 max-w-2xl font-medium leading-relaxed ${TEXT}`}>
							Premier échange gratuit de 30 minutes, à {local.city}, chez vous
							ou en visio. Vous recevez ensuite un devis clair, sans engagement.
						</p>
					</div>
					<ContactButtons source={`${page.path}-bottom`} />
				</BentoCard>

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
