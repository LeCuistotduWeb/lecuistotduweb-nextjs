import { siteConfig } from "#/config";
import { structuredData } from "#/lib/structured-data";

// Chapitres de la page d'accueil, dans l'ordre du scroll. Chaque chapitre a
// aussi sa route (/experience, /projets…) : point d'entrée partageable et indexable
// qui fait défiler jusqu'au chapitre.
export const VIEWS = [
	{
		id: "accueil",
		path: "/",
		label: "Présentation",
		title: siteConfig.title,
		description: siteConfig.description,
	},
	{
		id: "experience",
		path: "/experience",
		label: "Expérience",
		title: `Expérience — ${siteConfig.name}`,
		description: `Parcours, expériences et stack de ${siteConfig.name}, ${siteConfig.role}.`,
	},
	{
		id: "projets",
		path: "/projets",
		label: "Projets",
		title: `Projets — ${siteConfig.name}`,
		description: `Projets et missions réalisés par ${siteConfig.name} : e-commerce, SaaS, sites vitrines et applications web et mobiles.`,
	},
	{
		id: "offre",
		path: "/offre",
		label: "Offre",
		title: `Offre freelance — ${siteConfig.name}`,
		description: `Renfort React / Next.js en régie, projet sur mesure ou maintenance de site : l'offre freelance de ${siteConfig.name}.`,
	},
	{
		id: "contact",
		path: "/contact",
		label: "Contact",
		title: `Contact — ${siteConfig.name}`,
		description: `Contacter ${siteConfig.name}, ${siteConfig.role} freelance : formulaire, prise de rendez-vous, e-mail, LinkedIn, GitHub.`,
	},
] as const;

export type View = (typeof VIEWS)[number];
export type ViewId = View["id"];

export function getView(id: ViewId): View {
	return VIEWS.find((v) => v.id === id) ?? VIEWS[0];
}

export function getViewByPath(pathname: string): View {
	const path = pathname.replace(/\/+$/, "") || "/";
	return VIEWS.find((v) => v.path === path) ?? VIEWS[0];
}

// Parcours : les chapitres numérotés (après l'accueil) et leur accroche.
export const PARCOURS = ["experience", "projets", "offre", "contact"] as const;
export type ParcoursId = (typeof PARCOURS)[number];

export const PARCOURS_CONTENT: Record<
	ParcoursId,
	{ headline: string; text: () => string }
> = {
	experience: {
		headline: "8 ans d'expérience au service de vos produits.",
		text: () =>
			"De la startup au grand groupe, chaque expérience m'a appris à comprendre le besoin pour livrer un produit performant et fidèle à vos attentes.",
	},
	projets: {
		headline: "Des projets réalisés avec soin.",
		text: () =>
			"Boutique en ligne, SaaS, site vitrine ou application mobile : chaque projet a été pensé, construit et livré avec exigence. Le vôtre mérite le même soin.",
	},
	offre: {
		headline: "Ce que je peux faire pour vous.",
		text: () =>
			"Renfort de votre équipe, projet clé en main ou évolution de votre site existant : une offre claire, sur devis.",
	},
	contact: {
		headline: "Parlons de votre besoin.",
		text: () =>
			"Un projet à lancer, une appli à faire évoluer, un renfort pour votre équipe ? Contactez-moi pour en discuter.",
	},
};

// Image de partage (1200×630) : générée par scripts/og-image.mjs
const OG_IMAGE = `${siteConfig.url}/og-image.png`;

export function viewHead(id: ViewId) {
	const { title, description, path } = getView(id);
	const url = `${siteConfig.url}${path === "/" ? "" : path}`;
	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: url },
			{ property: "og:image", content: OG_IMAGE },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{
				property: "og:image:alt",
				content: `${siteConfig.name} — ${siteConfig.role} freelance`,
			},
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: OG_IMAGE },
		],
		links: [{ rel: "canonical", href: url }],
		scripts: [structuredData()],
	};
}
