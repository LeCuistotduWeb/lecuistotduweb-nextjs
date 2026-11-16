import { ArrowUpRight } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import type { Work } from "#/data/works";
import { trackEvent } from "#/lib/analytics";

const sectionTitle =
	"text-xs font-semibold text-[#93a8be] dark:text-[#7a8fa0] uppercase tracking-widest mb-2";

export function ProjectDetailsDialog({
	work,
	open,
	onOpenChange,
}: {
	work: Work;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const { details } = work;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg border-[#d2c4a4] bg-[#faf5ec] dark:border-[#1c2a3a] dark:bg-[#121e2a]">
				<DialogHeader>
					<DialogTitle className="text-[#253c59] dark:text-white">
						{work.label}
					</DialogTitle>
					{details.period && (
						<p className="text-xs font-medium text-[#8a7560] dark:text-[#7a8fa0]">
							{details.period}
						</p>
					)}
					<DialogDescription className="text-[#4a6a8a] dark:text-[#a1adbc]">
						{details.context}
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-5 overflow-y-auto max-h-[60vh] pr-1">
					<div>
						<h3 className={sectionTitle}>Ce que j'ai fait</h3>
						<ul className="flex flex-col gap-1.5 text-sm text-[#3a5570] dark:text-[#c5d5e5]">
							{details.contributions.map((item) => (
								<li key={item} className="flex gap-2">
									<span
										aria-hidden="true"
										className="mt-2 size-1.5 shrink-0 rounded-full bg-[#f25353]"
									/>
									{item}
								</li>
							))}
						</ul>
					</div>

					{details.stack && (
						<div>
							<h3 className={sectionTitle}>Stack</h3>
							<div className="flex flex-wrap gap-2">
								{details.stack.map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 rounded-full bg-[#e6d3ae] border border-[#d2c4a4] text-[#3a5570] dark:bg-[#1c2a3a] dark:border-[#253c59] dark:text-[#c5d5e5] text-xs font-medium"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					)}
				</div>

				{details.url && (
					<a
						href={details.url}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() =>
							trackEvent("click_project_link", { project: work.label })
						}
						className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f25353] px-4 py-2 text-sm font-semibold hover:bg-[#e04444] transition-colors"
					>
						{/* Couleur portée par un span : le style global `a { color }` est hors layer */}
						<span className="text-white">Voir le site</span>
						<ArrowUpRight className="size-4 text-white" aria-hidden="true" />
					</a>
				)}
			</DialogContent>
		</Dialog>
	);
}
