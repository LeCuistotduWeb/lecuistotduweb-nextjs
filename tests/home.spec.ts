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

test("links to LinkedIn in a new tab", async ({ page }) => {
	const link = page.getByRole("link", { name: "Voir mon profil LinkedIn" });
	await expect(link).toHaveAttribute("href", LINKEDIN_URL);
	await expect(link).toHaveAttribute("target", "_blank");
});
