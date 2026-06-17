export type Experience = {
	title: string;
	company: string;
	/** Format libre : "2023 — présent", "2019 — 2022", etc. */
	period: string;
	description?: string[];
};

/**
 * Expériences professionnelles — de la plus récente à la plus ancienne.
 * La card affiche les PREVIEW_COUNT premières ; le modal affiche tout.
 */
export const EXPERIENCES: Experience[] = [
	{
		title: "Développeur front-end",
		company: "L'Atelier",
		period: "2023 — 2026",
		description: [
			"Création, analyse et optimisation UI/UX de projets internes (ergonomie, parcours utilisateurs, cohérence visuelle)",
			"Animation de talks techniques lors des Tech Days internes",
		],
	},
	{
		title: "Développeur front-end",
		company: "FNAC Darty (ESN L'Atelier)",
		period: "2024 — 2025",
		description: [
			"Conception et mise en place de l'architecture frontend modulaire et scalable",
			"Développement d'interfaces utilisateurs modernes et responsives (React/Next.js/TypeScript)",
			"Développement de pages CRUD complètes avec formulaires complexes et gestion avancée de la validation (React Hook Form, Zod)",
			"Optimisation des performances et de l'expérience utilisateur (Core Web Vitals, lazy loading, sémantique HTML, accessibilité)",
			"Développement et intégration du design system (Storybook)",
			"Implémentation du système d'internationalisation multi-langues (i18n)",
			"Mise en place d'un système de gestion des rôles et permissions granulaires",
			"Intégration et consommation d'APIs REST avec gestion d'état optimisée",
			"Implémentation d'une stratégie de tests complète : unitaires et d'intégration (Jest, React Testing Library)",
			"Collaboration quotidienne avec l'équipe backend (PHP/Symfony) pour garantir une intégration fluide",
			"Revues de code et application des bonnes pratiques de clean code",
			"Accompagnement et montée en compétences des développeurs juniors",
		],
	},
	{
		title: "Développeur front-end",
		company: "Infogreffe (ESN L'Atelier)",
		period: "2023 — 2024",
		description: [
			"Intégration des maquettes et développement des parcours utilisateurs",
			"Intégration des nouveaux composants du Design System",
			"Création d'un constructeur de page avec StrapiJs",
			"Amélioration SEO et des performances",
			"Maintenance et montée en versions des différents plugins et packages",
			"Rédaction de documentations (Confluence)",
			"Code reviews et partage de connaissances techniques",
			"Correction de bugs",
		],
	},
	{
		title: "Développeur web",
		company: "Blissim",
		period: "2019 — 2022",
		description: [
			"Amélioration du site existant et migration vers une Progressive Web App (PWA)",
			"Développement des parcours utilisateurs : abonnement, espace client, shop, création de box sur-mesure, FAQ service client",
			"Développement des projets marketing (offres promotionnelles, boutique de Noël, campagnes saisonnières)",
			"Refonte et implémentation de la nouvelle charte graphique",
			"Optimisation des performances du site et du référencement (SEO)",
			"Développement de routes API personnalisées pour l'intégration de nouvelles fonctionnalités",
			"Conception et développement d'une application analytics (Symfony 5, MySQL, Twig, Chart.js) pour le suivi des ventes et la gestion des avis produits",
		],
	},
	{
		title: "Développeur front-end (Stage)",
		company: "Nomad Education",
		period: "2018 — 2019",
		description: [
			"Refonte du site vitrine (Jekyll)",
			"Intégration de la charte graphique et conception des maquettes",
			"Migration des fonctionnalités de l'ancienne plateforme Angular vers NuxtJs/Vuejs",
		],
	},
	{
		title: "Webdesigner (Stage)",
		company: "Arkade Communication",
		period: "2017",
	},
];

/** Nombre d'expériences affichées dans la card avant le bouton "Voir tout". */
export const PREVIEW_COUNT = 4;
