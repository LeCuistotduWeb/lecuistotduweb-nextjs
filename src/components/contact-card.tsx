import { getCalApi } from "@calcom/embed-react";
import { ArrowUpRight, CalendarDays, Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "#/config";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import { CardTitle } from "./card-title";
import { ContactForm } from "./contact-form";
import { FreelanceStatusBadge } from "./freelance-status-badge";

// Le style global `a { color }` n'est pas dans un layer : la couleur du texte
// des liens est donc portée par un <span> interne.
const secondaryClass =
	"inline-flex items-center gap-2 rounded-full border border-[#d2c4a4] dark:border-[#253c59] px-4 py-2 text-sm font-semibold hover:bg-[#e6d3ae] dark:hover:bg-[#1c2a3a] transition-colors cursor-pointer";
const secondaryText = "text-[#253c59] dark:text-white";

export function ContactCard({ className }: { className?: string }) {
	const [copied, setCopied] = useState(false);
	const { calLink } = siteConfig.contact;

	// Calendrier Cal.com en popup ; le script n'est chargé qu'au clic. Sans JS
	// ou si le chargement échoue, le lien ouvre Cal.com dans un nouvel onglet.
	async function openBooking(event: React.MouseEvent<HTMLAnchorElement>) {
		trackEvent("click_booking");
		event.preventDefault();
		const href = event.currentTarget.href;
		if (!calLink) return;
		try {
			const cal = await getCalApi();
			const dark = document.documentElement.classList.contains("dark");
			cal("ui", {
				theme: dark ? "dark" : "light",
				cssVarsPerTheme: {
					light: { "cal-brand": "#d93a3a" },
					dark: { "cal-brand": "#f25353" },
				},
			});
			cal("modal", { calLink, config: { layout: "month_view" } });
		} catch {
			window.open(href, "_blank", "noopener,noreferrer");
		}
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
				"border-[#f25353]/50 dark:border-[#f25353]/40 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between",
				className,
			)}
		>
			<div className="flex flex-col gap-3 lg:max-w-md">
				<CardTitle className="mb-0">Contact</CardTitle>
				<FreelanceStatusBadge />
				<p className="display-title text-2xl md:text-3xl font-semibold leading-tight text-[#253c59] dark:text-white">
					Un projet, une mission ou un poste&nbsp;?
				</p>
				<p className="text-[#4a6a8a] dark:text-[#a1adbc] font-medium">
					Client ou recruteur, décrivez votre besoin en quelques lignes.
				</p>
				<div className="flex flex-wrap gap-2 pt-4">
					{siteConfig.social.malt && (
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
					{calLink && (
						<a
							href={`https://cal.com/${calLink}`}
							target="_blank"
							rel="noopener noreferrer"
							onClick={openBooking}
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
				<div className="flex items-center gap-2 rounded-xl border border-[#d2c4a4] dark:border-[#253c59] bg-[#e6d3ae]/40 dark:bg-[#1c2a3a] p-2 pl-4">
					<Mail
						aria-hidden="true"
						className="size-4 shrink-0 text-[#8a7560] dark:text-[#a1adbc]"
					/>
					<a
						href={`mailto:${siteConfig.email}`}
						onClick={() => trackEvent("click_contact_email")}
						className="flex-1 min-w-0 truncate font-semibold"
					>
						<span className="text-[#253c59] dark:text-white">
							{siteConfig.email}
						</span>
					</a>
					<button
						type="button"
						onClick={handleCopy}
						aria-label={
							copied ? "Adresse e-mail copiée" : "Copier l'adresse e-mail"
						}
						className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#253c59] dark:text-white hover:bg-[#e6d3ae] dark:hover:bg-[#253c59] transition-colors cursor-pointer"
					>
						{copied ? (
							<Check aria-hidden="true" className="size-4" />
						) : (
							<Copy aria-hidden="true" className="size-4" />
						)}
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-4 lg:min-w-0 lg:flex-1 lg:max-w-lg">
				<ContactForm />
			</div>
		</BentoCard>
	);
}
