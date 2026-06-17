export type Project = {
	name: string;
	description: string;
};

export const PROJECTS: Project[] = [
	{
		name: "Mon VDI Assistant",
		description:
			"Outil SaaS simple et intuitif pour centraliser la gestion des clients, des commandes, des produits et des réunions.",
	},
	{
		name: "La classe de Fleur",
		description:
			"Projet pédagogique (site web + chaîne YouTube laclassedefleur) réalisé avec sa conjointe, professeure de français : vidéos courtes pour apprendre le français, méthodologie, et vente d'e-books.",
	},
	{
		name: "Portfolio Marie Jade",
		description:
			"Développement d'un site portfolio sur mesure pour la danseuse Marie Jade Helmlinger.",
	},
	{
		name: "Le Poudrier de Fleur",
		description:
			"Refonte globale et création de l'identité visuelle. Refonte complète du site web (lepoudrierdefleur.fr).",
	},
];
