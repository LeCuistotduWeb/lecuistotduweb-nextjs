import { createFileRoute } from "@tanstack/react-router";
import { LocalEditorialPage } from "#/components/local-editorial-page";
import { localPageHead } from "#/lib/local-head";

const PATH = "/creation-site-internet-vernon";

export const Route = createFileRoute("/creation-site-internet-vernon")({
	head: () => localPageHead(PATH),
	component: () => <LocalEditorialPage path={PATH} />,
});
