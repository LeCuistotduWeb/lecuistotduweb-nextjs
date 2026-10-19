import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { configDefaults, defineConfig } from "vitest/config";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [devtools(), nitro(), tailwindcss(), tanstackStart(), viteReact()],
	test: {
		exclude: [...configDefaults.exclude, "tests/**"],
		passWithNoTests: true,
	},
});

export default config;
