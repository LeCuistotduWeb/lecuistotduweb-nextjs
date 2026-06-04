import { BentoCard } from "./bento-card";

const STACK = [
	"TypeScript",
	"React",
	"Next.js",
	"Node.js",
	"Prisma",
	"PHP",
	"Symfony",
	"MySQL",
	"Storybook",
	"Figma",
];

export function StackCard({ className }: { className?: string }) {
	return (
		<BentoCard className={className}>
			<h2 className="text-xs font-semibold text-[#93a8be] dark:text-[#7a8fa0] uppercase tracking-widest mb-4">
				Stack
			</h2>
			<div className="flex flex-wrap gap-2">
				{STACK.map((tech) => (
					<span
						key={tech}
						className="px-3 py-1 rounded-full bg-[#e6d3ae] border border-[#d2c4a4] text-[#3a5570] dark:bg-[#1c2a3a] dark:border-[#253c59] dark:text-[#c5d5e5] text-xs font-medium"
					>
						{tech}
					</span>
				))}
			</div>
		</BentoCard>
	);
}
