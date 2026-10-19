import { expect, type Page, test } from "@playwright/test";

const CV_PATH = "/pdf/cv-gaetan-boyron-developpeur.pdf";
const LINKEDIN_URL =
	"https://www.linkedin.com/in/ga%C3%ABtan-boyron-developpeur-web/";

const INTRO_KEY = "lcdw-intro-seen";

// Hors tests dédiés, l'écran de chargement est considéré comme déjà vu
test.beforeEach(async ({ page }, testInfo) => {
	if (!testInfo.title.startsWith("intro")) {
		await page.addInitScript(
			(key) => sessionStorage.setItem(key, "1"),
			INTRO_KEY,
		);
	}
	await page.goto("/");
});

// Une carte (section) par son titre ; .last() = la carte, pas le chapitre qui la contient
function cardByTitle(page: Page, name: string) {
	return page
		.locator("section", { has: page.getByRole("heading", { name }) })
		.last();
}

async function waitForHydration(page: Page) {
	await page.waitForFunction(() => {
		const link = document.querySelector("nav a");
		return !!link && Object.keys(link).some((k) => k.startsWith("__react"));
	});
}

test("has title", async ({ page }) => {
	await expect(page).toHaveTitle(
		"Gaëtan Boyron — Développeur Fullstack React/Node.js",
	);
});

test("links to the CV pdf in a new tab", async ({ page, request }) => {
	const link = page.locator(`a[href="${CV_PATH}"]`);
	await expect(link).toHaveAttribute("target", "_blank");

	const response = await request.get(CV_PATH);
	expect(response.ok()).toBe(true);
	expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("shows the freelance card with a mailto CTA", async ({ page }) => {
	const card = cardByTitle(page, "Freelance");
	await expect(card).toBeVisible();
	await expect(card.getByText(/^(Disponible|Indisponible)/)).toBeVisible();

	const cta = card.getByRole("link", { name: /Discutons de votre projet/ });
	await expect(cta).toHaveAttribute(
		"href",
		`mailto:contact@lecuistotduweb.fr?subject=${encodeURIComponent("Mission freelance — ")}`,
	);

	await page.evaluate(() => {
		const w = window as unknown as { events: unknown[]; gtag: unknown };
		w.events = [];
		w.gtag = (...args: unknown[]) => w.events.push(args);
		document.addEventListener("click", (e) => e.preventDefault());
	});
	// Re-clique jusqu'à l'hydratation : le HTML SSR n'a pas encore le onClick
	await expect
		.poll(async () => {
			await cta.click();
			return page.evaluate(
				() => (window as unknown as { events: unknown[][] }).events,
			);
		})
		.toContainEqual(["event", "click_freelance", undefined]);
});

test("links to LinkedIn in a new tab", async ({ page }) => {
	const link = page.getByRole("link", { name: "Voir mon profil LinkedIn" });
	await expect(link).toHaveAttribute("href", LINKEDIN_URL);
	await expect(link).toHaveAttribute("target", "_blank");
});

test("project carousel navigates, autoplays and pauses", async ({ page }) => {
	const card = cardByTitle(page, "Projets");
	const counter = card.getByText(/^\d{2} \/ 07$/);
	await expect(counter).toHaveText("01 / 07");

	// Avance automatique (5 s) — la souris ne doit pas survoler la carte
	await page.mouse.move(0, 0);
	await expect(counter).toHaveText("02 / 07", { timeout: 8000 });

	await card.getByRole("button", { name: "Mettre le défilement en pause" }).click();
	await card.getByRole("button", { name: "Projet suivant" }).click();
	await expect(counter).toHaveText("03 / 07");

	await card.getByRole("button", { name: "Projet précédent" }).click();
	await card.getByRole("button", { name: "Projet précédent" }).click();
	await card.getByRole("button", { name: "Projet précédent" }).click();
	await expect(counter).toHaveText("07 / 07");

	await page.mouse.move(0, 0);
	await page.waitForTimeout(6000);
	await expect(counter).toHaveText("07 / 07");
	await expect(
		card.getByRole("button", { name: "Reprendre le défilement" }),
	).toBeVisible();
});

const CHAPTERS = [
	{ path: "/profil", id: "profil", label: "Profil", step: 1 },
	{ path: "/projets", id: "projets", label: "Projets", step: 2 },
	{ path: "/freelance", id: "freelance", label: "Freelance", step: 3 },
	{ path: "/contact", id: "contact", label: "Contact", step: 4 },
];

for (const chapter of CHAPTERS) {
	test(`route ${chapter.path} lands on its chapter`, async ({ page }) => {
		await page.goto(chapter.path);
		await expect(page).toHaveTitle(`${chapter.label} — Gaëtan Boyron`);
		const nav = page.getByRole("navigation", { name: "Chapitres" });
		await expect(
			nav.getByRole("link", { name: chapter.label, exact: true }),
		).toHaveAttribute("aria-current", "page");
		const section = page.locator(`section#${chapter.id}`);
		await expect(section).toContainText(`Étape ${chapter.step} / 4`);
		// Le chapitre est en haut de l'écran, sous le menu
		await expect
			.poll(() =>
				section.evaluate((el) => Math.round(el.getBoundingClientRect().top)),
			)
			.toBeLessThan(120);
	});
}

test("scrolling updates the active chapter, URL and title", async ({ page }) => {
	await waitForHydration(page);
	await page.evaluate(() =>
		window.scrollTo(0, document.getElementById("projets")?.offsetTop ?? 0),
	);
	await expect(page).toHaveURL(/\/projets$/);
	await expect(page).toHaveTitle("Projets — Gaëtan Boyron");
	await expect(
		page
			.getByRole("navigation", { name: "Chapitres" })
			.getByRole("link", { name: "Projets", exact: true }),
	).toHaveAttribute("aria-current", "page");
});

test("menu scrolls to a chapter without reloading", async ({ page }) => {
	await waitForHydration(page);
	await page.evaluate(() => {
		(window as unknown as { marker: boolean }).marker = true;
	});
	await page
		.getByRole("navigation", { name: "Chapitres" })
		.getByRole("link", { name: "Contact", exact: true })
		.click();
	await expect(page).toHaveURL(/\/contact$/);
	await expect
		.poll(() =>
			page
				.locator("section#contact")
				.evaluate((el) => Math.round(el.getBoundingClientRect().top)),
		)
		.toBeLessThan(120);
	expect(
		await page.evaluate(() => (window as unknown as { marker?: boolean }).marker),
	).toBe(true);
});

test("intro plays once per session and can be skipped", async ({ page }) => {
	const loader = page.locator(".intro-loader");
	await expect(loader).toBeVisible();
	await expect(page.getByText(/^\d+%$/)).toBeVisible();
	await waitForHydration(page);
	await page.getByRole("button", { name: "Passer l'intro" }).click();
	await expect(loader).toHaveCount(0);
	await expect(page.locator("html")).not.toHaveClass(/intro-playing/);
	await expect(page.locator("main")).not.toHaveAttribute("inert");

	// Même session : pas rejoué
	await page.reload();
	await expect(loader).toBeHidden();
});

test("intro ends on its own and reveals the page", async ({ page }) => {
	await expect(page.locator(".intro-loader")).toHaveCount(0, {
		timeout: 6000,
	});
	await expect(
		page.locator("[data-avatar-target]"),
	).toBeVisible();
	await expect(page.getByRole("heading", { name: "LeCuistotduWeb" })).toBeInViewport();
});

test("contact card copies the e-mail address", async ({ page, context }) => {
	await context.grantPermissions(["clipboard-read", "clipboard-write"]);
	await page.goto("/contact");
	const card = cardByTitle(page, "Contact");
	await expect
		.poll(async () => {
			await card.getByRole("button", { name: "Copier l'adresse e-mail" }).click();
			return page.evaluate(() => navigator.clipboard.readText());
		})
		.toBe("contact@lecuistotduweb.fr");
	await expect(
		card.getByRole("link", { name: "Écrire un e-mail" }),
	).toHaveAttribute("href", "mailto:contact@lecuistotduweb.fr");
});
