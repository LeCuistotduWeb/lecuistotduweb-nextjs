import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
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

export function ThemeToggle() {
	const { theme, cycle } = useTheme();
	const { icon: Icon, label } = META[theme];

	return (
		<Button
			type="button"
			variant="outline"
			onClick={cycle}
			aria-label={`Thème actuel : ${label}. Cliquer pour changer.`}
			className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
		>
			<Icon className="size-4 text-[#7a95ad] dark:text-[#a1adbc] group-hover:text-[#f25353] dark:group-hover:text-[#f25353] transition-colors" />
			<span className="text-xs font-medium text-[#3a5570] dark:text-[#c5d5e5]">
				{label}
			</span>
		</Button>
	);
}
