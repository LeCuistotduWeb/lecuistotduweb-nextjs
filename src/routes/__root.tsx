import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ThemeToggle } from "#/components/theme-toggle";

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
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.ico",
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
});

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})();`;

const gaScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-D3ME6QTB34');`;

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="fr">
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: inline theme init must run before paint */}
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: GA4 init */}
				<script dangerouslySetInnerHTML={{ __html: gaScript }} />
				<HeadContent />
			</head>
			<body>
				{children}
				<ThemeToggle />
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
