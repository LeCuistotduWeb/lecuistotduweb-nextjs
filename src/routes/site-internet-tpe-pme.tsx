import { createFileRoute } from "@tanstack/react-router";
import { LocalEditorialPage } from "#/components/local-editorial-page";
import { localPageHead } from "#/lib/local-head";

const PATH = "/site-internet-tpe-pme";

export const Route = createFileRoute("/site-internet-tpe-pme")({
	head: () => localPageHead(PATH),
	component: () => <LocalEditorialPage path={PATH} />,
});
