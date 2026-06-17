import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "#/config";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";

export function LinkedInCard({ className }: { className?: string }) {
	return (
		<a
			href={siteConfig.social.linkedin}
			target="_blank"
			rel="noreferrer"
			onClick={() => trackEvent("click_linkedin")}
			className={cn(
				"group card-lift relative rounded-2xl dark:bg-[#0A66C2] bg-[#588dc3] aspect-square flex items-center justify-center text-white",
				className,
			)}
			aria-label="Voir mon profil LinkedIn"
		>
			<svg
				fill="white"
				xmlns="http://www.w3.org/2000/svg"
				width="110"
				height="110"
				viewBox="0 0 24 24"
			>
				<path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
			</svg>
			<div className="absolute bottom-3 right-3 rounded-full border border-white/50 p-2 transition-colors group-hover:bg-white/10 group-hover:border-white">
				<ArrowUpRight className="size-4 text-white" />
			</div>
		</a>
	);
}
