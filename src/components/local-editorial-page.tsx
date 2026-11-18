import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, MapPin, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig } from "#/config";
import { getLocalPage } from "#/data/local-pages";
import { WORK_KINDS, WORKS } from "#/data/works";
import { trackEvent } from "#/lib/analytics";
import {
	Reveal,
	RevealWords,
	useStartScrollAnimations,
} from "#/lib/scroll-animations/react";
import { cn } from "#/lib/utils";
import { ContactButtons } from "./contact-actions";
import { ScrollyStory } from "./local-scrolly";
import { LocalShowcase, PhoneMockup, ZoneMap } from "./local-showcase";
import { OrbitAvatar } from "./orbit-avatar";
import { ProcessTimeline } from "./process-timeline";
import { LocalFooter, SiteHeader } from "./site-chrome";

// Gabarit éditorial des pages locales, dans la DA de l'accueil : pas de
// cartes, de grands titres précédés d'un sur-titre rouge, des sections
// ouvertes séparées par de simples filets. Seul l'appel final reste un bloc,
// pour ressortir. Tout le contenu est dans le HTML serveur.

const STORY =
	"Avant de devenir développeur en 2017, j'ai travaillé en cuisine professionnelle. J'en ai gardé le goût du travail bien fait, le sens du timing et l'envie de voir le client repartir content. C'est de là que vient LeCuistotduWeb.";

const STEPS = [
	{
		title: "On fait connaissance",
		text: "30 minutes en visio, ou en personne si vous préférez (déplacement possible autour de Vernon), pour comprendre votre activité.",
	},
	{
		title: "Vous recevez un devis",
		text: "Périmètre, délais et prix : clair et sans engagement.",
	},
	{
		title: "Je construis votre site",
		text: "Avec des points réguliers et un aperçu en ligne tout au long du projet.",
	},
	{
		title: "On le met en ligne",
		text: "Et je vous montre comment modifier vos contenus vous-même.",
	},
];

const TEXT = "text-[#4a6a8a] dark:text-[#a1adbc]";
const STRONG = "text-[#253c59] dark:text-white";
const EYEBROW =
	"text-xs font-semibold uppercase tracking-widest text-[#b52f2f] dark:text-[#ff7a7a]";
const RULE = "border-t border-[#d2c4a4] dark:border-[#253c59]";
const H2 = `display-title text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl ${STRONG}`;

/**
 * Section ouverte : sur-titre et titre à gauche, contenu à droite
 * (`stacked` : contenu en pleine largeur sous le titre).
 */
function Section({
	eyebrow,
	title,
	intro,
	aside,
	stacked = false,
	reverse = false,
	children,
}: {
	eyebrow?: string;
	title: string;
	intro?: string;
	/** Élément aligné à droite du titre (lien, bouton) */
	aside?: ReactNode;
	stacked?: boolean;
	/** Titre à droite, contenu à gauche (alterne avec les autres sections) */
	reverse?: boolean;
	children: ReactNode;
}) {
	return (
		<section
			className={cn(
				RULE,
				"grid gap-10 py-20 md:py-28",
				!stacked &&
					(reverse
						? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20"
						: "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20"),
			)}
		>
			<div
				className={cn(
					"flex flex-col gap-4",
					stacked && "md:flex-row md:items-end md:justify-between",
					reverse && "lg:order-2",
				)}
			>
				<div className="flex flex-col gap-4">
					{eyebrow && (
						<Reveal as="p" variant="fade" className={EYEBROW}>
							{eyebrow}
						</Reveal>
					)}
					<RevealWords as="h2" text={title} delay={100} className={H2} />
					{intro && (
						<Reveal
							as="p"
							delay={250}
							className={`max-w-xl text-lg font-medium leading-relaxed ${TEXT}`}
						>
							{intro}
						</Reveal>
					)}
				</div>
				{aside && <Reveal delay={300}>{aside}</Reveal>}
			</div>
			<Reveal delay={200} className="min-w-0">
				{children}
			</Reveal>
		</section>
	);
}

function Hero({ path }: { path: string }) {
	const page = getLocalPage(path);
	const { local } = siteConfig;
	return (
		<header className="flex flex-col gap-6 py-6 md:py-10">
			<Reveal
				as="p"
				variant="fade"
				className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f25353]/10 px-3 py-1 text-sm font-semibold text-[#b52f2f] dark:bg-[#f25353]/15 dark:text-[#ff7a7a]"
			>
				<MapPin aria-hidden="true" className="size-4" />
				Développeur web à {local.city} ({local.postalCode.slice(0, 2)})
			</Reveal>
			<h1 className="flex flex-col gap-4">
				<Reveal as="span" variant="fade" delay={100} className={EYEBROW}>
					{page.heading}
				</Reveal>
				<RevealWords
					as="span"
					text={page.hook}
					delay={200}
					className={`display-title max-w-3xl text-5xl font-bold leading-[1.02] text-balance md:text-6xl xl:text-7xl ${STRONG}`}
				/>
			</h1>
			<Reveal
				delay={450}
				className={`flex max-w-2xl flex-col gap-4 text-lg font-medium leading-relaxed ${TEXT}`}
			>
				{page.intro.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</Reveal>
			<Reveal delay={600}>
				<ContactButtons source={page.path} />
			</Reveal>
			{/* Mobile : la carte ou le téléphone, épinglés à droite sur grand écran */}
			<div className="md:hidden">
				{page.showcase === "map" ? (
					<ZoneMap highlight={page.area} />
				) : (
					<PhoneMockup screens={[page.showcase]} active={page.showcase} />
				)}
			</div>
		</header>
	);
}

export function LocalEditorialPage({ path }: { path: string }) {
	const page = getLocalPage(path);
	const { local } = siteConfig;
	useStartScrollAnimations(true);
	const works = page.works
		.map((label) => WORKS.find((work) => work.label === label))
		.filter((work) => work !== undefined);
	const WIDTH = "max-w-[110rem] md:px-8 lg:px-12";

	return (
		<div className="flex min-h-dvh flex-col">
			<SiteHeader className={WIDTH} />

			<main className={`mx-auto flex w-full ${WIDTH} flex-1 flex-col px-4`}>
				{page.scrolly ? (
					<ScrollyStory
						steps={page.scrolly}
						initialScreen={page.showcase === "map" ? "vitrine" : page.showcase}
						mapArea={page.showcase === "map" ? page.area : undefined}
						hero={<Hero path={path} />}
						numbered={false}
					/>
				) : (
					<>
						<div className="grid items-center gap-12 py-10 md:min-h-[calc(100svh-7rem)] md:grid-cols-[minmax(0,1fr)_auto]">
							<Hero path={path} />
							<div className="hidden md:block">
								<LocalShowcase page={page} />
							</div>
						</div>
						<ul className={`${RULE} grid gap-10 py-16 md:grid-cols-3`}>
							{page.highlights.map(({ icon: Icon, title, text }, index) => (
								<Reveal as="li" key={title} delay={index * 120}>
									<Icon aria-hidden="true" className="size-6 text-[#f25353]" />
									<h2
										className={`display-title mt-4 text-2xl font-semibold ${STRONG}`}
									>
										{title}
									</h2>
									<p className={`mt-2 font-medium leading-relaxed ${TEXT}`}>
										{text}
									</p>
								</Reveal>
							))}
						</ul>
					</>
				)}

				{/* Citation : l'origine du nom, en grand */}
				<section
					className={`${RULE} grid items-center gap-10 py-20 md:grid-cols-[auto_minmax(0,1fr)] md:gap-16 md:py-28`}
				>
					<Reveal variant="scale" className="flex justify-center">
						<OrbitAvatar size={200} text="DE LA CUISINE AU CODE" />
					</Reveal>
					<div className="flex flex-col gap-5">
						<Reveal as="p" variant="fade" className={EYEBROW}>
							Pourquoi « LeCuistotduWeb »
						</Reveal>
						<Reveal
							as="blockquote"
							delay={150}
							className={`display-title max-w-4xl text-2xl leading-snug text-balance md:text-3xl lg:text-4xl ${STRONG}`}
						>
							« {page.story ?? STORY} »
						</Reveal>
						<Reveal
							as="p"
							delay={300}
							className={`text-sm font-semibold ${TEXT}`}
						>
							{siteConfig.name}, développeur web à {local.city}
						</Reveal>
					</div>
				</section>

				{/* Deux traitements : liste en grille sous le titre, ou texte avec
				    paragraphe d'accroche, titre à droite */}
				{page.sections.map((section) =>
					section.points ? (
						<Section key={section.title} title={section.title} stacked>
							<ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
								{section.points.map((point, index) => (
									<Reveal
										as="li"
										key={point}
										delay={(index % 3) * 100}
										className="group relative flex flex-col gap-4 pt-6 pb-4"
									>
										<span
											aria-hidden="true"
											className="absolute inset-x-0 top-0 h-px bg-[#d2c4a4] dark:bg-[#253c59]"
										/>
										<span
											aria-hidden="true"
											className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-[#f25353] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
										/>
										<span className="flex size-9 items-center justify-center rounded-full bg-[#f25353]/10 transition-colors duration-500 group-hover:bg-[#f25353] dark:bg-[#f25353]/15">
											<Check
												aria-hidden="true"
												className="size-4 text-[#f25353] transition-colors duration-500 group-hover:text-white"
											/>
										</span>
										<span
											className={`text-lg leading-snug font-semibold md:text-xl ${STRONG}`}
										>
											{point}
										</span>
									</Reveal>
								))}
							</ul>
						</Section>
					) : (
						<Section key={section.title} title={section.title} reverse>
							<div className="flex flex-col gap-6">
								{section.paragraphs?.map((paragraph, index) =>
									index === 0 ? (
										<p
											key={paragraph}
											className={`max-w-2xl border-l-2 border-[#f25353] pl-6 text-xl leading-relaxed font-semibold md:text-2xl ${STRONG}`}
										>
											{paragraph}
										</p>
									) : (
										<p
											key={paragraph}
											className={`max-w-2xl pl-6 text-lg font-medium leading-relaxed ${TEXT}`}
										>
											{paragraph}
										</p>
									),
								)}
							</div>
						</Section>
					),
				)}

				<Section
					eyebrow="Méthode"
					title="Comment ça se passe"
					stacked
					aside={
						<Link
							to="/tarifs"
							onClick={() => trackEvent("click_pricing", { from: page.path })}
							className="group inline-flex shrink-0 items-center gap-3 text-sm font-semibold whitespace-nowrap"
						>
							<span
								className={`underline-offset-4 decoration-[#f25353] group-hover:underline ${STRONG}`}
							>
								Voir les tarifs
							</span>
							<span className="flex size-10 items-center justify-center rounded-full border border-[#253c59]/25 transition-[background-color,border-color,rotate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:border-[#f25353] group-hover:bg-[#f25353] dark:border-white/25">
								<ArrowUpRight
									aria-hidden="true"
									className="size-4 text-[#253c59] transition-colors group-hover:text-white dark:text-white"
								/>
							</span>
						</Link>
					}
				>
					<ProcessTimeline steps={STEPS} animated />
				</Section>

				<Section
					eyebrow="Réalisations"
					title="Le même soin, de Fnac Darty aux indépendants"
					stacked
					aside={
						<Link
							to="/realisations"
							onClick={() =>
								trackEvent("click_all_projects", { from: page.path })
							}
							className="group inline-flex shrink-0 items-center gap-3 text-sm font-semibold whitespace-nowrap"
						>
							<span
								className={`underline-offset-4 decoration-[#f25353] group-hover:underline ${STRONG}`}
							>
								Voir toutes les réalisations
							</span>
							<span className="flex size-10 items-center justify-center rounded-full border border-[#253c59]/25 transition-[background-color,border-color,rotate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:border-[#f25353] group-hover:bg-[#f25353] dark:border-white/25">
								<ArrowUpRight
									aria-hidden="true"
									className="size-4 text-[#253c59] transition-colors group-hover:text-white dark:text-white"
								/>
							</span>
						</Link>
					}
				>
					<ul className="grid gap-10 md:grid-cols-3 md:gap-8">
						{works.map((work) => (
							<li key={work.label}>
								<Link to="/realisations" className="group flex flex-col gap-4">
									<span className="block overflow-hidden rounded-2xl shadow-lg shadow-[#253c59]/10 ring-1 ring-[#253c59]/10 dark:ring-white/10">
										<img
											src={work.src}
											srcSet={work.srcSet}
											sizes="(min-width: 768px) 33vw, 100vw"
											alt={`Aperçu du projet ${work.label}`}
											width={640}
											height={400}
											loading="lazy"
											decoding="async"
											className="aspect-[16/10] w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
										/>
									</span>
									<span className="flex flex-col gap-1.5 px-1">
										<span className={`text-sm font-semibold ${TEXT}`}>
											<span className="text-[#b52f2f] dark:text-[#ff7a7a]">
												{WORK_KINDS[work.kind]}
											</span>
											{work.details.period && (
												<span className="tabular-nums">
													{" "}
													· {work.details.period}
												</span>
											)}
										</span>
										<span
											className={`display-title text-2xl font-bold ${STRONG}`}
										>
											{work.label}
										</span>
										<span className={`font-medium leading-relaxed ${TEXT}`}>
											{work.description}
										</span>
									</span>
								</Link>
							</li>
						))}
					</ul>
				</Section>

				<Section eyebrow="FAQ" title="Questions fréquentes">
					<div className="border-b border-[#d2c4a4] dark:border-[#253c59]">
						{page.faq.map(({ question, answer }) => (
							<details key={question} className={`group ${RULE} py-6`}>
								<summary
									className={`flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold md:text-xl ${STRONG}`}
								>
									<h3>{question}</h3>
									<Plus
										aria-hidden="true"
										className="mt-1 size-5 shrink-0 text-[#f25353] transition-transform duration-300 group-open:rotate-45"
									/>
								</summary>
								<p
									className={`mt-4 max-w-2xl font-medium leading-relaxed ${TEXT}`}
								>
									{answer}
								</p>
							</details>
						))}
					</div>
				</Section>

				{/* Seul bloc de la page : l'appel à prendre contact */}
				<Reveal variant="scale" className="pb-24">
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
							<p className="text-xs font-semibold uppercase tracking-widest text-[#ff9a9a]">
								Premier échange gratuit
							</p>
							<h2 className="display-title max-w-3xl text-4xl font-bold leading-[1.05] text-white md:text-6xl">
								On en parle autour d'un café ?
							</h2>
							<p className="max-w-2xl text-lg font-medium leading-relaxed text-[#d5e0ec]">
								30 minutes en visio ou par téléphone, ou en personne si vous
								préférez : déplacement possible autour de {local.city}. Vous
								recevez ensuite un devis clair, sans engagement.
							</p>
							<ContactButtons source={`${page.path}-bottom`} onDark />
						</div>
					</section>
				</Reveal>
			</main>

			<LocalFooter wide />
		</div>
	);
}
