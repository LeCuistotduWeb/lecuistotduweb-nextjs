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
import { ContactButtons } from "./contact-actions";
import { ProjectDetailsDialog } from "./project-details-dialog";
import { LocalFooter, SiteHeader } from "./site-chrome";

// Page de toutes les réalisations : un filtre par type de projet et une
// grille éditoriale à deux colonnes décalées (grande capture, type, période,
// nom, description). Un clic ouvre l'étude de cas. Tout le texte est dans le
// HTML serveur.

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";
const WIDTH = "max-w-7xl";
const OUTLINE =
	"display-title font-bold text-transparent [-webkit-text-stroke:1.5px_#f25353]";
const pad = (n: number) => String(n).padStart(2, "0");

type Filter = "tous" | WorkKind;

// Libellés courts : les quatre boutons tiennent sur une ligne en mobile
// (les badges des projets gardent les libellés complets de WORK_KINDS).
const FILTERS: { id: Filter; label: string }[] = [
	{ id: "tous", label: "Tous" },
	{ id: "entreprise", label: "Entreprise" },
	{ id: "freelance", label: "Freelance" },
	{ id: "perso", label: "Perso" },
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
								"hidden text-xs tabular-nums transition-opacity sm:inline",
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

function WorkCard({
	work,
	delay,
	onOpen,
}: {
	work: Work;
	delay: number;
	onOpen: () => void;
}) {
	return (
		<Reveal as="li" delay={delay} className="group/card">
			<button
				type="button"
				onClick={onOpen}
				aria-label={`Voir le projet ${work.label}`}
				className="flex w-full cursor-pointer flex-col gap-5 rounded-3xl text-left transition-opacity duration-500 group-hover/list:opacity-60 hover:opacity-100! focus-visible:opacity-100! focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#f25353]"
			>
				<span className="relative block overflow-hidden rounded-3xl shadow-xl shadow-[#253c59]/10 ring-1 ring-[#253c59]/10 dark:shadow-black/30 dark:ring-white/10">
					<img
						src={work.src}
						srcSet={work.srcSet}
						sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
						alt=""
						width={640}
						height={400}
						loading="lazy"
						decoding="async"
						className="aspect-[16/10] w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04] motion-reduce:transition-none"
					/>
					{/* Flèche qui apparaît au survol (toujours visible au tactile) */}
					<span className="absolute top-4 right-4 flex size-12 scale-75 items-center justify-center rounded-full bg-[#f25353] opacity-0 shadow-lg shadow-black/20 transition-[opacity,scale,rotate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-100 group-hover/card:rotate-45 group-hover/card:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100">
						<ArrowUpRight aria-hidden="true" className="size-5 text-white" />
					</span>
				</span>
				<span className="flex flex-col gap-2 px-1">
					<span className={`text-sm font-semibold ${TEXT}`}>
						<span className="text-[#b52f2f] dark:text-[#ff7a7a]">
							{WORK_KINDS[work.kind]}
						</span>
						{work.details.period && (
							<span className="tabular-nums"> · {work.details.period}</span>
						)}
					</span>
					<span
						className={`display-title text-3xl leading-tight font-bold md:text-4xl ${STRONG}`}
					>
						{/* Soulignement qui se dessine au survol */}
						<span className="bg-[linear-gradient(#f25353,#f25353)] bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:bg-[length:100%_3px]">
							{work.label}
						</span>
					</span>
					<span
						className={`max-w-xl text-base font-medium leading-relaxed ${TEXT}`}
					>
						{work.description}
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

	const works = WORKS.filter(
		(work) => filter === "tous" || work.kind === filter,
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
						<dl className="grid grid-cols-3 gap-4 border-t border-[#d2c4a4] pt-5 dark:border-[#253c59]">
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
						// Clé par filtre : les projets réapparaissent en cascade.
						// Deux colonnes décalées : la droite démarre plus bas.
						key={filter}
						className="group/list mt-4 grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20 lg:gap-x-16 md:pb-32 md:[&>li:nth-child(even)]:[transform:translateY(8rem)]"
					>
						{works.map((work, position) => (
							<WorkCard
								key={work.label}
								work={work}
								delay={(position % 2) * 120}
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
