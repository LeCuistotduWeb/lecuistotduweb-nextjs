import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ThemeToggle } from "#/components/theme-toggle";
import { siteConfig } from "#/config";

// Gabarit commun aux pages Rangeo (présentation + confidentialité), servies
// sur rangeo.lecuistotduweb.fr. Couleur d'accent : l'orange de l'app.
export const RANGEO_ACCENT = "text-[#c4501d] dark:text-[#ff9c6e]";

export function RangeoShell({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-dvh flex-col">
			<header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5">
				<Link
					to="/rangeo"
					className="display-title text-xl font-bold text-[#253c59] dark:text-white"
				>
					<span className={RANGEO_ACCENT}>Rangeo</span>
				</Link>
				<nav className="flex items-center gap-1 text-sm">
					<Link
						to="/rangeo/confidentialite"
						className="group rounded-md px-3 py-2"
					>
						<span className="text-[#4a6a8a] group-hover:text-[#253c59] dark:text-[#a1adbc] dark:group-hover:text-white">
							Confidentialité
						</span>
					</Link>
				</nav>
			</header>
			<ThemeToggle />
			<main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16">
				{children}
			</main>
			<footer className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 border-t border-[#d2c4a4] px-4 py-6 text-sm text-[#4a6a8a] dark:border-[#253c59] dark:text-[#a1adbc]">
				<p>
					Rangeo, une app de{" "}
					<a
						href={siteConfig.url}
						className="font-medium underline-offset-4 hover:underline"
					>
						<span className="text-[#253c59] dark:text-white">
							{siteConfig.alias}
						</span>
					</a>
				</p>
				<div className="flex gap-4">
					<Link to="/rangeo/confidentialite" className="hover:underline">
						<span className="text-[#4a6a8a] dark:text-[#a1adbc]">
							Politique de confidentialité
						</span>
					</Link>
					<a href={`mailto:${siteConfig.email}`} className="hover:underline">
						<span className="text-[#4a6a8a] dark:text-[#a1adbc]">Contact</span>
					</a>
				</div>
			</footer>
		</div>
	);
}
