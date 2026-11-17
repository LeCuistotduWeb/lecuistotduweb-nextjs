export type FreelanceStatus = "available" | "unavailable";

export const siteConfig = {
	name: "Gaëtan Boyron",
	alias: "LeCuistotduWeb",
	role: "Développeur Fullstack React/Node.js",
	email: "contact@lecuistotduweb.fr",
	url: "https://lecuistotduweb.fr",
	shortUrl: "lecuistotduweb.fr",
	bio: "Je conçois et fais évoluer vos applications web, du front-end React / Next.js au back-end Node.js, jusqu'à la mise en production : rapides, accessibles et faciles à maintenir. Développeur depuis plus de 8 ans, j'ai travaillé pour Fnac Darty et Infogreffe sur des produits à fort trafic, main dans la main avec les équipes Produit, UX et Backend. En renfort de votre équipe, sur un projet clé en main ou pour faire évoluer votre site WordPress. Basé à Vernon, dans l'Eure, je crée aussi des sites internet pour les restaurants, salons et TPE/PME de la région.",
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
	local: {
		// Nom commercial, écrit exactement comme sur la fiche Google Business
		// Profile (cohérence NAP). Le logo garde l'écriture « LeCuistotduWeb ».
		businessName: "Le Cuistot du Web",
		// Ancrage local (SEO) : ville de rattachement, sans adresse précise
		// (adresse masquée sur la fiche Google, zone desservie autour de Vernon)
		city: "Vernon",
		postalCode: "27200",
		department: "Eure",
		region: "Normandie",
		// Centre-ville de Vernon : sert au JSON-LD (geo), pas d'adresse exacte
		geo: { latitude: 49.0929, longitude: 1.4848 },
		// Communes desservies, reprises de la fiche Google Business Profile
		areaServed: [
			"Vernon",
			"Saint-Marcel",
			"Saint-Just",
			"Gaillon",
			"Pacy-sur-Eure",
			"Les Andelys",
			"Évreux",
			"Louviers",
			"Val-de-Reuil",
			"Bonnières-sur-Seine",
			"Giverny",
			"Mantes-la-Jolie",
			"Rouen",
		],
		// Lien public de la fiche Google Business Profile (« Partager le
		// profil » → lien g.page ou maps.app.goo.gl). Le lien « Voir la fiche
		// Google » et le sameAs du JSON-LD n'apparaissent que s'il est renseigné.
		googleBusinessUrl: "https://g.page/r/CTw8bcz8lHnTEBM" as string | undefined,
		// Lien « Laisser un avis » de la fiche ; bouton masqué tant qu'il est vide
		googleReviewUrl: "https://g.page/r/CTw8bcz8lHnTEBM/review" as
			| string
			| undefined,
	},
	rangeo: {
		// Sous-domaine dédié : la home du sous-domaine affiche /rangeo
		url: "https://rangeo.lecuistotduweb.fr",
		host: "rangeo.",
		packageId: "fr.lecuistotduweb.rangeo",
		// Fiche Google Play ; le bouton n'apparaît que s'il est renseigné
		playStoreUrl: undefined as string | undefined,
	},
	title: "Gaëtan Boyron — Développeur web freelance à Vernon (Eure)",
	description:
		"Développeur web freelance à Vernon (Eure), 8 ans d'expérience (Fnac Darty, Infogreffe). Sites internet sur mesure pour restaurants, salons et TPE/PME, applications React/Node.js en régie ou au forfait.",
} as const;
