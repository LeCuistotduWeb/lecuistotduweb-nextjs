import { createFileRoute } from "@tanstack/react-router";
import { LocalLandingPage } from "#/components/local-landing-page";
import { localPageHead } from "#/lib/local-head";

const PATH = "/creation-site-internet-vernon";

export const Route = createFileRoute("/creation-site-internet-vernon")({
	head: () => localPageHead(PATH),
	component: () => <LocalLandingPage path={PATH} />,
});
