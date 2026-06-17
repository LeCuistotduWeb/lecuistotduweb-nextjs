import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import { EXPERIENCES, PREVIEW_COUNT } from "#/data/experiences";
import { FORMATIONS } from "#/data/formations";
import { trackEvent } from "#/lib/analytics";
import { BentoCard } from "./bento-card";
import CardTitle from "./card-title";

function TimelineItem({
	title,
	subtitle,
	period,
	highlight,
}: {
	title: string;
	subtitle: string;
	period: string;
	highlight?: boolean;
}) {
	return (
		<li className="relative pl-6 pb-6 last:pb-0">
			<span
				className={`absolute -left-1.25 top-1 size-2.5 rounded-full border-2 ${
					highlight
						? "bg-[#f25353] border-[#f25353]"
						: "bg-[#faf5ec] dark:bg-[#121e2a] border-[#d2c4a4] dark:border-[#253c59]"
				}`}
			/>
			<div className="flex items-start justify-between gap-4">
				<div className="flex flex-col gap-0.5">
					<span className="text-[#253c59] dark:text-white font-semibold leading-tight">
						{title}
					</span>
					<span className="text-[#7a95ad] dark:text-[#7a8fa0] text-sm">
						{subtitle}
					</span>
				</div>
				<span className="text-[#93a8be] dark:text-[#556a7a] text-sm font-medium shrink-0 mt-0.5">
					{period}
				</span>
			</div>
		</li>
	);
}

export function ExperiencesCard({ className }: { className?: string }) {
	const [open, setOpen] = useState(false);
	const preview = EXPERIENCES.slice(0, PREVIEW_COUNT);

	return (
		<>
			<BentoCard className={className}>
				<div className="flex flex-col justify-between h-full">
					<div>
						<CardTitle>Expériences et formations</CardTitle>
						<ul className="flex flex-col divide-y divide-[#d2c4a4] dark:divide-[#253c59]">
							{preview.map((xp) => (
								<li
									key={xp.company}
									className="flex items-center justify-between gap-4 py-6 first:pt-0 last:pb-0"
								>
									<div className="flex flex-col gap-0.5">
										<span className="text-[#253c59] dark:text-white font-semibold">
											{xp.title}
										</span>
										<span className="text-[#7a95ad] dark:text-[#7a8fa0] text-sm">
											{xp.company}
										</span>
									</div>
									<span className="text-[#93a8be] dark:text-[#556a7a] text-sm font-medium shrink-0">
										{xp.period}
									</span>
								</li>
							))}
						</ul>
					</div>
					{EXPERIENCES.length > PREVIEW_COUNT && (
						<Button
							variant="outline"
							onClick={() => {
								setOpen(true);
								trackEvent("click_experiences_expand");
							}}
							className="mt-8 self-start"
						>
							Voir tout
							<ArrowUpRight />
						</Button>
					)}
				</div>
			</BentoCard>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-md border-[#d2c4a4] bg-[#faf5ec] dark:border-[#1c2a3a] dark:bg-[#121e2a]">
					<DialogHeader>
						<DialogTitle className="text-[#253c59] dark:text-white">
							Expériences et formations
						</DialogTitle>
					</DialogHeader>

					<div className="flex flex-col gap-6 overflow-y-auto max-h-[70vh] pr-1 pt-2">
						<div>
							<p className="text-xs font-semibold text-[#93a8be] dark:text-[#7a8fa0] uppercase tracking-widest mb-3">
								Expériences
							</p>
							<ol className="relative border-l border-[#d2c4a4] dark:border-[#253c59] ml-2">
								{EXPERIENCES.map((xp) => (
									<TimelineItem
										key={xp.company}
										title={xp.title}
										subtitle={xp.company}
										period={xp.period}
										// highlight={i === 0}
									/>
								))}
							</ol>
						</div>

						<div>
							<p className="text-xs font-semibold text-[#93a8be] dark:text-[#7a8fa0] uppercase tracking-widest mb-3">
								Formations
							</p>
							<ol className="relative border-l border-[#d2c4a4] dark:border-[#253c59] ml-2">
								{FORMATIONS.map((f) => (
									<TimelineItem
										key={f.school}
										title={f.title}
										subtitle={f.school}
										period={f.period}
									/>
								))}
							</ol>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
