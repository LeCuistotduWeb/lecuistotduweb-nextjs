import {
	createFileRoute,
	Outlet,
	useMatches,
	useNavigate,
} from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Chapters } from "#/components/chapters";
import { IntroLoader } from "#/components/intro-loader";
import { ViewNav } from "#/components/view-nav";
import { trackEvent } from "#/lib/analytics";
import { useStartScrollAnimations } from "#/lib/scroll-animations/react";
import {
	getView,
	getViewByPath,
	PARCOURS,
	VIEWS,
	type ViewId,
} from "#/lib/views";

// Page d'accueil en chapitres. Les routes /, /experience, /projets et
// /contact affichent toutes cette page (/profil et /freelance redirigent) :
// - arriver sur une route (ou cliquer dans le menu) fait défiler au chapitre ;
// - défiler met à jour le chapitre actif, puis l'URL (replace) et le titre.
export const Route = createFileRoute("/_views")({
	component: ViewsLayout,
});

function prefersReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ViewsLayout() {
	const routeView = useMatches({
		select: (matches) => getViewByPath(matches.at(-1)?.pathname ?? "/").id,
	});
	const navigate = useNavigate();
	const [active, setActive] = useState<ViewId>(routeView);
	const [introDone, setIntroDone] = useState(false);
	useStartScrollAnimations(introDone);

	// Défilement lancé par nous : le suivi du scroll est suspendu pendant ce temps
	const programmatic = useRef(false);
	// Navigation déclenchée par le suivi du scroll : ne pas re-défiler
	const fromSpy = useRef<ViewId | null>(null);
	// Dernière route traitée : rend l'effet idempotent (StrictMode le rejoue)
	const handledRoute = useRef<ViewId | null>(null);
	const seen = useRef(new Set<ViewId>());

	const scrollToChapter = useCallback((view: ViewId, instant: boolean) => {
		const section = document.getElementById(view);
		if (!section) return;
		programmatic.current = true;
		setActive(view);
		section.scrollIntoView({
			behavior: instant || prefersReducedMotion() ? "instant" : "smooth",
			block: "start",
		});
		const release = () => {
			programmatic.current = false;
		};
		window.addEventListener("scrollend", release, { once: true });
		setTimeout(release, 1200);
	}, []);

	// Route → défilement
	useEffect(() => {
		if (handledRoute.current === routeView) return;
		const initial = handledRoute.current === null;
		handledRoute.current = routeView;
		if (fromSpy.current === routeView) {
			fromSpy.current = null;
			return;
		}
		if (initial && routeView === "accueil") return;
		scrollToChapter(routeView, initial);
	}, [routeView, scrollToChapter]);

	// Défilement → chapitre actif (ligne au milieu de l'écran)
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (programmatic.current) return;
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(entry.target.id as ViewId);
				}
			},
			{ rootMargin: "-45% 0px -54% 0px" },
		);
		for (const { id } of VIEWS) {
			const section = document.getElementById(id);
			if (section) observer.observe(section);
		}
		return () => observer.disconnect();
	}, []);

	// Chapitre actif stable → URL + titre (sans re-défiler)
	useEffect(() => {
		if (!seen.current.has(active)) {
			seen.current.add(active);
			trackEvent("view_chapter", { chapter: active });
		}
		if (active === routeView) return;
		const timer = setTimeout(() => {
			if (programmatic.current) return;
			fromSpy.current = active;
			navigate({ to: getView(active).path, replace: true, resetScroll: false });
		}, 400);
		return () => clearTimeout(timer);
	}, [active, routeView, navigate]);

	return (
		<>
			<IntroLoader onDone={() => setIntroDone(true)} />
			{/* En mobile, pb-24 laisse la place à la nav fixée en bas */}
			<main className="min-h-screen px-4 pt-4 pb-24 sm:pb-4 md:px-10 md:pt-10 md:pb-10">
				{/* Halo d'ambiance par chapitre (voir .chapter-ambient dans styles.css) */}
				{PARCOURS.map((id) => (
					<div
						key={id}
						aria-hidden="true"
						data-chapter={id}
						data-active={active === id ? "" : undefined}
						className="chapter-ambient"
					/>
				))}
				<div className="mx-auto max-w-6xl">
					<ViewNav
						current={active}
						onReselect={(view) => scrollToChapter(view, false)}
					/>
					<Chapters />
					<Outlet />
				</div>
			</main>
		</>
	);
}
