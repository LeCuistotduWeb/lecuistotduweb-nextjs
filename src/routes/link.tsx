import { createFileRoute } from "@tanstack/react-router";
import { Check, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { EmailIcon } from "#/components/icons/email";
import { IconGitHub } from "#/components/icons/github";
import { IconLinkedIn } from "#/components/icons/linkedin";
import { OrbitAvatar } from "#/components/orbit-avatar";
import { ThemeToggle } from "#/components/theme-toggle";
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
			{ name: "og:image", content: "/lcdw-avatar.png" },
			{ name: "robots", content: "noindex" },
		],
	}),
	component: LinkPage,
});

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
					<OrbitAvatar size={144} />

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
			<ThemeToggle />
		</main>
	);
}
