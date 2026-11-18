import { siteConfig } from "#/config";
import { structuredData } from "#/lib/structured-data";

// Chapitres de la page d'accueil, dans l'ordre du scroll. Chaque chapitre a
// son ancre (/#experience, /#projets…) ; les anciennes routes (/experience…)
// redirigent vers elle.
export const VIEWS = [
	{ id: "accueil", label: "Présentation" },
	{ id: "experience", label: "Expérience" },
	{ id: "projets", label: "Réalisations" },
	{ id: "offre", label: "Offres" },
	{ id: "contact", label: "Contact" },
] as const;

export type View = (typeof VIEWS)[number];
export type ViewId = View["id"];

export function getView(id: ViewId): View {
	return VIEWS.find((v) => v.id === id) ?? VIEWS[0];
}

/** Chapitre d'une ancre d'URL (« experience », « #experience ») ; accueil sinon. */
export function getViewByHash(hash: string): View {
	const id = hash.replace(/^#/, "");
	return VIEWS.find((v) => v.id === id) ?? VIEWS[0];
}

/** Ancre d'un chapitre (aucune pour l'accueil). */
export const viewHash = (id: ViewId) => (id === "accueil" ? undefined : id);

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

/** <head> de l'accueil (une seule page : les chapitres sont des ancres). */
export function viewHead() {
	const { title, description, url } = siteConfig;
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
