import { useId } from "react";
import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import Avatar from "./avatar";

export function AvatarCard({ className }: { className?: string }) {
	const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
	const orbitId = `orbit-${uid}`;

	return (
		<BentoCard className={cn("p-0 relative overflow-hidden min-h-64", className)}>
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="relative size-44">
					<svg
						viewBox="0 0 200 200"
						className="absolute inset-0 w-full h-full animate-orbit"
						aria-hidden="true"
					>
						<defs>
							<path
								id={orbitId}
								d="M 100,100 m -88,0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0"
								fill="none"
							/>
						</defs>
						<text fontSize="11" fontWeight="700" fill="#f25353" letterSpacing="6">
							<textPath href={`#${orbitId}`}>
								OPEN TO WORK • OPEN TO WORK • OPEN TO WORK •{" "}
							</textPath>
						</text>
					</svg>
					<div className="absolute inset-0 flex items-center justify-center">
						<Avatar/>
					</div>
				</div>
			</div>
		</BentoCard>
	);
}
