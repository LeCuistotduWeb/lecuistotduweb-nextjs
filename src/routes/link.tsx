import { createFileRoute } from "@tanstack/react-router";
import { Check, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import Avatar from "#/components/avatar";
import { Button } from "#/components/ui/button";
import { siteConfig } from "#/config";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/link")({
	head: () => ({
		meta: [
			{ title: `${siteConfig.name} — Profil` },
			{
				name: "description",
				content: `Retrouvez ${siteConfig.name} (${siteConfig.alias}) sur LinkedIn, GitHub et scannez le QR code pour visiter le site.`,
			},
			{ name: "og:title", content: `${siteConfig.name} — Profil` },
			{ name: "og:type", content: "profile" },
			{ name: "og:url", content: `${siteConfig.url}/link` },
			{ name: "og:image", content: "/perso.png" },
			{ name: "robots", content: "noindex" },
		],
	}),
	component: LinkPage,
});

function IconGitHub({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
			className={className}
		>
			<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
		</svg>
	);
}

function IconLinkedIn({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
			className={className}
		>
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}

function EmailIcon({ className }: { className?: string }) {
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

const LINK_ITEM_CLASS =
	"bg-popover dark:bg-card text-foreground border border-border dark:border-transparent";

const LINKS = [
	{
		icon: IconLinkedIn,
		label: "LinkedIn",
		sub: siteConfig.name,
		href: siteConfig.social.linkedin,
		className: LINK_ITEM_CLASS,
	},
	{
		icon: IconGitHub,
		label: "GitHub",
		sub: siteConfig.alias,
		href: siteConfig.social.github,
		className: LINK_ITEM_CLASS,
	},
	{
		icon: EmailIcon,
		label: "Email",
		sub: siteConfig.email,
		href: `mailto:${siteConfig.email}`,
		className: LINK_ITEM_CLASS,
	},
];

function ShareButton() {
	const [copied, setCopied] = useState(false);

	const handleShare = async () => {
		const shareData = {
			title: `${siteConfig.name} — ${siteConfig.role}`,
			url: `${siteConfig.url}/link`,
		};
		trackEvent("click_share_profile");
		if (navigator.share) {
			try {
				await navigator.share(shareData);
			} catch {
				// annulé par l'utilisateur
			}
			return;
		}
		await navigator.clipboard.writeText(shareData.url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Button variant="ghost" type="button" onClick={handleShare}>
			{copied ? (
				<>
					<Check className="size-4" /> Lien copié
				</>
			) : (
				<>
					<Share2 className="size-4" /> Partager ce profil
				</>
			)}
		</Button>
	);
}

function LinkPage() {
	const profileUrl = siteConfig.url;

	return (
		<main className="min-h-screen flex items-center justify-center p-4 pb-28">
			<div className="w-full max-w-sm rise-in">
				<div className="rounded-3xl border border-border bg-popover/90 backdrop-blur-sm dark:border-card p-6 flex flex-col items-center text-center gap-1">
					<div className="size-24 p-2 rounded-full bg-card border border-border flex items-center justify-center overflow-hidden shrink-0">
						<div className="[&>svg]:w-full [&>svg]:h-full">
							<Avatar />
						</div>
					</div>

					<h1 className="mt-3 text-xl font-bold text-foreground">
						{siteConfig.name}
					</h1>
					<p className="text-sm text-text-subtle dark:text-muted-foreground">
						{siteConfig.role}
					</p>

					<div className="w-full mt-5 flex flex-col items-center gap-3">
						<div className="rounded-2xl bg-white p-3 shadow-sm">
							<QRCodeSVG
								value={profileUrl}
								size={144}
								bgColor="#ffffff"
								fgColor="#253c59"
								level="M"
								marginSize={0}
							/>
						</div>
						<p className="text-xs text-text-ghost">
							Scannez pour visiter{" "}
							<a
								href={siteConfig.url}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => trackEvent("click_qr_link")}
								className="font-medium text-text-subtle dark:text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
							>
								{siteConfig.shortUrl}
							</a>
						</p>
					</div>

					<div className="w-full mt-6 pt-6 border-t border-border dark:border-card grid grid-cols-3 gap-2.5">
						{LINKS.map(({ icon: Icon, label, href, className }) => (
							<a
								key={label}
								href={href}
								target={href.startsWith("mailto:") ? undefined : "_blank"}
								rel={
									href.startsWith("mailto:") ? undefined : "noopener noreferrer"
								}
								onClick={() =>
									trackEvent("click_social", { platform: label.toLowerCase() })
								}
								className={cn(
									"flex flex-col items-center justify-center gap-1.5 aspect-square rounded-xl transition-transform active:scale-[0.98]",
									className,
								)}
							>
								<Icon className="size-7 shrink-0" />
								<span className="text-xs font-medium">{label}</span>
							</a>
						))}
					</div>

					<div className="w-full mt-5">
						<ShareButton />
					</div>
				</div>
			</div>
		</main>
	);
}
