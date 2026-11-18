import { createFileRoute } from "@tanstack/react-router";
import { LocalEditorialPage } from "#/components/local-editorial-page";
import { localPageHead } from "#/lib/local-head";

const PATH = "/developpeur-web-eure";

export const Route = createFileRoute("/developpeur-web-eure")({
	head: () => localPageHead(PATH),
	component: () => <LocalEditorialPage path={PATH} />,
});
