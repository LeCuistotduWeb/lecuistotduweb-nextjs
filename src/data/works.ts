export type WorkKind = "entreprise" | "freelance" | "perso";

/** Cadre du projet : salarié (poste, stage ou via l'ESN L'Atelier), client freelance ou projet perso. */
export const WORK_KINDS: Record<WorkKind, string> = {
	entreprise: "En entreprise",
	freelance: "En freelance",
	perso: "Projet perso",
};

export type Work = {
	label: string;
	/** En entreprise, en freelance ou projet perso (filtre de /realisations). */
	kind: WorkKind;
	/**
	 * Précision sur la couverture générée par scripts/work-cover.mjs (visuel
	 * d'illustration, données de démonstration), affichée sous l'image de la popup.
	 */
	coverNote?: string;
	/** Mis en avant dans le chapitre Projets de l'accueil. */
	featured?: boolean;
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
		kind: "entreprise",
		featured: true,
		description:
			"Architecture front React / Next.js, design system Storybook et i18n.",
		src: "/works/miniature-fnac-darty-1280.webp",
		srcSet:
			"/works/miniature-fnac-darty-640.webp 640w, /works/miniature-fnac-darty-1280.webp 1280w",
		details: {
			context:
				"Mission longue chez Fnac Darty, via l'ESN L'Atelier : développement d'applications web marketplace, en lien quotidien avec les équipes Produit, UX et Backend.",
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
		kind: "entreprise",
		featured: true,
		description:
			"Parcours utilisateurs, Design System et constructeur de pages Strapi.",
		src: "/works/miniature-site-web-portfolio-infogreffe-1280.webp",
		srcSet:
			"/works/miniature-site-web-portfolio-infogreffe-640.webp 640w, /works/miniature-site-web-portfolio-infogreffe-1280.webp 1280w",
		details: {
			context:
				"Mission longue chez Infogreffe, via l'ESN L'Atelier : évolution du site, de ses parcours utilisateurs et de son Design System.",
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
		label: "SOLIASSO",
		kind: "entreprise",
		coverNote: "Captures avec des données de démonstration",
		description:
			"Outil métier pour qualifier et évaluer les dossiers de la MDPH des Hauts-de-Seine.",
		src: "/works/miniature-soliasso-1280.webp",
		srcSet:
			"/works/miniature-soliasso-640.webp 640w, /works/miniature-soliasso-1280.webp 1280w",
		details: {
			context:
				"Pour SOLIASSO, via l'ESN L'Atelier : le groupement solidaire créé par l'Unapei 92 et l'APEI Boucle de la Seine pour réaliser les prestations de qualification et les évaluations des dossiers de la Maison départementale des personnes handicapées (MDPH) des Hauts-de-Seine.",
			period: "2026",
			contributions: [
				"Conception et développement de l'outil, du tableau de bord aux formulaires",
				"Import des lots de dossiers (CSV, XLSX) et suivi de leur avancement : non démarré, en cours, qualifié, évalué",
				"Formulaires de qualification et d'évaluation (enfant et adulte), avec calcul automatique du complément AEEH",
				"Liste des dossiers avec recherche, filtres par statut et par type, et téléchargement",
				"Interface responsive, utilisable sur ordinateur comme sur mobile",
			],
		},
	},
	{
		label: "TrustMyContent",
		kind: "entreprise",
		coverNote: "Visuel d'illustration",
		description:
			"Plateforme qui certifie l'origine des images : signature C2PA, détection IA et filigrane invisible.",
		src: "/works/miniature-trustmycontent-1280.webp",
		srcSet:
			"/works/miniature-trustmycontent-640.webp 640w, /works/miniature-trustmycontent-1280.webp 1280w",
		details: {
			context:
				"Pour TrustMyContent, via l'ESN L'Atelier : Provenance4Trust, une plateforme qui certifie l'origine et l'authenticité des contenus numériques pour les médias, les journalistes et les institutions.",
			contributions: [
				"Participation au développement de la plateforme de labellisation d'images (JPEG, PNG, TIFF)",
				"Parcours en trois étapes : import et inspection des métadonnées (EXIF, IPTC, C2PA), étiquetage de la fiche de provenance, signature et publication",
				"Intégration des services partenaires : détection de contenus générés par IA (UncovAI), filigrane invisible (IMATAG) et certification éditoriale JTI",
				"Signature C2PA des contenus, interopérable avec les Content Credentials (Adobe, Google, Meta)",
			],
			url: "https://www.provenance4trust.org",
		},
	},
	{
		label: "Blissim",
		kind: "entreprise",
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
		kind: "entreprise",
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
		kind: "perso",
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
		kind: "freelance",
		featured: true,
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
		kind: "freelance",
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
		kind: "freelance",
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

/** Projets du chapitre Projets de l'accueil ; la liste complète est sur /realisations. */
export const FEATURED_WORKS = WORKS.filter((work) => work.featured);
