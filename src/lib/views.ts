import { siteConfig } from "#/config";

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
		id: "contact",
		path: "/contact",
		label: "Contact",
		title: `Contact — ${siteConfig.name}`,
		description: `Contacter ${siteConfig.name}, ${siteConfig.role} freelance : disponibilité, types de missions, e-mail, LinkedIn, GitHub.`,
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
export const PARCOURS = ["experience", "projets", "contact"] as const;
export type ParcoursId = (typeof PARCOURS)[number];

export const PARCOURS_CONTENT: Record<
	ParcoursId,
	{ headline: string; text: () => string }
> = {
	experience: {
		headline: "8 ans d'expérience au service de vos produits.",
		text: () =>
			"Chez Blissim, Infogreffe ou Fnac Darty, j'ai appris à livrer vite sans sacrifier la qualité. C'est cette exigence que j'apporte à votre projet.",
	},
	projets: {
		headline: "Des projets réalisés avec soin.",
		text: () =>
			"Boutique en ligne, SaaS, site vitrine ou application mobile : chaque projet a été pensé, construit et livré avec exigence. Le vôtre mérite le même soin.",
	},
	contact: {
		headline: "Parlons de votre besoin.",
		text: () =>
			"Un projet à lancer, une appli à faire évoluer, un poste à pourvoir ? Dites-moi qui vous êtes : le premier échange est sans engagement.",
	},
};

export function viewHead(id: ViewId) {
	const { title, description, path } = getView(id);
	const url = `${siteConfig.url}${path === "/" ? "" : path}`;
	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ name: "og:title", content: title },
			{ name: "og:description", content: description },
			{ name: "og:type", content: "website" },
			{ name: "og:url", content: url },
			{ name: "og:image", content: "/lcdw-avatar.png" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: "/lcdw-avatar.png" },
		],
		links: [{ rel: "canonical", href: url }],
	};
}
