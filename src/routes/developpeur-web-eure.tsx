import { createFileRoute } from "@tanstack/react-router";
import { LocalLandingPage } from "#/components/local-landing-page";
import { localPageHead } from "#/lib/local-head";

const PATH = "/developpeur-web-eure";

export const Route = createFileRoute("/developpeur-web-eure")({
	head: () => localPageHead(PATH),
	component: () => <LocalLandingPage path={PATH} />,
});
