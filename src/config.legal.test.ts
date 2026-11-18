import { describe, expect, it } from "vitest";
import { siteConfig } from "#/config";

// Mentions légales obligatoires (LCEN) : bloque tant qu'elles sont incomplètes
describe("mentions légales", () => {
	it("SIRET renseigné (14 chiffres)", () => {
		expect(siteConfig.legal.siret.replace(/\s/g, "")).toMatch(/^\d{14}$/);
	});
	it("adresse renseignée", () => {
		expect(siteConfig.legal.address.trim().length).toBeGreaterThan(10);
	});
});
