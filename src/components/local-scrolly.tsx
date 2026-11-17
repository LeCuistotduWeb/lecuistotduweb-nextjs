import { useEffect, useRef, useState } from "react";
import type { LocalPage, PhoneScreen } from "#/data/local-pages";
import {
	RevealWords,
	useParallax,
	useScrollProgress,
} from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import { PhoneMockup } from "./local-showcase";

// Récit au scroll des pages locales : le téléphone reste épinglé à droite
// pendant que les étapes défilent à gauche, et son écran suit l'étape lue.
// Tout le texte est dans le HTML serveur ; le JS ne fait que la mise en scène.

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";

type Step = NonNullable<LocalPage["scrolly"]>[number];

/** Index de l'étape qui croise le milieu de l'écran (-1 : avant la 1re). */
function useActiveStep(count: number) {
	const elements = useRef<(HTMLElement | null)[]>([]);
	const [active, setActive] = useState(-1);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const index = elements.current.indexOf(entry.target as HTMLElement);
					if (entry.isIntersecting) setActive(index);
					// Remonte au-dessus de la 1re étape : retour à l'écran d'accueil
					else if (index === 0 && entry.boundingClientRect.top > 0)
						setActive(-1);
				}
			},
			{ rootMargin: "-50% 0px -50% 0px" },
		);
		for (const element of elements.current.slice(0, count)) {
			if (element) observer.observe(element);
		}
		return () => observer.disconnect();
	}, [count]);

	const register = (index: number) => (element: HTMLElement | null) => {
		elements.current[index] = element;
	};
	return { active, register };
}

export function ScrollyStory({
	steps,
	hero,
	initialScreen,
}: {
	steps: Step[];
	hero: React.ReactNode;
	initialScreen: PhoneScreen;
}) {
	const { active, register } = useActiveStep(steps.length);
	const parallax = useParallax<HTMLDivElement>(0.06);
	const screens = [initialScreen, ...steps.map((step) => step.screen)];
	const current = active < 0 ? initialScreen : steps[active].screen;

	return (
		<div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-x-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-x-20 2xl:grid-cols-2">
			<div className="flex min-w-0 flex-col gap-4 md:gap-6">
				<div className="flex flex-col justify-center md:min-h-[calc(100svh-7rem)]">
					{hero}
				</div>
				<ol className="flex flex-col">
					{steps.map((step, index) => (
						<li
							key={step.title}
							ref={register(index)}
							className={cn(
								"flex flex-col justify-center gap-4 py-10 transition-opacity duration-500 md:min-h-svh md:py-0",
								active === index ? "md:opacity-100" : "md:opacity-30",
							)}
						>
							<p className="display-title text-6xl font-bold text-transparent [-webkit-text-stroke:1.5px_#f25353] md:text-7xl">
								{String(index + 1).padStart(2, "0")}
							</p>
							<RevealWords
								text={step.title}
								className={`display-title text-3xl font-bold leading-[1.05] md:text-6xl lg:text-7xl ${STRONG}`}
							/>
							<p
								className={`max-w-2xl text-lg font-medium leading-relaxed md:text-xl ${TEXT}`}
							>
								{step.text}
							</p>
							{/* Mobile : pas d'épinglage, un téléphone par étape */}
							<PhoneMockup
								screens={[step.screen]}
								active={step.screen}
								className="mt-4 md:hidden"
							/>
						</li>
					))}
				</ol>
			</div>

			<div className="hidden md:block">
				<div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-10">
					<div ref={parallax} className="lg:scale-125 2xl:scale-150">
						<PhoneMockup screens={screens} active={current} />
					</div>
					<ol aria-hidden="true" className="flex gap-2">
						{steps.map((step, index) => (
							<li
								key={step.title}
								className={cn(
									"h-1.5 rounded-full transition-all duration-500",
									active === index
										? "w-8 bg-[#f25353]"
										: "w-1.5 bg-[#253c59]/20 dark:bg-white/20",
								)}
							/>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
}

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
			className="mt-8 grid gap-8 md:grid-cols-4 md:gap-6"
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
