import { createFileRoute } from "@tanstack/react-router";
import { RealisationsPage } from "#/components/realisations-page";
import { siteConfig } from "#/config";
import { WORKS } from "#/data/works";
import { jsonLdScript, structuredData } from "#/lib/structured-data";

const PATH = "/realisations";
const PAGE_URL = `${siteConfig.url}${PATH}`;
const TITLE = `Réalisations — ${siteConfig.name}`;
const DESCRIPTION = `Tous les projets de ${siteConfig.name}, développeur web freelance : missions pour Fnac Darty et Infogreffe, e-commerce, SaaS, sites vitrines et portfolios.`;
const OG_IMAGE = `${siteConfig.url}/og-image.png`;

// JSON-LD : page de collection et liste des projets
const pageGraph = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "CollectionPage",
			"@id": `${PAGE_URL}#webpage`,
			url: PAGE_URL,
			name: TITLE,
			description: DESCRIPTION,
			inLanguage: "fr-FR",
			mainEntity: { "@id": `${PAGE_URL}#works` },
		},
		{
			"@type": "ItemList",
			"@id": `${PAGE_URL}#works`,
			itemListElement: WORKS.map((work, index) => ({
				"@type": "ListItem",
				position: index + 1,
				item: {
					"@type": "CreativeWork",
					name: work.label,
					description: work.description,
					image: `${siteConfig.url}${work.src}`,
					...(work.details.url && { url: work.details.url }),
				},
			})),
		},
	],
};

export const Route = createFileRoute("/realisations")({
	head: () => ({
		meta: [
			{ title: TITLE },
			{ name: "description", content: DESCRIPTION },
			{ property: "og:title", content: TITLE },
			{ property: "og:description", content: DESCRIPTION },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: PAGE_URL },
			{ property: "og:locale", content: "fr_FR" },
			{ property: "og:image", content: OG_IMAGE },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: TITLE },
			{ name: "twitter:description", content: DESCRIPTION },
			{ name: "twitter:image", content: OG_IMAGE },
		],
		links: [{ rel: "canonical", href: PAGE_URL }],
		scripts: [structuredData(), jsonLdScript(pageGraph)],
	}),
	component: RealisationsPage,
});
