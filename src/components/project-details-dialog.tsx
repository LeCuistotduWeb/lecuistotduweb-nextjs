import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "#/components/ui/dialog";
import { WORK_KINDS, type Work } from "#/data/works";
import { trackEvent } from "#/lib/analytics";

// Étude de cas d'un projet : capture à gauche (en entier, sur un fond flouté
// tiré de la même image), contenu à droite. Empilés sur mobile.

const sectionTitle =
	"mb-3 text-xs font-semibold uppercase tracking-widest text-[#93a8be] dark:text-[#7a8fa0]";

/** Apparition en cascade du contenu à l'ouverture. */
const RISE =
	"animate-[dialog-rise_0.7s_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:var(--d)] motion-reduce:animate-none";
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const CLOSE = "[&>[data-slot=dialog-close]]";

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
			<DialogContent
				className={`grid max-h-[92svh] gap-0 overflow-y-auto rounded-2xl border-[#d2c4a4] bg-[#faf5ec] p-0 sm:max-w-5xl md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:overflow-hidden dark:border-[#1c2a3a] dark:bg-[#121e2a] ${CLOSE}:top-4 ${CLOSE}:right-4 ${CLOSE}:z-10 ${CLOSE}:rounded-full ${CLOSE}:bg-white/90 ${CLOSE}:p-2 ${CLOSE}:text-[#253c59] ${CLOSE}:opacity-100 ${CLOSE}:shadow-md ${CLOSE}:backdrop-blur ${CLOSE}:transition-transform ${CLOSE}:hover:rotate-90 ${CLOSE}:focus:ring-0 ${CLOSE}:focus:ring-offset-0 ${CLOSE}:focus-visible:ring-2 ${CLOSE}:focus-visible:ring-[#f25353]`}
			>
				<div className="relative flex items-center justify-center overflow-hidden bg-[#253c59] p-5 md:p-8">
					{/* Fond : la même capture, floutée et agrandie */}
					<img
						src={work.src.replace("-1280.", "-640.")}
						alt=""
						aria-hidden="true"
						decoding="async"
						className="absolute inset-0 size-full scale-125 object-cover opacity-80 blur-2xl saturate-150"
					/>
					<div
						aria-hidden="true"
						className="absolute inset-0 bg-[#172231]/20"
					/>
					<img
						src={work.src}
						srcSet={work.srcSet}
						sizes="(min-width: 768px) 560px, 100vw"
						alt={`Aperçu du projet ${work.label}`}
						width={640}
						height={400}
						decoding="async"
						className="relative aspect-[16/10] w-full animate-[dialog-cover_0.9s_cubic-bezier(0.16,1,0.3,1)_both] rounded-xl object-cover shadow-2xl shadow-black/30 ring-1 ring-white/20 motion-reduce:animate-none"
					/>
					{work.coverNote && (
						<p className="absolute bottom-3 left-1/2 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-center text-xs font-medium text-white backdrop-blur-sm">
							{work.coverNote}
						</p>
					)}
				</div>

				<div className="flex min-h-0 flex-col gap-6 p-6 md:max-h-[88svh] md:overflow-y-auto md:p-10">
					<div className="flex flex-col gap-3 pr-10">
						<p
							style={delay(80)}
							className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold ${RISE}`}
						>
							<span className="text-[#b52f2f] dark:text-[#ff7a7a]">
								{WORK_KINDS[work.kind]}
							</span>
							{details.period && (
								<span className="tabular-nums text-[#4a6a8a] dark:text-[#a1adbc]">
									{details.period}
								</span>
							)}
						</p>
						<DialogTitle
							style={delay(140)}
							className={`display-title text-4xl leading-[1.05] font-bold text-[#253c59] md:text-5xl dark:text-white ${RISE}`}
						>
							{work.label}
						</DialogTitle>
					</div>

					<DialogDescription
						style={delay(200)}
						className={`text-base leading-relaxed font-medium text-[#4a6a8a] dark:text-[#a1adbc] ${RISE}`}
					>
						{details.context}
					</DialogDescription>

					<div
						style={delay(260)}
						className={`border-t border-[#d2c4a4] pt-6 dark:border-[#253c59] ${RISE}`}
					>
						<h3 className={sectionTitle}>Ce que j'ai fait</h3>
						<ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-[#3a5570] dark:text-[#c5d5e5]">
							{details.contributions.map((item) => (
								<li key={item} className="flex gap-3">
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
						<div style={delay(320)} className={RISE}>
							<h3 className={sectionTitle}>Stack</h3>
							<ul className="flex flex-wrap gap-2">
								{details.stack.map((tech) => (
									<li
										key={tech}
										className="rounded-full border border-[#d2c4a4] bg-[#e6d3ae]/60 px-3 py-1 text-xs font-semibold text-[#3a5570] dark:border-[#253c59] dark:bg-[#1c2a3a] dark:text-[#c5d5e5]"
									>
										{tech}
									</li>
								))}
							</ul>
						</div>
					)}

					{details.url && (
						<a
							href={details.url}
							target="_blank"
							rel="noopener noreferrer"
							style={delay(380)}
							onClick={() =>
								trackEvent("click_project_link", { project: work.label })
							}
							className={`group mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#f25353] px-5 py-2.5 font-semibold shadow-lg shadow-[#f25353]/30 transition-colors hover:bg-[#e04444] ${RISE}`}
						>
							{/* Couleur portée par un span : le style global `a { color }` est hors layer */}
							<span className="text-white">Voir le site</span>
							<ArrowUpRight
								className="size-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								aria-hidden="true"
							/>
						</a>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
