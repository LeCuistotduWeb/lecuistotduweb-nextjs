import { siteConfig } from "#/config";
import { Reveal, RevealWords } from "#/lib/scroll-animations/react";
import { AiCard } from "./ai-card";
import { BentoCard } from "./bento-card";

// Cascade interne : nom mot par mot, puis rôle, bio et carte IA, pendant que
// la carte elle-même monte (voir Item dans chapters.tsx).
export function BioCard({ className }: { className?: string }) {
	return (
		<BentoCard
			className={`flex flex-col gap-6 md:gap-8 md:p-10 ${className ?? ""}`}
			as="header"
		>
			<div>
				<RevealWords
					as="h1"
					text={siteConfig.alias}
					delay={200}
					className="text-3xl font-bold text-[#253c59] dark:text-white tracking-tight"
				/>
				<Reveal
					as="p"
					variant="fade"
					delay={450}
					className="text-[#f25353] font-medium mt-2"
				>
					{siteConfig.role}
				</Reveal>
			</div>
			<Reveal
				as="p"
				variant="fade"
				delay={600}
				className="text-[#4a6a8a] dark:text-[#a1adbc] leading-relaxed md:leading-loose font-medium"
			>
				{siteConfig.bio}
			</Reveal>
			<Reveal variant="rise" delay={750}>
				<AiCard />
			</Reveal>
		</BentoCard>
	);
}
