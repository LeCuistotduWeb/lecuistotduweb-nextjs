export type FreelanceStatus = "available" | "unavailable";

export const siteConfig = {
	name: "Gaëtan Boyron",
	alias: "LeCuistotduWeb",
	role: "Développeur Fullstack React/Node.js",
	email: "contact@lecuistotduweb.fr",
	url: "https://lecuistotduweb.fr",
	shortUrl: "lecuistotduweb.fr",
	bio: "Je suis Gaëtan Boyron (alias LeCuistotduWeb). Animé par l'envie de développer ma créativité et de participer à la conception du web de demain, j'ai décidé de me reconvertir en 2017 afin de vivre de ma passion : le développement Web.",
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
