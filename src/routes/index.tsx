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
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
					<BioCard     className="col-span-3 row-span-1" />
					<AvatarCard  className="col-span-1" />
					<div className="col-span-1 flex flex-col gap-3">
					<LinkedInCard className="col-span-1" />
					<CvCard      className="col-span-1" />
					</div>
					<ExperiencesCard className="col-span-2" />
					<div className="col-span-1 flex flex-col gap-3">
					<StackCard   className="col-span-1" />
					<SocialCard  className="col-span-1" />
					</div>
					<ProjectCard className="col-span-4 row-span-3" />
				</div>
			</div>
		</main>
	);
}
