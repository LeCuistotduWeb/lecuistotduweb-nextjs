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
	| "vitrine"
	| "booking-confirmed"
	| "gallery"
	| "maps-salon"
	| "salon"
	| "booking-link"
	| "quote"
	| "shop"
	| "dashboard";

/** Contenu du panneau épinglé des pages de zone (src/components/local-panels.tsx) */
export type ZonePanelId =
	| "map"
	| "design"
	| "google"
	| "references"
	| "code"
	| "app";

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
	showcase: "map" | "menu" | "booking" | "vitrine" | "salon";
	/** Encart « De la cuisine au code » propre à la page (sinon texte commun) */
	story?: string;
	/** Réalisations mises en avant, par libellé de src/data/works.ts */
	works: string[];
	highlights: { icon: LucideIcon; title: string; text: string }[];
	/**
	 * Récit au scroll : le téléphone (ou la carte, pour les pages de zone)
	 * reste épinglé et change à chaque étape. Remplace la grille des atouts
	 * quand il est renseigné. `screen` : écran du téléphone (pages métier) ;
	 * `panel` : contenu du panneau des pages de zone (carte par défaut).
	 */
	scrolly?: {
		screen?: PhoneScreen;
		panel?: ZonePanelId;
		title: string;
		text: string;
	}[];
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
			"Oui, un déplacement est possible à Vernon et dans les communes voisines, mais il n'est pas obligatoire : le premier échange se fait aussi très bien en visio ou par téléphone, comme le reste du projet.",
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
		title: "Création de site internet à Vernon (27) — Le Cuistot du Web",
		description:
			"Développeur web freelance à Vernon (Eure) : création de sites internet pour commerçants, restaurants, salons et TPE. Devis gratuit, échange en visio ou à Vernon.",
		heading: "Création de site internet à Vernon",
		hook: "Votre développeur web, à deux pas.",
		intro: [
			"Je m'appelle Gaëtan, je vis et je travaille à Vernon. Je crée des sites internet sur mesure pour les commerçants, restaurateurs, salons et petites entreprises d'ici : Vernon, Saint-Marcel, Saint-Just, Giverny et alentour.",
			"Pendant 8 ans, j'ai codé des sites à fort trafic pour Fnac Darty, Infogreffe ou Blissim. Aujourd'hui, je mets cette exigence au service des entreprises de mon territoire : déplacement possible autour de Vernon, ou échange en visio si vous préférez, et toujours le même interlocuteur au bout du fil.",
		],
		showcase: "map",
		scrolly: [
			{
				panel: "design",
				title: "Un site sur mesure",
				text: "Pas de modèle acheté puis recoloré : je dessine et je code votre site à partir de votre activité, de vos clients et de vos photos. Il vous ressemble, et il évolue avec vous.",
			},
			{
				panel: "google",
				title: "Pensé pour Google",
				text: "Pages rapides, adaptées au mobile, données structurées et lien avec votre fiche Google : tout est fait pour que les habitants de Vernon, Gaillon ou Pacy-sur-Eure vous trouvent.",
			},
		],
		works: ["Le Poudrier de Fleur", "Mon VDI Assistant", "Fnac Darty"],
		highlights: [
			{
				icon: MapPin,
				title: "Un développeur à Vernon",
				text: "Déplacement possible autour de Vernon, ou échange en visio, et réponses rapides : vous savez à qui vous parlez.",
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
					"Boutique en ligne pour les commerces",
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
			"Installé à Vernon, dans l'Eure, je vous accompagne en visio et par téléphone, du premier échange à la mise en ligne, avec un site de démonstration toujours accessible. Vous avez un seul interlocuteur, et c'est lui qui écrit le code de votre site.",
		],
		showcase: "map",
		scrolly: [
			{
				panel: "references",
				title: "Une expertise de grands comptes",
				text: "Fnac Darty, Infogreffe, Blissim : 8 ans sur des sites à fort trafic. J'en garde des méthodes solides, que j'applique à la taille de votre entreprise.",
			},
			{
				panel: "code",
				title: "Des sites durables",
				text: "Un code propre, rapide et documenté, que vous pourrez faire évoluer sans tout reconstruire. Et un suivi de maintenance si vous le souhaitez.",
			},
		],
		works: ["Fnac Darty", "Infogreffe", "Mon VDI Assistant"],
		highlights: [
			{
				icon: Handshake,
				title: "Un freelance de l'Eure",
				text: "Basé dans l'Eure, joignable facilement en visio ou par téléphone.",
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
					"Site e-commerce",
					"Application web sur mesure : prise de commande, gestion de clients, tableaux de bord, ou vos fichiers Excel transformés en une interface simple pour les gérer",
					"Refonte de site existant, y compris WordPress",
					"Référencement local et fiche Google Business Profile",
					"Maintenance, hébergement et évolutions",
				],
			},
			{
				title: "Évreux et les communes voisines",
				paragraphs: [
					"J'accompagne aussi les entreprises de Louviers, Val-de-Reuil, Pacy-sur-Eure et Gaillon. Le premier échange et les points de suivi se font en visio, sans que vous ayez à vous déplacer.",
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
		scrolly: [
			{
				panel: "design",
				title: "Sites internet",
				text: "Site vitrine, boutique en ligne, réservation ou prise de rendez-vous : je crée le site dont votre activité a besoin, pour les entreprises de tout l'est de l'Eure.",
			},
			{
				panel: "app",
				title: "Applications web",
				text: "Prise de commande, suivi des clients, tableaux de bord, ou vos fichiers Excel transformés en application : des outils sur mesure en React et Node.js, pour gagner du temps au quotidien.",
			},
			{
				panel: "references",
				title: "Renfort technique",
				text: "Vous avez déjà une équipe ? Je la rejoins en régie, sur site ou à distance, pour développer, structurer ou accélérer votre produit.",
			},
		],
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
					"J'accompagne les entreprises de l'est de l'Eure et des Yvelines voisines : Vernon, Saint-Marcel, Saint-Just, Gaillon, Pacy-sur-Eure, Les Andelys, Évreux, Louviers, Val-de-Reuil, Giverny, Bonnières-sur-Seine, Mantes-la-Jolie et Rouen.",
					"Autour de Vernon, un déplacement est possible si vous le souhaitez, sans obligation. Ailleurs, tout se fait très bien à distance, avec des points en visio et un site de démonstration accessible pendant la réalisation.",
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
					"Oui. J'interviens à distance partout en France, et sur site à Paris et Rouen, en ligne directe depuis Vernon, pour des missions de renfort fullstack React / Node.js.",
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
			"Avant de devenir développeur en 2017, j'ai travaillé en cuisine professionnelle. Je sais ce qu'est un coup de feu. Alors on échange l'après-midi, entre deux services, en visio ou dans votre restaurant si vous êtes près de Vernon, et je vous livre un site que vous mettez à jour sans y passer vos soirées.",
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
			"Site internet pour salon de coiffure, barbier ou institut de beauté à Vernon et dans l'Eure : galerie photo, ambiance du salon, prestations et lien vers votre réservation.",
		heading: "Un site internet pour votre salon de coiffure ou d'esthétique",
		hook: "Votre salon, aussi beau en ligne qu'en vrai.",
		intro: [
			"Avant de prendre rendez-vous, vos clientes et vos clients veulent voir vos réalisations, l'ambiance du salon et votre équipe. C'est souvent sur leur téléphone, en quelques secondes, qu'ils se décident.",
			"Je crée des sites pour les salons de coiffure, barbiers, instituts de beauté et prothésistes ongulaires de Vernon et de l'Eure. Des sites élégants et rapides sur mobile, qui mettent en valeur votre savoir-faire et renvoient vers votre outil de réservation.",
		],
		showcase: "salon",
		scrolly: [
			{
				screen: "gallery",
				title: "Vos réalisations en valeur",
				text: "Coupes, couleurs, soins : une galerie soignée montre votre savoir-faire mieux qu'un long discours, et donne envie de pousser la porte.",
			},
			{
				screen: "maps-salon",
				title: "Trouvé dans votre ville",
				text: "Quand on cherche « coiffeur Vernon », c'est souvent sur Google Maps qu'on vous découvre. Site et fiche Google travaillent ensemble, avec un bouton pour réserver.",
			},
			{
				screen: "booking-link",
				title: "Votre outil de réservation, en un clic",
				text: "Vous utilisez déjà Planity ou un autre outil ? Un bouton « Prendre rendez-vous » y mène directement : vous gardez votre planning comme aujourd'hui, sans rien changer à vos habitudes.",
			},
		],
		works: ["Blissim", "Le Poudrier de Fleur", "Marie Jade"],
		highlights: [
			{
				icon: Images,
				title: "Vos réalisations en valeur",
				text: "Une galerie photo soignée, qui donne envie de venir.",
			},
			{
				icon: CalendarClock,
				title: "Votre réservation en un clic",
				text: "Un bouton vers votre outil de réservation actuel.",
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
					"Une galerie de vos coupes, couleurs ou soins",
					"L'ambiance du salon : votre décor, votre équipe, vos marques partenaires",
					"Vos prestations et leur durée, présentées clairement",
					"Un bouton « Prendre rendez-vous » vers votre outil de réservation actuel",
					"Horaires, adresse, plan et bouton d'appel direct",
					"Vos avis Google et vos réseaux sociaux",
				],
			},
			{
				title: "Votre savoir-faire, en images",
				paragraphs: [
					"Une belle photo de coupe, de couleur ou de soin convainc mieux qu'un long texte. Je mets en scène vos réalisations, votre équipe et l'ambiance du salon, avec des pages qui restent rapides même avec beaucoup de photos.",
					"Et quand une cliente a trouvé son style, le bouton « Prendre rendez-vous » l'emmène directement sur votre outil de réservation.",
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
					"Oui : si vous utilisez Planity ou un autre outil, le site y renvoie avec un bouton « Prendre rendez-vous », et vous gardez votre planning comme aujourd'hui. Je vérifie les possibilités de votre outil lors du premier échange.",
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
		scrolly: [
			{
				screen: "quote",
				title: "Site vitrine",
				text: "Vos services, vos réalisations et un formulaire de devis clair : votre site présente votre savoir-faire et vous apporte des demandes qualifiées.",
			},
			{
				screen: "shop",
				title: "E-commerce",
				text: "Vendre en ligne, avec une gestion simple de vos produits, de vos stocks et de vos commandes.",
			},
			{
				screen: "dashboard",
				title: "Outils sur mesure",
				text: "Prise de commande, gestion de clients, tableaux de bord, ou vos fichiers Excel transformés en application : je développe les outils dont votre métier a besoin, comme Mon VDI Assistant pour les vendeurs à domicile.",
			},
		],
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
				text: "Vendre en ligne, avec une gestion simple de vos produits et de vos commandes.",
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
					"Boutique en ligne",
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
