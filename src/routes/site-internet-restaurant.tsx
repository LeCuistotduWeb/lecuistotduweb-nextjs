import { createFileRoute } from "@tanstack/react-router";
import { LocalEditorialPage } from "#/components/local-editorial-page";
import { localPageHead } from "#/lib/local-head";

const PATH = "/site-internet-restaurant";

export const Route = createFileRoute("/site-internet-restaurant")({
	head: () => localPageHead(PATH),
	component: () => <LocalEditorialPage path={PATH} />,
});
