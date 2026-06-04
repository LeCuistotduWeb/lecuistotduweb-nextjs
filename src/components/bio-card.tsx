import { siteConfig } from "#/config";
import { BentoCard } from "./bento-card";

export function BioCard({ className }: { className?: string }) {
	return (
		<BentoCard className={`flex flex-col gap-5 ${className ?? ""}`}>
			<div>
				<h1 className="text-3xl font-bold text-[#253c59] dark:text-white tracking-tight">
					{siteConfig.alias}
				</h1>
				<p className="text-[#f25353] font-medium mt-1">
					{siteConfig.role}
				</p>
			</div>
			<p className="text-[#4a6a8a] dark:text-[#a1adbc] leading-relaxed font-medium">
				{siteConfig.bio}
			</p>
		</BentoCard>
	);
}
