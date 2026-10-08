import { useId } from "react";
import { cn } from "#/lib/utils";

// L'avatar occupe 110px pour un cercle de 176px
const AVATAR_RATIO = 150 / 176;

export function OrbitAvatar({
	size = 176,
	text = "OPEN TO WORK",
	className,
}: {
	size?: number;
	text?: string;
	className?: string;
}) {
	const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
	const orbitId = `orbit-${uid}`;
	const avatarSize = size * AVATAR_RATIO;

	return (
		<div
			className={cn("relative shrink-0", className)}
			style={{ width: size, height: size }}
		>
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
					<textPath href={`#${orbitId}`}>{`${text} • `.repeat(3)}</textPath>
				</text>
			</svg>
			<div className="absolute inset-0 flex items-center justify-center">
				<img
					src="/lcdw-avatar.png"
					alt="Avatar de LeCuistotduWeb"
					width={avatarSize}
					height={avatarSize}
				/>
			</div>
		</div>
	);
}
