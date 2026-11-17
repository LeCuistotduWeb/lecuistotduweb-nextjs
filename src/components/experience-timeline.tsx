import { EXPERIENCES } from "#/data/experiences";
import { Reveal, useScrollProgress } from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";

// Chapitre Expérience : frise verticale dont le trait se dessine au fil de la
// lecture (`--scroll-progress`, mode « follow »). Les expériences alternent à
// gauche et à droite du trait sur grand écran.

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";

export function ExperienceTimeline() {
	const progress = useScrollProgress<HTMLOListElement>("follow");
	const count = EXPERIENCES.length;

	return (
		<ol
			ref={progress}
			aria-label="Expériences professionnelles"
			className="relative col-span-full mx-auto flex w-full max-w-5xl flex-col gap-10 py-6 md:gap-16"
		>
			{/* Trait de fond, puis trait qui se remplit avec le scroll */}
			<span
				aria-hidden="true"
				className="absolute top-0 bottom-0 left-3 w-px bg-[#253c59]/15 md:left-1/2 dark:bg-white/15"
			>
				<span className="absolute inset-0 origin-top scale-y-[var(--scroll-progress,1)] bg-linear-to-b from-[#f25353] to-[#e4b962]" />
			</span>

			{EXPERIENCES.map((xp, index) => {
				const right = index % 2 === 1;
				// Le point s'allume quand la pointe du trait l'atteint
				const lit = `clamp(0, calc((var(--scroll-progress, 1) * ${count} - ${index}) * 2), 1)`;
				return (
					<li
						key={`${xp.company}-${xp.period}`}
						className="relative grid pl-10 md:grid-cols-2 md:gap-16 md:pl-0"
					>
						<span
							aria-hidden="true"
							className="absolute top-2 left-3 flex size-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#f25353] bg-[#faf5ec] md:left-1/2 dark:bg-[#121e2a]"
						>
							<span
								className="size-2.5 rounded-full bg-[#f25353]"
								style={{ opacity: lit, scale: lit }}
							/>
						</span>
						<Reveal
							variant="rise"
							className={cn(
								"flex flex-col gap-2",
								right
									? "md:col-start-2"
									: "md:col-start-1 md:items-end md:text-right",
							)}
						>
							<p className="text-sm font-semibold tracking-wide text-[#b52f2f] dark:text-[#ff7a7a]">
								{xp.period}
							</p>
							<h3
								className={`display-title text-2xl font-bold leading-tight md:text-4xl ${STRONG}`}
							>
								{xp.company}
							</h3>
							<p className={`font-semibold ${TEXT}`}>{xp.title}</p>
							{xp.description && (
								<ul
									className={cn(
										"mt-2 flex max-w-md flex-col gap-1.5 text-sm leading-relaxed",
										TEXT,
									)}
								>
									{xp.description.slice(0, 2).map((line) => (
										<li key={line}>{line}</li>
									))}
								</ul>
							)}
						</Reveal>
					</li>
				);
			})}
		</ol>
	);
}
