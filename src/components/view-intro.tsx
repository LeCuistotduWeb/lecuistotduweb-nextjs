import {
	Reveal,
	RevealWords,
	useParallax,
} from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import {
	getView,
	PARCOURS,
	PARCOURS_CONTENT,
	type ParcoursId,
} from "#/lib/views";

// En-tête de chapitre : étape, accroche (mots révélés un à un) et contexte,
// qui flotte légèrement au scroll.
export function ViewIntro({
	view,
	className,
}: {
	view: ParcoursId;
	className?: string;
}) {
	const { headline, text } = PARCOURS_CONTENT[view];
	const step = PARCOURS.indexOf(view) + 1;
	const parallax = useParallax<HTMLDivElement>(0.08);

	return (
		<div ref={parallax} className={cn("flex flex-col gap-3 px-1", className)}>
			<Reveal
				as="p"
				variant="fade"
				className="text-xs font-semibold uppercase tracking-widest text-[#4a6a8a] dark:text-[#a1adbc]"
			>
				<span className="text-[#b52f2f] dark:text-[#ff7a7a]">
					Étape {step} / {PARCOURS.length}
				</span>
				<span aria-hidden="true"> · </span>
				{getView(view).label}
			</Reveal>
			<RevealWords
				as="h2"
				id={`${view}-title`}
				text={headline}
				delay={100}
				className="display-title max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-[#253c59] dark:text-white text-balance"
			/>
			<Reveal
				as="p"
				variant="rise"
				delay={450}
				className="max-w-2xl text-base md:text-lg font-medium leading-relaxed text-[#4a6a8a] dark:text-[#a1adbc]"
			>
				{text()}
			</Reveal>
		</div>
	);
}
