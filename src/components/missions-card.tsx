import { BentoCard } from "./bento-card";
import { CardTitle } from "./card-title";

const MISSIONS = [
	{
		company: "Fnac Darty",
		period: "2024 — 2025",
		desc: "Développement d'applications web marketplace et optimisation des performances.",
		tags: "React · Next.js · TypeScript",
	},
	{
		company: "Infogreffe",
		period: "2023 — 2024",
		desc: "Intégration de maquettes, amélioration SEO et création d'un constructeur de page.",
		tags: "Next.js · Strapi · SEO",
	},
	{
		company: "Blissim",
		period: "2019 — 2022",
		desc: "Migration vers une PWA et conception d'une application analytics avancée.",
		tags: "React · PWA · Fullstack",
	},
];

export function MissionsCard({ className }: { className?: string }) {
	return (
		<BentoCard className={className}>
			<CardTitle>Missions</CardTitle>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
				{MISSIONS.map((m) => (
					<div
						key={m.company}
						className="flex flex-col gap-2 rounded-xl bg-[#f5efe0] dark:bg-[#1c2a3a] border border-[#d2c4a4] dark:border-[#253c59] hover:border-[#f25353]/50 dark:hover:border-[#f25353]/50 p-4 transition-colors"
					>
						<div className="flex items-start justify-between gap-2">
							<h3 className="text-[#253c59] dark:text-white font-semibold text-sm">
								{m.company}
							</h3>
							<span className="text-[#93a8be] dark:text-[#556a7a] text-[10px] font-medium shrink-0">
								{m.period}
							</span>
						</div>
						<p className="text-[#7a95ad] dark:text-[#7a8fa0] text-xs leading-relaxed flex-1">
							{m.desc}
						</p>
						<p className="text-[#f25353] dark:text-[#f25353]/60 text-[10px] font-medium">
							{m.tags}
						</p>
					</div>
				))}
			</div>
		</BentoCard>
	);
}
