import {
	type ComponentPropsWithoutRef,
	type ElementType,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { getScrollEngine } from "./index";
import type { ProgressOptions, RevealOptions } from "./types";

// Couche React : les composants n'utilisent que ces hooks / composants, jamais
// le moteur directement.

export function useReveal<T extends HTMLElement>(options: RevealOptions) {
	const cleanup = useRef<(() => void) | null>(null);
	const { variant, delay } = options;
	return useCallback(
		(element: T | null) => {
			cleanup.current?.();
			cleanup.current = element
				? getScrollEngine().reveal(element, { variant, delay })
				: null;
		},
		[variant, delay],
	);
}

export function useParallax<T extends HTMLElement>(speed: number) {
	const cleanup = useRef<(() => void) | null>(null);
	return useCallback(
		(element: T | null) => {
			cleanup.current?.();
			cleanup.current = element
				? getScrollEngine().parallax(element, { speed })
				: null;
		},
		[speed],
	);
}

/** Index de l'étape qui croise le milieu de l'écran (-1 : avant la 1re). */
export function useActiveStep(count: number) {
	const elements = useRef<(HTMLElement | null)[]>([]);
	const [active, setActive] = useState(-1);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const index = elements.current.indexOf(entry.target as HTMLElement);
					if (entry.isIntersecting) setActive(index);
					// Remonte au-dessus de la 1re étape : retour à l'écran d'accueil
					else if (index === 0 && entry.boundingClientRect.top > 0)
						setActive(-1);
				}
			},
			{ rootMargin: "-50% 0px -50% 0px" },
		);
		for (const element of elements.current.slice(0, count)) {
			if (element) observer.observe(element);
		}
		return () => observer.disconnect();
	}, [count]);

	const register = (index: number) => (element: HTMLElement | null) => {
		elements.current[index] = element;
	};
	return { active, register };
}

/** Avancement du scroll dans l'élément, exposé en `--scroll-progress`. */
export function useScrollProgress<T extends HTMLElement>(
	mode: ProgressOptions["mode"] = "enter",
) {
	const cleanup = useRef<(() => void) | null>(null);
	return useCallback(
		(element: T | null) => {
			cleanup.current?.();
			cleanup.current = element
				? getScrollEngine().progress(element, { mode })
				: null;
		},
		[mode],
	);
}

/** Lance les révélations (appelé à la fin de l'écran de chargement). */
export function useStartScrollAnimations(when: boolean) {
	useEffect(() => {
		if (when) getScrollEngine().start();
	}, [when]);
}

type RevealProps<T extends ElementType> = {
	as?: T;
	variant?: RevealOptions["variant"];
	delay?: number;
	/**
	 * Haut de page : animation en CSS pur, jouée dès le premier affichage sans
	 * attendre le JavaScript (meilleur LCP). Même rendu que la révélation au
	 * scroll ; voir [data-reveal-instant] dans styles.css.
	 */
	instant?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

function instantProps(
	variant: string,
	delay: number | undefined,
	style: React.CSSProperties | undefined,
) {
	return {
		"data-reveal-instant": variant,
		style: {
			...style,
			"--reveal-delay": `${delay ?? 0}ms`,
		} as React.CSSProperties,
	};
}

export function Reveal<T extends ElementType = "div">({
	as,
	variant = "rise",
	delay,
	instant = false,
	...props
}: RevealProps<T>) {
	const Tag = (as ?? "div") as ElementType;
	const ref = useReveal<HTMLElement>({ variant, delay });
	if (instant)
		return <Tag {...props} {...instantProps(variant, delay, props.style)} />;
	return <Tag ref={ref} {...props} />;
}

/** Titre dont les mots apparaissent l'un après l'autre. */
export function RevealWords<T extends ElementType = "h2">({
	as,
	text,
	delay,
	instant = false,
	...props
}: {
	as?: T;
	text: string;
	delay?: number;
	/** Voir Reveal : animation CSS dès le premier affichage */
	instant?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">) {
	const Tag = (as ?? "h2") as ElementType;
	const ref = useReveal<HTMLElement>({ variant: "words", delay });
	const words = text.split(" ");
	const tagProps = instant
		? { ...props, ...instantProps("words", delay, props.style) }
		: { ...props, ref };
	return (
		<Tag {...tagProps}>
			{words.map((word, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: mots statiques, l'ordre ne change pas
				<span key={i}>
					<span
						className="reveal-word"
						style={{ "--i": i } as React.CSSProperties}
					>
						{word}
					</span>
					{i < words.length - 1 ? " " : null}
				</span>
			))}
		</Tag>
	);
}
