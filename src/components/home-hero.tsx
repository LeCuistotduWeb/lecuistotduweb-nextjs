import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Award,
	CalendarDays,
	Code2,
	MapPin,
	Server,
} from "lucide-react";
import { siteConfig } from "#/config";
import { trackEvent } from "#/lib/analytics";
import { bookingUrl, openBooking } from "#/lib/booking";
import {
	Reveal,
	RevealWords,
	useParallax,
} from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import { FreelanceStatusBadge } from "./freelance-status-badge";
import { OrbitAvatar } from "./orbit-avatar";

// Hero de l'accueil : accroche en grand, avatar orbital (cible du vol de
// l'avatar à la fin de l'écran de chargement) et pastilles flottantes.

const CHIPS = [
	{ icon: Code2, label: "React / Next.js", className: "top-[6%] -left-[12%]" },
	{
		icon: Server,
		label: "Node.js · TypeScript",
		className: "top-[24%] -right-[16%]",
	},
	{
		icon: Award,
		label: "8 ans d'expérience",
		className: "bottom-[20%] -left-[18%]",
	},
	{ icon: MapPin, label: "Vernon (27)", className: "bottom-[4%] -right-[6%]" },
];

export function HomeHero() {
	const avatarParallax = useParallax<HTMLDivElement>(-0.08);

	return (
		<div className="mx-auto grid w-full max-w-7xl items-center overflow-x-clip py-4 gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-12 lg:gap-20">
			<div className="flex flex-col gap-6 md:gap-8">
				<Reveal variant="fade" delay={100}>
					<FreelanceStatusBadge />
				</Reveal>
				<h1 className="flex flex-col gap-4">
					<Reveal
						as="span"
						variant="fade"
						delay={150}
						className="text-sm font-semibold uppercase tracking-widest text-[#b52f2f] md:text-base dark:text-[#ff7a7a]"
					>
						{siteConfig.name} · Développeur web freelance à{" "}
						{siteConfig.local.city}
					</Reveal>
					<RevealWords
						as="span"
						text="Du web fait maison, servi avec soin."
						delay={250}
						className="display-title text-5xl font-bold leading-[1.02] text-[#253c59] text-balance md:text-6xl lg:text-7xl 2xl:text-8xl dark:text-white"
					/>
				</h1>
				<Reveal
					as="p"
					variant="rise"
					delay={600}
					className="max-w-2xl text-lg font-medium leading-relaxed text-[#4a6a8a] md:text-xl dark:text-[#a1adbc]"
				>
					Je conçois et fais évoluer vos applications web, du front-end React /
					Next.js au back-end Node.js, jusqu'à la mise en production. Plus de 8
					ans d'expérience, dont Fnac Darty et Infogreffe : en renfort de votre
					équipe, en projet clé en main, ou pour le site de votre commerce dans
					l'Eure.
				</Reveal>
				<Reveal
					variant="rise"
					delay={750}
					className="flex flex-wrap items-center gap-3"
				>
					{bookingUrl && (
						<a
							href={bookingUrl}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(event) => openBooking(event, "hero")}
							className="inline-flex items-center gap-2 rounded-full bg-[#f25353] px-6 py-3 font-semibold shadow-lg shadow-[#f25353]/30 transition-colors hover:bg-[#e04444]"
						>
							<CalendarDays aria-hidden="true" className="size-4 text-white" />
							<span className="text-white">Discutons de votre projet</span>
						</a>
					)}
					<Link
						to="/"
						hash="projets"
						resetScroll={false}
						hashScrollIntoView={false}
						onClick={() => trackEvent("click_hero_projects")}
						className="group inline-flex items-center gap-2 rounded-full border border-[#253c59]/25 px-6 py-3 font-semibold transition-colors hover:bg-[#253c59]/5 dark:border-white/25 dark:hover:bg-white/10"
					>
						<span className="text-[#253c59] dark:text-white">
							Voir mes réalisations
						</span>
						<ArrowRight
							aria-hidden="true"
							className="size-4 text-[#253c59] transition-transform group-hover:translate-x-0.5 dark:text-white"
						/>
					</Link>
				</Reveal>
			</div>

			<div className="relative order-first flex justify-center md:order-none">
				<div
					aria-hidden="true"
					className="absolute top-1/2 left-1/2 size-[110%] max-w-[34rem] -translate-1/2 rounded-full bg-[radial-gradient(circle,#f2535333,transparent_65%)] blur-2xl"
				/>
				<div ref={avatarParallax} className="relative">
					{/* Pas de révélation : l'avatar de l'écran de chargement atterrit ici */}
					<div data-avatar-target>
						<OrbitAvatar
							size={380}
							text="LE CUISTOT DU WEB"
							repeat={2}
							className="max-md:size-56! md:max-lg:size-80!"
						/>
					</div>
					<ul aria-hidden="true" className="hidden xl:block">
						{CHIPS.map(({ icon: Icon, label, className }, index) => (
							<li
								key={label}
								className={cn(
									"absolute flex items-center gap-2 whitespace-nowrap rounded-full border border-[#d2c4a4] bg-[#faf5ec]/90 px-4 py-2 text-sm font-semibold text-[#253c59] shadow-lg shadow-[#253c59]/10 backdrop-blur-sm animate-[hero-float_6s_ease-in-out_infinite] motion-reduce:animate-none dark:border-[#253c59] dark:bg-[#172231]/90 dark:text-white",
									className,
								)}
								style={{ animationDelay: `${index * -1.5}s` }}
							>
								<Icon className="size-4 text-[#f25353]" />
								{label}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
