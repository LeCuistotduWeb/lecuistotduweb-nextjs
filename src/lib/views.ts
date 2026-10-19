import { siteConfig } from "#/config";
import { getFreelanceStatusLabel } from "#/lib/freelance";

// Chapitres de la page d'accueil, dans l'ordre du scroll. Chaque chapitre a
// aussi sa route (/profil, /projets…) : point d'entrée partageable et indexable
// qui fait défiler jusqu'au chapitre.
export const VIEWS = [
	{
		id: "accueil",
		path: "/",
		label: "Accueil",
		title: siteConfig.title,
		description: siteConfig.description,
	},
	{
		id: "profil",
		path: "/profil",
		label: "Profil",
		title: `Profil — ${siteConfig.name}`,
		description: `Parcours, expériences et stack de ${siteConfig.name}, ${siteConfig.role}.`,
	},
	{
		id: "projets",
		path: "/projets",
		label: "Projets",
		title: `Projets — ${siteConfig.name}`,
		description: `Projets et missions réalisés par ${siteConfig.name} : sites web, applications React et SaaS.`,
	},
	{
		id: "freelance",
		path: "/freelance",
		label: "Freelance",
		title: `Freelance — ${siteConfig.name}`,
		description: `${siteConfig.name}, développeur React / Node.js freelance : disponibilité, types de missions et contact.`,
	},
	{
		id: "contact",
		path: "/contact",
		label: "Contact",
		title: `Contact — ${siteConfig.name}`,
		description: `Contacter ${siteConfig.name}, ${siteConfig.role} : e-mail, LinkedIn, GitHub.`,
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
export const PARCOURS = ["profil", "projets", "freelance", "contact"] as const;
export type ParcoursId = (typeof PARCOURS)[number];

export const PARCOURS_CONTENT: Record<
	ParcoursId,
	{ headline: string; text: () => string }
> = {
	profil: {
		headline: "Développeur fullstack, reconverti par passion.",
		text: () =>
			"Depuis 2017, je construis des interfaces React et des API Node.js : chez Blissim, puis en ESN pour Infogreffe et Fnac Darty.",
	},
	projets: {
		headline: "Du SaaS au site vitrine.",
		text: () =>
			"Une sélection de sites et d'applications réalisés en mission ou en indépendant, avec les missions qui les accompagnent.",
	},
	freelance: {
		headline: "Un projet React ou Node.js à lancer ?",
		text: () =>
			`${getFreelanceStatusLabel()}. Applications, API, refonte : voici ce que je peux prendre en charge.`,
	},
	contact: {
		headline: "On en parle ?",
		text: () =>
			"Une mission, un poste ou une simple question : choisissez le canal qui vous convient.",
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
