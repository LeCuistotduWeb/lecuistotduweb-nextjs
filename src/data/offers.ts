export type Offer = {
	title: string;
	text: string;
	benefits: string[];
};

/** Offre principale, mise en avant dans le chapitre Offre. */
export const FEATURED_OFFER: Offer & { references: string } = {
	title: "Renfort React / Next.js",
	text: "J'intègre votre équipe en régie pour développer, structurer ou accélérer votre produit.",
	benefits: [
		"Opérationnel rapidement sur votre base React / Next.js / TypeScript",
		"Architecture frontend, Design System et performances",
		"Code testé, revu et documenté, transmis à votre équipe",
		"À distance ou sur site : Paris et Rouen en ligne directe",
	],
	references: "Fnac Darty · Infogreffe · Blissim",
};

export const SECONDARY_OFFERS: Offer[] = [
	{
		title: "Projet sur mesure",
		text: "Application web, SaaS, e-commerce ou site vitrine, de la conception à la mise en ligne.",
		benefits: [
			"Un seul interlocuteur, du besoin à la livraison",
			"Un site rapide, accessible et bien référencé",
			"Mise en ligne et prise en main incluses",
		],
	},
	{
		title: "Maintenance et évolutions",
		text: "Votre site existe déjà ? Je le garde à jour et le fais évoluer.",
		benefits: [
			"Mises à jour et corrections",
			"Nouvelles fonctionnalités",
			"Sites sur mesure ou WordPress",
		],
	},
];

export const OFFERS: Offer[] = [FEATURED_OFFER, ...SECONDARY_OFFERS];

export const STEPS = [
	{
		title: "Échange",
		text: "Un premier appel de 30 minutes pour comprendre votre besoin.",
	},
	{
		title: "Devis",
		text: "Une proposition claire : périmètre, délais et prix.",
	},
	{
		title: "Réalisation",
		text: "Des points réguliers et des livraisons fréquentes, jusqu'à la mise en ligne.",
	},
];
