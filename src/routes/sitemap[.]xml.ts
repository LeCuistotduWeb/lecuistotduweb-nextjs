import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "#/config";
import { LOCAL_PAGES } from "#/data/local-pages";
import { VIEWS } from "#/lib/views";

// Plan du site pour les moteurs de recherche, déclaré dans robots.txt.
// Pages des chapitres, pages locales, réalisations et CV ; pas /link (noindex) ni les
// redirections (/profil, /freelance).
const PAGES: { path: string; priority: string }[] = [
	...VIEWS.map((view) => ({
		path: view.path,
		priority: view.path === "/" ? "1.0" : "0.7",
	})),
	...LOCAL_PAGES.map((page) => ({ path: page.path, priority: "0.9" })),
	{ path: "/realisations", priority: "0.8" },
	{ path: "/cv", priority: "0.5" },
];

export function sitemapXml() {
	const urls = PAGES.map(
		({ path, priority }) =>
			`<url><loc>${siteConfig.url}${path === "/" ? "/" : path}</loc><priority>${priority}</priority></url>`,
	).join("");
	return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () =>
				new Response(sitemapXml(), {
					headers: {
						"Content-Type": "application/xml; charset=utf-8",
						"Cache-Control": "public, max-age=3600",
					},
				}),
		},
	},
});
