import { useForm } from "@tanstack/react-form";
import {
	Check,
	ChevronDown,
	CircleCheck,
	LoaderCircle,
	Send,
} from "lucide-react";
import { useId, useState } from "react";
import { siteConfig } from "#/config";
import { trackEvent } from "#/lib/analytics";
import {
	CONTACT_TOPICS,
	type ContactInput,
	contactSchema,
} from "#/lib/contact";
import { cn } from "#/lib/utils";
import { sendContactFn } from "#/server/contact";

const inputClass =
	"w-full rounded-xl border border-[#d2c4a4] dark:border-[#253c59] bg-[#fdf8ee] dark:bg-[#15212f] px-4 py-2.5 text-[#253c59] dark:text-white placeholder:text-[#8a7560]/70 dark:placeholder:text-[#a1adbc]/60 outline-none focus-visible:border-[#f25353] focus-visible:ring-2 focus-visible:ring-[#f25353]/25 aria-invalid:border-[#d93a3a]";
const labelClass = "text-sm font-semibold text-[#253c59] dark:text-white";

type Status = "idle" | "sent" | "error" | "rate_limited";

function errorText(errors: unknown[]) {
	const first = errors[0];
	if (!first) return undefined;
	return typeof first === "string"
		? first
		: (first as { message?: string }).message;
}

export function ContactForm() {
	const id = useId();
	const [status, setStatus] = useState<Status>("idle");

	const form = useForm({
		defaultValues: {
			topic: "",
			name: "",
			email: "",
			message: "",
			website: "",
		} satisfies ContactInput as ContactInput,
		validators: { onSubmit: contactSchema },
		onSubmit: async ({ value }) => {
			try {
				await sendContactFn({ data: value });
				setStatus("sent");
				trackEvent("submit_contact_form", { topic: value.topic });
			} catch (error) {
				const limited =
					error instanceof Error && error.message.includes("rate_limited");
				setStatus(limited ? "rate_limited" : "error");
				trackEvent("contact_form_error");
			}
		},
	});

	if (status === "sent") {
		return (
			<div
				role="status"
				className="flex items-center gap-2 rounded-2xl border border-[#d2c4a4] dark:border-[#253c59] bg-[#e6d3ae]/40 dark:bg-[#1c2a3a] p-6"
			>
				<CircleCheck aria-hidden="true" className="size-7 text-[#2f9e6b]" />
				<p className="text-lg font-semibold text-[#253c59] dark:text-white">
					Message envoyé, merci&nbsp;!
				</p>
			</div>
		);
	}

	return (
		<form
			noValidate
			aria-label="Formulaire de contact"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="flex flex-col gap-4"
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<form.Field name="name">
					{(field) => (
						<TextField
							id={`${id}-name`}
							label="Nom"
							autoComplete="name"
							value={field.state.value}
							onChange={field.handleChange}
							onBlur={field.handleBlur}
							error={errorText(field.state.meta.errors)}
						/>
					)}
				</form.Field>
				<form.Field name="email">
					{(field) => (
						<TextField
							id={`${id}-email`}
							label="E-mail"
							type="email"
							autoComplete="email"
							value={field.state.value}
							onChange={field.handleChange}
							onBlur={field.handleBlur}
							error={errorText(field.state.meta.errors)}
						/>
					)}
				</form.Field>
			</div>

			<form.Field name="topic">
				{(field) => (
					<TopicCombobox
						id={`${id}-topic`}
						value={field.state.value}
						onChange={field.handleChange}
						onBlur={field.handleBlur}
						error={errorText(field.state.meta.errors)}
					/>
				)}
			</form.Field>

			<form.Field name="message">
				{(field) => {
					const error = errorText(field.state.meta.errors);
					return (
						<div className="flex flex-col gap-1.5">
							<label htmlFor={`${id}-message`} className={labelClass}>
								Message
							</label>
							<textarea
								id={`${id}-message`}
								rows={4}
								placeholder="Votre projet, la mission ou le poste : contexte, objectif, échéance…"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
								aria-invalid={!!error}
								aria-describedby={error ? `${id}-message-error` : undefined}
								className={cn(inputClass, "resize-y")}
							/>
							{error && (
								<p
									id={`${id}-message-error`}
									className="text-sm text-[#d93a3a]"
								>
									{error}
								</p>
							)}
						</div>
					);
				}}
			</form.Field>

			{/* Champ piège anti-spam, hors écran et hors tabulation */}
			<form.Field name="website">
				{(field) => (
					<div aria-hidden="true" className="absolute -left-[9999px] size-px">
						<label htmlFor={`${id}-website`}>Site web</label>
						<input
							id={`${id}-website`}
							tabIndex={-1}
							autoComplete="off"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>

			{(status === "error" || status === "rate_limited") && (
				<p role="alert" className="text-sm font-medium text-[#d93a3a]">
					{status === "rate_limited"
						? "Plusieurs messages viennent d'être envoyés. Réessayez dans quelques minutes, ou écrivez-moi directement à "
						: "L'envoi a échoué. Réessayez, ou écrivez-moi directement à "}
					<a href={`mailto:${siteConfig.email}`} className="underline">
						{siteConfig.email}
					</a>
					.
				</p>
			)}

			<form.Subscribe selector={(state) => state.isSubmitting}>
				{(isSubmitting) => (
					<button
						type="submit"
						disabled={isSubmitting}
						className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d93a3a] hover:bg-[#c93434] disabled:opacity-70 px-5 py-3 text-sm font-semibold text-white transition-colors cursor-pointer"
					>
						{isSubmitting ? (
							<LoaderCircle
								aria-hidden="true"
								className="size-4 animate-spin"
							/>
						) : (
							<Send aria-hidden="true" className="size-4" />
						)}
						{isSubmitting ? "Envoi…" : "Envoyer"}
					</button>
				)}
			</form.Subscribe>
		</form>
	);
}

function TextField({
	id,
	label,
	error,
	onChange,
	...props
}: {
	id: string;
	label: string;
	error?: string;
	value: string;
	onChange: (value: string) => void;
	onBlur: () => void;
	type?: string;
	autoComplete?: string;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<label htmlFor={id} className={labelClass}>
				{label}
			</label>
			<input
				id={id}
				{...props}
				onChange={(e) => onChange(e.target.value)}
				aria-invalid={!!error}
				aria-describedby={error ? `${id}-error` : undefined}
				className={inputClass}
			/>
			{error && (
				<p id={`${id}-error`} className="text-sm text-[#d93a3a]">
					{error}
				</p>
			)}
		</div>
	);
}

// Champ « Sujet » : saisie libre avec propositions (modèle ARIA combobox).
// Les propositions sont filtrées par le texte saisi ; flèches pour naviguer,
// Entrée pour choisir, Échap pour fermer.
function TopicCombobox({
	id,
	value,
	onChange,
	onBlur,
	error,
}: {
	id: string;
	value: string;
	onChange: (value: string) => void;
	onBlur: () => void;
	error?: string;
}) {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(-1);
	const query = value.trim().toLowerCase();
	// Rien de saisi, ou un sujet déjà choisi : toutes les propositions
	const options =
		!query || CONTACT_TOPICS.some((t) => t.toLowerCase() === query)
			? CONTACT_TOPICS
			: CONTACT_TOPICS.filter((t) => t.toLowerCase().includes(query));
	const expanded = open && options.length > 0;
	const listId = `${id}-list`;

	function select(topic: string) {
		onChange(topic);
		setOpen(false);
		setActive(-1);
	}

	function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			e.preventDefault();
			if (!open) setOpen(true);
			const step = e.key === "ArrowDown" ? 1 : -1;
			setActive((i) => (i + step + options.length) % options.length);
		} else if (e.key === "Enter" && expanded && active >= 0) {
			e.preventDefault();
			select(options[active]);
		} else if (e.key === "Escape" && open) {
			e.preventDefault();
			setOpen(false);
			setActive(-1);
		}
	}

	return (
		<div className="flex flex-col gap-1.5">
			<label htmlFor={id} className={labelClass}>
				Sujet
			</label>
			<div className="relative">
				<input
					id={id}
					role="combobox"
					aria-expanded={expanded}
					aria-controls={listId}
					aria-autocomplete="list"
					aria-activedescendant={
						expanded && active >= 0 ? `${listId}-${active}` : undefined
					}
					aria-invalid={!!error}
					autoComplete="off"
					placeholder="Ex. Mission freelance"
					value={value}
					onChange={(e) => {
						onChange(e.target.value);
						setOpen(true);
						setActive(-1);
					}}
					onFocus={() => setOpen(true)}
					onClick={() => setOpen(true)}
					onBlur={() => {
						setOpen(false);
						setActive(-1);
						onBlur();
					}}
					onKeyDown={onKeyDown}
					className={cn(inputClass, "pr-10")}
				/>
				<ChevronDown
					aria-hidden="true"
					className={cn(
						"pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#8a7560] dark:text-[#a1adbc] transition-transform",
						expanded && "rotate-180",
					)}
				/>
				<ul
					id={listId}
					// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: listbox d'un combobox (aria-activedescendant)
					role="listbox"
					aria-label="Sujets proposés"
					hidden={!expanded}
					className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-[#d2c4a4] dark:border-[#253c59] bg-[#fdf8ee] dark:bg-[#15212f] p-1 shadow-lg shadow-[#253c59]/10"
				>
					{options.map((topic, i) => {
						const selected = topic === value;
						return (
							// biome-ignore lint/a11y/useFocusableInteractive: le focus reste sur le champ du combobox
							<li
								key={topic}
								id={`${listId}-${i}`}
								// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: option pilotée par aria-activedescendant
								role="option"
								aria-selected={selected}
								// mousedown : choisir avant que le champ ne perde le focus
								onMouseDown={(e) => {
									e.preventDefault();
									select(topic);
								}}
								onMouseEnter={() => setActive(i)}
								className={cn(
									"flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[#253c59] dark:text-white",
									i === active && "bg-[#e6d3ae] dark:bg-[#1c2a3a]",
								)}
							>
								{topic}
								{selected && (
									<Check aria-hidden="true" className="size-4 text-[#f25353]" />
								)}
							</li>
						);
					})}
				</ul>
			</div>
			{error && (
				<p id={`${id}-error`} className="text-sm text-[#d93a3a]">
					{error}
				</p>
			)}
		</div>
	);
}
