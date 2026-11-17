import {
	CalendarCheck,
	Check,
	Clock,
	Globe,
	MapPin,
	Navigation,
	Phone,
	ShoppingBag,
	Star,
	Users,
	UtensilsCrossed,
} from "lucide-react";
import type { LocalPage, PhoneScreen } from "#/data/local-pages";
import { cn } from "#/lib/utils";

// Illustrations des pages locales : maquette de téléphone (métiers) ou carte
// des communes desservies (zones). Purement décoratives, contenus génériques
// (« Votre restaurant »…) : aucun client ni prix inventé.

export function LocalShowcase({ page }: { page: LocalPage }) {
	if (page.showcase === "map") return <ZoneMap highlight={page.area} />;
	return <PhoneMockup screens={[page.showcase]} active={page.showcase} />;
}

const SCREENS: Record<PhoneScreen, () => React.ReactNode> = {
	menu: () => <MenuScreen />,
	"menu-updated": () => <MenuScreen updated />,
	reservation: () => <ReservationScreen />,
	maps: () => <MapsScreen />,
	booking: () => <BookingScreen />,
	vitrine: () => <VitrineScreen />,
};

/**
 * Téléphone dont l'écran passe en fondu de l'un à l'autre : tous les écrans
 * sont empilés dans la même cellule, seul `active` est visible.
 */
export function PhoneMockup({
	screens,
	active,
	className,
}: {
	screens: PhoneScreen[];
	active: PhoneScreen;
	className?: string;
}) {
	return (
		<PhoneFrame className={className}>
			{screens.map((screen) => (
				<div
					key={screen}
					className={cn(
						"flex flex-col gap-3 transition-all duration-500 ease-out [grid-area:1/1]",
						screen === active
							? "translate-y-0 opacity-100"
							: "pointer-events-none translate-y-4 opacity-0",
					)}
				>
					{SCREENS[screen]()}
				</div>
			))}
		</PhoneFrame>
	);
}

function PhoneFrame({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			aria-hidden="true"
			className={cn("relative mx-auto w-60 shrink-0 select-none", className)}
		>
			<div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[#f25353]/20 blur-2xl dark:bg-[#f25353]/15" />
			<div className="rotate-2 rounded-[2.4rem] border-[7px] border-[#253c59] bg-[#fffaf2] shadow-2xl shadow-[#253c59]/30 transition-transform duration-500 hover:rotate-0 dark:border-[#0d1520] dark:bg-[#1d2a3b]">
				<div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-[#253c59]/20 dark:bg-white/15" />
				<div className="grid min-h-[25rem] p-4 text-[#253c59] dark:text-white">
					{children}
				</div>
			</div>
		</div>
	);
}

function ScreenTitle({ kicker, title }: { kicker: string; title: string }) {
	return (
		<div>
			<p className="text-[10px] font-semibold uppercase tracking-widest text-[#f25353]">
				{kicker}
			</p>
			<p className="display-title text-xl font-bold leading-tight">{title}</p>
		</div>
	);
}

const MUTED = "text-[#4a6a8a] dark:text-[#a1adbc]";

function MenuScreen({ updated = false }: { updated?: boolean }) {
	const dishes = [
		{ name: "Entrée du jour", note: "Produits du marché" },
		{
			name: "Plat du jour",
			note: updated ? "Poisson du marché, beurre blanc" : "Fait maison",
			fresh: updated,
		},
		{ name: "Dessert du chef", note: "Selon la saison" },
	];
	return (
		<>
			<div className="relative h-24 rounded-xl bg-[linear-gradient(135deg,#f25353,#e4b962)] p-3">
				<p className="w-fit rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#253c59]">
					Ouvert ce midi
				</p>
				{updated && (
					<p className="absolute right-2 bottom-2 left-2 flex items-center gap-1.5 rounded-lg bg-[#253c59] px-2 py-1.5 text-[10px] font-semibold text-white shadow-lg">
						<Check className="size-3 text-[#7be0a0]" />
						Plat du jour mis à jour à 11:42
					</p>
				)}
			</div>
			<ScreenTitle kicker="La carte" title="Votre restaurant" />
			<ul className="flex flex-col gap-2">
				{dishes.map((dish) => (
					<li
						key={dish.name}
						className={cn(
							"rounded-lg border px-3 py-2",
							dish.fresh
								? "border-[#f25353] bg-[#f25353]/10"
								: "border-[#253c59]/10 dark:border-white/10",
						)}
					>
						<p className="text-sm font-semibold">{dish.name}</p>
						<p className={cn("text-[11px]", MUTED)}>{dish.note}</p>
					</li>
				))}
			</ul>
			<div className="mt-auto flex gap-2">
				<p className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#f25353] py-2 text-xs font-semibold text-white">
					<CalendarCheck className="size-3.5" />
					Réserver une table
				</p>
				<p className="flex size-8 items-center justify-center rounded-full border border-[#253c59]/20 dark:border-white/20">
					<Phone className="size-3.5" />
				</p>
			</div>
		</>
	);
}

function ReservationScreen() {
	const slots = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
	return (
		<>
			<ScreenTitle kicker="Réserver une table" title="Votre restaurant" />
			<div className="grid grid-cols-2 gap-1 rounded-full bg-[#253c59]/5 p-1 text-xs font-semibold dark:bg-white/10">
				<p className="flex items-center justify-center gap-1 rounded-full bg-white py-1.5 shadow-sm dark:bg-[#253c59]">
					<UtensilsCrossed className="size-3" />
					Sur place
				</p>
				<p
					className={cn("flex items-center justify-center gap-1 py-1.5", MUTED)}
				>
					<ShoppingBag className="size-3" />À emporter
				</p>
			</div>
			<div className="grid grid-cols-2 gap-2 text-xs">
				<p className="rounded-lg border border-[#253c59]/10 px-3 py-2 dark:border-white/10">
					<span className={cn("block text-[10px]", MUTED)}>Date</span>
					<span className="font-semibold">Ce soir</span>
				</p>
				<p className="rounded-lg border border-[#253c59]/10 px-3 py-2 dark:border-white/10">
					<span className={cn("block text-[10px]", MUTED)}>Couverts</span>
					<span className="flex items-center gap-1 font-semibold whitespace-nowrap">
						<Users className="size-3 shrink-0" />2 pers.
					</span>
				</p>
			</div>
			<ul className="grid grid-cols-3 gap-1.5">
				{slots.map((slot) => (
					<li
						key={slot}
						className={cn(
							"rounded-md py-1.5 text-center text-xs font-medium",
							slot === "20:00"
								? "bg-[#253c59] text-white dark:bg-white dark:text-[#253c59]"
								: "bg-[#253c59]/5 dark:bg-white/10",
						)}
					>
						{slot}
					</li>
				))}
			</ul>
			<p className="mt-auto flex items-center justify-center gap-1.5 rounded-full bg-[#f25353] py-2 text-xs font-semibold text-white">
				<CalendarCheck className="size-3.5" />
				Confirmer · 20:00, 2 pers.
			</p>
		</>
	);
}

function MapsScreen() {
	const actions = [
		{ icon: Navigation, label: "Itinéraire" },
		{ icon: Phone, label: "Appeler" },
		{ icon: Globe, label: "Site web" },
		{ icon: CalendarCheck, label: "Réserver" },
	];
	return (
		<>
			<div className="relative -mx-4 -mt-1 h-40 overflow-hidden bg-[#e8efe4] dark:bg-[#22313f]">
				<div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_47%,#fff_47%,#fff_53%,transparent_53%),linear-gradient(0deg,transparent_45%,#fff_45%,#fff_51%,transparent_51%)] bg-[length:80px_70px] opacity-70 dark:opacity-10" />
				<div className="absolute top-0 bottom-0 left-[62%] w-5 -skew-x-12 bg-[#a8cbe8] dark:bg-[#2f4d6b]" />
				<MapPin className="absolute top-12 left-1/2 size-9 -translate-x-1/2 animate-bounce fill-[#f25353] text-[#b52f2f] motion-reduce:animate-none" />
			</div>
			<div>
				<p className="display-title text-lg font-bold leading-tight">
					Votre restaurant
				</p>
				<p className={cn("text-[11px]", MUTED)}>Restaurant · Vernon</p>
				<p className="mt-1 text-[11px] font-semibold text-[#2f9a5a]">
					Ouvert · Ferme à 22:00
				</p>
			</div>
			<ul className="grid grid-cols-4 gap-1">
				{actions.map(({ icon: Icon, label }) => (
					<li key={label} className="flex flex-col items-center gap-1">
						<span className="flex size-8 items-center justify-center rounded-full bg-[#253c59]/5 dark:bg-white/10">
							<Icon className="size-3.5 text-[#1a73e8] dark:text-[#8ab4f8]" />
						</span>
						<span className="text-[9px] font-medium">{label}</span>
					</li>
				))}
			</ul>
			<p
				className={cn(
					"mt-auto rounded-lg bg-[#253c59]/5 p-2 text-[11px] dark:bg-white/10",
					MUTED,
				)}
			>
				Mêmes horaires et même adresse que sur votre site.
			</p>
		</>
	);
}

function BookingScreen() {
	const services = [
		{ name: "Coupe & brushing", time: "45 min", active: true },
		{ name: "Couleur", time: "1 h 30" },
		{ name: "Taille de barbe", time: "30 min" },
	];
	const slots = ["9:30", "10:15", "14:00", "16:45", "17:30", "18:15"];
	return (
		<>
			<ScreenTitle kicker="Prendre rendez-vous" title="Votre salon" />
			<ul className="flex flex-col gap-1.5">
				{services.map((service) => (
					<li
						key={service.name}
						className={cn(
							"flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
							service.active
								? "border-[#f25353] bg-[#f25353]/10 font-semibold"
								: "border-[#253c59]/10 dark:border-white/10",
						)}
					>
						{service.name}
						<span className={cn("flex items-center gap-1 text-[11px]", MUTED)}>
							<Clock className="size-3" />
							{service.time}
						</span>
					</li>
				))}
			</ul>
			<p className="text-xs font-semibold">Jeudi</p>
			<ul className="grid grid-cols-3 gap-1.5">
				{slots.map((slot) => (
					<li
						key={slot}
						className={cn(
							"rounded-md py-1.5 text-center text-xs font-medium",
							slot === "14:00"
								? "bg-[#253c59] text-white dark:bg-white dark:text-[#253c59]"
								: "bg-[#253c59]/5 dark:bg-white/10",
						)}
					>
						{slot}
					</li>
				))}
			</ul>
			<p className="mt-auto rounded-full bg-[#f25353] py-2 text-center text-xs font-semibold text-white">
				Confirmer le rendez-vous
			</p>
		</>
	);
}

function VitrineScreen() {
	const services = ["Conseil et devis", "Réalisation", "Suivi et entretien"];
	return (
		<>
			<div className="flex flex-col gap-2 rounded-xl bg-[#253c59] p-4 text-white dark:bg-[#0d1520]">
				<p className="text-[10px] font-semibold uppercase tracking-widest text-[#ff8a8a]">
					Depuis Vernon
				</p>
				<p className="display-title text-lg font-bold leading-tight">
					Votre entreprise, votre savoir-faire
				</p>
				<p className="w-fit rounded-full bg-[#f25353] px-3 py-1 text-[11px] font-semibold">
					Demander un devis
				</p>
			</div>
			<ScreenTitle kicker="Nos services" title="Ce que nous faisons" />
			<ul className="flex flex-col gap-1.5">
				{services.map((service) => (
					<li
						key={service}
						className="flex items-center gap-2 rounded-lg border border-[#253c59]/10 px-3 py-2 text-sm dark:border-white/10"
					>
						<Star className="size-3.5 text-[#e4b962]" />
						{service}
					</li>
				))}
			</ul>
			<div
				className={cn(
					"mt-auto flex items-center gap-2 rounded-lg bg-[#253c59]/5 p-2 text-[11px] dark:bg-white/10",
					MUTED,
				)}
			>
				<MapPin className="size-3.5 shrink-0 text-[#f25353]" />
				Vernon et alentours · Appelez-nous
			</div>
		</>
	);
}

// Coordonnées approximatives des communes, projetées sur le SVG
// (x ≈ longitude, y ≈ latitude inversée). Carte schématique, pas à l'échelle.
const TOWNS: {
	name: string;
	x: number;
	y: number;
	anchor?: "start" | "end" | "middle";
	dy?: number;
}[] = [
	{ name: "Rouen", x: 40, y: 22, anchor: "start" },
	{ name: "Val-de-Reuil", x: 84, y: 124, anchor: "start" },
	{ name: "Louviers", x: 66, y: 159, anchor: "end" },
	{ name: "Les Andelys", x: 164, y: 140, anchor: "start" },
	{ name: "Gaillon", x: 132, y: 191, anchor: "end" },
	{ name: "Évreux", x: 60, y: 274, anchor: "start" },
	{ name: "Pacy-sur-Eure", x: 153, y: 278, anchor: "middle", dy: 18 },
	{ name: "Giverny", x: 213, y: 242, anchor: "start" },
	{ name: "Bonnières-sur-Seine", x: 231, y: 267, anchor: "middle", dy: 18 },
	{ name: "Mantes-la-Jolie", x: 287, y: 293, anchor: "end", dy: 18 },
];
const VERNON = { x: 194, y: 232 };

function ZoneMap({ highlight }: { highlight: string[] }) {
	const isHot = (name: string) =>
		highlight.includes(name) || highlight.includes("Eure");
	return (
		<figure className="relative mx-auto w-full max-w-80 shrink-0 md:w-80">
			<svg
				viewBox="0 0 320 320"
				role="img"
				aria-label="Carte des communes où j'interviens autour de Vernon"
				className="w-full overflow-visible"
			>
				{[60, 120, 180].map((r) => (
					<circle
						key={r}
						cx={VERNON.x}
						cy={VERNON.y}
						r={r}
						className="fill-none stroke-[#253c59]/15 dark:stroke-white/10"
						strokeDasharray="3 6"
					/>
				))}
				{TOWNS.map((town) => (
					<line
						key={`l-${town.name}`}
						x1={VERNON.x}
						y1={VERNON.y}
						x2={town.x}
						y2={town.y}
						className={cn(
							isHot(town.name)
								? "stroke-[#f25353]/40"
								: "stroke-[#253c59]/10 dark:stroke-white/10",
						)}
						strokeWidth="1"
					/>
				))}
				{TOWNS.map((town) => {
					const hot = isHot(town.name);
					const dx =
						town.anchor === "start" ? 9 : town.anchor === "end" ? -9 : 0;
					return (
						<g key={town.name}>
							<circle
								cx={town.x}
								cy={town.y}
								r={hot ? 5 : 3.5}
								className={
									hot ? "fill-[#f25353]" : "fill-[#4a6a8a] dark:fill-[#a1adbc]"
								}
							/>
							<text
								x={town.x + dx}
								y={town.y + (town.dy ?? 4)}
								textAnchor={town.anchor ?? "start"}
								className={cn(
									"text-[11px] font-semibold",
									hot
										? "fill-[#253c59] dark:fill-white"
										: "fill-[#4a6a8a] dark:fill-[#a1adbc]",
								)}
							>
								{town.name}
							</text>
						</g>
					);
				})}
				<circle
					cx={VERNON.x}
					cy={VERNON.y}
					r="10"
					className="animate-ping fill-[#f25353]/40 [transform-box:fill-box] [transform-origin:center] motion-reduce:hidden"
				/>
				<circle
					cx={VERNON.x}
					cy={VERNON.y}
					r="8"
					className="fill-[#f25353] stroke-[#faf5ec] dark:stroke-[#172231]"
					strokeWidth="3"
				/>
				<text
					x={VERNON.x}
					y={VERNON.y - 16}
					textAnchor="middle"
					className="display-title fill-[#253c59] text-[15px] font-bold dark:fill-white"
				>
					Vernon
				</text>
			</svg>
			<figcaption className={cn("mt-2 text-center text-xs", MUTED)}>
				Basé à Vernon · je me déplace dans l'Eure et alentour
			</figcaption>
		</figure>
	);
}
