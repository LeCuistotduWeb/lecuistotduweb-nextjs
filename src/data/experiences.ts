export type Experience = {
	title: string;
	company: string;
	/** Format libre : "2023 — présent", "2019 — 2022", etc. */
	period: string;
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
	},
	{
		title: "Développeur front-end",
		company: "FNAC Darty (ESN L'Atelier)",
		period: "2024 — 2025",
	},
	{
		title: "Développeur front-end",
		company: "Infogreffe (ESN L'Atelier)",
		period: "2023 — 2024",
	},
	{
		title: "Développeur web",
		company: "Blissim",
		period: "2019 — 2022",
	},
	{
		title: "Développeur front-end (Stage)",
		company: "Nomad Education",
		period: "2018 — 2019",
	},
	{
		title: "Webdesigner (Stage)",
		company: "Arkade Communication",
		period: "2017",
	},
];

/** Nombre d'expériences affichées dans la card avant le bouton "Voir tout". */
export const PREVIEW_COUNT = 4;
