import { SKILLS } from "#/data/skills";
import { BentoCard } from "./bento-card";
import CardTitle from "./card-title";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

const VISIBLE_COUNT = 8;

const skillBadgeClass =
	"px-3 py-1 rounded-full bg-[#e6d3ae] border border-[#d2c4a4] text-[#3a5570] dark:bg-[#1c2a3a] dark:border-[#253c59] dark:text-[#c5d5e5] text-xs font-medium";

export function StackCard({ className }: { className?: string }) {
	const visible = SKILLS.slice(0, VISIBLE_COUNT);
	const remaining = SKILLS.slice(VISIBLE_COUNT);

	return (
		<BentoCard className={className}>
			<CardTitle>Stack</CardTitle>
			<div className="flex flex-wrap gap-2">
				{visible.map((skill) => (
					<span key={skill} className={skillBadgeClass}>
						{skill}
					</span>
				))}
				{remaining.length > 0 && (
					<Dialog>
						<DialogTrigger asChild>
							<button
								type="button"
								className="px-3 py-1 rounded-full border border-dashed border-[#d2c4a4] dark:border-[#253c59] text-[#3a5570] dark:text-[#c5d5e5] text-xs font-medium hover:bg-[#e6d3ae] dark:hover:bg-[#1c2a3a] transition-colors cursor-pointer"
							>
								+{remaining.length} autres
							</button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Toutes les technos</DialogTitle>
							</DialogHeader>
							<div className="flex flex-wrap gap-2 pt-2">
								{SKILLS.map((skill) => (
									<span key={skill} className={skillBadgeClass}>
										{skill}
									</span>
								))}
							</div>
						</DialogContent>
					</Dialog>
				)}
			</div>
		</BentoCard>
	);
}
