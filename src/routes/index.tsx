import { useState } from "react";
import { ContactModal } from "#/components/contact-modal";
import { siteConfig } from "#/config";
import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function BentoCard({
	className,
	children,
}: { className?: string; children: React.ReactNode }) {
	return (
		<div
			className={cn(
				"rounded-2xl border border-zinc-800 bg-zinc-900 p-6",
				className,
			)}
		>
			{children}
		</div>
	);
}

function IconGitHub({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
			<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
		</svg>
	);
}

function IconLinkedIn({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}

function IconCodePen({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
			<path d="M18.144 13.067v-2.134L16.55 12zm1.276 1.194l-5.016 3.345a1 1 0 0 1-.552.162 1 1 0 0 1-.552-.162l-5.016-3.345a1 1 0 0 1-.448-.833v-2.667a1 1 0 0 1 .448-.833l5.016-3.345a1 1 0 0 1 1.104 0l5.016 3.345a1 1 0 0 1 .448.833v2.667a1 1 0 0 1-.448.833zM12 9.384l-2.474 1.651L12 12.686l2.474-1.651zm-1.276 4.316L8.328 12l2.396-1.7v3.4zm-3.44-.713l1.593 1.067v-2.134zm4.716 1.78l2.474-1.651-2.474-1.651-2.474 1.651zm2.396 1.433l-2.396-1.7v3.4zm.284-4.513l2.396 1.7-2.396 1.7V11.69zm0-5.69C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6z"/>
		</svg>
	);
}

const STACK = [
	"TypeScript",
	"React",
	"Next.js",
	"Node.js",
	"Prisma",
	"PHP",
	"Symfony",
	"MySQL",
	"Storybook",
	"Figma",
];

const MISSIONS = [
	{
		company: "Fnac Darty",
		period: "2024 — 2025",
		desc: "Développement d'applications web marketplace et optimisation des performances.",
		tags: "React · Next.js · TypeScript",
	},
	{
		company: "Infogreffe",
		period: "2023 — 2024",
		desc: "Intégration de maquettes, amélioration SEO et création d'un constructeur de page.",
		tags: "Next.js · Strapi · SEO",
	},
	{
		company: "Blissim",
		period: "2019 — 2022",
		desc: "Migration vers une PWA et conception d'une application analytics avancée.",
		tags: "React · PWA · Fullstack",
	},
];

const SOCIAL = [
	{
		icon: IconGitHub,
		label: "GitHub",
		handle: siteConfig.alias,
		href: siteConfig.social.github,
	},
	{
		icon: IconLinkedIn,
		label: "LinkedIn",
		handle: siteConfig.name,
		href: siteConfig.social.linkedin,
	},
	{
		icon: IconCodePen,
		label: "CodePen",
		handle: siteConfig.alias.toLowerCase(),
		href: siteConfig.social.codepen,
	},
];

function Home() {
	const [contactOpen, setContactOpen] = useState(false);

	return (
		<main className="min-h-screen bg-zinc-950 p-4 md:p-10">
			<div className="mx-auto max-w-5xl">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

					{/* ── Bio ── 2×2 */}
					<BentoCard className="col-span-2 row-span-2 flex flex-col gap-5">
						<div className="size-16 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold select-none">
							GB
						</div>
						<div>
							<p className="text-xs font-medium text-violet-400/70 uppercase tracking-widest mb-1">
								{siteConfig.alias}
							</p>
							<h1 className="text-3xl font-bold text-white tracking-tight">
								{siteConfig.name}
							</h1>
							<p className="text-violet-400 font-medium mt-1">
								{siteConfig.role}
							</p>
						</div>
						<p className="text-zinc-400 leading-relaxed text-sm">
							{siteConfig.bio}
						</p>
					</BentoCard>

					{/* ── Stack ── 2×1 */}
					<BentoCard className="col-span-2">
						<h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
							Stack
						</h2>
						<div className="flex flex-wrap gap-2">
							{STACK.map((tech) => (
								<span
									key={tech}
									className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium"
								>
									{tech}
								</span>
							))}
						</div>
					</BentoCard>

					{/* ── Liens sociaux ── 2×1 */}
					<BentoCard className="col-span-2">
						<h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
							Liens
						</h2>
						<div className="flex flex-col gap-3">
							{SOCIAL.map(({ icon: Icon, label, handle, href }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noreferrer"
									className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
								>
									<div className="size-8 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-violet-500/20 border border-zinc-700 group-hover:border-violet-500/40 transition-colors shrink-0">
										<Icon className="size-4" />
									</div>
									<div className="min-w-0">
										<p className="text-[10px] text-zinc-600 uppercase tracking-wider">
											{label}
										</p>
										<p className="text-sm font-medium truncate">{handle}</p>
									</div>
								</a>
							))}
						</div>
					</BentoCard>

					{/* ── Missions ── 3×1 */}
					<BentoCard className="col-span-2 md:col-span-3">
						<h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
							Missions
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
							{MISSIONS.map((m) => (
								<div
									key={m.company}
									className="flex flex-col gap-2 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-violet-500/50 p-4 transition-colors"
								>
									<div className="flex items-start justify-between gap-2">
										<h3 className="text-white font-semibold text-sm">
											{m.company}
										</h3>
										<span className="text-zinc-600 text-[10px] font-medium shrink-0">
											{m.period}
										</span>
									</div>
									<p className="text-zinc-500 text-xs leading-relaxed flex-1">
										{m.desc}
									</p>
									<p className="text-violet-400/60 text-[10px] font-medium">
										{m.tags}
									</p>
								</div>
							))}
						</div>
					</BentoCard>

					{/* ── Contact ── 1×1 */}
					<BentoCard className="col-span-2 md:col-span-1 flex flex-col gap-3">
						<h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
							Contact
						</h2>
						<p className="text-zinc-400 text-sm leading-relaxed flex-1">
							Disponible pour de nouvelles missions ou opportunités.
						</p>
						<button
							type="button"
							onClick={() => setContactOpen(true)}
							className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors cursor-pointer"
						>
							<Mail className="size-4" />
							Me contacter
						</button>
					</BentoCard>

				</div>
			</div>

			<ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
		</main>
	);
}
