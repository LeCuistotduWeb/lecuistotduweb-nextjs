// Consentement à la mesure d'audience (GA4), conforme aux recommandations de
// la CNIL : rien n'est chargé ni envoyé à Google tant que le visiteur n'a pas
// accepté. Le choix est gardé 13 mois s'il accepte, 6 mois s'il refuse, puis
// la question est reposée.
//
// L'état est lu avant l'hydratation par le script inline de __root.tsx
// (consentScript), qui définit `window.gtag` (ne fait rien sans accord) et
// `window.__lcdwLoadGa` (charge gtag.js une seule fois).

export const GA_ID = "G-D3ME6QTB34";
export const CONSENT_KEY = "lcdw-consent";
const MONTH_MS = 30.44 * 24 * 60 * 60 * 1000;
export const CONSENT_TTL_MS = {
	granted: 13 * MONTH_MS,
	denied: 6 * MONTH_MS,
} as const;

export type ConsentValue = "granted" | "denied";

declare global {
	interface Window {
		__lcdwConsent?: ConsentValue | null;
		__lcdwLoadGa?: () => void;
		__lcdwGa?: number;
	}
}

const OPEN_EVENT = "lcdw:consent-open";

/**
 * Script inline exécuté avant tout le reste : relit le choix enregistré,
 * définit un `gtag` qui ne transmet rien sans accord, et charge GA4 si le
 * visiteur a déjà accepté. En développement, gtag.js n'est jamais chargé.
 */
export function consentScript(loadInThisEnv: boolean) {
	return `(function(){window.dataLayer=window.dataLayer||[];var c=null;try{var s=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');if(s&&(s.v==='granted'||s.v==='denied')&&Date.now()-s.t<(s.v==='granted'?${CONSENT_TTL_MS.granted}:${CONSENT_TTL_MS.denied}))c=s.v}catch(e){}window.__lcdwConsent=c;window.gtag=function(){if(window.__lcdwConsent==='granted')dataLayer.push(arguments)};window.__lcdwLoadGa=function(){if(window.__lcdwGa||window.__lcdwConsent!=='granted')return;window.__lcdwGa=1;gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${GA_ID}',{allow_google_signals:false,allow_ad_personalization_signals:false});${loadInThisEnv ? `var e=document.createElement('script');e.async=true;e.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';document.head.appendChild(e)` : ""}};if(c==='granted')window.__lcdwLoadGa()})();`;
}

export function getConsent(): ConsentValue | null {
	return typeof window === "undefined" ? null : (window.__lcdwConsent ?? null);
}

/** Supprime les cookies _ga / _ga_* sur l'hôte et le domaine parent. */
function clearGaCookies() {
	const host = location.hostname;
	const parts = host.split(".");
	const domains = ["", host, `.${host}`];
	if (parts.length > 2) domains.push(`.${parts.slice(-2).join(".")}`);
	for (const cookie of document.cookie.split(";")) {
		const name = cookie.split("=")[0]?.trim();
		if (!name || !/^_ga(_|$)/.test(name)) continue;
		for (const domain of domains) {
			// biome-ignore lint/suspicious/noDocumentCookie: suppression simple, Cookie Store API pas encore sur Safari < 18.4 / Firefox
			document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
		}
	}
}

export function setConsent(value: ConsentValue) {
	try {
		localStorage.setItem(
			CONSENT_KEY,
			JSON.stringify({ v: value, t: Date.now() }),
		);
	} catch {
		// Stockage indisponible (navigation privée stricte) : choix valable
		// pour cette page seulement
	}
	const wasLoaded = Boolean(window.__lcdwGa);
	window.__lcdwConsent = value;
	if (value === "granted") {
		window.__lcdwLoadGa?.();
		return;
	}
	clearGaCookies();
	// gtag.js déjà chargé continuerait de mesurer les changements de page :
	// on recharge pour repartir sans lui.
	if (wasLoaded) location.reload();
}

/** Rouvre le bandeau (lien « Gérer les cookies »). */
export function openConsentBanner() {
	window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentBannerOpen(callback: () => void) {
	window.addEventListener(OPEN_EVENT, callback);
	return () => window.removeEventListener(OPEN_EVENT, callback);
}
