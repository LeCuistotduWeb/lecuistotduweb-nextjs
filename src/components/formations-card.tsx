import { BentoCard } from "./bento-card";
import { FORMATIONS } from "#/data/formations";

export function FormationsCard({ className }: { className?: string }) {
	return (
		<BentoCard className={className}>
			<h2 className="text-xs font-semibold text-[#93a8be] dark:text-[#7a8fa0] uppercase tracking-widest mb-4">
				Formations
			</h2>
			<ul className="flex flex-col divide-y divide-[#d2c4a4] dark:divide-[#253c59]">
				{FORMATIONS.map((f) => (
					<li
						key={f.school}
						className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
					>
						<div className="flex flex-col gap-0.5">
							<span className="text-[#253c59] dark:text-white font-semibold">
								{f.title}
							</span>
							<span className="text-[#7a95ad] dark:text-[#7a8fa0] text-sm">
								{f.school}
							</span>
						</div>
						<span className="text-[#93a8be] dark:text-[#556a7a] text-sm font-medium shrink-0">
							{f.period}
						</span>
					</li>
				))}
			</ul>
		</BentoCard>
	);
}
