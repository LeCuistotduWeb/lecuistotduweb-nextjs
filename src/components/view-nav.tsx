import { Link } from "@tanstack/react-router";
import { useLayoutEffect, useRef, useState } from "react";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";
import { VIEWS, type ViewId } from "#/lib/views";
import { ThemeToggle } from "./theme-toggle";

// Indicateur de chapitre : la pilule suit le chapitre en cours au scroll et
// glisse d'un onglet à l'autre. Un clic navigue vers la route du chapitre, le
// layout se charge du défilement. En mobile, les onglets défilent
// horizontalement (l'onglet actif est recentré) et le bouton de thème reste
// épinglé à droite, après un séparateur. En mobile, la nav est une barre
// fixée en bas de l'écran, à portée de pouce.
export function ViewNav({
	current,
	onReselect,
}: {
	current: ViewId;
	/** Clic sur le chapitre dont la route est déjà active */
	onReselect: (view: ViewId) => void;
}) {
	const listRef = useRef<HTMLUListElement>(null);
	const [pill, setPill] = useState<{ left: number; width: number } | null>(
		null,
	);

	useLayoutEffect(() => {
		function measure() {
			const list = listRef.current;
			// Mesure le <li> : il est `relative` (au-dessus de la pilule), donc
			// l'offsetLeft du lien serait relatif à lui et vaudrait 0.
			const item = list?.querySelector<HTMLElement>(
				`[data-view="${current}"]`,
			)?.parentElement;
			if (!list || !item) return;
			setPill({ left: item.offsetLeft, width: item.offsetWidth });
			// Recentre l'onglet actif quand la liste déborde (mobile)
			if (list.scrollWidth > list.clientWidth) {
				list.scrollTo({
					left: item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2,
					behavior: "smooth",
				});
			}
		}
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [current]);

	return (
		<nav
			aria-label="Chapitres"
			className="fixed inset-x-4 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 flex justify-center sm:sticky sm:inset-x-auto sm:top-3 sm:bottom-auto sm:mb-3 md:mb-4"
		>
			<div className="flex w-full sm:w-auto max-w-full items-center rounded-full border border-[#d2c4a4] dark:border-[#253c59] bg-[#faf5ec]/90 dark:bg-[#172231]/90 backdrop-blur-md p-1 shadow-lg sm:shadow-sm">
				<ul
					ref={listRef}
					className="relative flex min-w-0 flex-1 gap-1 overflow-x-auto rounded-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)] sm:[mask-image:none]"
				>
					{pill && (
						<li
							aria-hidden="true"
							className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-[#253c59] dark:bg-white transition-[left,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
							style={{ left: pill.left, width: pill.width }}
						/>
					)}
					{VIEWS.map((view) => {
						const active = view.id === current;
						return (
							<li
								key={view.id}
								className="relative flex-1 shrink-0 sm:flex-none"
							>
								<Link
									to={view.path}
									data-view={view.id}
									activeOptions={{ exact: true }}
									resetScroll={false}
									onClick={(e) => {
										trackEvent("select_view", { view: view.id });
										if (
											e.currentTarget.getAttribute("aria-current") === "page"
										) {
											e.preventDefault();
											onReselect(view.id);
										}
									}}
									className={cn(
										"block rounded-full px-3 sm:px-4 py-1.5 text-center text-[13px] sm:text-sm font-semibold whitespace-nowrap transition-colors",
										// Avant la mesure (rendu serveur), la pilule est le fond du lien
										active && !pill && "bg-[#253c59] dark:bg-white",
										!active && "hover:bg-[#e6d3ae]/70 dark:hover:bg-[#1c2a3a]",
									)}
								>
									<span
										className={cn(
											"relative transition-colors duration-300",
											active
												? "text-white dark:text-[#172231]"
												: "text-[#4a6a8a] dark:text-[#a1adbc]",
										)}
									>
										{view.label}
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
				<span
					aria-hidden="true"
					className="mx-1.5 h-5 w-px shrink-0 bg-[#d2c4a4] dark:bg-[#253c59]"
				/>
				<ThemeToggle variant="nav" />
			</div>
		</nav>
	);
}
