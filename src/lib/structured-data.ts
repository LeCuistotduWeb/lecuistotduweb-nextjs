import { siteConfig } from "#/config";
import { OFFERS } from "#/data/offers";

// Données structurées schema.org (JSON-LD) : aident les moteurs de recherche
// à comprendre qui est derrière le site et ce qui est proposé.
const personId = `${siteConfig.url}/#person`;
export const serviceId = `${siteConfig.url}/#service`;
const { calLink } = siteConfig.contact;
const bookingUrl = calLink ? `https://cal.com/${calLink}` : undefined;
const { local } = siteConfig;

// Adresse sans rue : l'adresse est masquée sur la fiche Google (zone desservie)
const address = {
	"@type": "PostalAddress",
	addressLocality: local.city,
	postalCode: local.postalCode,
	addressRegion: local.region,
	addressCountry: "FR",
};

/** Communes desservies, au format schema.org */
export function areaServedNodes(names: readonly string[] = local.areaServed) {
	return names.map((name) =>
		name === local.department
			? { "@type": "AdministrativeArea", name: `${name} (27)` }
			: { "@type": "City", name },
	);
}

/** Balise <script type="application/ld+json"> pour HeadContent */
export function jsonLdScript(data: unknown) {
	return {
		type: "application/ld+json",
		// `<` échappé : le JSON ne peut pas fermer la balise <script>
		children: JSON.stringify(data).replace(/</g, "\\u003c"),
	};
}

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
			address,
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
			"@id": serviceId,
			// Même nom que la fiche Google Business Profile (cohérence NAP)
			name: local.businessName,
			alternateName: [
				siteConfig.alias,
				`${siteConfig.alias} — ${siteConfig.name}`,
			],
			url: siteConfig.url,
			description: siteConfig.description,
			image: `${siteConfig.url}/og-image.png`,
			logo: `${siteConfig.url}/icon-512.png`,
			email: siteConfig.email,
			founder: { "@id": personId },
			address,
			geo: {
				"@type": "GeoCoordinates",
				latitude: local.geo.latitude,
				longitude: local.geo.longitude,
			},
			areaServed: [
				...areaServedNodes(),
				{ "@type": "AdministrativeArea", name: "Eure (27)" },
				{ "@type": "Country", name: "France" },
			],
			knowsLanguage: "fr",
			priceRange: "Sur devis",
			...(local.googleBusinessUrl && {
				hasMap: local.googleBusinessUrl,
				sameAs: [local.googleBusinessUrl],
			}),
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

	return jsonLdScript({
		"@context": "https://schema.org",
		"@graph": graph,
	});
}
