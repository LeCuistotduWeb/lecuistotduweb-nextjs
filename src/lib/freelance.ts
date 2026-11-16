import { siteConfig } from "#/config";

export type Availability = {
	/** Disponible dès maintenant (pastille verte) */
	now: boolean;
	label: string;
};

// Une date de disponibilité future l'emporte sur le statut : en mission,
// « Disponible à partir du 5 janvier 2027 » rassure plus qu'« Indisponible ».
// Une fois la date passée, on repasse automatiquement en « Disponible ».
export function getAvailability(): Availability {
	const { freelance } = siteConfig;

	if (freelance.availableFrom) {
		const date = new Date(`${freelance.availableFrom}T00:00:00Z`);
		if (date.getTime() > Date.now()) {
			const formatted = new Intl.DateTimeFormat("fr-FR", {
				day: "numeric",
				month: "long",
				year: "numeric",
				timeZone: "UTC",
			}).format(date);
			return { now: false, label: `Disponible à partir du ${formatted}` };
		}
		return { now: true, label: "Disponible" };
	}

	if (freelance.status === "unavailable")
		return { now: false, label: "Indisponible pour le moment" };

	return { now: true, label: "Disponible" };
}
