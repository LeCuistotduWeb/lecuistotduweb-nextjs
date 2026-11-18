/// <reference types="vite/client" />

interface ImportMetaEnv {
	/** URL publique du site, sans slash final (ex. https://lecuistotduweb.fr). */
	readonly VITE_SITE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
