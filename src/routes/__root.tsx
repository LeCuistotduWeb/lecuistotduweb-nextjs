import manropeLatin from "@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { AnimatedBackground } from "#/components/animated-background";
import { Button } from "#/components/ui/button";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Gaëtan Boyron — Fullstack Developer",
			},
		],
		links: [
			{
				rel: "preload",
				href: manropeLatin,
				as: "font",
				type: "font/woff2",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "48x48",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png",
			},
		],
		scripts: import.meta.env.PROD
			? [
					{
						src: "https://www.googletagmanager.com/gtag/js?id=G-D3ME6QTB34",
						async: true,
					},
				]
			: [],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function NotFound() {
	return (
		<main className="page-wrap flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
			<p className="text-sm font-semibold uppercase tracking-widest text-[#f25353]">
				404
			</p>
			<h1 className="display-title text-4xl">Page introuvable</h1>
			<p className="text-muted-foreground">
				Cette page n'existe pas ou a été déplacée.
			</p>
			<Button asChild variant="outline" size="lg">
				<Link to="/">Retour à l'accueil</Link>
			</Button>
		</main>
	);
}

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})();`;

// Avant le premier rendu : faut-il jouer l'écran de chargement (une fois par
// session, pages en chapitres uniquement, pas si mouvement réduit) et cacher
// les éléments à révéler au scroll ? Si le JS de l'app n'a pas démarré après
// 4 s, on réaffiche tout (secours).
const experienceScript = `(function(){var d=document.documentElement;try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;var p=/^\\/(experience|projets|contact)?\\/?$/.test(location.pathname);if(!r){d.classList.add('reveal-ready');setTimeout(function(){if(!window.__lcdwAnim)d.classList.remove('reveal-ready')},4000)}if(r||!p||sessionStorage.getItem('lcdw-intro-seen'))d.classList.add('intro-skip');else d.classList.add('intro-playing')}catch(e){d.classList.add('intro-skip')}})();`;

const gaScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-D3ME6QTB34');`;

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: inline theme init must run before paint */}
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: intro / reveal init must run before paint */}
				<script dangerouslySetInnerHTML={{ __html: experienceScript }} />
				<noscript>
					<style>{".intro-loader{display:none}"}</style>
				</noscript>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: GA4 init */}
				<script dangerouslySetInnerHTML={{ __html: gaScript }} />
				<HeadContent />
			</head>
			<body>
				<AnimatedBackground />
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
