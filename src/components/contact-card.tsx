import {
	ArrowUpRight,
	CalendarDays,
	Check,
	Copy,
	Mail,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import { siteConfig } from "#/config";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";
import { AiChatModal } from "./ai-chat-modal";
import { BentoCard } from "./bento-card";
import { CardTitle } from "./card-title";
import { FreelanceStatusBadge } from "./freelance-status-badge";

// Le style global `a { color }` n'est pas dans un layer : la couleur du texte
// des liens est donc portée par un <span> interne.
const secondaryClass =
	"inline-flex items-center gap-2 rounded-full border border-[#d2c4a4] dark:border-[#253c59] px-4 py-2 text-sm font-semibold hover:bg-[#e6d3ae] dark:hover:bg-[#1c2a3a] transition-colors cursor-pointer";
const secondaryText = "text-[#253c59] dark:text-white";

export function ContactCard({ className }: { className?: string }) {
	const [copied, setCopied] = useState(false);
	const [chatOpen, setChatOpen] = useState(false);
	const { bookingUrl } = siteConfig.contact;

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
				<FreelanceStatusBadge />
				<p className="display-title text-2xl md:text-3xl font-semibold leading-tight text-[#253c59] dark:text-white">
					Un projet, une mission, une question&nbsp;?
				</p>
				<p className="text-[#4a6a8a] dark:text-[#a1adbc] font-medium">
					Écrivez-moi directement, ou posez d'abord votre question à mon
					assistant IA.
				</p>
				<ul
					aria-label="Missions freelance"
					className="flex flex-wrap gap-2 pt-1"
				>
					{siteConfig.freelance.missions.map((mission) => (
						<li
							key={mission}
							className="px-3 py-1 rounded-full bg-[#e6d3ae] border border-[#d2c4a4] text-[#3a5570] dark:bg-[#1c2a3a] dark:border-[#253c59] dark:text-[#c5d5e5] text-xs font-medium"
						>
							{mission}
						</li>
					))}
				</ul>
			</div>

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
					href={`mailto:${siteConfig.email}`}
					onClick={() => trackEvent("click_contact_email")}
					className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d93a3a] hover:bg-[#c93434] px-5 py-3 text-sm font-semibold transition-colors"
				>
					<span className="text-white">Écrire un e-mail</span>
					<ArrowUpRight aria-hidden="true" className="size-4 text-white" />
				</a>

				<div className="flex flex-wrap gap-2">
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
					<button
						type="button"
						onClick={() => {
							setChatOpen(true);
							trackEvent("ai_chat_opened", { source: "contact_card" });
						}}
						className={cn(secondaryClass, secondaryText)}
					>
						<Sparkles aria-hidden="true" className="size-4 text-[#f25353]" />
						Demander à l'IA
					</button>
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

			<AiChatModal open={chatOpen} onOpenChange={setChatOpen} />
		</BentoCard>
	);
}
