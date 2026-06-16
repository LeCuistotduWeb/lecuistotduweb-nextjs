import { ArrowUpRight } from "lucide-react";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";
import { CardTitle } from "./card-title";

export function CvCard({ className }: { className?: string }) {
	return (
		<a
			href="/pdf/cv-gaetan-boyron-developpeur.pdf"
			target="_blank"
			rel="noreferrer"
			onClick={() => trackEvent("click_cv")}
			className={cn(
				"group card-lift aspect-square relative overflow-hidden rounded-2xl border border-[#d2c4a4] dark:border-[#1c2a3a] bg-[#faf5ec]/90 dark:bg-[#172231]/90 flex flex-col",
				className,
			)}
		>
			<div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-3">
				<CardTitle className="mb-0">Curriculum Vitae</CardTitle>
				<div className="rounded-full border border-[#d2c4a4] dark:border-[#1c2a3a] p-1.5">
					<ArrowUpRight className="size-3.5 text-[#8a7560] dark:text-[#6b8fa8]" />
				</div>
			</div>

			<div className="relative mx-4 mb-4 min-h-40">
				<img
					src="/cv-p1.png"
					alt="Aperçu du CV de Gaëtan Boyron"
					className="absolute top-0 left-0 w-full translate-y-[10%] transition-transform duration-500 ease-out group-hover:translate-y-0 rounded-sm"
				/>
			</div>
		</a>
	);
}
