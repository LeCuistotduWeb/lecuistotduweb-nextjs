import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";
import { AiChatModal } from "./ai-chat-modal";

// Bouton flottant en bas à droite qui ouvre le chat IA. En mobile, il se place
// au-dessus de la nav des chapitres fixée en bas.
export function AiCard({ className }: { className?: string }) {
	const [open, setOpen] = useState(false);

	function handleToggle() {
		if (!open) trackEvent("ai_chat_opened", { source: "widget" });
		setOpen(!open);
	}

	return (
		<>
			{/* .ai-glow impose position: relative, d'où le conteneur fixe séparé */}
			<div
				className={cn(
					"fixed right-4 bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+4.25rem)] z-40 sm:right-6 sm:bottom-6",
					className,
				)}
			>
				<div className="ai-glow rounded-full! shadow-lg shadow-[#253c59]/20">
					<button
						type="button"
						onClick={handleToggle}
						aria-label={open ? "Fermer le chat" : "Posez-moi une question"}
						aria-expanded={open}
						className="relative z-10 flex items-center rounded-full bg-surface-modal dark:bg-popover p-3.5 cursor-pointer group transition-colors"
					>
						{open ? (
							<X className="size-5 text-brand shrink-0" />
						) : (
							<Sparkles className="size-5 text-brand shrink-0 ai-sparkle" />
						)}
						{/* Libellé replié par défaut, déplié au survol (desktop uniquement) */}
						<span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap opacity-0 text-sm font-medium text-text-subtle transition-[max-width,margin,opacity,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:ml-2.5 group-hover:mr-1 group-hover:max-w-56 group-hover:opacity-100 group-hover:text-surface-text group-focus-visible:ml-2.5 group-focus-visible:mr-1 group-focus-visible:max-w-56 group-focus-visible:opacity-100 motion-reduce:transition-none">
							{open ? "Fermer" : "Posez-moi une question"}
						</span>
					</button>
				</div>
			</div>
			<AiChatModal open={open} onOpenChange={setOpen} />
		</>
	);
}
