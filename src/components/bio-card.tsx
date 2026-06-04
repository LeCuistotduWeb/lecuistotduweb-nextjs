import { siteConfig } from "#/config";
import { BentoCard } from "./bento-card";

export function BioCard({ className }: { className?: string }) {
	return (
		<BentoCard className={`flex flex-col gap-5 ${className ?? ""}`}>
			<div className="size-16 rounded-2xl bg-linear-to-br from-[#f25353] to-[#b94e4e] flex items-center justify-center text-white text-2xl font-bold select-none">
				GB
			</div>
			<div>
				<p className="text-xs font-medium text-[#f25353] uppercase tracking-widest mb-1">
					{siteConfig.alias}
				</p>
				<h1 className="text-3xl font-bold text-[#253c59] dark:text-white tracking-tight">
					{siteConfig.name}
				</h1>
				<p className="text-[#f25353] font-medium mt-1">
					{siteConfig.role}
				</p>
			</div>
			<p className="text-[#4a6a8a] dark:text-[#a1adbc] leading-relaxed text-sm">
				{siteConfig.bio}
			</p>
		</BentoCard>
	);
}
