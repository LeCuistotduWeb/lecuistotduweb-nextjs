export const SKILLS = [
	"ReactJs",
	"NextJs",
	"TypeScript",
	"JavaScript",
	"Node.js",
	"PHP",
	"MySQL",
	"PostgreSQL",
	"HTML5",
	"CSS3",
	"SCSS",
	"TailwindCSS",
	"Symfony 3/4",
	"PrismaJs",
	"Storybook",
	"Jest",
	"React Testing Library",
	"Cypress",
	"Playwright",
	"Figma",
	"Adobe Suite",
	"WordPress",
	"Git",
	"Vercel",
	"NPM",
	"Claude Code",
	"Claude",
	"MCP",
	"Gemini API",
	"Mistral API",
	"Chatbots IA",
	"Prompt engineering",
] as const;

/**
 * La stack par domaine (page d'accueil), version courte orientée freelance :
 * l'IA en premier, puis le cœur React / Next.js. La liste complète (SKILLS)
 * sert au chat IA.
 */
export const SKILL_GROUPS: {
	id: "ai" | "front" | "back" | "tests" | "tools";
	label: string;
	items: (typeof SKILLS)[number][];
}[] = [
	{
		id: "ai",
		label: "IA",
		items: [
			"Claude Code",
			"Claude",
			"MCP",
			"Chatbots IA",
			"Gemini API",
			"Mistral API",
			"Prompt engineering",
		],
	},
	{
		id: "front",
		label: "Front-end",
		items: ["ReactJs", "NextJs", "TypeScript", "TailwindCSS"],
	},
	{
		id: "back",
		label: "Back-end & données",
		items: ["Node.js", "PostgreSQL", "PrismaJs", "PHP"],
	},
	{
		id: "tests",
		label: "Qualité & tests",
		items: ["Jest", "React Testing Library", "Playwright", "Storybook"],
	},
	{
		id: "tools",
		label: "Design & outils",
		items: ["Figma", "WordPress", "Vercel"],
	},
];

export const QUALITIES = [
	"Passionné",
	"Créatif",
	"Autonome",
	"Rigoureux",
	"Collaboratif",
	"Persévérant",
	"Curieux",
	"Polyvalent",
	"Force de proposition",
	"Esprit d'équipe",
] as const;
