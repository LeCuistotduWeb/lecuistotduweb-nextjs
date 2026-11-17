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

export type ProgressOptions = {
	mode?: "enter" | "follow" | "pin";
};

export interface ScrollAnimationEngine {
	/** Révèle l'élément quand il entre dans le viewport. Renvoie le nettoyage. */
	reveal(element: HTMLElement, options: RevealOptions): () => void;
	/** Décale l'élément au scroll. Renvoie le nettoyage. */
	parallax(element: HTMLElement, options: ParallaxOptions): () => void;
	/**
	 * Expose l'avancement du scroll dans l'élément via la variable CSS
	 * `--scroll-progress`. Mode « enter » : 0 quand il entre par le bas, 1 quand
	 * sa fin atteint 60 % de l'écran. Mode « follow » : part de l'élément passée
	 * au-dessus du milieu de l'écran (frise dont la pointe suit la lecture).
	 * Mode « pin » (section haute dont le contenu est épinglé) : 0 quand son
	 * haut touche le haut de l'écran, 1 quand son bas touche le bas.
	 * Renvoie le nettoyage.
	 */
	progress(element: HTMLElement, options?: ProgressOptions): () => void;
	/**
	 * Lance les révélations. Avant l'appel, les éléments sont observés mais
	 * restent cachés (ex. pendant l'écran de chargement).
	 */
	start(): void;
}
