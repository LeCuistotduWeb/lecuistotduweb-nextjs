import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function applyTheme(theme: Theme) {
	const dark =
		theme === "dark" ||
		(theme === "system" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);
	document.documentElement.classList.toggle("dark", dark);
}

const META: Record<Theme, { icon: React.ComponentType<{ className?: string }>; label: string; next: Theme }> = {
	system: { icon: Monitor, label: "Système",  next: "light" },
	light:  { icon: Sun,     label: "Clair",    next: "dark"  },
	dark:   { icon: Moon,    label: "Sombre",   next: "system" },
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
		<button
			type="button"
			onClick={cycle}
			aria-label={`Thème actuel : ${label}. Cliquer pour changer.`}
			className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-[#d2c4a4] bg-[#faf5ec]/90 backdrop-blur-sm px-4 py-2 shadow-lg dark:border-[#1c2a3a] dark:bg-[#172231]/90 hover:border-[#f25353]/50 dark:hover:border-[#f25353]/50 transition-colors cursor-pointer group"
		>
			<Icon className="size-4 text-[#7a95ad] dark:text-[#a1adbc] group-hover:text-[#f25353] dark:group-hover:text-[#f25353] transition-colors" />
			<span className="text-xs font-medium text-[#3a5570] dark:text-[#c5d5e5]">{label}</span>
		</button>
	);
}
