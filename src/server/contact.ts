import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { siteConfig } from "#/config";
import { type ContactInput, contactSchema } from "#/lib/contact";

// Limite de débit en mémoire : suffisant pour un portfolio (remise à zéro au
// redémarrage, propre à chaque instance).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
	if (recent.length >= MAX_PER_WINDOW) {
		hits.set(ip, recent);
		return true;
	}
	recent.push(now);
	hits.set(ip, recent);
	return false;
}

function buildEmail(data: ContactInput) {
	const subject = ["[Contact]", data.name, data.topic && `— ${data.topic}`]
		.filter(Boolean)
		.join(" ");
	const header = [
		data.topic && `Sujet : ${data.topic}`,
		`Nom : ${data.name}`,
		`E-mail : ${data.email}`,
	]
		.filter(Boolean)
		.join("\n");
	return { subject, text: `${header}\n\n${data.message}` };
}

export const sendContactFn = createServerFn({ method: "POST" })
	.validator((data: unknown) => contactSchema.parse(data))
	.handler(async ({ data }) => {
		// Robot : on fait comme si tout s'était bien passé
		if (data.website) return { ok: true as const };

		if (isRateLimited(getRequestIP({ xForwardedFor: true }) ?? "unknown")) {
			throw new Error("rate_limited");
		}

		const apiKey = process.env.RESEND_API_KEY;
		if (!apiKey) throw new Error("missing_api_key");

		const { subject, text } = buildEmail(data);
		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: `${siteConfig.alias} <${siteConfig.email}>`,
				to: [siteConfig.email],
				reply_to: data.email,
				subject,
				text,
			}),
		});
		if (!res.ok) {
			console.error("Resend", res.status, await res.text());
			throw new Error("send_failed");
		}
		return { ok: true as const };
	});
