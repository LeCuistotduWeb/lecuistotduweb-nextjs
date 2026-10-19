import { Link } from "@tanstack/react-router";
import { useLayoutEffect, useRef, useState } from "react";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";
import { VIEWS, type ViewId } from "#/lib/views";

// Indicateur de chapitre : la pilule suit le chapitre en cours au scroll et
// glisse d'un onglet à l'autre. Un clic navigue vers la route du chapitre, le
// layout se charge du défilement.
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
			// Mesure le <li> : il est `relative` (au-dessus de la pilule), donc
			// l'offsetLeft du lien serait relatif à lui et vaudrait 0.
			const item = listRef.current?.querySelector<HTMLElement>(
				`[data-view="${current}"]`,
			)?.parentElement;
			if (item) setPill({ left: item.offsetLeft, width: item.offsetWidth });
		}
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [current]);

	return (
		<nav
			aria-label="Chapitres"
			className="sticky top-3 z-30 mb-3 md:mb-4 flex justify-center"
		>
			<ul
				ref={listRef}
				className="relative flex w-full sm:w-auto gap-1 rounded-full border border-[#d2c4a4] dark:border-[#253c59] bg-[#faf5ec]/90 dark:bg-[#172231]/90 backdrop-blur-md p-1 shadow-sm"
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
						<li key={view.id} className="relative flex-1 sm:flex-none">
							<Link
								to={view.path}
								data-view={view.id}
								activeOptions={{ exact: true }}
								resetScroll={false}
								onClick={(e) => {
									trackEvent("select_view", { view: view.id });
									if (e.currentTarget.getAttribute("aria-current") === "page") {
										e.preventDefault();
										onReselect(view.id);
									}
								}}
								className={cn(
									"block rounded-full px-2 sm:px-4 py-1.5 text-center text-[13px] sm:text-sm font-semibold whitespace-nowrap transition-colors",
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
		</nav>
	);
}
