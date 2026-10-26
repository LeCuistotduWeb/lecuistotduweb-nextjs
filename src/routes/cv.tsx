import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Globe, Mail, Printer } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { IconGitHub } from "#/components/icons/github";
import { IconLinkedIn } from "#/components/icons/linkedin";
import { ThemeToggle } from "#/components/theme-toggle";
import { Button } from "#/components/ui/button";
import { siteConfig } from "#/config";
import { EXPERIENCES } from "#/data/experiences";
import { FORMATIONS } from "#/data/formations";
import { trackEvent } from "#/lib/analytics";

// Version ATS du CV : une seule colonne, texte entièrement sélectionnable
// (donc extractible par les logiciels de recrutement), compétences classées
// par catégorie, sans avatar ni fond coloré indispensable. Le bouton
// « Imprimer » génère un PDF au texte sélectionnable via le navigateur.
export const Route = createFileRoute("/cv")({
	head: () => ({
		meta: [
			{
				title: `${siteConfig.name} — CV Développeur Fullstack React / Next.js`,
			},
			{
				name: "description",
				content:
					"CV de Gaëtan Boyron, développeur Fullstack React, Next.js et TypeScript : compétences, expériences et formations. Version optimisée pour les recruteurs.",
			},
			{ name: "og:title", content: `${siteConfig.name} — CV` },
			{ name: "og:type", content: "profile" },
			{ name: "og:url", content: `${siteConfig.url}/cv` },
			{ name: "og:image", content: "/lcdw-avatar.png" },
		],
	}),
	component: CvPage,
});

const CV_TITLE = siteConfig.role;

const PROFILE =
	"Développeur web depuis plus de 8 ans, spécialisé dans la conception d'applications React, Next.js et TypeScript robustes, performantes et accessibles. J'interviens de la conception à la mise en production, en lien étroit avec les équipes Produit, UX et Backend. Ces dernières années, j'ai contribué à des produits à fort trafic chez Fnac Darty et Infogreffe : architecture frontend, design system, Core Web Vitals et qualité du code.";

const SKILL_GROUPS: { label: string; items: string[] }[] = [
	{
		label: "Front-end",
		items: [
			"React",
			"Next.js",
			"TypeScript",
			"JavaScript",
			"HTML5",
			"CSS3",
			"SCSS",
			"Tailwind CSS",
		],
	},
	{
		label: "Back-end",
		items: ["Node.js", "PHP", "Symfony", "Prisma", "API REST"],
	},
	{ label: "Bases de données", items: ["PostgreSQL", "MySQL"] },
	{
		label: "Tests",
		items: ["Jest", "React Testing Library", "Cypress", "Playwright"],
	},
	{
		label: "Outils & méthodes",
		items: [
			"Git",
			"Vercel",
			"Storybook",
			"Figma",
			"SEO",
			"Accessibilité",
			"Core Web Vitals",
		],
	},
];

const CONTACTS = [
	{
		icon: Mail,
		label: siteConfig.email,
		href: `mailto:${siteConfig.email}`,
	},
	{
		icon: Globe,
		label: siteConfig.shortUrl,
		href: siteConfig.url,
	},
	{
		icon: IconLinkedIn,
		label: "LinkedIn",
		href: siteConfig.social.linkedin,
	},
	{
		icon: IconGitHub,
		label: "GitHub",
		href: siteConfig.social.github,
	},
];

// Nombre max de puces affichées par expérience : un CV concis se lit mieux et
// reste lisible par les ATS sans noyer les mots-clés.
const MAX_BULLETS = 5;

function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className="mt-8 first:mt-0">
			<h2 className="display-title text-xs font-semibold uppercase tracking-[0.2em] text-[#b52f2f] dark:text-[#ff7a7a]">
				{title}
			</h2>
			<div className="mt-4 border-t border-[#d2c4a4] pt-4 dark:border-[#253c59] print:border-[#d2c4a4]">
				{children}
			</div>
		</section>
	);
}

function CvPage() {
	// Les variantes dark: (classe .dark) l'emportent sur print: ; on retire donc
	// le thème sombre le temps de l'impression pour toujours sortir un PDF clair,
	// puis on le restaure (vaut aussi pour un Ctrl+P, pas seulement le bouton).
	useEffect(() => {
		const root = document.documentElement;
		let wasDark = false;
		const before = () => {
			wasDark = root.classList.contains("dark");
			if (wasDark) root.classList.remove("dark");
		};
		const after = () => {
			if (wasDark) root.classList.add("dark");
		};
		window.addEventListener("beforeprint", before);
		window.addEventListener("afterprint", after);
		return () => {
			window.removeEventListener("beforeprint", before);
			window.removeEventListener("afterprint", after);
		};
	}, []);

	return (
		<main className="min-h-screen px-4 py-10 print:p-0">
			<div className="mx-auto w-full max-w-3xl">
				{/* Barre d'actions : absente de l'impression / du PDF */}
				<div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
					<Button asChild variant="ghost">
						<Link to="/">
							<ArrowLeft className="size-4" /> Retour au site
						</Link>
					</Button>
					<Button
						variant="outline"
						onClick={() => {
							trackEvent("click_print_cv");
							window.print();
						}}
					>
						<Printer className="size-4" /> Imprimer / Enregistrer en PDF
					</Button>
				</div>

				<article className="rounded-2xl border border-[#d2c4a4] bg-[#faf5ec]/95 p-7 backdrop-blur-sm md:p-12 dark:border-[#1c2a3a] dark:bg-[#121e2a]/95 print:rounded-none print:border-0 print:bg-white print:p-0 print:backdrop-blur-none">
					{/* En-tête : nom, titre ciblé, coordonnées */}
					<header>
						<h1 className="display-title text-3xl font-bold text-[#253c59] md:text-4xl dark:text-white print:text-black">
							{siteConfig.name}
						</h1>
						<p className="mt-1 text-lg font-medium text-[#4a6a8a] dark:text-[#a1adbc] print:text-black">
							{CV_TITLE}
						</p>
						<ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#4a6a8a] dark:text-[#a1adbc] print:text-black">
							{CONTACTS.map(({ icon: Icon, label, href }) => (
								<li key={label}>
									<a
										href={href}
										target={href.startsWith("mailto:") ? undefined : "_blank"}
										rel={
											href.startsWith("mailto:")
												? undefined
												: "noopener noreferrer"
										}
										className="inline-flex items-center gap-1.5 hover:text-[#253c59] dark:hover:text-white"
									>
										<Icon className="size-4 shrink-0 text-[#8a7560] dark:text-[#6b8fa8] print:text-black" />
										{label}
									</a>
								</li>
							))}
						</ul>
					</header>

					<Section title="Profil">
						<p className="text-sm leading-relaxed text-[#3a5570] dark:text-[#c5d5e5] print:text-black">
							{PROFILE}
						</p>
					</Section>

					<Section title="Compétences">
						<dl className="flex flex-col gap-3">
							{SKILL_GROUPS.map((group) => (
								<div
									key={group.label}
									className="grid grid-cols-1 gap-1 sm:grid-cols-[10rem_1fr]"
								>
									<dt className="text-sm font-semibold text-[#253c59] dark:text-white print:text-black">
										{group.label}
									</dt>
									<dd className="text-sm text-[#3a5570] dark:text-[#c5d5e5] print:text-black">
										{group.items.join(" · ")}
									</dd>
								</div>
							))}
						</dl>
					</Section>

					<Section title="Expériences">
						<div className="flex flex-col gap-6">
							{EXPERIENCES.map((xp) => (
								<div key={`${xp.company}-${xp.period}`}>
									<div className="flex flex-wrap items-baseline justify-between gap-x-4">
										<h3 className="font-semibold text-[#253c59] dark:text-white print:text-black">
											{xp.title} — {xp.company}
										</h3>
										<span className="text-sm font-medium text-[#93a8be] dark:text-[#556a7a] print:text-black">
											{xp.period}
										</span>
									</div>
									{xp.description && xp.description.length > 0 && (
										<ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#3a5570] marker:text-[#f25353] dark:text-[#c5d5e5] print:text-black">
											{xp.description.slice(0, MAX_BULLETS).map((line) => (
												<li key={line}>{line}</li>
											))}
										</ul>
									)}
								</div>
							))}
						</div>
					</Section>

					<Section title="Formation">
						<div className="flex flex-col gap-4">
							{FORMATIONS.map((f) => (
								<div
									key={f.school}
									className="flex flex-wrap items-baseline justify-between gap-x-4"
								>
									<div>
										<h3 className="font-semibold text-[#253c59] dark:text-white print:text-black">
											{f.title}
										</h3>
										<p className="text-sm text-[#7a95ad] dark:text-[#7a8fa0] print:text-black">
											{f.school}
										</p>
									</div>
									<span className="text-sm font-medium text-[#93a8be] dark:text-[#556a7a] print:text-black">
										{f.period}
									</span>
								</div>
							))}
						</div>
					</Section>
				</article>
			</div>
			<ThemeToggle className="print:hidden" />
		</main>
	);
}
