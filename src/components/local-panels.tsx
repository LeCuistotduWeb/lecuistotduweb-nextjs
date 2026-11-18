import {
	ArrowRight,
	Camera,
	Check,
	FileSpreadsheet,
	MapPin,
	Palette,
	Search,
	Star,
	Type,
} from "lucide-react";
import type { ReactNode } from "react";
import type { ZonePanelId } from "#/data/local-pages";
import { WORKS } from "#/data/works";
import { cn } from "#/lib/utils";
import { ZoneMap } from "./local-showcase";

// Panneau épinglé des pages de zone : son contenu suit l'étape lue du récit
// (carte de la zone, maquette sur mesure, recherche Google locale, références,
// code, application tirée d'un fichier Excel). Tous les
// panneaux sont superposés dans la même cellule de grille et passent de l'un
// à l'autre en fondu ; le cadre garde la hauteur du plus grand.
// Les visuels sont illustratifs : aucune donnée de client réel.

const STRONG = "text-[#253c59] dark:text-white";
const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const LINE = "bg-[#253c59]/10 dark:bg-white/10";

const HEADINGS: Record<ZonePanelId, { eyebrow: string; title: string }> = {
	map: { eyebrow: "Zone d'intervention", title: "Vernon et alentour" },
	design: { eyebrow: "Sur mesure", title: "Votre site, à votre image" },
	google: { eyebrow: "Référencement local", title: "Trouvé sur Google" },
	references: { eyebrow: "Références", title: "Des produits à fort trafic" },
	code: { eyebrow: "Qualité", title: "Un code qui dure" },
	app: { eyebrow: "Applications web", title: "De l'Excel à l'appli" },
};

function Bar({ className }: { className?: string }) {
	return <span className={cn("block h-2 rounded-full", LINE, className)} />;
}

/** Maquette : les ingrédients du client assemblés dans une page */
function DesignPanel() {
	const ingredients: { icon: typeof Palette; label: string }[] = [
		{ icon: Palette, label: "Vos couleurs" },
		{ icon: Camera, label: "Vos photos" },
		{ icon: Type, label: "Vos textes" },
	];
	return (
		<div className="flex flex-col gap-5">
			<ul className="grid grid-cols-3 gap-2">
				{ingredients.map(({ icon: Icon, label }) => (
					<li
						key={label}
						className={`flex items-center justify-center gap-1.5 rounded-full border border-[#d2c4a4] py-1.5 text-xs font-semibold dark:border-[#253c59] ${STRONG}`}
					>
						<Icon aria-hidden="true" className="size-3.5 text-[#f25353]" />
						{label}
					</li>
				))}
			</ul>
			{/* Fenêtre de navigateur */}
			<div className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-[#253c59]/10 ring-1 ring-[#253c59]/10 dark:bg-[#0f1924] dark:ring-white/10">
				<div className="flex items-center gap-1.5 border-b border-[#253c59]/10 px-4 py-2.5 dark:border-white/10">
					{["#f25353", "#e4b962", "#3aa17e"].map((color) => (
						<span
							key={color}
							className="size-2.5 rounded-full"
							style={{ background: color }}
						/>
					))}
					<span
						className={`ml-3 flex-1 truncate rounded-full bg-[#253c59]/5 px-3 py-1 text-[11px] font-medium dark:bg-white/5 ${TEXT}`}
					>
						votre-commerce.fr
					</span>
				</div>
				<div className="flex flex-col gap-4 p-5">
					<div className="flex items-center justify-between">
						<span className="display-title text-base font-bold text-[#7a2f4d] dark:text-[#f0a3bf]">
							Votre commerce
						</span>
						<span className="flex gap-2">
							<Bar className="w-8" />
							<Bar className="w-8" />
							<Bar className="w-8" />
						</span>
					</div>
					<div className="grid grid-cols-[1.2fr_1fr] items-center gap-4">
						<div className="flex flex-col gap-2.5">
							<span className="display-title text-xl leading-tight font-bold text-[#253c59] dark:text-white">
								Une page qui vous ressemble
							</span>
							<Bar className="w-full" />
							<Bar className="w-4/5" />
							<span className="mt-1 w-fit rounded-full bg-[#7a2f4d] px-3 py-1.5 text-[11px] font-semibold text-white">
								Nous contacter
							</span>
						</div>
						<div className="aspect-[4/3] rounded-xl bg-[linear-gradient(135deg,#e4b962,#f25353_60%,#7a2f4d)] opacity-90" />
					</div>
					<div className="grid grid-cols-3 gap-2">
						{[0, 1, 2].map((i) => (
							<div
								key={i}
								className="flex flex-col gap-1.5 rounded-lg bg-[#253c59]/[0.04] p-2.5 dark:bg-white/[0.04]"
							>
								<span className="size-4 rounded-md bg-[#7a2f4d]/20" />
								<Bar className="w-full" />
								<Bar className="w-2/3" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

/** Recherche Google locale : la fiche du commerce en tête */
function GooglePanel() {
	const checks = [
		"Rapide sur mobile",
		"Données structurées",
		"Fiche Google reliée",
	];
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-3 rounded-full bg-white px-4 py-2.5 shadow-md shadow-[#253c59]/10 ring-1 ring-[#253c59]/10 dark:bg-[#0f1924] dark:ring-white/10">
				<Search aria-hidden="true" className="size-4 text-[#4a6a8a]" />
				<span className={`text-sm font-medium ${STRONG}`}>
					restaurant vernon
				</span>
			</div>
			<div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-lg shadow-[#253c59]/10 ring-2 ring-[#f25353]/60 dark:bg-[#0f1924]">
				<div className="flex items-start justify-between gap-3">
					<div className="flex flex-col gap-1">
						<span className="text-xs font-semibold text-[#3aa17e]">
							1er résultat
						</span>
						<span className="display-title text-lg font-bold text-[#253c59] dark:text-white">
							Votre commerce
						</span>
						<span className="flex items-center gap-1" aria-hidden="true">
							{[0, 1, 2, 3, 4].map((i) => (
								<Star
									key={i}
									className="size-3.5 fill-[#e4b962] text-[#e4b962]"
								/>
							))}
						</span>
						<span
							className={`flex items-center gap-1 text-xs font-medium ${TEXT}`}
						>
							<MapPin aria-hidden="true" className="size-3.5" />
							Vernon · Ouvert
						</span>
					</div>
					<div className="aspect-square w-16 shrink-0 rounded-xl bg-[linear-gradient(135deg,#e4b962,#f25353)]" />
				</div>
				<div className="grid grid-cols-3 gap-2">
					{["Site web", "Itinéraire", "Appeler"].map((action) => (
						<span
							key={action}
							className="rounded-full border border-[#253c59]/15 py-1.5 text-center text-[11px] font-semibold text-[#2d6fd0] dark:border-white/15 dark:text-[#7fb0ff]"
						>
							{action}
						</span>
					))}
				</div>
			</div>
			{[0, 1].map((i) => (
				<div key={i} className="flex flex-col gap-2 px-1 opacity-60">
					<Bar className="w-2/5" />
					<Bar className="w-full" />
					<Bar className="w-3/4" />
				</div>
			))}
			<ul className="mt-1 flex flex-wrap gap-2">
				{checks.map((label) => (
					<li
						key={label}
						className={`flex items-center gap-1.5 rounded-full bg-[#f25353]/10 px-3 py-1 text-xs font-semibold dark:bg-[#f25353]/15 ${STRONG}`}
					>
						<Check aria-hidden="true" className="size-3.5 text-[#f25353]" />
						{label}
					</li>
				))}
			</ul>
		</div>
	);
}

/** Références : missions réelles, depuis src/data/works.ts */
function ReferencesPanel() {
	const labels = ["Fnac Darty", "Infogreffe", "Blissim"];
	const works = labels
		.map((label) => WORKS.find((work) => work.label === label))
		.filter((work) => work !== undefined);
	return (
		<ul className="flex flex-col gap-3">
			{works.map((work) => (
				<li
					key={work.label}
					className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-md shadow-[#253c59]/10 ring-1 ring-[#253c59]/10 dark:bg-[#0f1924] dark:ring-white/10"
				>
					<img
						src={work.src.replace("-1280.", "-640.")}
						alt=""
						width={640}
						height={360}
						loading="lazy"
						decoding="async"
						className="aspect-video w-28 shrink-0 rounded-lg object-cover"
					/>
					<span className="flex min-w-0 flex-col gap-0.5">
						<span className="flex flex-wrap items-baseline gap-x-2">
							<span className={`display-title text-lg font-bold ${STRONG}`}>
								{work.label}
							</span>
							{work.details.period && (
								<span className={`text-xs font-semibold tabular-nums ${TEXT}`}>
									{work.details.period}
								</span>
							)}
						</span>
						<span className={`line-clamp-2 text-xs leading-snug ${TEXT}`}>
							{work.description}
						</span>
					</span>
				</li>
			))}
		</ul>
	);
}

/** Code : éditeur illustratif et qualités du code livré */
function CodePanel() {
	const lines: { indent: number; tokens: [string, number][] }[] = [
		{
			indent: 0,
			tokens: [
				["#c678dd", 14],
				["#61afef", 22],
				["#abb2bf", 10],
			],
		},
		{
			indent: 1,
			tokens: [
				["#e5c07b", 16],
				["#abb2bf", 26],
			],
		},
		{
			indent: 1,
			tokens: [
				["#c678dd", 10],
				["#98c379", 30],
			],
		},
		{
			indent: 2,
			tokens: [
				["#61afef", 18],
				["#abb2bf", 12],
				["#d19a66", 8],
			],
		},
		{
			indent: 2,
			tokens: [
				["#abb2bf", 24],
				["#98c379", 18],
			],
		},
		{ indent: 1, tokens: [["#abb2bf", 6]] },
		{ indent: 0, tokens: [["#5c6370", 34]] },
		{
			indent: 0,
			tokens: [
				["#c678dd", 12],
				["#61afef", 20],
				["#abb2bf", 14],
			],
		},
		{
			indent: 1,
			tokens: [
				["#e5c07b", 22],
				["#98c379", 16],
			],
		},
		{ indent: 0, tokens: [["#abb2bf", 6]] },
	];
	return (
		<div className="flex flex-col gap-4">
			<div className="overflow-hidden rounded-2xl bg-[#1e2430] shadow-lg shadow-[#253c59]/20 ring-1 ring-black/10">
				<div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
					{["#f25353", "#e4b962", "#3aa17e"].map((color) => (
						<span
							key={color}
							className="size-2.5 rounded-full"
							style={{ background: color }}
						/>
					))}
					<span className="ml-3 text-[11px] font-medium text-white/50">
						votre-site / src
					</span>
				</div>
				<div className="flex flex-col gap-2.5 p-5">
					{lines.map((line, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: lignes statiques
							key={index}
							className="flex items-center gap-3"
						>
							<span className="w-4 shrink-0 text-right text-[10px] text-white/25 tabular-nums">
								{index + 1}
							</span>
							<span
								className="flex min-w-0 items-center gap-2"
								style={{ paddingLeft: `${line.indent * 1.25}rem` }}
							>
								{line.tokens.map(([color, width], i) => (
									<span
										// biome-ignore lint/suspicious/noArrayIndexKey: jetons statiques
										key={i}
										className="h-2 shrink rounded-full opacity-80"
										style={{ background: color, width: `${width * 3}px` }}
									/>
								))}
							</span>
						</div>
					))}
				</div>
			</div>
			<ul className="flex flex-wrap gap-2">
				{["Propre", "Rapide", "Documenté", "Facile à faire évoluer"].map(
					(label) => (
						<li
							key={label}
							className={`flex items-center gap-1.5 rounded-full bg-[#f25353]/10 px-3 py-1 text-xs font-semibold dark:bg-[#f25353]/15 ${STRONG}`}
						>
							<Check aria-hidden="true" className="size-3.5 text-[#f25353]" />
							{label}
						</li>
					),
				)}
			</ul>
		</div>
	);
}

/** Application : un fichier Excel devenu une interface de gestion */
function AppPanel() {
	const rows = [
		["À livrer", "#e4b962"],
		["Livrée", "#3aa17e"],
		["À relancer", "#f25353"],
		["Livrée", "#3aa17e"],
		["À livrer", "#e4b962"],
		["Livrée", "#3aa17e"],
	] as const;
	return (
		<div className="grid grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1.2fr)] items-center gap-3">
			{/* Feuille Excel */}
			<div className="overflow-hidden rounded-xl bg-white shadow-md shadow-[#253c59]/10 ring-1 ring-[#253c59]/10 dark:bg-[#0f1924] dark:ring-white/10">
				<div className="flex items-center gap-1.5 bg-[#1d7044] px-2.5 py-2 text-[10px] font-semibold text-white sm:px-3 sm:text-[11px]">
					<FileSpreadsheet aria-hidden="true" className="size-3.5 shrink-0" />
					<span className="truncate">commandes.xlsx</span>
				</div>
				<div className="grid grid-cols-3">
					{Array.from({ length: 36 }, (_, i) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: cellules statiques
							key={i}
							className={cn(
								"h-7 border-r border-b border-[#253c59]/10 dark:border-white/10",
								i < 3 && "bg-[#1d7044]/10",
							)}
						/>
					))}
				</div>
			</div>
			<span className="flex size-9 items-center justify-center rounded-full bg-[#f25353] shadow-md shadow-[#f25353]/30">
				<ArrowRight aria-hidden="true" className="size-4 text-white" />
			</span>
			{/* Application */}
			<div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-lg shadow-[#253c59]/10 ring-1 ring-[#253c59]/10 dark:bg-[#0f1924] dark:ring-white/10">
				<div className="flex items-center justify-between">
					<span className={`text-xs font-bold ${STRONG}`}>Commandes</span>
					<span className="rounded-full bg-[#253c59] px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white dark:bg-white dark:text-[#172231]">
						+<span className="hidden sm:inline"> Ajouter</span>
					</span>
				</div>
				<span className="flex items-center gap-1.5 rounded-full bg-[#253c59]/5 px-2.5 py-1 dark:bg-white/5">
					<Search aria-hidden="true" className="size-3 text-[#4a6a8a]" />
					<Bar className="w-16" />
				</span>
				{rows.map(([label, color], index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: lignes statiques
						key={index}
						className="flex items-center gap-2 border-t border-[#253c59]/10 pt-2 dark:border-white/10"
					>
						<span className="size-5 rounded-full bg-[#253c59]/10 dark:bg-white/10" />
						<Bar className="flex-1" />
						<span
							className="rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap"
							style={{ color, background: `${color}1f` }}
						>
							{label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function PanelBody({
	id,
	area,
	reach,
}: {
	id: ZonePanelId;
	area: string[];
	reach?: number;
}) {
	if (id === "design") return <DesignPanel />;
	if (id === "google") return <GooglePanel />;
	if (id === "references") return <ReferencesPanel />;
	if (id === "code") return <CodePanel />;
	if (id === "app") return <AppPanel />;
	return (
		<ZoneMap
			highlight={area}
			reach={reach}
			className="md:w-full md:max-w-none"
		/>
	);
}

function Frame({ children }: { children: ReactNode }) {
	return (
		<div className="relative mx-auto w-full max-w-[34rem] overflow-hidden rounded-[2rem] border border-[#d2c4a4] bg-[#faf5ec]/75 p-6 shadow-xl shadow-[#253c59]/10 backdrop-blur-md lg:p-8 dark:border-[#253c59] dark:bg-[#172231]/75 dark:shadow-black/30">
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-[radial-gradient(#253c59_1px,transparent_1px)] [background-size:18px_18px] opacity-[0.08] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)]"
			/>
			{children}
		</div>
	);
}

function Heading({ id }: { id: ZonePanelId }) {
	const { eyebrow, title } = HEADINGS[id];
	return (
		<div className="relative flex flex-col gap-1">
			<p className="text-xs font-semibold uppercase tracking-widest text-[#b52f2f] dark:text-[#ff7a7a]">
				{eyebrow}
			</p>
			<p className={`display-title text-2xl font-bold lg:text-3xl ${STRONG}`}>
				{title}
			</p>
		</div>
	);
}

/** Panneau épinglé (grand écran) : tous les contenus, celui de l'étape visible */
export function ZonePanels({
	panels,
	active,
	area,
	reach,
}: {
	panels: ZonePanelId[];
	active: ZonePanelId;
	area: string[];
	reach?: number;
}) {
	return (
		<Frame>
			<div className="relative grid">
				{panels.map((id) => (
					<div
						key={id}
						aria-hidden={id !== active}
						className={cn(
							"flex flex-col gap-5 transition-[opacity,translate,scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [grid-area:1/1] motion-reduce:transition-none",
							id === active
								? "translate-y-0 scale-100 opacity-100"
								: "pointer-events-none translate-y-3 scale-[0.98] opacity-0",
						)}
					>
						<Heading id={id} />
						{/* Le cadre garde la hauteur du plus grand panneau : contenu centré */}
						<div className="flex flex-1 flex-col justify-center">
							<PanelBody id={id} area={area} reach={reach} />
						</div>
					</div>
				))}
			</div>
		</Frame>
	);
}

/** Un seul panneau, sans épinglage (mobile, dans l'étape) */
export function ZonePanel({ id, area }: { id: ZonePanelId; area: string[] }) {
	return (
		<Frame>
			<div className="relative flex flex-col gap-5">
				<Heading id={id} />
				<PanelBody id={id} area={area} />
			</div>
		</Frame>
	);
}
