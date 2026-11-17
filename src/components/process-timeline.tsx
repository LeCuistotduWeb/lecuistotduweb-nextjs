import { useScrollProgress } from "#/lib/scroll-animations/react";

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";

/** Frise des étapes qui se dessine au fil du scroll. */
export function ProcessTimeline({
	steps,
	animated,
}: {
	steps: { title: string; text: string }[];
	animated: boolean;
}) {
	const progress = useScrollProgress<HTMLOListElement>();
	const segments = steps.length - 1;
	const level = (index: number, offset = 0) =>
		`calc(var(--scroll-progress, 1) * ${segments} - ${index} + ${offset})`;

	return (
		<ol
			ref={animated ? progress : undefined}
			className="mt-8 grid gap-8 md:grid-cols-[repeat(var(--steps),minmax(0,1fr))] md:gap-6"
			style={{ "--steps": steps.length } as React.CSSProperties}
		>
			{steps.map((step, index) => (
				<li
					key={step.title}
					className="relative flex gap-4 md:flex-col"
					style={{ opacity: `clamp(0.25, ${level(index, 1)}, 1)` }}
				>
					{index < segments && (
						<span
							aria-hidden="true"
							className="absolute top-12 -bottom-8 left-6 w-px bg-[#f25353]/20 md:top-6 md:-right-6 md:bottom-auto md:left-14 md:h-px md:w-auto"
						>
							<span
								className="absolute inset-0 origin-top scale-y-[var(--seg)] bg-[#f25353] md:origin-left md:scale-x-[var(--seg)] md:scale-y-100"
								style={
									{
										"--seg": `clamp(0, ${level(index)}, 1)`,
									} as React.CSSProperties
								}
							/>
						</span>
					)}
					<span
						className="display-title relative flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f25353] text-lg font-bold text-white shadow-lg shadow-[#f25353]/30"
						style={{ scale: `clamp(0.75, ${level(index, 1)}, 1)` }}
					>
						{index + 1}
					</span>
					<div>
						<h3 className={`font-semibold ${STRONG}`}>{step.title}</h3>
						<p className={`mt-1 text-sm leading-relaxed ${TEXT}`}>
							{step.text}
						</p>
					</div>
				</li>
			))}
		</ol>
	);
}
