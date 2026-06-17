import { Sparkles } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";
import { AiChatModal } from "./ai-chat-modal";

export function AiCard({ className }: { className?: string }) {
	const [open, setOpen] = useState(false);

	function handleOpen() {
		setOpen(true);
		trackEvent("ai_chat_opened", { source: "fake_input" });
	}

	return (
		<>
			<div className={cn("ai-glow", className)}>
				<button
					type="button"
					onClick={handleOpen}
					className="relative z-10 w-full flex items-center gap-3 rounded-[11px] bg-surface-modal dark:bg-popover px-4 py-3 text-left cursor-pointer group transition-colors"
				>
					<Sparkles className="size-4 text-brand shrink-0 ai-sparkle" />
					<span className="flex-1 text-sm text-text-ghost group-hover:text-text-subtle transition-colors">
						Posez-moi une question…
					</span>
				</button>
			</div>
			<AiChatModal open={open} onOpenChange={setOpen} />
		</>
	);
}
