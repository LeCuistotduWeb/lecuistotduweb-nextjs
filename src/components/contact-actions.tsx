import { CalendarDays, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "#/components/ui/dialog";
import { trackEvent } from "#/lib/analytics";
import { bookingUrl, openBooking } from "#/lib/booking";
import { cn } from "#/lib/utils";
import { ContactForm } from "./contact-form";

// Boutons d'action des pages autonomes (pages locales, réalisations) :
// « Discutons de votre projet » ouvre le calendrier Cal.com en popup (sans
// JS, le lien mène à Cal.com), « Demander un devis » ouvre le formulaire de
// contact en popup. Une barre flottante les garde
// à portée de clic quand aucun groupe de boutons de la page n'est visible.

const STRONG = "text-[#253c59] dark:text-white";

/** Marqueur des groupes de boutons suivis par la barre flottante */
const GROUP_ATTR = "data-contact-actions";

function QuoteDialog({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[92svh] gap-6 overflow-y-auto rounded-2xl border-[#d2c4a4] bg-[#faf5ec] p-6 sm:max-w-xl md:p-8 dark:border-[#1c2a3a] dark:bg-[#121e2a]">
				<div className="flex flex-col gap-2 pr-8">
					<p className="text-xs font-semibold uppercase tracking-widest text-[#b52f2f] dark:text-[#ff7a7a]">
						Gratuit et sans engagement
					</p>
					<DialogTitle
						className={`display-title text-3xl font-bold leading-tight md:text-4xl ${STRONG}`}
					>
						Demander un devis
					</DialogTitle>
					<DialogDescription className="font-medium leading-relaxed text-[#4a6a8a] dark:text-[#a1adbc]">
						Quelques mots sur votre activité et votre projet suffisent pour que
						je revienne vers vous avec un devis clair.
					</DialogDescription>
				</div>
				<ContactForm defaultTopic="Demande de devis" />
			</DialogContent>
		</Dialog>
	);
}

export function ContactButtons({
	source,
	onDark = false,
	compact = false,
	tracked = true,
}: {
	source: string;
	onDark?: boolean;
	/** Barre flottante : boutons plus petits, libellés courts en mobile */
	compact?: boolean;
	/** Suivi par la barre flottante (false pour la barre elle-même) */
	tracked?: boolean;
}) {
	const [quoteOpen, setQuoteOpen] = useState(false);
	const size = compact
		? "px-3.5 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base"
		: "px-5 py-2.5";

	return (
		<div
			{...(tracked ? { [GROUP_ATTR]: "" } : {})}
			className={cn(
				"flex",
				compact ? "flex-nowrap gap-1.5 sm:gap-3" : "flex-wrap gap-3",
			)}
		>
			{bookingUrl && (
				<a
					href={bookingUrl}
					target="_blank"
					rel="noopener noreferrer"
					onClick={(event) => openBooking(event, source)}
					className={cn(
						"inline-flex items-center gap-2 rounded-full bg-[#f25353] font-semibold whitespace-nowrap shadow-lg shadow-[#f25353]/30 transition-colors hover:bg-[#e04444]",
						size,
					)}
				>
					<CalendarDays aria-hidden="true" className="size-4 text-white" />
					<span className="text-white">
						{compact ? (
							<>
								Discutons
								<span className="hidden sm:inline"> de votre projet</span>
							</>
						) : (
							"Discutons de votre projet"
						)}
					</span>
				</a>
			)}
			<button
				type="button"
				aria-haspopup="dialog"
				onClick={() => {
					setQuoteOpen(true);
					trackEvent("open_quote_dialog", { page: source });
				}}
				className={cn(
					"inline-flex cursor-pointer items-center gap-2 rounded-full border font-semibold whitespace-nowrap transition-colors",
					size,
					onDark
						? "border-white/30 hover:bg-white/10"
						: "border-[#253c59]/25 bg-[#faf5ec]/60 hover:bg-[#253c59]/5 dark:border-white/25 dark:bg-transparent dark:hover:bg-white/10",
				)}
			>
				{compact && (
					<FileText aria-hidden="true" className={`size-4 ${STRONG}`} />
				)}
				<span className={onDark ? "text-white" : STRONG}>
					{compact ? (
						<>
							Devis<span className="hidden sm:inline"> gratuit</span>
						</>
					) : (
						"Demander un devis"
					)}
				</span>
			</button>
			{quoteOpen && (
				<QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
			)}
		</div>
	);
}

/**
 * Barre flottante en bas d'écran : visible dès qu'on a quitté le haut de la
 * page et qu'aucun groupe de boutons n'est à l'écran.
 */
export function StickyContactBar({ source }: { source: string }) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const groups = Array.from(
			document.querySelectorAll<HTMLElement>(`[${GROUP_ATTR}]`),
		);
		const onScreen = new Set<Element>();
		let scrolled = window.scrollY > 240;
		const update = () => setVisible(scrolled && onScreen.size === 0);

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) onScreen.add(entry.target);
				else onScreen.delete(entry.target);
			}
			update();
		});
		for (const group of groups) observer.observe(group);
		const onScroll = () => {
			scrolled = window.scrollY > 240;
			update();
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div
			aria-hidden={!visible}
			inert={!visible}
			className={cn(
				// Centrée ; en mobile, assez étroite pour laisser la place au bouton
				// du chat IA (en bas à droite)
				"fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-30 -translate-x-1/2 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
				visible
					? "translate-y-0 opacity-100"
					: "pointer-events-none translate-y-6 opacity-0",
			)}
		>
			<div className="rounded-full border border-[#d2c4a4] bg-[#faf5ec]/85 p-1.5 shadow-xl shadow-[#253c59]/15 backdrop-blur-md dark:border-[#253c59] dark:bg-[#172231]/85">
				<ContactButtons source={`${source}-sticky`} compact tracked={false} />
			</div>
		</div>
	);
}
