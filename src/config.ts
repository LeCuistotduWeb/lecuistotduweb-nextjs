export type FreelanceStatus = "available" | "unavailable";

export const siteConfig = {
	name: "Gaëtan Boyron",
	alias: "LeCuistotduWeb",
	role: "Développeur Fullstack React/Node.js",
	// Accroche affichée sous le nom (carte de présentation)
	headline: "Développeur React / Next.js freelance",
	email: "contact@lecuistotduweb.fr",
	url: "https://lecuistotduweb.fr",
	shortUrl: "lecuistotduweb.fr",
	bio: "Je conçois et fais évoluer vos applications web React / Next.js, de l'idée à la mise en production : rapides, accessibles et faciles à maintenir. Développeur depuis plus de 8 ans, j'ai travaillé pour Fnac Darty et Infogreffe sur des produits à fort trafic, main dans la main avec les équipes Produit, UX et Backend. En renfort de votre équipe ou sur un projet clé en main.",
	social: {
		github: "https://github.com/lecuistotduweb",
		linkedin: "https://www.linkedin.com/in/ga%C3%ABtan-boyron-developpeur-web/",
		// Profil Malt ; le bouton n'apparaît que s'il est renseigné
		malt: undefined as string | undefined,
	},
	cvPath: "/pdf/cv-gaetan-boyron-developpeur.pdf",
	freelance: {
		// "available" | "unavailable" — la carte Contact s'adapte automatiquement
		status: "available" as FreelanceStatus,
		// Date ISO (AAAA-MM-JJ) ; ignorée si absente ou déjà passée
		availableFrom: undefined as string | undefined,
	},
	contact: {
		// Événement Cal.com (« identifiant/événement ») ; le bouton de prise de
		// RDV n'apparaît que s'il est renseigné
		calLink: "lecuistotduweb/30min" as string | undefined,
	},
	rangeo: {
		// Sous-domaine dédié : la home du sous-domaine affiche /rangeo
		url: "https://rangeo.lecuistotduweb.fr",
		host: "rangeo.",
		packageId: "fr.lecuistotduweb.rangeo",
		// Fiche Google Play ; le bouton n'apparaît que s'il est renseigné
		playStoreUrl: undefined as string | undefined,
	},
	title: "Gaëtan Boyron — Développeur React / Next.js freelance",
	description:
		"Développeur React / Next.js freelance, 8 ans d'expérience (Fnac Darty, Infogreffe). Applications web, SaaS, e-commerce et sites sur mesure, en régie ou au forfait.",
} as const;
