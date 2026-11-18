import { type ReactNode, useEffect, useRef, useState } from "react";
import { siteConfig } from "#/config";
import {
	Reveal,
	RevealWords,
	useStartScrollAnimations,
} from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import { LocalFooter, SiteHeader } from "./site-chrome";

// Gabarit des pages légales (mentions légales, confidentialité) : même DA
// éditoriale que les pages locales, mais sobre et lisible. Sommaire collant à
// gauche sur grand écran, sections séparées par des filets.

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG_TEXT = "text-[#253c59] dark:text-white";
const EYEBROW =
	"text-xs font-semibold uppercase tracking-widest text-[#b52f2f] dark:text-[#ff7a7a]";
const RULE = "border-t border-[#d2c4a4] dark:border-[#253c59]";

export type LegalSection = { id: string; title: string; content: ReactNode };

export function Strong({ children }: { children: ReactNode }) {
	return <strong className={`font-semibold ${STRONG_TEXT}`}>{children}</strong>;
}

export function TextLink({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) {
	const external = /^https?:/.test(href);
	return (
		<a
			href={href}
			{...(external && { target: "_blank", rel: "noopener noreferrer" })}
			className="font-semibold text-[#b52f2f] underline underline-offset-4 hover:no-underline dark:text-[#ff7a7a]"
		>
			{children}
		</a>
	);
}

/** Liste « libellé : valeur » (identité, hébergeur…) */
export function Facts({ items }: { items: [string, ReactNode][] }) {
	return (
		<dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]">
			{items.map(([label, value]) => (
				<div key={label} className="contents">
					<dt className="text-sm font-semibold uppercase tracking-wide text-[#93a8be] dark:text-[#7a8fa0] sm:pt-0.5">
						{label}
					</dt>
					<dd className={`-mt-2 sm:mt-0 ${STRONG_TEXT}`}>{value}</dd>
				</div>
			))}
		</dl>
	);
}

export function LegalPage({
	eyebrow,
	title,
	intro,
	sections,
}: {
	eyebrow: string;
	title: string;
	intro: ReactNode;
	sections: LegalSection[];
}) {
	useStartScrollAnimations(true);
	return (
		<div className="flex min-h-dvh flex-col">
			<SiteHeader className="max-w-7xl" />
			<main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-24">
				<header className="flex flex-col gap-5 pt-10 pb-14 md:pt-16 md:pb-20">
					<Reveal instant as="p" variant="fade" className={EYEBROW}>
						{eyebrow}
					</Reveal>
					<RevealWords
						instant
						as="h1"
						text={title}
						delay={100}
						className={`display-title max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-balance md:text-7xl ${STRONG_TEXT}`}
					/>
					<Reveal
						instant
						as="div"
						delay={250}
						className={`max-w-2xl text-lg font-medium leading-relaxed ${TEXT}`}
					>
						{intro}
					</Reveal>
					<Reveal instant as="p" variant="fade" delay={350} className="text-sm">
						<span className="text-[#93a8be] dark:text-[#7a8fa0]">
							Dernière mise à jour : {siteConfig.legal.updatedAt}
						</span>
					</Reveal>
				</header>

				<div
					className={cn(
						RULE,
						"grid gap-12 pt-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20",
					)}
				>
					<LegalToc sections={sections} />

					<div className="flex max-w-3xl flex-col">
						{sections.map((section, index) => (
							<section
								key={section.id}
								id={section.id}
								aria-labelledby={`${section.id}-title`}
								className={cn(
									"scroll-mt-8 py-10 first:pt-0",
									index > 0 && RULE,
								)}
							>
								<h2
									id={`${section.id}-title`}
									className={`display-title flex items-baseline gap-4 text-2xl font-semibold leading-tight md:text-3xl ${STRONG_TEXT}`}
								>
									<span
										aria-hidden="true"
										className="font-sans text-sm font-semibold tabular-nums text-[#b52f2f] dark:text-[#ff7a7a]"
									>
										{String(index + 1).padStart(2, "0")}
									</span>
									{section.title}
								</h2>
								<div
									className={`mt-5 flex flex-col gap-4 leading-relaxed [&_li]:pl-1 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:marker:text-[#f25353] ${TEXT}`}
								>
									{section.content}
								</div>
							</section>
						))}
					</div>
				</div>
			</main>
			<LocalFooter className="max-w-7xl" />
		</div>
	);
}

/**
 * Sommaire collant : suit la section lue (repère au tiers haut de l'écran).
 * Une barre rouge glisse le long du filet jusqu'à l'entrée active.
 */
function LegalToc({ sections }: { sections: LegalSection[] }) {
	const [active, setActive] = useState(sections[0]?.id);
	const [bar, setBar] = useState<{ top: number; height: number } | null>(null);
	const items = useRef(new Map<string, HTMLLIElement>());

	useEffect(() => {
		let frame = 0;
		const update = () => {
			frame = 0;
			const line = window.innerHeight * 0.33;
			const atBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 4;
			let current: string | undefined = sections[0]?.id;
			for (const { id } of sections) {
				const el = document.getElementById(id);
				if (el && el.getBoundingClientRect().top <= line) current = id;
			}
			if (atBottom) current = sections.at(-1)?.id ?? current;
			setActive(current);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [sections]);

	useEffect(() => {
		const el = active ? items.current.get(active) : undefined;
		if (el) setBar({ top: el.offsetTop, height: el.offsetHeight });
	}, [active]);

	return (
		<nav aria-label="Sommaire" className="hidden lg:block">
			<div className="sticky top-8 border-l border-[#d2c4a4] dark:border-[#253c59]">
				<span
					aria-hidden="true"
					className={cn(
						"absolute -left-px w-0.5 rounded-full bg-[#f25353] transition-[translate,height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
						bar ? "opacity-100" : "opacity-0",
					)}
					style={{
						height: bar?.height ?? 0,
						translate: `0 ${bar?.top ?? 0}px`,
						top: 0,
					}}
				/>
				<ol className="flex flex-col gap-1 text-sm">
					{sections.map((section, index) => {
						const isActive = section.id === active;
						return (
							<li
								key={section.id}
								ref={(el) => {
									if (el) items.current.set(section.id, el);
									else items.current.delete(section.id);
								}}
							>
								<a
									href={`#${section.id}`}
									aria-current={isActive ? "location" : undefined}
									className="group flex gap-3 py-1.5 pl-4 font-medium"
								>
									<span
										className={cn(
											"w-5 shrink-0 tabular-nums transition-colors duration-300",
											isActive
												? "text-[#d93a3a] dark:text-[#ff7a7a]"
												: "text-[#b52f2f]/60 dark:text-[#ff7a7a]/60",
										)}
									>
										{String(index + 1).padStart(2, "0")}
									</span>
									<span
										className={cn(
											"transition-[color,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
											isActive
												? `translate-x-1 font-semibold ${STRONG_TEXT}`
												: `${TEXT} group-hover:text-[#253c59] dark:group-hover:text-white`,
										)}
									>
										{section.title}
									</span>
								</a>
							</li>
						);
					})}
				</ol>
			</div>
		</nav>
	);
}

/** <head> commun : pages utiles mais sans intérêt en recherche (noindex). */
export function legalHead(path: string, title: string, description: string) {
	const url = `${siteConfig.url}${path}`;
	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ name: "robots", content: "noindex, follow" },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
		],
		links: [{ rel: "canonical", href: url }],
	};
}
