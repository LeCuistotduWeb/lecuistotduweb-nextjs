import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { siteConfig } from "./config";
import { routeTree } from "./routeTree.gen";

const RANGEO_PREFIX = "/rangeo";

function isRangeoHost(url: URL) {
	return url.hostname.startsWith(siteConfig.rangeo.host);
}

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		// Sur rangeo.lecuistotduweb.fr, l'URL publique « /x » correspond à la
		// route interne « /rangeo/x » (et inversement pour les liens générés).
		rewrite: {
			input: ({ url }) => {
				if (!isRangeoHost(url) || url.pathname.startsWith(RANGEO_PREFIX))
					return;
				url.pathname =
					url.pathname === "/" ? RANGEO_PREFIX : RANGEO_PREFIX + url.pathname;
				return url;
			},
			output: ({ url }) => {
				if (!isRangeoHost(url) || !url.pathname.startsWith(RANGEO_PREFIX))
					return;
				url.pathname = url.pathname.slice(RANGEO_PREFIX.length) || "/";
				return url;
			},
		},
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
