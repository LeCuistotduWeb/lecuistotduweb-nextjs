// Contrat commun des moteurs d'animation au scroll. Les composants ne parlent
// qu'à ce contrat (via les hooks de ./react) : changer de moteur (ex. GSAP +
// ScrollTrigger) = écrire une nouvelle implémentation et la brancher dans ./index.

export type RevealVariant =
	/** Monte et apparaît (cartes) */
	| "rise"
	/** Apparaît en fondu */
	| "fade"
	/** Grossit légèrement en apparaissant */
	| "scale"
	/** Les mots apparaissent l'un après l'autre (titres) */
	| "words";

export type RevealOptions = {
	variant: RevealVariant;
	/** Délai avant l'animation, en ms (cascade) */
	delay?: number;
};

export type ParallaxOptions = {
	/** Vitesse relative au scroll : 0 = immobile, 0.2 = suit à 20 % (négatif = sens inverse) */
	speed: number;
};

export interface ScrollAnimationEngine {
	/** Révèle l'élément quand il entre dans le viewport. Renvoie le nettoyage. */
	reveal(element: HTMLElement, options: RevealOptions): () => void;
	/** Décale l'élément au scroll. Renvoie le nettoyage. */
	parallax(element: HTMLElement, options: ParallaxOptions): () => void;
	/**
	 * Lance les révélations. Avant l'appel, les éléments sont observés mais
	 * restent cachés (ex. pendant l'écran de chargement).
	 */
	start(): void;
}
