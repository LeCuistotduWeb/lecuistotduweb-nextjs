import {
	type ComponentPropsWithoutRef,
	type ElementType,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { getScrollEngine } from "./index";
import type { RevealOptions } from "./types";

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
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Reveal<T extends ElementType = "div">({
	as,
	variant = "rise",
	delay,
	...props
}: RevealProps<T>) {
	const Tag = (as ?? "div") as ElementType;
	const ref = useReveal<HTMLElement>({ variant, delay });
	return <Tag ref={ref} {...props} />;
}

/** Titre dont les mots apparaissent l'un après l'autre. */
export function RevealWords<T extends ElementType = "h2">({
	as,
	text,
	delay,
	...props
}: {
	as?: T;
	text: string;
	delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">) {
	const Tag = (as ?? "h2") as ElementType;
	const ref = useReveal<HTMLElement>({ variant: "words", delay });
	const words = text.split(" ");
	return (
		<Tag ref={ref} {...props}>
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
