import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders, getRequestIP } from "@tanstack/react-start/server";
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

// IP bannies, renseignées via l'env BLOCKED_IPS (séparées par des virgules).
// Un envoi depuis une de ces IP est ignoré silencieusement.
function isBlockedIp(ip: string) {
	const blocked = (process.env.BLOCKED_IPS ?? "")
		.split(",")
		.map((v) => v.trim())
		.filter(Boolean);
	return blocked.includes(ip);
}

// Métadonnées de traçage ajoutées au mail reçu : de quoi identifier ou
// signaler l'auteur d'un message abusif (IP + horodatage).
function requestMeta(ip: string) {
	const h = getRequestHeaders() as unknown as Record<
		string,
		string | undefined
	>;
	return [
		`IP : ${ip}`,
		`Navigateur : ${h["user-agent"] ?? "?"}`,
		`Page : ${h.referer ?? "?"}`,
		// Pays/ville si l'hébergeur les fournit (Vercel ou Cloudflare).
		(h["x-vercel-ip-country"] ?? h["cf-ipcountry"]) &&
			`Pays : ${h["x-vercel-ip-country"] ?? h["cf-ipcountry"]}`,
		h["x-vercel-ip-city"] && `Ville : ${h["x-vercel-ip-city"]}`,
		`Date : ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}`,
	]
		.filter(Boolean)
		.join("\n");
}

function buildEmail(data: ContactInput, meta: string) {
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
	return {
		subject,
		text: `${header}\n\n${data.message}\n\n— — —\n${meta}`,
	};
}

export const sendContactFn = createServerFn({ method: "POST" })
	.validator((data: unknown) => contactSchema.parse(data))
	.handler(async ({ data }) => {
		// Robot : on fait comme si tout s'était bien passé
		if (data.website) return { ok: true as const };

		const ip = getRequestIP({ xForwardedFor: true }) ?? "inconnue";

		// IP bannie : on fait comme si l'envoi avait réussi, sans rien envoyer
		if (isBlockedIp(ip)) return { ok: true as const };

		if (isRateLimited(ip)) throw new Error("rate_limited");

		const apiKey = process.env.RESEND_API_KEY;
		if (!apiKey) throw new Error("missing_api_key");

		const { subject, text } = buildEmail(data, requestMeta(ip));
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
