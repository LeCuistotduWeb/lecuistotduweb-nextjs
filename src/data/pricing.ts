// Tarifs indicatifs de la page /tarifs, fixés par Gaëtan (novembre 2026).
// Ne pas modifier un montant sans son accord.

export type Formula = {
	title: string;
	/** Prix « dès », en euros */
	from: number;
	tagline: string;
	features: string[];
	/** Délai ou précision affiché sous la liste */
	note?: string;
	highlighted?: boolean;
};

export const FORMULAS: Formula[] = [
	{
		title: "Vitrine Essentiel",
		from: 1200,
		tagline: "Idéal pour un salon, un restaurant ou un artisan qui démarre",
		features: [
			"Jusqu'à 5 pages (accueil, services/carte, à propos, galerie, contact)",
			"Design sur mesure, adapté mobile et tablette",
			"Formulaire de contact, plan Google Maps, liens réseaux sociaux",
			"Référencement local de base (Google)",
			"Mise en ligne et prise en main (30 min)",
		],
		note: "Délai indicatif : 2 à 3 semaines",
	},
	{
		title: "Vitrine Premium",
		from: 2000,
		tagline: "Pour se démarquer et convertir les visiteurs en clients",
		features: [
			"Tout l'Essentiel, jusqu'à 8 pages",
			"Carte / menu ou liste des prestations modifiable par vous",
			"Réservation ou prise de rendez-vous en ligne (outil intégré)",
			"Avis clients, galerie photos avancée",
			"Référencement local optimisé + fiche Google Business Profile",
		],
		note: "Délai indicatif : 3 à 5 semaines",
		highlighted: true,
	},
	{
		title: "Site PME sur mesure",
		from: 3500,
		tagline: "Sur devis, selon vos besoins",
		features: [
			"Pages illimitées selon le projet, blog / actualités",
			"Espace d'administration pour gérer vos contenus",
			"Fonctions sur mesure : réservation, devis en ligne, multilingue, petit catalogue…",
			"Accompagnement SEO et performances",
		],
	},
];

export type PriceLine = { label: string; detail?: string; price: string };

export const OPTIONS: PriceLine[] = [
	{ label: "Page supplémentaire", price: "150 €" },
	{
		label: "Module de réservation / prise de rendez-vous en ligne",
		detail: "abonnement à l'outil à votre charge",
		price: "300 €",
	},
	{ label: "Carte, menu ou tarifs modifiables par vos soins", price: "200 €" },
	{
		label: "Version anglaise du site",
		detail: "hors traduction des textes",
		price: "dès 300 €",
	},
	{
		label: "Création et optimisation de la fiche Google Business Profile",
		price: "150 €",
	},
	{ label: "Rédaction des textes optimisés pour Google", price: "80 € / page" },
	{ label: "Boutique en ligne", price: "sur devis" },
	{ label: "Refonte d'un site existant", price: "sur devis" },
];

export type Plan = {
	title: string;
	/** Prix mensuel, en euros */
	monthly: number;
	features: string[];
};

export const PLANS: Plan[] = [
	{
		title: "Hébergement seul",
		monthly: 12,
		features: [
			"Hébergement rapide en France",
			"Certificat SSL (https)",
			"Sauvegardes",
			"Sans intervention",
		],
	},
	{
		title: "Maintenance",
		monthly: 49,
		features: [
			"Hébergement inclus",
			"Mises à jour techniques et de sécurité",
			"Sauvegardes, surveillance et correctifs",
			"1 h de petites modifications par mois (non cumulable)",
			"Site en panne : pris en charge sous 24 h ouvrées",
			"Demandes : prises en charge sous 72 h ouvrées",
		],
	},
];

export const EXTRAS: PriceLine[] = [
	{
		label: "Intervention à l'heure",
		detail: "30 min minimum",
		price: "70 € / h",
	},
	{
		label: "Demi-journée d'intervention",
		detail: "environ 3 h 30",
		price: "250 €",
	},
	{ label: "Journée d'intervention", price: "450 €" },
	{
		label: "Nom de domaine (.fr / .com)",
		detail: "à votre nom",
		price: "au réel, env. 15 € / an",
	},
];

/** « 1 200 € », avec des espaces insécables : le prix ne se coupe jamais. */
export function formatEuros(value: number) {
	return `${value.toLocaleString("fr-FR").replace(/\s/g, "\u00a0")}\u00a0€`;
}
