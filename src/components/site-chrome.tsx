import { Link, useLocation } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { siteConfig } from "#/config";
import { LOCAL_PAGES } from "#/data/local-pages";
import { trackEvent } from "#/lib/analytics";
import { openConsentBanner } from "#/lib/consent";
import { cn } from "#/lib/utils";
import { StickyContactBar } from "./contact-actions";
import { ThemeToggle } from "./theme-toggle";

// Habillage commun des pages : en-tête des pages autonomes (pages locales,
// réalisations) et pied de page du site.

const NAV = [
	{ to: "/realisations", hash: undefined, label: "Réalisations" },
	{ to: "/tarifs", hash: undefined, label: "Tarifs" },
] as const;

const STRONG = "text-[#253c59] dark:text-white";
const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";

/**
 * En-tête des pages autonomes (pages locales, réalisations) : barre en pilule
 * comme la nav de l'accueil, avatar + nom, page en cours en texte foncé, contact
 * en bouton rouge et choix du thème intégré.
 */
export function SiteHeader({ className }: { className?: string }) {
	const pathname = useLocation({ select: (location) => location.pathname });
	return (
		<header className={cn("mx-auto w-full px-4 pt-4 pb-2 md:pt-6", className)}>
			<div className="flex items-center justify-between gap-2 rounded-full border border-[#d2c4a4] bg-[#faf5ec]/80 p-1.5 shadow-sm backdrop-blur-md dark:border-[#253c59] dark:bg-[#172231]/80">
				<Link
					to="/"
					aria-label={`${siteConfig.alias}, accueil`}
					className="group flex shrink-0 items-center gap-2.5 rounded-full pr-2"
				>
					<img
						src="/lcdw-avatar-300.webp"
						alt=""
						width={36}
						height={36}
						className="size-9 rounded-full bg-[#e6d3ae] ring-2 ring-[#f25353]/25 transition-transform duration-500 group-hover:-rotate-6"
					/>
					<span
						className={`display-title hidden text-lg font-bold sm:inline ${STRONG}`}
					>
						{siteConfig.alias}
					</span>
				</Link>
				<nav
					aria-label="Navigation principale"
					className="flex min-w-0 items-center gap-0.5 sm:gap-1"
				>
					<ul className="flex items-center gap-0.5 text-sm font-semibold">
						{NAV.map(({ to, hash, label }) => (
							<li key={label}>
								<Link
									to={to}
									hash={hash}
									activeOptions={{ exact: true, includeHash: true }}
									className="group block px-2.5 py-2 sm:px-3"
								>
									<span className="text-[#4a6a8a] transition-colors group-hover:text-[#253c59] group-data-[status=active]:text-[#253c59] dark:text-[#a1adbc] dark:group-hover:text-white dark:group-data-[status=active]:text-white">
										{label}
									</span>
								</Link>
							</li>
						))}
					</ul>
					<Link
						to="/"
						hash="contact"
						onClick={() => trackEvent("click_header_contact")}
						className="rounded-full bg-[#d93a3a] px-3 py-2 text-sm font-semibold sm:px-4 shadow-md shadow-[#f25353]/25 transition-colors hover:bg-[#c93434]"
					>
						<span className="text-white">Contact</span>
					</Link>
					<span
						aria-hidden="true"
						className="mx-0.5 hidden h-5 w-px bg-[#d2c4a4] sm:block dark:bg-[#253c59]"
					/>
					<ThemeToggle variant="nav" />
				</nav>
			</div>
			{/* Boutons d'action toujours à portée (voir contact-actions.tsx) */}
			<StickyContactBar source={pathname} />
		</header>
	);
}

// Pages du site reprises dans le pied de page
const SITE_LINKS = [
	{ to: "/realisations", hash: undefined, label: "Réalisations" },
	{ to: "/", hash: "offre", label: "Offres" },
	{ to: "/tarifs", hash: undefined, label: "Tarifs" },
	{ to: "/cv", hash: undefined, label: "CV" },
	{ to: "/", hash: "contact", label: "Contact" },
] as const;

const FOOTER_LINK =
	"text-[#4a6a8a] underline-offset-4 group-hover:text-[#253c59] group-hover:underline dark:text-[#a1adbc] dark:group-hover:text-white";

/**
 * Pied de page du site (accueil et pages locales) : nom, ville et contact
 * identiques à la fiche Google (cohérence NAP), et zones d'intervention
 * (maillage interne vers les pages locales).
 */
export function LocalFooter({
	wide = false,
	className,
}: {
	wide?: boolean;
	className?: string;
}) {
	const { local } = siteConfig;
	const groups = [
		{ label: "Par ville", items: LOCAL_PAGES.filter((p) => p.kind === "zone") },
		{
			label: "Par métier",
			items: LOCAL_PAGES.filter((p) => p.kind === "metier"),
		},
	];
	return (
		<footer
			className={cn(
				"mx-auto flex w-full flex-col gap-10 border-t border-[#d2c4a4] px-4 pt-10 pb-24 text-sm sm:pb-8 dark:border-[#253c59]",
				wide ? "max-w-[110rem] md:px-8 lg:px-12" : "max-w-5xl",
				TEXT,
				className,
			)}
		>
			<div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.6fr)] md:gap-16">
				<div className="flex flex-col gap-3">
					<p className={`display-title text-2xl font-bold ${STRONG}`}>
						{local.businessName}
					</p>
					<p className="max-w-xs leading-relaxed">
						{siteConfig.name}, développeur web freelance à {local.city} (
						{local.department}, {local.region})
					</p>
					<a
						href={`mailto:${siteConfig.email}`}
						className="group w-fit font-semibold"
					>
						<span className={FOOTER_LINK}>{siteConfig.email}</span>
					</a>
					{local.googleBusinessUrl && (
						<a
							href={local.googleBusinessUrl}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => trackEvent("click_google_business")}
							className="group inline-flex w-fit items-center gap-1.5 font-semibold"
						>
							<MapPin aria-hidden="true" className="size-4 text-[#f25353]" />
							<span className="text-[#b52f2f] underline-offset-4 group-hover:underline dark:text-[#ff7a7a]">
								Ma fiche et mes avis Google
							</span>
						</a>
					)}
				</div>
				<nav aria-labelledby="footer-site-title">
					<h2
						id="footer-site-title"
						className="text-xs font-semibold uppercase tracking-widest text-[#93a8be] dark:text-[#7a8fa0]"
					>
						Le site
					</h2>
					<ul className="mt-4 flex flex-col gap-1.5">
						{SITE_LINKS.map(({ to, hash, label }) => (
							<li key={label}>
								<Link to={to} hash={hash} className="group font-medium">
									<span className={FOOTER_LINK}>{label}</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<nav
					aria-labelledby="footer-local-title"
					className="sm:col-span-2 md:col-span-1"
				>
					<h2
						id="footer-local-title"
						className="text-xs font-semibold uppercase tracking-widest text-[#93a8be] dark:text-[#7a8fa0]"
					>
						Près de chez vous : Vernon, Évreux et l'Eure
					</h2>
					<div className="mt-4 grid gap-6 sm:grid-cols-2">
						{groups.map(({ label, items }) => (
							<div key={label}>
								<p className={`font-semibold ${STRONG}`}>{label}</p>
								<ul className="mt-2 flex flex-col gap-1.5">
									{items.map((p) => (
										<li key={p.path}>
											<Link to={p.path} className="group font-medium">
												<span className={FOOTER_LINK}>{p.label}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</nav>
			</div>
			<div className="flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
				<p>
					© {new Date().getFullYear()} {local.businessName} ·{" "}
					{siteConfig.shortUrl}
				</p>
				<ul className="flex flex-wrap gap-x-5 gap-y-2 font-medium">
					<li>
						<Link to="/mentions-legales" className="group">
							<span className={FOOTER_LINK}>Mentions légales</span>
						</Link>
					</li>
					<li>
						<Link to="/confidentialite" className="group">
							<span className={FOOTER_LINK}>Confidentialité</span>
						</Link>
					</li>
					<li>
						<button
							type="button"
							onClick={openConsentBanner}
							className="group cursor-pointer"
						>
							<span className={FOOTER_LINK}>Gérer les cookies</span>
						</button>
					</li>
				</ul>
			</div>
		</footer>
	);
}
