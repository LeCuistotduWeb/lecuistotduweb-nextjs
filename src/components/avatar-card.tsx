import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import { OrbitAvatar } from "./orbit-avatar";

export function AvatarCard({ className }: { className?: string }) {
	return (
		<BentoCard
			className={cn("p-0 relative overflow-hidden min-h-64", className)}
		>
			<div className="absolute inset-0 flex items-center justify-center">
				<OrbitAvatar />
			</div>
		</BentoCard>
	);
}
