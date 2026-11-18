// Halo qui suit la souris sur une carte (position en variables CSS). La carte
// doit être `group relative isolate overflow-hidden` et appeler
// `trackSpotlight` sur `onPointerMove`.
export function trackSpotlight(event: React.PointerEvent<HTMLElement>) {
	const rect = event.currentTarget.getBoundingClientRect();
	event.currentTarget.style.setProperty(
		"--spot-x",
		`${event.clientX - rect.left}px`,
	);
	event.currentTarget.style.setProperty(
		"--spot-y",
		`${event.clientY - rect.top}px`,
	);
}

export function Spotlight({ color }: { color: string }) {
	return (
		<span
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
			style={{
				background: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color}, transparent 65%)`,
			}}
		/>
	);
}
