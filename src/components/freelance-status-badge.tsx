import { siteConfig } from "#/config";
import { getFreelanceStatusLabel } from "#/lib/freelance";
import { cn } from "#/lib/utils";

export function FreelanceStatusBadge({ className }: { className?: string }) {
	const available = siteConfig.freelance.status === "available";

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
