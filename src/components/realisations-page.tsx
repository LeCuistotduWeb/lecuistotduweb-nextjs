import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { WORK_KINDS, WORKS, type Work, type WorkKind } from "#/data/works";
import { trackEvent } from "#/lib/analytics";
import {
	Reveal,
	RevealWords,
	useStartScrollAnimations,
} from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import { ContactButtons, LocalFooter, SiteHeader } from "./local-landing-page";
import { ProjectDetailsDialog } from "./project-details-dialog";

// Page de toutes les réalisations, en index éditorial : les noms des projets
// en grande typographie, une capture qui se dévoile au survol (souris fine,
// grand écran), un filtre par type de projet. Sur écran tactile, chaque ligne
// a sa capture. Tout le texte est dans le HTML serveur.

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";
const WIDTH = "max-w-7xl";
const OUTLINE =
	"display-title font-bold text-transparent [-webkit-text-stroke:1.5px_#f25353]";
const pad = (n: number) => String(n).padStart(2, "0");

type Filter = "tous" | WorkKind;

const FILTERS: { id: Filter; label: string }[] = [
	{ id: "tous", label: "Tous" },
	{ id: "mission", label: "Missions" },
	{ id: "independant", label: "Indépendants" },
];

const count = (filter: Filter) =>
	filter === "tous"
		? WORKS.length
		: WORKS.filter((work) => work.kind === filter).length;

const YEARS = WORKS.flatMap((work) =>
	(work.details.period?.match(/\d{4}/g) ?? []).map(Number),
);
const FIRST_YEAR = Math.min(...YEARS);

/** Filtre à pilule glissante, comme le menu de l'accueil. */
function FilterBar({
	value,
	onChange,
}: {
	value: Filter;
	onChange: (filter: Filter) => void;
}) {
	const listRef = useRef<HTMLFieldSetElement>(null);
	const [pill, setPill] = useState<{ left: number; width: number } | null>(
		null,
	);

	useLayoutEffect(() => {
		function measure() {
			const button = listRef.current?.querySelector<HTMLElement>(
				`[data-filter="${value}"]`,
			);
			if (button)
				setPill({ left: button.offsetLeft, width: button.offsetWidth });
		}
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [value]);

	return (
		<fieldset
			ref={listRef}
			className="relative flex min-w-0 w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-[#d2c4a4] bg-[#faf5ec]/90 p-1 shadow-sm backdrop-blur-md [scrollbar-width:none] dark:border-[#253c59] dark:bg-[#172231]/90"
		>
			<legend className="sr-only">Filtrer les projets</legend>
			{pill && (
				<span
					aria-hidden="true"
					className="pointer-events-none absolute inset-y-1 rounded-full bg-[#253c59] transition-[left,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none dark:bg-white"
					style={{ left: pill.left, width: pill.width }}
				/>
			)}
			{FILTERS.map(({ id, label }) => {
				const active = id === value;
				return (
					<button
						key={id}
						type="button"
						data-filter={id}
						aria-pressed={active}
						onClick={() => onChange(id)}
						className={cn(
							"relative flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-3 py-2 sm:px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-300",
							active && !pill && "bg-[#253c59] dark:bg-white",
							active
								? "text-white dark:text-[#172231]"
								: "text-[#4a6a8a] hover:text-[#253c59] dark:text-[#a1adbc] dark:hover:text-white",
						)}
					>
						{label}
						<span
							className={cn(
								"text-xs tabular-nums transition-opacity",
								active ? "opacity-70" : "opacity-50",
							)}
						>
							{pad(count(id))}
						</span>
					</button>
				);
			})}
		</fieldset>
	);
}

function WorkRow({
	work,
	index,
	delay,
	onOpen,
}: {
	work: Work;
	index: number;
	delay: number;
	onOpen: () => void;
}) {
	return (
		<Reveal as="li" delay={delay} className="group/row">
			<button
				type="button"
				onClick={onOpen}
				aria-label={`Voir le projet ${work.label}`}
				className="relative grid w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-4 border-b border-[#d2c4a4] py-7 text-left transition-opacity duration-500 group-hover/list:opacity-35 hover:opacity-100! focus-visible:opacity-100! md:grid-cols-[5.5rem_minmax(0,1fr)_auto] md:gap-x-8 md:py-9 dark:border-[#253c59]"
			>
				{/* Trait rouge qui se dessine au survol */}
				<span
					aria-hidden="true"
					className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-[#f25353] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:scale-x-100"
				/>
				<span className={`${OUTLINE} self-start text-3xl md:pt-2 md:text-5xl`}>
					{pad(index + 1)}
				</span>

				<span className="flex min-w-0 flex-col gap-2">
					<span
						className={`display-title text-4xl leading-[1.02] font-bold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-3 md:text-6xl lg:text-7xl ${STRONG}`}
					>
						{work.label}
					</span>
					<span
						className={`max-w-2xl text-base font-medium leading-relaxed md:text-lg ${TEXT}`}
					>
						{work.description}
					</span>
				</span>

				{/* Grand écran à la souris : capture dévoilée en balayage au survol,
				    à droite du nom, sans le couvrir */}
				<span
					aria-hidden="true"
					className="pointer-events-none absolute top-1/2 right-32 z-10 hidden w-56 -translate-y-1/2 overflow-hidden rounded-xl shadow-xl shadow-[#253c59]/25 [clip-path:inset(0_0_0_100%_round_0.75rem)] transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:[clip-path:inset(0_0_0_0_round_0.75rem)] group-has-[:focus-visible]/row:[clip-path:inset(0_0_0_0_round_0.75rem)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:xl:block"
				>
					<img
						src={work.src.replace("-1280.", "-640.")}
						alt=""
						width={640}
						height={400}
						loading="lazy"
						decoding="async"
						className="aspect-[16/10] w-full scale-110 object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:scale-100 motion-reduce:transition-none"
					/>
				</span>
				{/* Capture en ligne : écrans tactiles, mobiles et écrans moyens */}
				<span className="col-span-full overflow-hidden rounded-xl border border-[#d2c4a4] [@media(hover:hover)_and_(pointer:fine)]:xl:hidden dark:border-[#253c59]">
					<img
						src={work.src}
						srcSet={work.srcSet}
						sizes="(min-width: 768px) 80vw, 100vw"
						alt=""
						width={640}
						height={400}
						loading="lazy"
						decoding="async"
						className="aspect-[16/10] w-full object-cover"
					/>
				</span>

				<span className="col-span-full flex items-center justify-between gap-6 md:col-span-1 md:flex-col md:items-end md:justify-center md:gap-4">
					<span
						className={`flex flex-col text-sm font-semibold md:items-end ${TEXT}`}
					>
						<span className="text-[#b52f2f] dark:text-[#ff7a7a]">
							{work.kind === "mission" ? "Mission" : "Indépendant"}
						</span>
						{work.details.period && (
							<span className="tabular-nums">{work.details.period}</span>
						)}
					</span>
					<span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#253c59]/25 transition-[background-color,border-color,rotate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:rotate-45 group-hover/row:border-[#f25353] group-hover/row:bg-[#f25353] md:size-14 dark:border-white/25">
						<ArrowUpRight
							aria-hidden="true"
							className="size-5 text-[#253c59] transition-colors group-hover/row:text-white dark:text-white"
						/>
					</span>
				</span>
			</button>
		</Reveal>
	);
}

export function RealisationsPage() {
	useStartScrollAnimations(true);
	const [filter, setFilter] = useState<Filter>("tous");
	const [details, setDetails] = useState<Work | null>(null);

	const works = WORKS.map((work, index) => ({ work, index })).filter(
		({ work }) => filter === "tous" || work.kind === filter,
	);

	function changeFilter(next: Filter) {
		setFilter(next);
		trackEvent("filter_projects", { filter: next });
	}

	function openDetails(work: Work) {
		setDetails(work);
		trackEvent("open_project_details", { project: work.label });
	}

	return (
		<div className="flex min-h-dvh flex-col">
			<SiteHeader className={WIDTH} />

			<main
				className={`mx-auto flex w-full ${WIDTH} flex-1 flex-col px-4 pb-24`}
			>
				<nav aria-label="Fil d'Ariane" className={`text-sm ${TEXT}`}>
					<ol className="flex flex-wrap items-center gap-1.5">
						<li>
							<Link to="/" className="hover:underline">
								<span className={TEXT}>Accueil</span>
							</Link>
						</li>
						<li aria-hidden="true">/</li>
						<li aria-current="page" className="font-medium">
							Réalisations
						</li>
					</ol>
				</nav>

				<header className="grid gap-8 pt-12 pb-14 md:pt-20 md:pb-20 lg:grid-cols-[auto_minmax(0,22rem)] lg:items-end lg:justify-between lg:gap-12 xl:grid-cols-[auto_minmax(0,28rem)]">
					<div className="flex flex-col gap-5">
						<Reveal
							as="p"
							variant="fade"
							className="text-sm font-semibold uppercase tracking-widest text-[#b52f2f] dark:text-[#ff7a7a]"
						>
							Portfolio · depuis {FIRST_YEAR}
						</Reveal>
						<h1 className="flex items-start gap-3 md:gap-5">
							<RevealWords
								as="span"
								text="Réalisations"
								className={`display-title text-5xl leading-[0.95] font-bold sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl ${STRONG}`}
							/>
							<Reveal
								as="span"
								variant="fade"
								delay={400}
								className={`${OUTLINE} text-2xl sm:text-4xl lg:text-5xl`}
							>
								({pad(WORKS.length)})
							</Reveal>
						</h1>
					</div>
					<Reveal delay={200} className="flex flex-col gap-6">
						<p
							className={`text-lg font-medium leading-relaxed md:text-xl ${TEXT}`}
						>
							Des missions pour des grands comptes comme Fnac Darty ou
							Infogreffe aux sites d'indépendants : chaque projet est pensé,
							construit et livré avec le même soin du détail.
						</p>
						<dl className="grid grid-cols-2 gap-4 border-t border-[#d2c4a4] pt-5 dark:border-[#253c59]">
							{(Object.keys(WORK_KINDS) as WorkKind[]).map((kind) => (
								<div key={kind} className="flex flex-col gap-1">
									<dt className={`text-sm font-medium ${TEXT}`}>
										{WORK_KINDS[kind]}
									</dt>
									<dd
										className={`display-title text-4xl font-bold tabular-nums ${STRONG}`}
									>
										{pad(count(kind))}
									</dd>
								</div>
							))}
						</dl>
					</Reveal>
				</header>

				{/* Filtre collant le long de la liste seulement */}
				<section aria-label="Liste des projets" className="flex flex-col gap-6">
					<div className="sticky top-3 z-20 -mx-1 flex justify-center px-1 md:justify-start">
						<FilterBar value={filter} onChange={changeFilter} />
					</div>
					<p aria-live="polite" className="sr-only">
						{works.length} projets affichés
					</p>
					<ul
						// Clé par filtre : les lignes réapparaissent en cascade
						key={filter}
						className="group/list border-t border-[#d2c4a4] dark:border-[#253c59]"
					>
						{works.map(({ work, index }, position) => (
							<WorkRow
								key={work.label}
								work={work}
								index={index}
								delay={position * 70}
								onOpen={() => openDetails(work)}
							/>
						))}
					</ul>
				</section>

				<Reveal variant="scale" className="mt-20 md:mt-28">
					<section className="relative overflow-hidden rounded-3xl bg-[#253c59] p-8 md:p-14 dark:bg-[#1c2d44]">
						<div
							aria-hidden="true"
							className="absolute -top-24 -right-24 size-80 rounded-full bg-[#f25353]/30 blur-3xl"
						/>
						<div
							aria-hidden="true"
							className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-[#e4b962]/15 blur-3xl"
						/>
						<div className="relative flex flex-col gap-6">
							<p className="text-sm font-semibold uppercase tracking-widest text-[#ff9a9a]">
								Le prochain projet
							</p>
							<h2 className="display-title max-w-3xl text-4xl font-bold leading-[1.05] text-white md:text-6xl">
								Et si le prochain, c'était le vôtre ?
							</h2>
							<p className="max-w-2xl text-lg font-medium leading-relaxed text-[#d5e0ec]">
								Premier échange gratuit de 30 minutes pour en parler. Vous
								recevez ensuite un devis clair, sans engagement.
							</p>
							<ContactButtons source="/realisations" onDark />
						</div>
					</section>
				</Reveal>
			</main>

			<LocalFooter className="max-w-7xl" />

			{details && (
				<ProjectDetailsDialog
					work={details}
					open={details !== null}
					onOpenChange={(open) => {
						if (!open) setDetails(null);
					}}
				/>
			)}
		</div>
	);
}
