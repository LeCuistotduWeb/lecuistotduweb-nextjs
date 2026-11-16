import { siteConfig } from "#/config";
import { OFFERS } from "#/data/offers";

// Données structurées schema.org (JSON-LD) : aident les moteurs de recherche
// à comprendre qui est derrière le site et ce qui est proposé.
const personId = `${siteConfig.url}/#person`;
const { calLink } = siteConfig.contact;
const bookingUrl = calLink ? `https://cal.com/${calLink}` : undefined;

export function structuredData() {
	const graph = [
		{
			"@type": "Person",
			"@id": personId,
			name: siteConfig.name,
			alternateName: siteConfig.alias,
			jobTitle: siteConfig.role,
			url: siteConfig.url,
			email: `mailto:${siteConfig.email}`,
			image: `${siteConfig.url}/lcdw-avatar.png`,
			address: {
				"@type": "PostalAddress",
				addressLocality: "Vernon",
				addressRegion: "Normandie",
				addressCountry: "FR",
			},
			knowsAbout: [
				"React",
				"Next.js",
				"TypeScript",
				"Node.js",
				"Design System",
				"Performance web",
				"Accessibilité",
				"WordPress",
			],
			sameAs: [
				siteConfig.social.github,
				siteConfig.social.linkedin,
				siteConfig.social.malt,
			].filter(Boolean),
		},
		{
			"@type": "ProfessionalService",
			"@id": `${siteConfig.url}/#service`,
			name: `${siteConfig.alias} — ${siteConfig.name}`,
			url: `${siteConfig.url}/offre`,
			description: siteConfig.description,
			image: `${siteConfig.url}/og-image.png`,
			email: siteConfig.email,
			founder: { "@id": personId },
			areaServed: { "@type": "Country", name: "France" },
			priceRange: "Sur devis",
			...(bookingUrl && {
				potentialAction: {
					"@type": "ReserveAction",
					target: bookingUrl,
					name: "Réserver un appel",
				},
			}),
			hasOfferCatalog: {
				"@type": "OfferCatalog",
				name: "Offre freelance",
				itemListElement: OFFERS.map((offer) => ({
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: offer.title,
						description: offer.text,
					},
				})),
			},
		},
	];

	return {
		type: "application/ld+json",
		// `<` échappé : le JSON ne peut pas fermer la balise <script>
		children: JSON.stringify({
			"@context": "https://schema.org",
			"@graph": graph,
		}).replace(/</g, "\\u003c"),
	};
}
