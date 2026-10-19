import { createFileRoute } from "@tanstack/react-router";
import { viewHead } from "#/lib/views";

export const Route = createFileRoute("/_views/profil")({
	head: () => viewHead("profil"),
});
