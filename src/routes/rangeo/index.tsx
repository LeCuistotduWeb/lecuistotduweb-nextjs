import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Boxes,
	Camera,
	FileDown,
	ListChecks,
	QrCode,
	ShieldCheck,
	WifiOff,
} from "lucide-react";
import {
	RANGEO_ACCENT,
	RANGEO_OG_IMAGE,
	RangeoIcon,
	RangeoShell,
} from "#/components/rangeo-shell";
import { Button } from "#/components/ui/button";
import { siteConfig } from "#/config";
import { trackEvent } from "#/lib/analytics";

const TITLE = "Rangeo — Rangement et déménagement, sans perdre un objet";
const DESCRIPTION =
	"Rangeo est une application Android de rangement et de déménagement : lieux, contenants, objets, QR codes, photos et checklist. Hors ligne, sans compte, sans collecte de données.";

export const Route = createFileRoute("/rangeo/")({
	head: () => ({
		meta: [
			{ title: TITLE },
			{ name: "description", content: DESCRIPTION },
			{ name: "og:title", content: TITLE },
			{ name: "og:description", content: DESCRIPTION },
			{ name: "og:type", content: "website" },
			{ name: "og:url", content: `${siteConfig.rangeo.url}/` },
			{ name: "og:image", content: RANGEO_OG_IMAGE },
			{ name: "og:image:width", content: "1024" },
			{ name: "og:image:height", content: "500" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [{ rel: "canonical", href: `${siteConfig.rangeo.url}/` }],
	}),
	component: RangeoPage,
});

const FEATURES = [
	{
		icon: Boxes,
		title: "Lieux, contenants, objets",
		text: "Rangez par pièce, meuble ou carton, et notez ce que chacun contient.",
	},
	{
		icon: QrCode,
		title: "QR codes",
		text: "Collez un QR code sur un contenant : un scan affiche son contenu, sans l'ouvrir.",
	},
	{
		icon: Camera,
		title: "Photos",
		text: "Photographiez le contenu d'un carton pour le reconnaître d'un coup d'œil.",
	},
	{
		icon: ListChecks,
		title: "Checklist de déménagement",
		text: "Suivez les étapes de votre déménagement, avec des rappels si vous le souhaitez.",
	},
	{
		icon: FileDown,
		title: "Export PDF et sauvegarde",
		text: "Exportez vos inventaires en PDF ou sauvegardez tout dans un fichier ZIP.",
	},
	{
		icon: WifiOff,
		title: "100 % hors ligne",
		text: "Pas de compte, pas de connexion : l'app fonctionne partout, même dans un garage.",
	},
];

// Captures du Play Store (1080×1920, légende incluse dans l'image).
const SCREENS = [
	{
		slug: "lieux",
		alt: "Écran Mes lieux : pièces numérotées (Salon, Cuisine, Garage…) — « Chaque chose à sa place »",
	},
	{
		slug: "recherche",
		alt: "Écran Rechercher : un objet, un carton ou un code — « Retrouvez tout en 2 secondes »",
	},
	{
		slug: "contenant",
		alt: "Fiche du contenant SAL-01 avec emplacement, objets et photos — « Chaque carton détaillé »",
	},
	{
		slug: "qr-code",
		alt: "QR code du contenant SAL-01 prêt à imprimer — « Un QR code par carton »",
	},
	{
		slug: "demenagement",
		alt: "Écran Déménager : préparez, chargez, déchargez — « Déménagez sans rien perdre »",
	},
];

function PlayStoreCta() {
	const url = siteConfig.rangeo.playStoreUrl;
	if (!url) {
		return (
			<p className="inline-flex rounded-full border border-[#d2c4a4] px-4 py-2 text-sm font-medium text-[#4a6a8a] dark:border-[#253c59] dark:text-[#a1adbc]">
				Bientôt sur Google Play
			</p>
		);
	}
	return (
		<Button
			asChild
			size="lg"
			className="bg-[#c4501d] text-white hover:bg-[#a9441a] dark:bg-[#e8622a] dark:hover:bg-[#ff7a45]"
		>
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				onClick={() => trackEvent("click_rangeo_play_store")}
			>
				Télécharger sur Google Play
			</a>
		</Button>
	);
}

function RangeoPage() {
	return (
		<RangeoShell>
			<section className="py-12 md:py-20">
				<RangeoIcon className="mb-6 size-16 rounded-2xl shadow-lg shadow-[#ff7b3d]/25" />
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4a6a8a] dark:text-[#a1adbc]">
					Application Android
				</p>
				<h1 className="display-title mt-3 max-w-3xl text-4xl font-bold leading-tight text-[#253c59] md:text-6xl dark:text-white">
					Retrouvez chaque objet,{" "}
					<span className={RANGEO_ACCENT}>même au fond d'un carton.</span>
				</h1>
				<p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3a5570] dark:text-[#c5d5e5]">
					Rangeo vous aide à ranger et à déménager : vos lieux, vos contenants
					et leurs objets, retrouvables d'un scan. Tout reste sur votre
					téléphone.
				</p>
				<div className="mt-8">
					<PlayStoreCta />
				</div>
			</section>

			<section aria-labelledby="apercu" className="mb-12">
				<h2 id="apercu" className="sr-only">
					Aperçu de l'application
				</h2>
				<ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
					{SCREENS.map(({ slug, alt }) => (
						<li
							key={slug}
							className="w-[62vw] max-w-[260px] shrink-0 snap-start lg:w-auto lg:max-w-none"
						>
							<img
								src={`/rangeo/ecran-${slug}-720.webp`}
								srcSet={`/rangeo/ecran-${slug}-360.webp 360w, /rangeo/ecran-${slug}-720.webp 720w`}
								sizes="(min-width: 1024px) 190px, min(62vw, 260px)"
								width={1080}
								height={1920}
								alt={alt}
								loading="lazy"
								decoding="async"
								className="h-auto w-full rounded-2xl shadow-lg shadow-[#253c59]/15 dark:shadow-black/40"
							/>
						</li>
					))}
				</ul>
			</section>

			<section aria-labelledby="fonctionnalites">
				<h2 id="fonctionnalites" className="sr-only">
					Fonctionnalités
				</h2>
				<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map(({ icon: Icon, title, text }) => (
						<li
							key={title}
							className="rounded-2xl border border-[#d2c4a4] bg-[#faf5ec]/90 p-6 backdrop-blur-sm dark:border-[#1c2a3a] dark:bg-[#121e2a]/90"
						>
							<Icon className={`size-6 ${RANGEO_ACCENT}`} aria-hidden />
							<h3 className="mt-4 font-semibold text-[#253c59] dark:text-white">
								{title}
							</h3>
							<p className="mt-1.5 text-sm leading-relaxed text-[#3a5570] dark:text-[#c5d5e5]">
								{text}
							</p>
						</li>
					))}
				</ul>
			</section>

			<section className="mt-12 flex flex-col gap-4 rounded-2xl border border-[#d2c4a4] bg-[#faf5ec]/90 p-6 backdrop-blur-sm md:flex-row md:items-center md:p-8 dark:border-[#1c2a3a] dark:bg-[#121e2a]/90">
				<ShieldCheck
					className={`size-10 shrink-0 ${RANGEO_ACCENT}`}
					aria-hidden
				/>
				<div className="flex-1">
					<h2 className="display-title text-xl font-bold text-[#253c59] dark:text-white">
						Vos données restent chez vous
					</h2>
					<p className="mt-1.5 text-sm leading-relaxed text-[#3a5570] dark:text-[#c5d5e5]">
						Aucun compte, aucune publicité, aucun traqueur. Rangeo ne contacte
						aucun serveur et ne collecte aucune donnée personnelle.
					</p>
				</div>
				<Button asChild variant="outline">
					<Link to="/rangeo/confidentialite">
						<span className="text-[#253c59] dark:text-white">
							Politique de confidentialité
						</span>
					</Link>
				</Button>
			</section>
		</RangeoShell>
	);
}
