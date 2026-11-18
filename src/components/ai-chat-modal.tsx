import { Link } from "@tanstack/react-router";
import { ArrowUp, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "#/components/ui/dialog";
import type { AIMessage } from "#/lib/ai/types";
import { trackEvent } from "#/lib/analytics";
import { cn } from "#/lib/utils";
import { chatFn } from "#/server/chat";

const STORAGE_KEY = "lcdw-chat-history";

const SUGGESTIONS = [
	"Parle-moi de toi. Dis-moi qui tu es.",
	"Quelles sont tes expériences ?",
	"Depuis combien de temps travailles-tu dans la tech ?",
	"Pourquoi moi et pas un autre ?",
	"Quels sont tes projets personnels ?",
	"Quelles sont tes passions et hobbies ?",
	"Quelles sont tes compétences techniques ?",
	"Dispo pour de nouveaux projets ?",
	"Quel type de mission recherches-tu ?",
	"Comment te contacter ?",
];

function loadHistory(): AIMessage[] {
	if (typeof window === "undefined") return [];
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? (JSON.parse(stored) as AIMessage[]) : [];
	} catch {
		return [];
	}
}

// Palette commune au reste du site (crème, sable, marine, rouge)
const iconButtonClass =
	"flex size-8 items-center justify-center rounded-full text-[#4a6a8a] transition-colors hover:bg-[#e6d3ae]/60 hover:text-[#253c59] dark:text-[#a1adbc] dark:hover:bg-[#1c2a3a] dark:hover:text-white cursor-pointer [&_svg]:size-4";

function TypingDots() {
	return (
		<div className="flex items-center gap-1 px-4 py-3.5">
			{[0, 150, 300].map((delay) => (
				<span
					key={delay}
					className="size-1.5 rounded-full bg-[#f25353]/70 animate-bounce"
					style={{ animationDelay: `${delay}ms` }}
				/>
			))}
		</div>
	);
}

function MessageBubble({ message }: { message: AIMessage }) {
	const isUser = message.role === "user";
	return (
		<div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
			<div
				className={cn(
					"max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
					isUser
						? "rounded-br-md bg-[#253c59] text-white dark:bg-white dark:text-[#172231]"
						: "rounded-bl-md border border-[#d2c4a4] bg-[#fdf8ee] text-[#253c59] dark:border-[#253c59] dark:bg-[#1c2a3a] dark:text-white",
				)}
			>
				{isUser ? (
					message.content
				) : (
					<div
						className={cn(
							"prose prose-sm max-w-none",
							"prose-p:my-1 prose-p:leading-relaxed",
							"prose-ul:my-1 prose-ul:pl-4",
							"prose-ol:my-1 prose-ol:pl-4",
							"prose-li:my-0 prose-li:marker:text-[#f25353]",
							"prose-strong:font-semibold prose-strong:text-[#253c59] dark:prose-strong:text-white",
							"prose-code:text-xs prose-code:bg-[#e6d3ae]/50 dark:prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
							"prose-pre:bg-[#e6d3ae]/40 dark:prose-pre:bg-white/5 prose-pre:text-xs prose-pre:rounded-lg prose-pre:p-3",
							"prose-a:text-[#d93a3a] dark:prose-a:text-[#ff7a7a] prose-a:underline",
							"prose-headings:text-[#253c59] dark:prose-headings:text-white prose-headings:font-semibold",
							"text-[#253c59] dark:text-white",
						)}
					>
						<Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
					</div>
				)}
			</div>
		</div>
	);
}

export function AiChatModal({
	open,
	onOpenChange,
	initialMessage,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	initialMessage?: string;
}) {
	const [messages, setMessages] = useState<AIMessage[]>(() => loadHistory());
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const bottomRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const sentInitialRef = useRef(false);

	// Save to localStorage on every change
	useEffect(() => {
		if (messages.length > 0) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
		}
	}, [messages]);

	// Auto-scroll to bottom
	// biome-ignore lint/correctness/useExhaustiveDependencies: scroll on messages/loading change is intentional
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, loading]);

	// Focus input when modal opens
	useEffect(() => {
		if (open) {
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	}, [open]);

	const sendMessage = useCallback(
		async (text: string, currentMessages: AIMessage[]) => {
			const userMsg: AIMessage = { role: "user", content: text.trim() };
			const next = [...currentMessages, userMsg];
			setMessages(next);
			setInput("");
			setLoading(true);
			try {
				const { reply } = await chatFn({ data: { messages: next } });
				setMessages([...next, { role: "assistant", content: reply }]);
				trackEvent("ai_chat_message_sent", {
					message: text.trim(),
				});
			} catch (_error) {
				// const errMsg = error instanceof Error ? error.message : "Unknown error";
				// console.error("Error sending message:", errMsg);
				setMessages([
					...next,
					{
						role: "assistant",
						// intemporement indisponible, mais on peut
						content: `Snif snif... Je ne suis pas disponible pour le moment. Réessayez plus tard !`,
					},
				]);
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	// Auto-send initial message (from chip click)
	useEffect(() => {
		if (open && initialMessage && !sentInitialRef.current) {
			sentInitialRef.current = true;
			sendMessage(initialMessage, loadHistory());
		}
		if (!open) {
			sentInitialRef.current = false;
		}
	}, [open, initialMessage, sendMessage]);

	function handleSend() {
		if (!input.trim() || loading) return;
		sendMessage(input, messages);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}

	function handleClear() {
		setMessages([]);
		localStorage.removeItem(STORAGE_KEY);
		trackEvent("ai_chat_history_cleared");
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange} modal={false}>
			{/* Panneau ancré en bas à droite, au-dessus du bouton flottant (AiCard) */}
			<DialogContent
				showCloseButton={false}
				onInteractOutside={(e) => e.preventDefault()}
				className="flex flex-col gap-0 overflow-hidden p-0 top-auto translate-x-0 translate-y-0 right-4 left-4 w-auto max-w-none sm:left-auto sm:right-6 sm:w-[26rem] sm:max-w-[calc(100%-3rem)] bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+8rem)] sm:bottom-24 h-[min(38rem,calc(100dvh-11rem))] sm:h-[min(38rem,calc(100dvh-8rem))] rounded-3xl origin-bottom-right border-[#d2c4a4] bg-[#faf5ec] shadow-2xl shadow-[#253c59]/20 dark:border-[#253c59] dark:bg-[#172231] dark:shadow-black/40"
			>
				{/* En-tête : avatar + nom, comme une messagerie */}
				<div className="flex shrink-0 items-center gap-3 border-b border-[#d2c4a4] px-4 py-3 dark:border-[#253c59]">
					<img
						src="/lcdw-avatar-300.webp"
						alt=""
						width={40}
						height={40}
						className="size-10 shrink-0 rounded-full"
					/>
					<div className="flex min-w-0 flex-1 flex-col">
						<DialogTitle className="display-title text-lg leading-tight font-semibold text-[#253c59] dark:text-white">
							Le Cuistot du Web
						</DialogTitle>
						<DialogDescription className="flex items-center gap-1.5 text-xs font-medium text-[#4a6a8a] dark:text-[#a1adbc]">
							<span className="size-1.5 rounded-full bg-[#2f9e6b]" />
							Assistant IA · en ligne
						</DialogDescription>
					</div>
					{messages.length > 0 && (
						<button
							type="button"
							onClick={handleClear}
							title="Effacer l'historique"
							aria-label="Effacer l'historique"
							className={iconButtonClass}
						>
							<Trash2 />
						</button>
					)}
					<DialogClose aria-label="Fermer le chat" className={iconButtonClass}>
						<X />
					</DialogClose>
				</div>

				{/* Messages */}
				<div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
					{messages.length === 0 && !loading && (
						<div className="my-auto flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<p className="text-xs font-semibold uppercase tracking-widest text-[#b52f2f] dark:text-[#ff7a7a]">
									Posez-moi une question
								</p>
								<p className="text-sm leading-relaxed font-medium text-[#4a6a8a] dark:text-[#a1adbc]">
									Bonjour ! Je suis l'assistant IA de{" "}
									<span className="font-semibold text-[#253c59] dark:text-white">
										LeCuistotduWeb
									</span>
									. Interrogez-moi sur mon profil, mes expériences, mes
									compétences, mes projets ou mes passions.
								</p>
							</div>
							<div className="flex flex-wrap gap-2">
								{SUGGESTIONS.map((s) => (
									<button
										key={s}
										type="button"
										onClick={() => sendMessage(s, [])}
										className="cursor-pointer rounded-full border border-[#d2c4a4] bg-[#fdf8ee] px-3 py-1.5 text-left text-xs font-semibold text-[#253c59] transition-colors hover:border-[#f25353]/60 hover:text-[#d93a3a] dark:border-[#253c59] dark:bg-[#1c2a3a] dark:text-white dark:hover:border-[#ff7a7a]/60 dark:hover:text-[#ff7a7a]"
									>
										{s}
									</button>
								))}
							</div>
						</div>
					)}
					{messages.map((msg, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: messages have no stable id
						<MessageBubble key={`${msg.role}-${i}`} message={msg} />
					))}
					{loading && (
						<div className="flex justify-start">
							<div className="rounded-2xl rounded-bl-md border border-[#d2c4a4] bg-[#fdf8ee] dark:border-[#253c59] dark:bg-[#1c2a3a]">
								<TypingDots />
							</div>
						</div>
					)}
					<div ref={bottomRef} />
				</div>

				{/* Saisie */}
				<div className="shrink-0 border-t border-[#d2c4a4] px-3 pt-3 pb-2 dark:border-[#253c59]">
					<div className="flex items-end gap-2 rounded-2xl border border-[#d2c4a4] bg-[#fdf8ee] p-1.5 pl-4 transition-[border-color,box-shadow] focus-within:border-[#f25353] focus-within:ring-2 focus-within:ring-[#f25353]/25 dark:border-[#253c59] dark:bg-[#15212f]">
						<textarea
							ref={inputRef}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Écrivez votre question…"
							aria-label="Votre question"
							rows={1}
							disabled={loading}
							className="max-h-32 flex-1 resize-none bg-transparent py-1.5 text-sm text-[#253c59] outline-none placeholder:text-[#8a7560]/70 disabled:opacity-50 dark:text-white dark:placeholder:text-[#a1adbc]/60"
							style={{ fieldSizing: "content" } as React.CSSProperties}
						/>
						<button
							type="button"
							onClick={handleSend}
							disabled={!input.trim() || loading}
							aria-label="Envoyer"
							className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#d93a3a] text-white shadow-md shadow-[#f25353]/30 transition-colors hover:bg-[#c93434] disabled:cursor-default disabled:bg-[#d2c4a4] disabled:shadow-none dark:disabled:bg-[#253c59]"
						>
							<ArrowUp className="size-4" />
						</button>
					</div>
					<p className="mt-1.5 text-center text-[10px] text-[#8a7560] dark:text-[#a1adbc]/70">
						Réponses générées par Gemini (Google) · Évitez d'y mettre des
						données personnelles ·{" "}
						<Link
							to="/confidentialite"
							hash="assistant"
							className="underline underline-offset-2 hover:no-underline"
						>
							En savoir plus
						</Link>
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
