import { z } from "zod";

// Sujets proposés en suggestions du champ « Sujet » (saisie libre possible)
export const CONTACT_TOPICS = [
	"Mission freelance",
	"Recrutement",
	"Création de site",
	"Appli web / mobile",
	"Refonte",
] as const;

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
