import type { LucideIcon } from "lucide-react";
import {
	Award,
	CalendarCheck,
	CalendarClock,
	Globe,
	Handshake,
	Images,
	LayoutDashboard,
	MapPin,
	MapPinned,
	PenTool,
	Search,
	ShieldCheck,
	ShoppingBag,
	Store,
	Users,
	UtensilsCrossed,
	Wrench,
} from "lucide-react";

// Pages d'atterrissage du référencement local : une page par zone
// (Vernon, Évreux, Eure) et une page par cible (restaurants, salons, TPE/PME).
// Chaque page a un contenu propre (pas de simple changement de nom de ville)
// pour ne pas être vue comme une « page satellite » par Google.

export type LocalPageSection = {
	title: string;
	paragraphs?: string[];
	points?: string[];
};

/** Écrans de la maquette de téléphone (src/components/local-showcase.tsx) */
export type PhoneScreen =
	| "menu"
	| "menu-updated"
	| "reservation"
	| "maps"
	| "booking"
	| "vitrine";

export type LocalPage = {
	/** Chemin de la route, sans slash final */
	path: string;
	kind: "zone" | "metier";
	/** Libellé court (fil d'Ariane, liens internes) */
	label: string;
	/** Balise <title> : mot-clé principal en tête, moins de 65 caractères */
	title: string;
	/** Meta description : 140 à 160 caractères */
	description: string;
	/** Mot-clé visible en tête du h1 */
	heading: string;
	/** Accroche affichée en grand dans le h1, après le mot-clé */
	hook: string;
	intro: string[];
	/** Illustration de l'en-tête : maquette de téléphone ou carte de la zone */
	showcase: "map" | "menu" | "booking" | "vitrine";
	/** Encart « De la cuisine au code » propre à la page (sinon texte commun) */
	story?: string;
	/** Réalisations mises en avant, par libellé de src/data/works.ts */
	works: string[];
	highlights: { icon: LucideIcon; title: string; text: string }[];
	/**
	 * Récit au scroll : le téléphone reste épinglé et change d'écran à chaque
	 * étape. Remplace la grille des atouts quand il est renseigné.
	 */
	scrolly?: { screen: PhoneScreen; title: string; text: string }[];
	sections: LocalPageSection[];
	faq: { question: string; answer: string }[];
	/** Nom du service décrit (JSON-LD Service) */
	serviceName: string;
	/** Communes ou territoires mis en avant (JSON-LD areaServed) */
	area: string[];
};

const COMMON_FAQ = {
	deplacement: {
		question: "Vous déplacez-vous pour un premier rendez-vous ?",
		answer:
			"Oui. Je suis basé à Vernon et je me déplace chez vous dans l'Eure et alentours pour le premier échange, la présentation du site et la prise en main. Le reste du projet peut se suivre à distance, par téléphone ou en visio.",
	},
	devis: {
		question: "Combien coûte un site internet ?",
		answer:
			"Chaque projet est chiffré sur devis, après un premier échange gratuit de 30 minutes. Le devis détaille le périmètre, les délais et le prix, sans engagement.",
	},
	google: {
		question: "Mon site sera-t-il visible sur Google ?",
		answer:
			"Le site est livré optimisé pour le référencement : pages rapides, adaptées au mobile, titres et descriptions travaillés, données structurées et lien avec votre fiche Google Business Profile. Je peux aussi créer ou optimiser cette fiche.",
	},
	maintenance: {
		question: "Qui s'occupe du site après la mise en ligne ?",
		answer:
			"Vous pouvez modifier vos contenus vous-même après une prise en main. Pour les mises à jour techniques, les sauvegardes et les évolutions, je propose un suivi de maintenance.",
	},
} as const;

export const LOCAL_PAGES: LocalPage[] = [
	{
		path: "/creation-site-internet-vernon",
		kind: "zone",
		label: "Création de site internet à Vernon",
		title: "Création de site internet à Vernon (27) — LeCuistotduWeb",
		description:
			"Développeur web freelance à Vernon (Eure) : création de sites internet pour commerçants, restaurants, salons et TPE. Devis gratuit, rendez-vous sur place.",
		heading: "Création de site internet à Vernon",
		hook: "Votre développeur web, à deux pas.",
		intro: [
			"Je m'appelle Gaëtan, je vis et je travaille à Vernon. Je crée des sites internet sur mesure pour les commerçants, restaurateurs, salons et petites entreprises d'ici : Vernon, Saint-Marcel, Saint-Just, Giverny et alentour.",
			"Pendant 8 ans, j'ai codé des sites à fort trafic pour Fnac Darty, Infogreffe ou Blissim. Aujourd'hui, je mets cette exigence au service des entreprises de mon territoire, avec un vrai avantage : on peut se voir pour parler de votre projet autour d'un café.",
		],
		showcase: "map",
		works: ["Le Poudrier de Fleur", "Mon VDI Assistant", "Fnac Darty"],
		highlights: [
			{
				icon: MapPin,
				title: "Un développeur à Vernon",
				text: "Rendez-vous chez vous ou en visio, réponses rapides : vous savez à qui vous parlez.",
			},
			{
				icon: PenTool,
				title: "Un site sur mesure",
				text: "Pas de modèle tout fait : le site reflète votre activité et vos clients.",
			},
			{
				icon: Search,
				title: "Pensé pour Google",
				text: "Rapide, adapté au mobile et optimisé pour les recherches locales.",
			},
		],
		sections: [
			{
				title: "Ce que je crée pour les entreprises de Vernon",
				points: [
					"Site vitrine pour présenter votre activité et être trouvé sur Google",
					"Site de restaurant avec menu en ligne et réservation",
					"Site de salon de coiffure ou d'esthétique avec prise de rendez-vous",
					"Boutique en ligne ou click & collect pour les commerces",
					"Refonte d'un site existant devenu lent ou difficile à modifier",
					"Création et optimisation de votre fiche Google Business Profile",
				],
			},
			{
				title: "Être trouvé par les clients de Vernon et des environs",
				paragraphs: [
					"Quand un habitant cherche « restaurant Vernon » ou « coiffeur Vernon », Google affiche d'abord les fiches Google et les sites les mieux référencés localement. Votre site doit dire clairement où vous êtes, ce que vous faites et pour qui.",
					"Je travaille les pages, les titres, les données structurées et le lien avec votre fiche Google pour que votre entreprise ressorte à Vernon, mais aussi à Gaillon, Pacy-sur-Eure ou Bonnières-sur-Seine si vous y avez des clients.",
				],
			},
		],
		faq: [
			COMMON_FAQ.deplacement,
			COMMON_FAQ.devis,
			{
				question: "En combien de temps mon site peut-il être en ligne ?",
				answer:
					"Le délai dépend du nombre de pages et des fonctionnalités. Il est fixé dans le devis, avant le début du projet, et je vous montre l'avancement tout au long de la réalisation.",
			},
			COMMON_FAQ.google,
		],
		serviceName: "Création de site internet à Vernon",
		area: ["Vernon", "Saint-Marcel", "Saint-Just", "Giverny"],
	},
	{
		path: "/creation-site-internet-evreux",
		kind: "zone",
		label: "Création de site internet à Évreux",
		title: "Création de site internet à Évreux — Développeur web freelance",
		description:
			"Création de site internet à Évreux : développeur web freelance de l'Eure, sites vitrines, e-commerce et applications pour TPE, commerces et restaurants.",
		heading: "Création de site internet à Évreux",
		hook: "Un site qui donne envie de pousser votre porte.",
		intro: [
			"Commerçant, artisan, restaurateur ou dirigeant de PME à Évreux : votre site doit donner envie de venir vous voir, ou de vous appeler. Je le conçois et je le développe sur mesure, de la première maquette à la mise en ligne.",
			"Installé à Vernon, dans l'Eure, je viens vous voir à Évreux pour les rendez-vous qui comptent. Vous avez un seul interlocuteur, et c'est lui qui écrit le code de votre site.",
		],
		showcase: "map",
		works: ["Fnac Darty", "Infogreffe", "Mon VDI Assistant"],
		highlights: [
			{
				icon: Handshake,
				title: "Un freelance de l'Eure",
				text: "Proche d'Évreux, disponible pour vous rencontrer sur place.",
			},
			{
				icon: Award,
				title: "Une expertise de grands comptes",
				text: "8 ans sur des sites à fort trafic (Fnac Darty, Infogreffe), au service des PME.",
			},
			{
				icon: ShieldCheck,
				title: "Des sites durables",
				text: "Code propre, rapide et facile à faire évoluer avec votre entreprise.",
			},
		],
		sections: [
			{
				title: "Des sites adaptés aux entreprises d'Évreux",
				paragraphs: [
					"Évreux concentre commerces de centre-ville, entreprises de services et PME industrielles. Leurs besoins ne sont pas les mêmes : un commerce veut être trouvé et attirer en boutique, une PME veut présenter son savoir-faire et recevoir des demandes de devis qualifiées.",
					"Je pars de vos objectifs pour définir les pages utiles, les appels à l'action et les outils à connecter : formulaire de devis, prise de rendez-vous, boutique en ligne ou espace client.",
				],
			},
			{
				title: "Mes prestations",
				points: [
					"Site vitrine et site d'entreprise",
					"Site e-commerce et click & collect",
					"Application web sur mesure : prise de commande, gestion de clients, tableaux de bord",
					"Refonte de site existant, y compris WordPress",
					"Référencement local et fiche Google Business Profile",
					"Maintenance, hébergement et évolutions",
				],
			},
			{
				title: "Évreux et les communes voisines",
				paragraphs: [
					"J'accompagne aussi les entreprises de Louviers, Val-de-Reuil, Pacy-sur-Eure et Gaillon. Le premier échange peut se faire en visio pour gagner du temps, puis nous nous rencontrons quand le projet le demande.",
				],
			},
		],
		faq: [
			COMMON_FAQ.deplacement,
			COMMON_FAQ.devis,
			{
				question: "Pouvez-vous reprendre mon site WordPress existant ?",
				answer:
					"Oui. Je peux corriger, mettre à jour et faire évoluer un site WordPress, ou vous proposer une refonte si le site est devenu trop lent ou difficile à maintenir.",
			},
			COMMON_FAQ.maintenance,
		],
		serviceName: "Création de site internet à Évreux",
		area: ["Évreux", "Louviers", "Val-de-Reuil"],
	},
	{
		path: "/developpeur-web-eure",
		kind: "zone",
		label: "Développeur web dans l'Eure",
		title: "Développeur web freelance dans l'Eure (27) — Gaëtan Boyron",
		description:
			"Développeur web freelance dans l'Eure (27), basé à Vernon : sites internet, e-commerce et applications web pour les entreprises de Gaillon, Pacy, Évreux…",
		heading: "Développeur web freelance dans l'Eure",
		hook: "Pas d'agence. Un développeur, en direct.",
		intro: [
			"Développeur web depuis 2017, je suis installé à Vernon. J'accompagne les entreprises de l'Eure sur leurs projets web : site internet, boutique en ligne, application sur mesure ou reprise d'un site existant.",
			"Je travaille seul et en direct. Pas d'intermédiaire, pas de sous-traitance : la personne que vous rencontrez est celle qui construit votre site, et celle qui répond quand vous appelez.",
		],
		showcase: "map",
		works: ["Infogreffe", "Blissim", "La Classe de Fleur"],
		highlights: [
			{
				icon: Globe,
				title: "Sites internet",
				text: "Vitrine, e-commerce, réservation ou prise de rendez-vous en ligne.",
			},
			{
				icon: LayoutDashboard,
				title: "Applications web",
				text: "Outils métier sur mesure en React et Node.js, pour gagner du temps au quotidien.",
			},
			{
				icon: Users,
				title: "Renfort technique",
				text: "Intégration à votre équipe en régie, sur site ou à distance.",
			},
		],
		sections: [
			{
				title: "Les communes où j'interviens",
				paragraphs: [
					"Je me déplace dans tout l'est de l'Eure et jusqu'aux Yvelines voisines : Vernon, Saint-Marcel, Saint-Just, Gaillon, Pacy-sur-Eure, Les Andelys, Évreux, Louviers, Val-de-Reuil, Giverny, Bonnières-sur-Seine, Mantes-la-Jolie et Rouen.",
					"Pour les projets plus éloignés, tout se fait très bien à distance, avec des points en visio et un site de démonstration accessible pendant la réalisation.",
				],
			},
			{
				title: "Pourquoi un développeur plutôt qu'une agence ?",
				points: [
					"Un seul interlocuteur, du premier rendez-vous à la maintenance",
					"Un site codé sur mesure, rapide et sans extensions superflues",
					"Une expérience acquise sur de grands sites (Fnac Darty, Infogreffe, Blissim)",
					"Une proximité réelle : je connais le tissu économique local",
				],
			},
		],
		faq: [
			COMMON_FAQ.deplacement,
			COMMON_FAQ.devis,
			{
				question: "Travaillez-vous aussi pour des entreprises hors de l'Eure ?",
				answer:
					"Oui. J'interviens à distance partout en France, et sur site à Paris et Rouen, en ligne directe depuis Vernon, pour des missions de renfort React / Next.js.",
			},
			COMMON_FAQ.maintenance,
		],
		serviceName: "Développement web dans l'Eure",
		area: [
			"Eure",
			"Gaillon",
			"Pacy-sur-Eure",
			"Les Andelys",
			"Louviers",
			"Val-de-Reuil",
		],
	},
	{
		path: "/site-internet-restaurant",
		kind: "metier",
		label: "Site internet pour restaurant",
		title: "Site internet pour restaurant à Vernon et dans l'Eure",
		description:
			"Création de site internet pour restaurant à Vernon et dans l'Eure : menu lisible sur mobile, photos, réservation ou commande à emporter, lien avec Google.",
		heading: "Un site internet pour votre restaurant",
		hook: "Un site qui donne faim.",
		intro: [
			"Avant de réserver, vos clients regardent votre carte sur leur téléphone, vos photos et vos avis. C'est souvent là que tout se joue : une table chez vous, ou une table ailleurs.",
			"Je crée des sites pour les restaurants, bistrots, pizzerias et traiteurs de Vernon et de l'Eure : une carte appétissante sur mobile, la réservation en quelques clics, et une fiche Google qui renvoie au bon endroit.",
		],
		showcase: "menu",
		scrolly: [
			{
				screen: "menu-updated",
				title: "Une carte toujours à jour",
				text: "Le plat du jour change ? Vous le modifiez depuis votre téléphone, entre deux services, et il apparaît aussitôt sur le site. Fini la carte en PDF à zoomer ou le menu de l'an dernier.",
			},
			{
				screen: "reservation",
				title: "Réservation et commande",
				text: "Vos clients réservent une table ou commandent à emporter en quelques clics, même tard le soir. J'intègre le module qui vous convient, ou je relie le site à l'outil que vous utilisez déjà.",
			},
			{
				screen: "maps",
				title: "Visible sur Google Maps",
				text: "Quand on cherche « restaurant Vernon », c'est souvent sur Google Maps qu'on vous découvre. Je travaille le site et la fiche Google ensemble : mêmes horaires, même adresse, et un lien direct vers la réservation.",
			},
		],
		story:
			"Avant de devenir développeur en 2017, j'ai travaillé en cuisine professionnelle. Je sais ce qu'est un coup de feu. Alors je passe vous voir l'après-midi, entre deux services, et je vous livre un site que vous mettez à jour sans y passer vos soirées.",
		works: ["Le Poudrier de Fleur", "La Classe de Fleur", "Marie Jade"],
		highlights: [
			{
				icon: UtensilsCrossed,
				title: "Une carte toujours à jour",
				text: "Vous modifiez vos plats, menus du jour et prix vous-même, en quelques minutes.",
			},
			{
				icon: CalendarCheck,
				title: "Réservation et commande",
				text: "Réservation de table, commande à emporter ou lien vers votre outil actuel.",
			},
			{
				icon: MapPinned,
				title: "Visible sur Google Maps",
				text: "Site et fiche Google travaillés ensemble pour ressortir dans votre ville.",
			},
		],
		sections: [
			{
				title: "Ce que contient un site de restaurant efficace",
				points: [
					"Votre carte et vos menus, lisibles sur mobile (pas de PDF à zoomer)",
					"Des photos de vos plats et de votre salle",
					"Horaires, adresse, plan d'accès et bouton d'appel direct",
					"Réservation de table en ligne ou commande à emporter",
					"Vos avis Google mis en avant",
					"Une page pour vos événements, privatisations ou menus de fêtes",
				],
			},
			{
				title: "Un restaurant bien référencé localement",
				paragraphs: [
					"Les recherches « restaurant près de moi » ou « restaurant Vernon » se jouent surtout sur Google Maps. J'ajoute à votre site les données structurées propres aux restaurants (type de cuisine, horaires, menu) et je vérifie que votre site et votre fiche Google donnent les mêmes informations.",
				],
			},
		],
		faq: [
			{
				question: "Puis-je modifier ma carte moi-même ?",
				answer:
					"Oui. La carte, les menus du jour et les horaires se modifient depuis une interface simple, sur ordinateur ou sur téléphone. Je vous montre comment faire à la livraison.",
			},
			{
				question: "Le site peut-il gérer les réservations ?",
				answer:
					"Oui. Je peux intégrer un module de réservation de table, ou relier le site à l'outil que vous utilisez déjà. Nous choisissons ensemble la solution la plus simple pour votre équipe.",
			},
			COMMON_FAQ.devis,
			COMMON_FAQ.google,
		],
		serviceName: "Création de site internet pour restaurant",
		area: ["Vernon", "Eure"],
	},
	{
		path: "/site-internet-salon-coiffure-esthetique",
		kind: "metier",
		label: "Site internet pour salon de coiffure et d'esthétique",
		title: "Site internet pour salon de coiffure et d'esthétique — Vernon",
		description:
			"Site internet pour salon de coiffure, barbier ou institut de beauté à Vernon et dans l'Eure : prestations, galerie photo et prise de rendez-vous en ligne.",
		heading: "Un site internet pour votre salon de coiffure ou d'esthétique",
		hook: "Votre agenda se remplit, même salon fermé.",
		intro: [
			"Vos clientes et vos clients veulent voir vos réalisations, connaître vos prestations et réserver un créneau. Souvent le soir, quand le salon est fermé et que personne ne décroche.",
			"Je crée des sites pour les salons de coiffure, barbiers, instituts de beauté et prothésistes ongulaires de Vernon et de l'Eure. Des sites élégants, rapides sur mobile et reliés à votre agenda, qui prennent les rendez-vous à votre place.",
		],
		showcase: "booking",
		works: ["Blissim", "Le Poudrier de Fleur", "Marie Jade"],
		highlights: [
			{
				icon: CalendarClock,
				title: "Rendez-vous en ligne",
				text: "Réservation 24 h/24, connectée à votre agenda ou à votre logiciel de caisse.",
			},
			{
				icon: Images,
				title: "Vos réalisations en valeur",
				text: "Une galerie photo soignée, qui donne envie de venir.",
			},
			{
				icon: Search,
				title: "Trouvé dans votre ville",
				text: "Référencement local et fiche Google optimisés pour « coiffeur Vernon ».",
			},
		],
		sections: [
			{
				title: "Ce que je mets sur le site de votre salon",
				points: [
					"Vos prestations et leur durée, présentées clairement",
					"Une galerie de vos coupes, couleurs ou soins",
					"La prise de rendez-vous en ligne, ou un lien vers votre outil actuel",
					"Votre équipe, vos marques et produits partenaires",
					"Horaires, adresse, plan et bouton d'appel direct",
					"Vos avis Google et vos réseaux sociaux",
				],
			},
			{
				title: "Moins de téléphone, plus de clients",
				paragraphs: [
					"La prise de rendez-vous en ligne réduit les appels pendant les prestations et les oublis, grâce aux rappels automatiques. Je l'intègre au site de façon fluide, pour que la réservation se fasse en quelques clics depuis un téléphone.",
				],
			},
			{
				title: "Un site à l'image de votre salon",
				paragraphs: [
					"Chaque salon a son ambiance. Je conçois un design sur mesure, à partir de vos couleurs, de votre logo et de vos photos, plutôt qu'un modèle déjà vu chez vos concurrents.",
				],
			},
		],
		faq: [
			{
				question: "Pouvez-vous connecter mon logiciel de réservation actuel ?",
				answer:
					"Dans la plupart des cas, oui : la plupart des outils de réservation pour salons proposent un lien ou un module à intégrer. Je vérifie la compatibilité lors du premier échange.",
			},
			{
				question: "Le site est-il adapté aux barbiers et instituts de beauté ?",
				answer:
					"Oui. La structure s'adapte à votre activité : coiffure, barbier, esthétique, onglerie ou spa. Le contenu et le design sont pensés pour votre clientèle.",
			},
			COMMON_FAQ.devis,
			COMMON_FAQ.deplacement,
		],
		serviceName:
			"Création de site internet pour salon de coiffure et d'esthétique",
		area: ["Vernon", "Eure"],
	},
	{
		path: "/site-internet-tpe-pme",
		kind: "metier",
		label: "Site internet pour TPE et PME",
		title: "Site internet pour TPE et PME à Vernon et dans l'Eure",
		description:
			"Création de site internet et d'applications pour TPE, PME, artisans et commerçants de Vernon et de l'Eure : site vitrine, e-commerce, outils métier sur mesure.",
		heading: "Un site internet pour votre TPE ou PME",
		hook: "Le premier rendez-vous avec vos clients.",
		intro: [
			"Artisan, commerçant, profession libérale ou PME : votre site est souvent le premier contact avec un futur client. En quelques secondes, il doit inspirer confiance et donner envie de vous appeler.",
			"Je conçois des sites et des outils web sur mesure pour les entreprises de Vernon et de l'Eure. J'y mets la rigueur apprise sur de grands projets, et la simplicité qu'attend une petite structure.",
		],
		showcase: "vitrine",
		works: ["Mon VDI Assistant", "Le Poudrier de Fleur", "Blissim"],
		highlights: [
			{
				icon: Store,
				title: "Site vitrine",
				text: "Présenter votre activité, vos réalisations et recevoir des demandes de devis.",
			},
			{
				icon: ShoppingBag,
				title: "E-commerce",
				text: "Vendre en ligne ou proposer le click & collect, avec une gestion simple.",
			},
			{
				icon: Wrench,
				title: "Outils sur mesure",
				text: "Prise de commande, gestion de clients, tableaux de bord : ce dont votre métier a besoin.",
			},
		],
		sections: [
			{
				title: "Des solutions adaptées à votre entreprise",
				points: [
					"Site vitrine pour artisans, commerçants et professions libérales",
					"Site d'entreprise avec pages de services et formulaire de devis",
					"Boutique en ligne et click & collect",
					"Application web métier, comme Mon VDI Assistant, un SaaS que j'ai conçu pour les vendeurs à domicile",
					"Refonte et maintenance de sites existants, y compris WordPress",
				],
			},
			{
				title: "Un site qui vous apporte des clients",
				paragraphs: [
					"Un beau site ne suffit pas : il doit être trouvé. Je construis chaque site autour des recherches de vos clients (« plombier Vernon », « traiteur Eure »…), avec des pages rapides, un contenu clair et un lien solide avec votre fiche Google.",
					"Je mets aussi en place la mesure d'audience, pour savoir combien de visiteurs vous contactent et d'où ils viennent.",
				],
			},
		],
		faq: [
			COMMON_FAQ.devis,
			COMMON_FAQ.maintenance,
			{
				question: "Je n'ai ni textes ni photos, est-ce un problème ?",
				answer:
					"Non. Je vous aide à structurer vos contenus avec un questionnaire simple, et je vous conseille sur les photos à prévoir. Les textes sont rédigés pour vos clients et pour Google.",
			},
			COMMON_FAQ.deplacement,
		],
		serviceName: "Création de site internet pour TPE et PME",
		area: ["Vernon", "Évreux", "Eure"],
	},
];

export function getLocalPage(path: string): LocalPage {
	const page = LOCAL_PAGES.find((p) => p.path === path);
	if (!page) throw new Error(`Page locale inconnue : ${path}`);
	return page;
}
