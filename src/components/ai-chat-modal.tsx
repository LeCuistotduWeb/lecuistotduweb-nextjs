import { useCallback, useEffect, useRef, useState } from "react";
import { Send, Trash2 } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import { trackEvent } from "#/lib/analytics";
import type { AIMessage } from "#/lib/ai/types";
import { chatFn } from "#/server/chat";
import { cn } from "#/lib/utils";

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
	"Quel type de poste recherches-tu ?",
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

function TypingDots() {
	return (
		<div className="flex items-center gap-1 px-4 py-3">
			{[0, 150, 300].map((delay) => (
				<span
					key={delay}
					className="size-1.5 rounded-full bg-text-subtle animate-bounce"
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
					"max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
					isUser
						? "bg-navy text-white rounded-br-sm"
						: "bg-border/40 text-surface-text dark:bg-card dark:text-surface-text rounded-bl-sm",
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
							"prose-li:my-0",
							"prose-strong:font-semibold",
							"prose-code:text-xs prose-code:bg-navy/10 dark:prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
							"prose-pre:bg-navy/10 dark:prose-pre:bg-white/5 prose-pre:text-xs prose-pre:rounded-lg prose-pre:p-3",
							"prose-a:text-brand prose-a:underline",
							"prose-headings:text-surface-text prose-headings:font-semibold",
							"text-surface-text",
						)}
					>
						<Markdown remarkPlugins={[remarkGfm]}>
							{message.content}
						</Markdown>
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
			trackEvent("ai_chat_message_sent");

			try {
				const { reply } = await chatFn({ data: { messages: next } });
				setMessages([...next, { role: "assistant", content: reply }]);
			} catch {
				setMessages([
					...next,
					{
						role: "assistant",
						content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
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
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="flex flex-col gap-0 p-0 max-w-2xl h-150 max-h-[90vh] border-border bg-surface-modal dark:border-card">
				<DialogHeader className="flex-row items-center justify-between px-6 pt-5 pb-4 border-b border-border dark:border-card shrink-0">
					<DialogTitle className="text-foreground">
						Posez-moi une question
					</DialogTitle>
					{messages.length > 0 && (
						<Button
							variant="ghost"
							size="icon-sm"
							onClick={handleClear}
							title="Effacer l'historique"
							className="text-text-ghost hover:text-brand mr-8"
						>
							<Trash2 />
						</Button>
					)}
				</DialogHeader>

				{/* Messages */}
				<div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
					{messages.length === 0 && !loading && (
						<div className="flex flex-col items-center justify-center h-full gap-4 text-center">
							<p className="text-text-subtle text-sm">
								Bonjour ! Je suis l'assistant IA de{" "}
								<span className="text-surface-text font-medium">
									LeCuistotduWeb
								</span>
								. Posez-moi une question sur mon profil, mes expériences, mes compétences, mes projets ou mes passions. Je suis là pour vous aider !
							</p>
							<div className="flex flex-wrap justify-center gap-2">
								{SUGGESTIONS.map((s) => (
									<button
										key={s}
										type="button"
										onClick={() => sendMessage(s, [])}
										className="text-xs px-3 py-1.5 rounded-full border border-border dark:border-card text-text-subtle hover:border-brand/50 hover:text-brand transition-colors cursor-pointer"
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
							<div className="bg-border/40 dark:bg-card rounded-2xl rounded-bl-sm">
								<TypingDots />
							</div>
						</div>
					)}
					<div ref={bottomRef} />
				</div>

				{/* Input */}
				<div className="shrink-0 px-6 pb-5 pt-3 border-t border-border dark:border-card">
					<div className="flex gap-2 items-end">
						<textarea
							ref={inputRef}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Écrivez votre question… (Entrée pour envoyer)"
							rows={1}
							disabled={loading}
							className="flex-1 resize-none rounded-xl border border-border bg-white/60 dark:bg-popover/60 px-4 py-2.5 text-sm text-surface-text placeholder:text-text-ghost focus:outline-none focus:border-navy dark:focus:border-text-accent transition-colors disabled:opacity-50 max-h-32"
							style={{ fieldSizing: "content" } as React.CSSProperties}
						/>
						<Button
							onClick={handleSend}
							disabled={!input.trim() || loading}
							size="icon"
							className="bg-navy hover:bg-navy-deep shrink-0"
						>
							<Send />
						</Button>
					</div>
					<p className="text-[10px] text-text-ghost mt-2 text-center">
						Shift+Entrée pour un saut de ligne
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
