import { createFileRoute } from "@tanstack/react-router";
import { LocalLandingPage } from "#/components/local-landing-page";
import { localPageHead } from "#/lib/local-head";

const PATH = "/site-internet-tpe-pme";

export const Route = createFileRoute("/site-internet-tpe-pme")({
	head: () => localPageHead(PATH),
	component: () => <LocalLandingPage path={PATH} />,
});
