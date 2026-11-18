import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import {
	type ConsentValue,
	getConsent,
	onConsentBannerOpen,
	setConsent,
} from "#/lib/consent";
import { cn } from "#/lib/utils";

const BUTTON =
	"flex-1 cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f25353]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf5ec] dark:focus-visible:ring-offset-[#172231]";

/**
 * Bandeau de consentement à la mesure d'audience. Accepter et Refuser ont le
 * même poids visuel (recommandation CNIL). Il attend la fin de l'écran de
 * chargement de l'accueil, et se rouvre via le lien « Gérer les cookies ».
 */
export function CookieBanner() {
	const [open, setOpen] = useState(false);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const show = () => {
			setOpen(true);
			requestAnimationFrame(() => setShown(true));
		};
		const unsubscribe = onConsentBannerOpen(show);
		if (getConsent() !== null) return unsubscribe;

		const root = document.documentElement;
		if (!root.classList.contains("intro-playing")) {
			show();
			return unsubscribe;
		}
		const observer = new MutationObserver(() => {
			if (root.classList.contains("intro-playing")) return;
			observer.disconnect();
			// Laisse l'accueil se dévoiler avant d'apparaître
			setTimeout(show, 900);
		});
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => {
			observer.disconnect();
			unsubscribe();
		};
	}, []);

	if (!open) return null;

	const choose = (value: ConsentValue) => {
		setShown(false);
		setTimeout(() => setOpen(false), 300);
		setConsent(value);
	};

	return (
		<section
			aria-labelledby="cookie-banner-title"
			className={cn(
				"fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[24rem]",
				"rounded-3xl border border-[#d2c4a4] bg-[#faf5ec]/95 p-5 shadow-2xl shadow-[#253c59]/15 backdrop-blur-md dark:border-[#253c59] dark:bg-[#172231]/95 dark:shadow-black/40",
				"transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
				shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
			)}
		>
			<div className="flex items-start gap-3">
				<span
					aria-hidden="true"
					className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f25353]/12 text-[#d93a3a] dark:bg-[#f25353]/15 dark:text-[#ff7a7a]"
				>
					<Cookie className="size-5" />
				</span>
				<div className="flex flex-col gap-1.5">
					<h2
						id="cookie-banner-title"
						className="display-title text-lg font-bold leading-tight text-[#253c59] dark:text-white"
					>
						Mesure d'audience
					</h2>
					<p className="text-sm leading-relaxed text-[#4a6a8a] dark:text-[#a1adbc]">
						J'aimerais utiliser Google Analytics pour savoir quelles pages vous
						sont utiles. Rien n'est mesuré sans votre accord.{" "}
						<Link
							to="/confidentialite"
							hash="cookies"
							className="whitespace-nowrap font-semibold text-[#b52f2f] underline underline-offset-4 hover:no-underline dark:text-[#ff7a7a]"
						>
							En savoir plus
						</Link>
					</p>
				</div>
			</div>
			<div className="mt-4 flex gap-2">
				<button
					type="button"
					onClick={() => choose("denied")}
					className={cn(
						BUTTON,
						"bg-[#253c59] text-white hover:bg-[#1c2f47] dark:bg-[#2f4b6e] dark:hover:bg-[#385780]",
					)}
				>
					Refuser
				</button>
				<button
					type="button"
					onClick={() => choose("granted")}
					className={cn(BUTTON, "bg-[#d93a3a] text-white hover:bg-[#c93434]")}
				>
					Accepter
				</button>
			</div>
		</section>
	);
}
