import { siteConfig } from "#/config";
import { getLocalPage } from "#/data/local-pages";
import {
	areaServedNodes,
	jsonLdScript,
	serviceId,
	structuredData,
} from "#/lib/structured-data";

const OG_IMAGE = `${siteConfig.url}/og-image.png`;

// <head> d'une page locale : balises SEO + JSON-LD (Service, FAQ)
export function localPageHead(path: string) {
	const page = getLocalPage(path);
	const url = `${siteConfig.url}${page.path}`;

	const pageGraph = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": `${url}#webpage`,
				url,
				name: page.title,
				description: page.description,
				inLanguage: "fr-FR",
				about: { "@id": `${url}#service` },
			},
			{
				"@type": "Service",
				"@id": `${url}#service`,
				name: page.serviceName,
				serviceType: page.serviceName,
				description: page.description,
				url,
				provider: { "@id": serviceId },
				areaServed: areaServedNodes(page.area),
			},
			{
				"@type": "FAQPage",
				"@id": `${url}#faq`,
				mainEntity: page.faq.map(({ question, answer }) => ({
					"@type": "Question",
					name: question,
					acceptedAnswer: { "@type": "Answer", text: answer },
				})),
			},
		],
	};

	return {
		meta: [
			{ title: page.title },
			{ name: "description", content: page.description },
			{ property: "og:title", content: page.title },
			{ property: "og:description", content: page.description },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: url },
			{ property: "og:locale", content: "fr_FR" },
			{ property: "og:image", content: OG_IMAGE },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: page.title },
			{ name: "twitter:description", content: page.description },
			{ name: "twitter:image", content: OG_IMAGE },
		],
		links: [{ rel: "canonical", href: url }],
		scripts: [structuredData(), jsonLdScript(pageGraph)],
	};
}
