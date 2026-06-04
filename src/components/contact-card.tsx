import { Mail } from "lucide-react";
import { BentoCard } from "./bento-card";

export function ContactCard({
	className,
	onOpenModal,
}: {
	className?: string;
	onOpenModal: () => void;
}) {
	return (
		<BentoCard className={`flex flex-col gap-3 ${className ?? ""}`}>
			<h2 className="text-xs font-semibold text-[#93a8be] dark:text-[#7a8fa0] uppercase tracking-widest">
				Contact
			</h2>
			<p className="text-[#4a6a8a] dark:text-[#a1adbc] text-sm leading-relaxed flex-1">
				Disponible pour de nouvelles missions.
			</p>
			<button
				type="button"
				onClick={onOpenModal}
				className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f25353] hover:bg-[#e85f5f] text-white text-sm font-semibold transition-colors cursor-pointer"
			>
				<Mail className="size-4" />
				Me contacter
			</button>
		</BentoCard>
	);
}
