import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "#/lib/utils";
import { Button } from "./ui/button";

type Theme = "light" | "dark" | "system";

export function applyTheme(theme: Theme) {
	const dark =
		theme === "dark" ||
		(theme === "system" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);
	document.documentElement.classList.toggle("dark", dark);
}

const META: Record<
	Theme,
	{
		icon: React.ComponentType<{ className?: string }>;
		label: string;
		next: Theme;
	}
> = {
	system: { icon: Monitor, label: "Système", next: "light" },
	light: { icon: Sun, label: "Clair", next: "dark" },
	dark: { icon: Moon, label: "Sombre", next: "system" },
};

export function useTheme() {
	const [theme, setTheme] = useState<Theme>("system");

	useEffect(() => {
		const stored = localStorage.getItem("theme") as Theme | null;
		if (stored === "light" || stored === "dark") setTheme(stored);
	}, []);

	useEffect(() => {
		if (theme === "system") localStorage.removeItem("theme");
		else localStorage.setItem("theme", theme);
		applyTheme(theme);
	}, [theme]);

	return { theme, setTheme, cycle: () => setTheme((t) => META[t].next) };
}

export function ThemeToggle({
	variant = "floating",
	className,
}: {
	/** `floating` : bouton flottant en bas d'écran ; `nav` : icône compacte dans la nav */
	variant?: "floating" | "nav";
	className?: string;
}) {
	const { theme, cycle } = useTheme();
	const { icon: Icon, label } = META[theme];
	const ariaLabel = `Thème actuel : ${label}. Cliquer pour changer.`;

	if (variant === "nav") {
		return (
			<button
				type="button"
				onClick={cycle}
				aria-label={ariaLabel}
				title={`Thème : ${label}`}
				className={cn(
					"group flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[#e6d3ae]/70 dark:hover:bg-[#1c2a3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#253c59] dark:focus-visible:outline-white",
					className,
				)}
			>
				<Icon className="size-4 text-[#4a6a8a] dark:text-[#a1adbc] group-hover:text-[#f25353] dark:group-hover:text-[#f25353] transition-colors" />
			</button>
		);
	}

	return (
		<Button
			type="button"
			variant="outline"
			onClick={cycle}
			aria-label={ariaLabel}
			className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-50", className)}
		>
			<Icon className="size-4 text-[#7a95ad] dark:text-[#a1adbc] group-hover:text-[#f25353] dark:group-hover:text-[#f25353] transition-colors" />
			<span className="text-xs font-medium text-[#3a5570] dark:text-[#c5d5e5]">
				{label}
			</span>
		</Button>
	);
}
