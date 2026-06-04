import { useState } from "react";
import { AvatarCard } from "#/components/avatar-card";
import { BioCard } from "#/components/bio-card";
import { LinkedInCard } from "#/components/linkedin-card";
import { ExperiencesCard } from "#/components/experiences-card";
import { SocialCard } from "#/components/social-card";
import { StackCard } from "#/components/stack-card";
import { CvCard } from "#/components/cv-card";
import { createFileRoute } from "@tanstack/react-router";
import ProjectCard from "#/components/project-card";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main className="min-h-screen p-4 md:p-10">
			<div className="mx-auto max-w-6xl">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
					<BioCard         className="col-span-1 sm:col-span-2 md:col-span-3 rise-in" />
					<AvatarCard      className="col-span-1 rise-in [animation-delay:80ms]" />
					<div className="col-span-1 flex flex-col gap-3 rise-in [animation-delay:160ms]">
						<LinkedInCard />
						<CvCard />
					</div>
					<ExperiencesCard className="col-span-1 md:col-span-2 rise-in [animation-delay:240ms]" />
					<div className="col-span-1 flex flex-col gap-3 rise-in [animation-delay:320ms]">
						<StackCard />
						<SocialCard />
					</div>
					<ProjectCard     className="col-span-1 sm:col-span-2 md:col-span-4 row-span-3 rise-in [animation-delay:400ms]" />
				</div>
			</div>
		</main>
	);
}
