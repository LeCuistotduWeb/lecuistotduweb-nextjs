import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import { OrbitAvatar } from "./orbit-avatar";

export function AvatarCard({ className }: { className?: string }) {
	return (
		<BentoCard
			className={cn("p-0 relative overflow-hidden min-h-64", className)}
		>
			<div className="absolute inset-0 flex items-center justify-center">
				{/* Cible du vol de l'avatar à la fin de l'écran de chargement */}
				<div data-avatar-target>
					<OrbitAvatar />
				</div>
			</div>
		</BentoCard>
	);
}
