import { createFileRoute, redirect } from "@tanstack/react-router";

// Ancien chapitre Profil, renommé Expérience : on garde l'URL pour les liens
// déjà partagés.
export const Route = createFileRoute("/profil")({
	beforeLoad: () => {
		throw redirect({ to: "/experience", statusCode: 301 });
	},
});
