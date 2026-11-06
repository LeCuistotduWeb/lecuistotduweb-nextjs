import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ContactForm } from "#/components/contact-form";

type Search = { agent?: string };

export const Route = createFileRoute("/ai-hello")({
	validateSearch: (search: Record<string, unknown>): Search => ({
		agent:
			typeof search.agent === "string" ? search.agent.slice(0, 100) : undefined,
	}),
	head: () => ({
		meta: [
			{ title: "Hello, agent" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
	component: AiHelloPage,
});

function AiHelloPage() {
	const { agent } = Route.useSearch();
	const isHuman = agent === "human";

	useEffect(() => {
		window.aiAgentSignal?.(agent ?? "unknown", "url");
	}, [agent]);

	return (
		<main className="page-wrap flex min-h-dvh flex-col items-center justify-center gap-6 py-12">
			<div className="flex flex-col gap-2 text-center">
				<h1 className="display-title text-3xl">
					{isHuman ? "🥚 Easter egg trouvé !" : "Merci de ton passage 👋"}
				</h1>
				<p className="text-muted-foreground">
					{isHuman
						? "Ton IA a bien fouillé le site. Laisse-moi un message pour me le dire !"
						: "Ta visite a bien été notée."}
				</p>
			</div>
			{isHuman && (
				<div className="w-full max-w-lg">
					<ContactForm defaultTopic="🥚 Easter egg trouvé" />
				</div>
			)}
		</main>
	);
}
