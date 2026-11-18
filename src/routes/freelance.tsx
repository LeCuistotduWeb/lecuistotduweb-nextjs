import { createFileRoute, redirect } from "@tanstack/react-router";

// Ancien chapitre Freelance, remplacé par le chapitre Offre : on garde l'URL pour les
// liens déjà partagés.
export const Route = createFileRoute("/freelance")({
	beforeLoad: () => {
		throw redirect({ to: "/", hash: "offre", statusCode: 301 });
	},
});
