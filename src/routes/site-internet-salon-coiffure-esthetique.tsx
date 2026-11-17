import { createFileRoute } from "@tanstack/react-router";
import { LocalLandingPage } from "#/components/local-landing-page";
import { localPageHead } from "#/lib/local-head";

const PATH = "/site-internet-salon-coiffure-esthetique";

export const Route = createFileRoute(
	"/site-internet-salon-coiffure-esthetique",
)({
	head: () => localPageHead(PATH),
	component: () => <LocalLandingPage path={PATH} />,
});
