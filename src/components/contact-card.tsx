import {
	ArrowLeft,
	ArrowRight,
	ArrowUpRight,
	BriefcaseBusiness,
	CalendarDays,
	Check,
	Copy,
	FileText,
	Mail,
	Rocket,
} from "lucide-react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { siteConfig } from "#/config";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import { CardTitle } from "./card-title";
import { FreelanceStatusBadge } from "./freelance-status-badge";

// Le style global `a { color }` n'est pas dans un layer : la couleur du texte
// des liens est donc portée par un <span> interne.
const secondaryClass =
	"inline-flex items-center gap-2 rounded-full border border-[#d2c4a4] dark:border-[#253c59] px-4 py-2 text-sm font-semibold hover:bg-[#e6d3ae] dark:hover:bg-[#1c2a3a] transition-colors cursor-pointer";
const secondaryText = "text-[#253c59] dark:text-white";

type Audience = "freelance" | "recrutement";

// Tunnel en deux étapes : « Vous êtes ? » (clients qui ont un projet, ou
// ESN / recruteurs), puis le contenu et les contacts adaptés.
const AUDIENCES: Record<
	Audience,
	{
		choice: string;
		hint: string;
		Icon: typeof Rocket;
		title: string;
		text: string;
		listLabel: string;
		tags: readonly string[];
		subject: string;
	}
> = {
	freelance: {
		choice: "J'ai un projet",
		hint: "Site, e-commerce, SaaS, appli mobile, refonte…",
		Icon: Rocket,
		title: "Prêt à lancer votre projet\u00a0?",
		text: "Décrivez en quelques lignes ce que vous voulez construire.",
		listLabel: "Missions freelance",
		tags: siteConfig.freelance.missions,
		subject: "Projet freelance",
	},
	recrutement: {
		choice: "Je recrute",
		hint: "ESN, cabinet ou entreprise : CDI, régie, portage…",
		Icon: BriefcaseBusiness,
		title: "Vous recrutez un développeur React / Node.js\u00a0?",
		text: "ESN, cabinet ou entreprise : envoyez-moi le poste ou le contexte de la mission. Mon CV est à portée de clic.",
		listLabel: "Profil",
		tags: siteConfig.recruitment.highlights,
		subject: "Recrutement",
	},
};

export function ContactCard({ className }: { className?: string }) {
	const [copied, setCopied] = useState(false);
	const [audience, setAudience] = useState<Audience | null>(null);
	const { bookingUrl } = siteConfig.contact;
	const content = audience && AUDIENCES[audience];
	const mailto = content
		? `mailto:${siteConfig.email}?subject=${encodeURIComponent(content.subject)}`
		: `mailto:${siteConfig.email}`;

	// À chaque changement d'étape, le focus suit le nouveau titre (clavier,
	// lecteurs d'écran).
	const headingRef = useRef<HTMLParagraphElement>(null);

	function goTo(next: Audience | null) {
		flushSync(() => setAudience(next));
		headingRef.current?.focus();
		if (next) trackEvent("select_audience", { audience: next });
	}

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(siteConfig.email);
			setCopied(true);
			trackEvent("copy_email");
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// presse-papiers indisponible : le mailto reste accessible
		}
	}

	return (
		<BentoCard
			className={cn(
				"border-[#f25353]/50 dark:border-[#f25353]/40 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between",
				className,
			)}
		>
			<div className="flex flex-col gap-3 lg:max-w-md">
				<CardTitle className="mb-0">Contact</CardTitle>
				{content ? (
					<button
						type="button"
						onClick={() => goTo(null)}
						className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#4a6a8a] dark:text-[#a1adbc] hover:text-[#253c59] dark:hover:text-white transition-colors cursor-pointer"
					>
						<ArrowLeft aria-hidden="true" className="size-4" />
						Retour
					</button>
				) : null}
				{audience !== "recrutement" && <FreelanceStatusBadge />}
				<p
					ref={headingRef}
					tabIndex={-1}
					className="display-title text-2xl md:text-3xl font-semibold leading-tight text-[#253c59] dark:text-white outline-none"
				>
					{content ? content.title : "Vous êtes\u00a0?"}
				</p>
				<p className="text-[#4a6a8a] dark:text-[#a1adbc] font-medium">
					{content
						? content.text
						: "Dites-moi qui vous êtes, je vous montre le plus utile."}
				</p>
				{content && (
					<ul
						aria-label={content.listLabel}
						className="flex flex-wrap gap-2 pt-1"
					>
						{content.tags.map((tag) => (
							<li
								key={tag}
								className="px-3 py-1 rounded-full bg-[#e6d3ae] border border-[#d2c4a4] text-[#3a5570] dark:bg-[#1c2a3a] dark:border-[#253c59] dark:text-[#c5d5e5] text-xs font-medium"
							>
								{tag}
							</li>
						))}
					</ul>
				)}
			</div>

			{!content && (
				<ul
					aria-label="Vous êtes"
					className="grid gap-3 sm:grid-cols-2 lg:min-w-0 lg:flex-1 lg:max-w-lg"
				>
					{(Object.keys(AUDIENCES) as Audience[]).map((key) => {
						const { choice, hint, Icon } = AUDIENCES[key];
						return (
							<li key={key}>
								<button
									type="button"
									onClick={() => goTo(key)}
									className="group flex h-full w-full flex-col gap-2 rounded-2xl border border-[#d2c4a4] dark:border-[#253c59] bg-[#e6d3ae]/40 dark:bg-[#1c2a3a] p-5 text-left transition-colors hover:border-[#f25353] dark:hover:border-[#f25353] cursor-pointer"
								>
									<Icon aria-hidden="true" className="size-6 text-[#f25353]" />
									<span className="flex items-center gap-1.5 text-lg font-semibold text-[#253c59] dark:text-white">
										{choice}
										<ArrowRight
											aria-hidden="true"
											className="size-4 transition-transform group-hover:translate-x-0.5"
										/>
									</span>
									<span className="text-sm text-[#4a6a8a] dark:text-[#a1adbc]">
										{hint}
									</span>
								</button>
							</li>
						);
					})}
				</ul>
			)}

			{content && (
				<div className="flex flex-col gap-4 lg:min-w-0 lg:flex-1 lg:max-w-lg">
					<div className="flex items-center gap-2 rounded-xl border border-[#d2c4a4] dark:border-[#253c59] bg-[#e6d3ae]/40 dark:bg-[#1c2a3a] p-2 pl-4">
						<Mail
							aria-hidden="true"
							className="size-4 shrink-0 text-[#8a7560] dark:text-[#a1adbc]"
						/>
						<span className="flex-1 min-w-0 truncate font-semibold text-[#253c59] dark:text-white">
							{siteConfig.email}
						</span>
						<button
							type="button"
							onClick={handleCopy}
							className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#253c59] dark:text-white hover:bg-[#e6d3ae] dark:hover:bg-[#253c59] transition-colors cursor-pointer"
						>
							{copied ? (
								<Check aria-hidden="true" className="size-4" />
							) : (
								<Copy aria-hidden="true" className="size-4" />
							)}
							<span aria-live="polite">{copied ? "Copiée" : "Copier"}</span>
							<span className="sr-only"> l'adresse e-mail</span>
						</button>
					</div>

					<a
						href={mailto}
						onClick={() =>
							trackEvent("click_contact_email", { audience: audience })
						}
						className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d93a3a] hover:bg-[#c93434] px-5 py-3 text-sm font-semibold transition-colors"
					>
						<span className="text-white">Écrire un e-mail</span>
						<ArrowUpRight aria-hidden="true" className="size-4 text-white" />
					</a>

					<div className="flex flex-wrap gap-2">
						{audience === "recrutement" && (
							<a
								href={siteConfig.cvPath}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => trackEvent("click_cv", { source: "contact" })}
								className={secondaryClass}
							>
								<FileText
									aria-hidden="true"
									className={cn("size-4", secondaryText)}
								/>
								<span className={secondaryText}>Voir mon CV</span>
							</a>
						)}
						{audience === "recrutement" && siteConfig.social.malt && (
							<a
								href={siteConfig.social.malt}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() =>
									trackEvent("click_social", {
										platform: "malt",
										source: "contact",
									})
								}
								className={secondaryClass}
							>
								<span className={secondaryText}>Malt</span>
								<ArrowUpRight
									aria-hidden="true"
									className={cn("size-4", secondaryText)}
								/>
							</a>
						)}
						{bookingUrl && (
							<a
								href={bookingUrl}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => trackEvent("click_booking")}
								className={secondaryClass}
							>
								<CalendarDays
									aria-hidden="true"
									className={cn("size-4", secondaryText)}
								/>
								<span className={secondaryText}>Prendre rendez-vous</span>
							</a>
						)}
						<a
							href={siteConfig.social.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() =>
								trackEvent("click_social", {
									platform: "linkedin",
									source: "contact",
								})
							}
							className={secondaryClass}
						>
							<span className={secondaryText}>LinkedIn</span>
							<ArrowUpRight
								aria-hidden="true"
								className={cn("size-4", secondaryText)}
							/>
						</a>
						<a
							href={siteConfig.social.github}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() =>
								trackEvent("click_social", {
									platform: "github",
									source: "contact",
								})
							}
							className={secondaryClass}
						>
							<span className={secondaryText}>GitHub</span>
							<ArrowUpRight
								aria-hidden="true"
								className={cn("size-4", secondaryText)}
							/>
						</a>
					</div>
				</div>
			)}
		</BentoCard>
	);
}
