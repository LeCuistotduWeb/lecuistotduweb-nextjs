import { expect, test } from "@playwright/test";

const CV_PATH = "/pdf/cv-gaetan-boyron-developpeur.pdf";
const LINKEDIN_URL =
	"https://www.linkedin.com/in/ga%C3%ABtan-boyron-developpeur-web/";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

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
	const card = page.locator("section", {
		has: page.getByRole("heading", { name: "Freelance" }),
	});
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
	const card = page.locator("section", {
		has: page.getByRole("heading", { name: "Projets" }),
	});
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
