import { cn } from "#/lib/utils";

export function BentoCard({
	className,
	children,
	as: Tag = "section",
	onPointerMove,
}: {
	className?: string;
	children: React.ReactNode;
	as?: React.ElementType;
	onPointerMove?: React.PointerEventHandler<HTMLElement>;
}) {
	return (
		<Tag
			onPointerMove={onPointerMove}
			className={cn(
				"rounded-2xl border border-[#d2c4a4] bg-[#faf5ec]/90 backdrop-blur-sm p-8 dark:border-[#1c2a3a] dark:bg-[#172231]/90",
				className,
			)}
		>
			{children}
		</Tag>
	);
}
