import { getAvailability } from "#/lib/freelance";
import { cn } from "#/lib/utils";

export function FreelanceStatusBadge({
	className,
	onDark = false,
}: {
	className?: string;
	/** Sur fond sombre quel que soit le thème (carte de l'offre phare) */
	onDark?: boolean;
}) {
	const { now, label } = getAvailability();

	return (
		<p
			className={cn(
				"flex items-center gap-2 text-sm font-semibold",
				now
					? onDark
						? "text-[#34d399]"
						: "text-[#047857] dark:text-[#34d399]"
					: onDark
						? "text-[#fbbf24]"
						: "text-[#b45309] dark:text-[#fbbf24]",
				className,
			)}
		>
			<span aria-hidden="true" className="relative flex size-2.5">
				{now && (
					<span className="absolute inline-flex size-full animate-ping rounded-full bg-[#34d399] opacity-60 motion-reduce:hidden" />
				)}
				<span
					className={cn(
						"relative inline-flex size-2.5 rounded-full",
						now ? "bg-[#10b981]" : "bg-[#f59e0b]",
					)}
				/>
			</span>
			{label}
		</p>
	);
}
