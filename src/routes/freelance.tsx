import { createFileRoute, redirect } from "@tanstack/react-router";

// Ancien chapitre Freelance, fusionné dans Contact : on garde l'URL pour les
// liens déjà partagés.
export const Route = createFileRoute("/freelance")({
	beforeLoad: () => {
		throw redirect({ to: "/contact", statusCode: 301 });
	},
});
