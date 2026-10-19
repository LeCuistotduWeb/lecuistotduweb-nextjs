import { siteConfig } from "#/config";

export function getFreelanceStatusLabel() {
	const { freelance } = siteConfig;
	if (freelance.status === "unavailable") return "Indisponible pour le moment";

	if (freelance.availableFrom) {
		const date = new Date(`${freelance.availableFrom}T00:00:00Z`);
		if (date.getTime() > Date.now()) {
			const formatted = new Intl.DateTimeFormat("fr-FR", {
				day: "numeric",
				month: "long",
				year: "numeric",
				timeZone: "UTC",
			}).format(date);
			return `Disponible à partir du ${formatted}`;
		}
	}

	return "Disponible";
}
