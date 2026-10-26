// Icône e-mail. `fill="currentColor"` pour hériter de la couleur du texte.
export function EmailIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
			className={className}
		>
			<path d="M12 13.065L.615 5.25h22.77L12 13.065zM12 15.435L.615 7.62v11.73h22.77V7.62L12 15.435z" />
		</svg>
	);
}
