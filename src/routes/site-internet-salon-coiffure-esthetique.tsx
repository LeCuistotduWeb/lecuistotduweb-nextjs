import { createFileRoute } from "@tanstack/react-router";
import { LocalEditorialPage } from "#/components/local-editorial-page";
import { localPageHead } from "#/lib/local-head";

const PATH = "/site-internet-salon-coiffure-esthetique";

export const Route = createFileRoute(
	"/site-internet-salon-coiffure-esthetique",
)({
	head: () => localPageHead(PATH),
	component: () => <LocalEditorialPage path={PATH} />,
});
