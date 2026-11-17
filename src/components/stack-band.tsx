import { Link } from "@tanstack/react-router";
import {
	ArrowUpRight,
	Code2,
	FlaskConical,
	type LucideIcon,
	PenTool,
	Server,
	Sparkles,
} from "lucide-react";
import { SKILL_GROUPS } from "#/data/skills";
import { trackEvent } from "#/lib/analytics";
import { Reveal, RevealWords } from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";

// Fin du chapitre Expérience : l'IA puis la stack, en deux bandes de chips pleine
// largeur qui défilent lentement en boucle, en sens inverse (tout finit par
// passer à l'écran ; pause au survol). Chaque domaine est annoncé par une
// étiquette. Animations réduites : chips simplement disposées en lignes.
// En-tête centré ; lien vers le CV sous les bandes.

type Group = (typeof SKILL_GROUPS)[number];

const ICONS: Record<Group["id"], LucideIcon> = {
	ai: Sparkles,
	front: Code2,
	back: Server,
	tests: FlaskConical,
	tools: PenTool,
};

/** Mises en avant : toute l'IA (le plus demandé) et le cœur React / Next.js */
const MAIN = new Set<string>([
	...(SKILL_GROUPS.find((group) => group.id === "ai")?.items ?? []),
	"ReactJs",
	"NextJs",
	"TypeScript",
	"Node.js",
]);

const pick = (...ids: Group["id"][]) =>
	SKILL_GROUPS.filter((group) => ids.includes(group.id));

const ROWS: { groups: Group[]; duration: string; reverse?: boolean }[] = [
	{ groups: pick("ai", "front"), duration: "50s" },
	{ groups: pick("back", "tests", "tools"), duration: "45s", reverse: true },
];

function Segment({ group }: { group: Group }) {
	const Icon = ICONS[group.id];
	const ai = group.id === "ai";
	return (
		<>
			<li
				className={cn(
					"inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-lg md:text-base",
					ai
						? "bg-linear-to-br from-[#f25353] to-[#e4b962] shadow-[#f25353]/25"
						: "bg-linear-to-br from-[#253c59] to-[#16253a] shadow-[#253c59]/20 dark:border dark:border-white/15 dark:from-[#1f3550] dark:to-[#0f1824]",
				)}
			>
				<Icon aria-hidden="true" className="size-4" />
				{group.label}
			</li>
			{group.items.map((skill) => {
				const main = MAIN.has(skill);
				return (
					<li
						key={skill}
						className={cn(
							"inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold whitespace-nowrap backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#f25353]/60 md:text-base",
							ai
								? "border-[#f25353]/40 bg-[#faf5ec]/90 text-[#253c59] dark:border-[#f25353]/40 dark:bg-[#1c2a3a]/90 dark:text-white"
								: main
									? "border-[#253c59]/20 bg-[#faf5ec]/90 text-[#253c59] dark:border-white/15 dark:bg-[#1c2a3a]/90 dark:text-white"
									: "border-[#d2c4a4]/80 bg-[#faf5ec]/50 text-[#4a6a8a] dark:border-[#253c59] dark:bg-[#172231]/50 dark:text-[#a1adbc]",
						)}
					>
						{main && (
							<span
								aria-hidden="true"
								className="size-1.5 rounded-full bg-[#f25353]"
							/>
						)}
						{skill}
					</li>
				);
			})}
		</>
	);
}

function Row({ groups, duration, reverse }: (typeof ROWS)[number]) {
	return (
		<div
			className={cn(
				"flex w-max animate-[stack-marquee_var(--duration)_linear_infinite] hover:[animation-play-state:paused]",
				reverse && "[animation-direction:reverse]",
				"motion-reduce:w-full motion-reduce:animate-none",
			)}
			style={{ "--duration": duration } as React.CSSProperties}
		>
			{/* Contenu doublé : la boucle repart sans saut à mi-course */}
			{[0, 1].map((copy) => (
				<ul
					key={copy}
					aria-hidden={copy === 1 || undefined}
					className={cn(
						"flex shrink-0 items-center gap-3 pr-3",
						"motion-reduce:flex-wrap motion-reduce:shrink motion-reduce:pr-0",
						copy === 1 && "motion-reduce:hidden",
					)}
				>
					{groups.map((group) => (
						<Segment key={group.id} group={group} />
					))}
				</ul>
			))}
		</div>
	);
}

export function StackBand() {
	return (
		<section
			aria-labelledby="stack-title"
			className="col-span-full mt-16 md:mt-0"
		>
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center px-1 text-center">
				<div className="flex flex-col items-center gap-3">
					<Reveal
						as="p"
						variant="fade"
						className="text-xs font-semibold uppercase tracking-widest text-[#b52f2f] md:text-sm dark:text-[#ff7a7a]"
					>
						Stack & IA
					</Reveal>
					<RevealWords
						as="h3"
						id="stack-title"
						text="L'IA et les outils avec lesquels je conçois, teste et livre au quotidien."
						delay={100}
						className="display-title max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight text-[#253c59] text-balance md:text-5xl dark:text-white"
					/>
				</div>
			</div>

			<Reveal
				variant="fade"
				delay={250}
				className="mx-[calc(50%-50vw)] mt-8 flex flex-col gap-3 overflow-hidden py-2 md:mt-12 md:gap-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:mx-auto motion-reduce:max-w-7xl motion-reduce:[mask-image:none]"
			>
				{ROWS.map((row) => (
					<Row key={row.duration} {...row} />
				))}
			</Reveal>

			<div className="mt-8 flex justify-center md:mt-12">
				<Reveal variant="fade" delay={350}>
					<Link
						to="/cv"
						onClick={() => trackEvent("click_cv")}
						className="group inline-flex items-center gap-2 rounded-full bg-[#253c59] px-5 py-2.5 text-sm font-semibold shadow-lg shadow-[#253c59]/20 transition-colors hover:bg-[#1c2f47] dark:bg-white dark:hover:bg-[#e6ecf2]"
					>
						<span className="text-white dark:text-[#253c59]">Voir mon CV</span>
						<ArrowUpRight
							aria-hidden="true"
							className="size-4 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#253c59]"
						/>
					</Link>
				</Reveal>
			</div>
		</section>
	);
}
