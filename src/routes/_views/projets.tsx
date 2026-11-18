import { createFileRoute, redirect } from "@tanstack/react-router";

// Ancienne route du chapitre : les chapitres sont désormais des ancres de
// l'accueil. On garde l'URL pour les liens déjà partagés et indexés.
export const Route = createFileRoute("/_views/projets")({
	beforeLoad: () => {
		throw redirect({ to: "/", hash: "projets", statusCode: 301 });
	},
});
