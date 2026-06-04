import { useState } from "react";
import { BioCard } from "#/components/bio-card";
import { ContactCard } from "#/components/contact-card";
import { ContactModal } from "#/components/contact-modal";
import { LinkedInCard } from "#/components/linkedin-card";
import { MissionsCard } from "#/components/missions-card";
import { SocialCard } from "#/components/social-card";
import { StackCard } from "#/components/stack-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const [contactOpen, setContactOpen] = useState(false);

	return (
		<main className="min-h-screen p-4 md:p-10">
			<div className="mx-auto max-w-5xl">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
					<BioCard     className="col-span-2 row-span-2" />
					<StackCard   className="col-span-2" />
					<SocialCard  className="col-span-2" />
					<MissionsCard className="col-span-2 md:col-span-3" />
					<LinkedInCard className="col-span-2 md:col-span-1" />
					<ContactCard className="col-span-2 md:col-span-4" onOpenModal={() => setContactOpen(true)} />
				</div>
			</div>
			<ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
		</main>
	);
}
