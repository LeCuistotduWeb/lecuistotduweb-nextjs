export type FreelanceStatus = "available" | "unavailable";

export const siteConfig = {
	name: "Gaëtan Boyron",
	alias: "LeCuistotduWeb",
	role: "Développeur Fullstack React/Node.js",
	email: "contact@lecuistotduweb.fr",
	url: "https://lecuistotduweb.fr",
	shortUrl: "lecuistotduweb.fr",
	bio: "Je suis Gaëtan Boyron (alias LeCuistotduWeb), développeur web depuis plus de 8 ans. Je conçois des applications React / Next.js / TypeScript robustes, performantes et évolutives, de la conception jusqu'à la mise en production. Ces dernières années, j'ai travaillé pour Fnac Darty et Infogreffe sur des produits à fort trafic : architecture frontend, Design System, Core Web Vitals, accessibilité et qualité du code, main dans la main avec les équipes Produit, UX et Backend.",
	social: {
		github: "https://github.com/lecuistotduweb",
		linkedin: "https://www.linkedin.com/in/ga%C3%ABtan-boyron-developpeur-web/",
	},
	freelance: {
		// "available" | "unavailable" — la carte Contact s'adapte automatiquement
		status: "available" as FreelanceStatus,
		// Date ISO (AAAA-MM-JJ) ; ignorée si absente ou déjà passée
		availableFrom: "2026-12-01" as string | undefined,
		missions: [
			"Applications React / Next.js",
			"API & back-end Node.js",
			"Refonte & performance",
			"Régie ou forfait · remote / Île-de-France",
		],
	},
	contact: {
		// Lien de prise de RDV (Cal.com…) ; le bouton n'apparaît que s'il est renseigné
		bookingUrl: undefined as string | undefined,
	},
	title: "Gaëtan Boyron — Développeur Fullstack React/Node.js",
	description:
		"Développeur Fullstack spécialisé en React et Node.js. Je crée des expériences web modernes et performantes. Découvrez mes projets et compétences.",
} as const;
