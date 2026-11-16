export type Work = {
	label: string;
	/** Résumé d'une ligne affiché dans le carrousel. */
	description: string;
	src: string;
	srcSet: string;
	/** Étude de cas affichée dans la popup « Voir le projet ». */
	details: {
		context: string;
		period?: string;
		contributions: string[];
		stack?: string[];
		/** Site en ligne ; le lien n'apparaît que s'il est renseigné. */
		url?: string;
	};
};

/** Réalisations, par ordre d'importance. */
export const WORKS: Work[] = [
	{
		label: "Fnac Darty",
		description:
			"Architecture front React / Next.js, design system Storybook et i18n.",
		src: "/works/miniature-fnac-darty-1280.webp",
		srcSet:
			"/works/miniature-fnac-darty-640.webp 640w, /works/miniature-fnac-darty-1280.webp 1280w",
		details: {
			context:
				"Mission pour Fnac Darty : développement d'applications web marketplace, en lien quotidien avec les équipes Produit, UX et Backend.",
			period: "2024 — 2025",
			contributions: [
				"Conception de l'architecture frontend, modulaire et scalable",
				"Développement et intégration du design system (Storybook)",
				"Formulaires complexes et validation avancée (React Hook Form, Zod)",
				"Internationalisation multi-langues et gestion fine des rôles et permissions",
				"Performances et accessibilité (Core Web Vitals, lazy loading, sémantique HTML)",
				"Tests unitaires et d'intégration, revues de code et accompagnement des juniors",
			],
			stack: ["React", "Next.js", "TypeScript", "Storybook", "Jest"],
		},
	},
	{
		label: "Infogreffe",
		description:
			"Parcours utilisateurs, Design System et constructeur de pages Strapi.",
		src: "/works/miniature-site-web-portfolio-infogreffe-1280.webp",
		srcSet:
			"/works/miniature-site-web-portfolio-infogreffe-640.webp 640w, /works/miniature-site-web-portfolio-infogreffe-1280.webp 1280w",
		details: {
			context:
				"Mission pour Infogreffe : évolution du site, de ses parcours utilisateurs et de son Design System.",
			period: "2023 — 2024",
			contributions: [
				"Intégration des maquettes et développement des parcours utilisateurs",
				"Intégration des nouveaux composants du Design System",
				"Création d'un constructeur de pages avec Strapi",
				"Amélioration du référencement (SEO) et des performances",
				"Montées de version, documentation et revues de code",
			],
			stack: ["React", "Next.js", "TypeScript", "Strapi", "Storybook"],
		},
	},
	{
		label: "Blissim",
		description:
			"E-commerce beauté migré en PWA : abonnement, shop et box sur-mesure.",
		src: "/works/miniature-site-web-1280.webp",
		srcSet:
			"/works/miniature-site-web-640.webp 640w, /works/miniature-site-web-1280.webp 1280w",
		details: {
			context:
				"Développeur web chez Blissim, e-commerce beauté par abonnement : évolution du site et des outils internes.",
			period: "2019 — 2022",
			contributions: [
				"Migration du site existant vers une Progressive Web App (PWA)",
				"Parcours abonnement, espace client, shop et création de box sur-mesure",
				"Projets marketing : offres promotionnelles, boutique de Noël, campagnes saisonnières",
				"Refonte de la charte graphique, optimisation des performances et du SEO",
				"Application analytics pour le suivi des ventes et des avis produits",
			],
			stack: ["React", "PWA", "WordPress", "Symfony", "MySQL"],
		},
	},
	{
		label: "Nomad Education",
		description:
			"Refonte du site vitrine et migration d'Angular vers Nuxt / Vue.",
		src: "/works/thumbnail-worksite-web-nomad-education-1280.webp",
		srcSet:
			"/works/thumbnail-worksite-web-nomad-education-640.webp 640w, /works/thumbnail-worksite-web-nomad-education-1280.webp 1280w",
		details: {
			context:
				"Stage chez Nomad Education : refonte du site vitrine et modernisation de la plateforme.",
			period: "2018 — 2019",
			contributions: [
				"Refonte du site vitrine",
				"Conception des maquettes et intégration de la charte graphique",
				"Migration des fonctionnalités de l'ancienne plateforme Angular vers Nuxt / Vue",
			],
			stack: ["Jekyll", "Nuxt", "Vue.js"],
		},
	},
	{
		label: "Mon VDI Assistant",
		description: "SaaS pour gérer clients, commandes, produits et réunions.",
		src: "/works/mon-vdi-assistant-miniature-1280.webp",
		srcSet:
			"/works/mon-vdi-assistant-miniature-640.webp 640w, /works/mon-vdi-assistant-miniature-1280.webp 1280w",
		details: {
			context:
				"Projet personnel : un outil SaaS simple et intuitif pour les vendeurs à domicile indépendants (VDI).",
			contributions: [
				"Conception et développement de A à Z",
				"Gestion centralisée des clients, des commandes, des produits et des réunions",
			],
			url: "https://mon-vdi-assistant.fr",
		},
	},
	{
		label: "La Classe de Fleur",
		description:
			"Site pédagogique pour apprendre le français : vidéos, méthodologie et e-books.",
		src: "/works/miniature-site-web-laclassedefleur-1280.webp",
		srcSet:
			"/works/miniature-site-web-laclassedefleur-640.webp 640w, /works/miniature-site-web-laclassedefleur-1280.webp 1280w",
		details: {
			context:
				"Projet pédagogique mené avec ma conjointe, professeure de français : un site web et une chaîne YouTube pour apprendre le français.",
			contributions: [
				"Conception et développement du site",
				"Mise en avant des vidéos courtes et de la méthodologie",
				"Vente d'e-books",
			],
			url: "https://laclassedefleur.fr",
		},
	},
	{
		label: "Le Poudrier de Fleur",
		description:
			"Refonte complète et identité visuelle du site lepoudrierdefleur.fr.",
		src: "/works/miniature-lepoudrierdefleur-1280.webp",
		srcSet:
			"/works/miniature-lepoudrierdefleur-640.webp 640w, /works/miniature-lepoudrierdefleur-1280.webp 1280w",
		details: {
			context: "Refonte globale du site lepoudrierdefleur.fr.",
			contributions: [
				"Création de l'identité visuelle",
				"Refonte complète du site web",
			],
			url: "https://lepoudrierdefleur.fr",
		},
	},
	{
		label: "Marie Jade",
		description: "Portfolio sur mesure pour la danseuse Marie Jade Helmlinger.",
		src: "/works/miniature-marie-hlg-portfolio-1280.webp",
		srcSet:
			"/works/miniature-marie-hlg-portfolio-640.webp 640w, /works/miniature-marie-hlg-portfolio-1280.webp 1280w",
		details: {
			context:
				"Site portfolio pour la danseuse Marie Jade Helmlinger, pour présenter son parcours et son travail.",
			contributions: ["Conception et développement d'un site sur mesure"],
		},
	},
];
