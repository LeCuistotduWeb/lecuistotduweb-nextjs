import { z } from "zod";

// Sujets proposés en suggestions du champ « Sujet » (saisie libre possible)
// Les trois premiers reprennent les offres du chapitre Offre (voir offers.tsx)
export const CONTACT_TOPICS = [
	"Renfort fullstack React / Node.js",
	"Projet sur mesure",
	"Maintenance et évolutions",
	"Autre",
] as const;

// Un lien « En parler » d'une offre pré-remplit le sujet du formulaire. Le
// formulaire est déjà monté plus bas dans la page : un simple événement suffit.
const TOPIC_EVENT = "lcdw:contact-topic";

export function requestContactTopic(topic: string) {
	window.dispatchEvent(new CustomEvent(TOPIC_EVENT, { detail: topic }));
}

export function onContactTopicRequest(callback: (topic: string) => void) {
	const listener = (event: Event) =>
		callback((event as CustomEvent<string>).detail);
	window.addEventListener(TOPIC_EVENT, listener);
	return () => window.removeEventListener(TOPIC_EVENT, listener);
}

export const contactSchema = z.object({
	topic: z.string().trim().max(100, "100 caractères maximum"),
	name: z.string().trim().min(2, "Indiquez votre nom").max(100),
	email: z.email("Adresse e-mail invalide").max(200),
	message: z
		.string()
		.trim()
		.min(10, "Quelques mots de plus ?")
		.max(4000, "4000 caractères maximum"),
	// Champ piège : invisible pour les humains, rempli par les robots
	website: z.string().max(200),
});

export type ContactInput = z.infer<typeof contactSchema>;
