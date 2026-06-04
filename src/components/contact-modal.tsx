import { createServerFn } from "@tanstack/react-start";
import { X, Send, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { siteConfig } from "#/config";
import { cn } from "#/lib/utils";

const contactSchema = z.object({
	name: z.string().min(2, "Au moins 2 caractères"),
	email: z.email("Adresse email invalide"),
	message: z.string().min(10, "Au moins 10 caractères"),
});

type ContactData = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactData, string>>;

const submitContact = createServerFn({ method: "POST" })
	.inputValidator(contactSchema)
	.handler(async ({ data }: { data: ContactData }) => {
		// TODO: brancher un service email (Resend, Nodemailer…)
		console.log("[contact]", data);
		return { success: true };
	});

const EMPTY: ContactData = { name: "", email: "", message: "" };

function Field({
	label,
	error,
	children,
}: {
	label: string;
	error?: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<label className="text-xs font-medium text-[#7a95ad] dark:text-[#a1adbc] uppercase tracking-wider">
				{label}
			</label>
			{children}
			{error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
		</div>
	);
}

const inputClass =
	"w-full rounded-xl border border-[#d2c4a4] bg-[#f5efe0] dark:border-[#253c59] dark:bg-[#1c2a3a] px-4 py-2.5 text-sm text-[#253c59] dark:text-white placeholder:text-[#93a8be] dark:placeholder:text-[#556a7a] outline-none focus:border-[#f25353] focus:ring-1 focus:ring-[#f25353]/40 transition-colors";

export function ContactModal({
	open,
	onClose,
}: { open: boolean; onClose: () => void }) {
	const [fields, setFields] = useState<ContactData>(EMPTY);
	const [errors, setErrors] = useState<FieldErrors>({});
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
	const backdropRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) {
			setFields(EMPTY);
			setErrors({});
			setStatus("idle");
		}
	}, [open]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [onClose]);

	const set = (key: keyof ContactData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFields((prev) => ({ ...prev, [key]: e.target.value }));
		if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = contactSchema.safeParse(fields);
		if (!result.success) {
			const errs: FieldErrors = {};
			for (const issue of result.error.issues) {
				const key = issue.path[0] as keyof ContactData;
				if (!errs[key]) errs[key] = issue.message;
			}
			setErrors(errs);
			return;
		}
		setErrors({});
		setStatus("loading");
		try {
			await submitContact({ data: fields });
			setStatus("success");
		} catch {
			setStatus("error");
		}
	};

	if (!open) return null;

	return (
		<div
			ref={backdropRef}
			onClick={(e) => e.target === backdropRef.current && onClose()}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
		>
			<div className="w-full max-w-md rounded-2xl border border-[#d2c4a4] bg-[#faf5ec] dark:border-[#1c2a3a] dark:bg-[#121e2a] p-6 shadow-2xl">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-[#253c59] dark:text-white">Me contacter</h2>
					<button
						type="button"
						onClick={onClose}
						className="size-8 flex items-center justify-center rounded-lg text-[#93a8be] dark:text-[#7a8fa0] hover:text-[#253c59] dark:hover:text-white hover:bg-[#e6d3ae] dark:hover:bg-[#1c2a3a] transition-colors"
					>
						<X className="size-4" />
					</button>
				</div>

				<a
					href={siteConfig.social.linkedin}
					target="_blank"
					rel="noreferrer"
					className="flex items-center gap-3 mb-5 p-3 rounded-xl border border-[#d2c4a4] bg-[#f5efe0] dark:border-[#253c59] dark:bg-[#1c2a3a] hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 transition-colors group"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#0A66C2] shrink-0">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
					</svg>
					<span className="text-sm text-[#3a5570] dark:text-[#c5d5e5] group-hover:text-[#253c59] dark:group-hover:text-white transition-colors">
						Me contacter sur LinkedIn
					</span>
				</a>

				<div className="flex items-center gap-3 mb-5">
					<div className="h-px flex-1 bg-[#d2c4a4] dark:bg-[#1c2a3a]" />
					<span className="text-xs text-[#93a8be] dark:text-[#556a7a] uppercase tracking-widest">ou par email</span>
					<div className="h-px flex-1 bg-[#d2c4a4] dark:bg-[#1c2a3a]" />
				</div>

				{status === "success" ? (
					<div className="flex flex-col items-center py-8 gap-4 text-center">
						<div className="size-12 rounded-full bg-[#f25353]/20 border border-[#f25353]/30 flex items-center justify-center">
							<Send className="size-5 text-[#f25353]" />
						</div>
						<div>
							<p className="text-[#253c59] dark:text-white font-semibold">Message envoyé !</p>
							<p className="text-[#7a95ad] dark:text-[#7a8fa0] text-sm mt-1">
								Je reviendrai vers vous très rapidement.
							</p>
						</div>
						<button
							type="button"
							onClick={onClose}
							className="mt-2 px-5 py-2 rounded-xl bg-[#e6d3ae] border border-[#d2c4a4] text-[#3a5570] dark:bg-[#1c2a3a] dark:border-[#253c59] dark:text-[#c5d5e5] text-sm hover:bg-[#d2c4a4] dark:hover:bg-[#253c59] transition-colors"
						>
							Fermer
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
						<Field label="Nom" error={errors.name}>
							<input
								type="text"
								placeholder="Jean Dupont"
								value={fields.name}
								onChange={set("name")}
								className={cn(inputClass, errors.name && "border-red-500/60")}
							/>
						</Field>

						<Field label="Email" error={errors.email}>
							<input
								type="email"
								placeholder="jean@exemple.fr"
								value={fields.email}
								onChange={set("email")}
								className={cn(inputClass, errors.email && "border-red-500/60")}
							/>
						</Field>

						<Field label="Message" error={errors.message}>
							<textarea
								rows={4}
								placeholder="Votre message…"
								value={fields.message}
								onChange={set("message")}
								className={cn(
									inputClass,
									"resize-none",
									errors.message && "border-red-500/60",
								)}
							/>
						</Field>

						{status === "error" && (
							<p className="text-xs text-red-400 text-center">
								Une erreur est survenue. Réessayez ou écrivez directement à{" "}
								<a href={`mailto:${siteConfig.email}`} className="underline">
									{siteConfig.email}
								</a>
							</p>
						)}

						<button
							type="submit"
							disabled={status === "loading"}
							className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f25353] hover:bg-[#e85f5f] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors mt-1"
						>
							{status === "loading" ? (
								<Loader2 className="size-4 animate-spin" />
							) : (
								<Send className="size-4" />
							)}
							{status === "loading" ? "Envoi…" : "Envoyer"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
