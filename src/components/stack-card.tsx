import { BentoCard } from "./bento-card";

const STACK = ["HTML5", "CSS3", "SCSS", "Javascript", "Typescript", "ReactJs", "NextJs", "PHP", "Mysql", "Symfony 3/4", "Adobe suite", "Figma", "Wordpress", "NPM", "Vercel", "Git", "PrismaJs", "Storybook"];

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
