import { createFileRoute } from "@tanstack/react-router";
import { PricingPage } from "#/components/pricing-page";
import { siteConfig } from "#/config";
import { FORMULAS } from "#/data/pricing";
import { jsonLdScript, serviceId, structuredData } from "#/lib/structured-data";

const PATH = "/tarifs";
const PAGE_URL = `${siteConfig.url}${PATH}`;
const TITLE = `Tarifs création de site internet à ${siteConfig.local.city} — ${siteConfig.local.businessName}`;
const DESCRIPTION = `Site vitrine dès 1 200 €, maintenance dès 49 €/mois : les tarifs de ${siteConfig.name}, développeur web freelance à ${siteConfig.local.city} (${siteConfig.local.department}). Devis gratuit.`;
const OG_IMAGE = `${siteConfig.url}/og-image.png`;

// JSON-LD : catalogue des formules, rattaché au ProfessionalService du site
const pageGraph = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebPage",
			"@id": `${PAGE_URL}#webpage`,
			url: PAGE_URL,
			name: TITLE,
			description: DESCRIPTION,
			inLanguage: "fr-FR",
			mainEntity: { "@id": `${PAGE_URL}#catalog` },
		},
		{
			"@type": "OfferCatalog",
			"@id": `${PAGE_URL}#catalog`,
			name: "Création de site internet",
			itemListElement: FORMULAS.map((formula) => ({
				"@type": "Offer",
				name: formula.title,
				description: formula.tagline,
				seller: { "@id": serviceId },
				priceSpecification: {
					"@type": "PriceSpecification",
					minPrice: formula.from,
					priceCurrency: "EUR",
				},
			})),
		},
	],
};

export const Route = createFileRoute("/tarifs")({
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
	component: PricingPage,
});
