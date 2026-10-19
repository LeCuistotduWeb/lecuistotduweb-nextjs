import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "#/config";
import { trackEvent } from "#/lib/analytics";
import { getFreelanceStatusLabel } from "#/lib/freelance";
import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import { CardTitle } from "./card-title";

const { freelance } = siteConfig;

const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(freelance.mailSubject)}`;

export function FreelanceStatusBadge({ className }: { className?: string }) {
	const available = freelance.status === "available";

	return (
		<p
			className={cn(
				"flex items-center gap-2 text-sm font-semibold",
				available
					? "text-[#047857] dark:text-[#34d399]"
					: "text-[#b45309] dark:text-[#fbbf24]",
				className,
			)}
		>
			<span aria-hidden="true" className="relative flex size-2.5">
				{available && (
					<span className="absolute inline-flex size-full animate-ping rounded-full bg-[#34d399] opacity-60 motion-reduce:hidden" />
				)}
				<span
					className={cn(
						"relative inline-flex size-2.5 rounded-full",
						available ? "bg-[#10b981]" : "bg-[#f59e0b]",
					)}
				/>
			</span>
			{getFreelanceStatusLabel()}
		</p>
	);
}

export function FreelanceCard({ className }: { className?: string }) {
	const available = freelance.status === "available";

	return (
		<BentoCard
			className={cn(
				"group card-lift relative border-[#f25353]/50 dark:border-[#f25353]/40 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
				className,
			)}
		>
			<div className="flex flex-col gap-3 lg:max-w-xs">
				<CardTitle className="mb-0">Freelance</CardTitle>
				<FreelanceStatusBadge />
				<p className="text-[#253c59] dark:text-white text-lg font-semibold leading-snug">
					{available
						? "Je prends des missions freelance."
						: "En mission actuellement — parlons de la suite."}
				</p>
			</div>

			<ul className="flex flex-wrap gap-2 lg:flex-1 lg:justify-center">
				{freelance.missions.map((mission) => (
					<li
						key={mission}
						className="px-3 py-1 rounded-full bg-[#e6d3ae] border border-[#d2c4a4] text-[#3a5570] dark:bg-[#1c2a3a] dark:border-[#253c59] dark:text-[#c5d5e5] text-xs font-medium"
					>
						{mission}
					</li>
				))}
			</ul>

			<a
				href={mailtoHref}
				onClick={() => trackEvent("click_freelance")}
				className="shrink-0 inline-flex items-center justify-center gap-2 self-start lg:self-auto rounded-full bg-[#d93a3a] px-5 py-3 text-sm font-semibold transition-colors group-hover:bg-[#c93434] focus-visible:outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-[#f25353] focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-[#faf5ec] dark:focus-visible:after:ring-offset-[#172231]"
			>
				<span className="text-white">Discutons de votre projet</span>
				<span className="sr-only"> (e-mail)</span>
				<ArrowUpRight aria-hidden="true" className="size-4 text-white" />
			</a>
		</BentoCard>
	);
}
