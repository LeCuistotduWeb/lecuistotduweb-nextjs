import { getCalApi } from "@calcom/embed-react";
import { siteConfig } from "#/config";
import { trackEvent } from "#/lib/analytics";

const { calLink } = siteConfig.contact;

/** Lien Cal.com public, ou undefined si la prise de RDV n'est pas configurée. */
export const bookingUrl = calLink ? `https://cal.com/${calLink}` : undefined;

// Calendrier Cal.com en popup ; le script n'est chargé qu'au clic. Sans JS
// ou si le chargement échoue, le lien ouvre Cal.com dans un nouvel onglet.
export async function openBooking(
	event: React.MouseEvent<HTMLAnchorElement>,
	source: string,
) {
	trackEvent("click_booking", { source });
	event.preventDefault();
	const href = event.currentTarget.href;
	if (!calLink) return;
	try {
		const cal = await getCalApi();
		const dark = document.documentElement.classList.contains("dark");
		cal("ui", {
			theme: dark ? "dark" : "light",
			cssVarsPerTheme: {
				light: { "cal-brand": "#d93a3a" },
				dark: { "cal-brand": "#f25353" },
			},
		});
		cal("modal", { calLink, config: { layout: "month_view" } });
	} catch {
		window.open(href, "_blank", "noopener,noreferrer");
	}
}
