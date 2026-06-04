import { siteConfig } from "#/config";
import { BentoCard } from "./bento-card";

function IconGitHub({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
			<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
		</svg>
	);
}

function IconLinkedIn({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}

function IconCodePen({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" className={className}>
			<g>
				<path d="M24,48L0.5,32.8V15.2L24,0l23.5,15.2v17.6L24,48z M5.4,30.1l18.6,12l18.6-12V17.9L24,5.9l-18.6,12V30.1z" />
				<path d="M24,34.4L1.5,18.6l3-4L24,28.5l19.5-13.9l3,4L24,34.4z" />
				<path d="M43.7,33.4L24,19.8L4.3,33.4l-2.7-4L24,13.9l22.4,15.6L43.7,33.4z" />
				<path d="M21.5,4.2h4.9v12.5h-4.9V4.2z M21.5,31.3h4.9v12.5h-4.9V31.3z" />
			</g>
		</svg>
	);
}

function EmailIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
			<path d="M12 13.065L.615 5.25h22.77L12 13.065zM12 15.435L.615 7.62v11.73h22.77V7.62L12 15.435z" />
		</svg>
	);
}

const SOCIAL = [
	{ icon: EmailIcon, label: "Email", handle: siteConfig.email, href: `mailto:${siteConfig.email}` },
	{ icon: IconGitHub,  label: "GitHub",  handle: siteConfig.alias,              href: siteConfig.social.github   },
	{ icon: IconLinkedIn,label: "LinkedIn",handle: siteConfig.name,               href: siteConfig.social.linkedin },
	// { icon: IconCodePen, label: "CodePen", handle: siteConfig.alias.toLowerCase(),href: siteConfig.social.codepen  },
];

export function SocialCard({ className }: { className?: string }) {
	return (
		<BentoCard className={className}>
			<h2 className="text-xs font-semibold text-[#93a8be] dark:text-[#7a8fa0] uppercase tracking-widest mb-4">
				Liens
			</h2>
			<div className="flex flex-col gap-3">
				{SOCIAL.map(({ icon: Icon, label, handle, href }) => (
					<a
						key={label}
						href={href}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-3 text-[#4a6a8a] dark:text-[#a1adbc] hover:text-[#253c59] dark:hover:text-white transition-colors group"
					>
						<div className="size-8 rounded-lg bg-[#e6d3ae] dark:bg-[#1c2a3a] flex items-center justify-center group-hover:bg-[#f25353]/10 dark:group-hover:bg-[#f25353]/20 border border-[#d2c4a4] dark:border-[#253c59] group-hover:border-[#f25353]/40 transition-colors shrink-0">
							<Icon className="size-4" />
						</div>
						<div className="min-w-0">
							<p className="text-[10px] text-[#93a8be] dark:text-[#556a7a] uppercase tracking-wider">
								{label}
							</p>
							<p className="text-sm font-medium truncate">{handle}</p>
						</div>
					</a>
				))}
			</div>
		</BentoCard>
	);
}
