import { createFileRoute } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import {
	Facts,
	LegalPage,
	type LegalSection,
	legalHead,
	Strong,
	TextLink,
} from "#/components/legal-page";
import { siteConfig } from "#/config";
import { openConsentBanner } from "#/lib/consent";

const PATH = "/confidentialite";
const TITLE = `Politique de confidentialité — ${siteConfig.local.businessName}`;
const DESCRIPTION = `Données personnelles et cookies sur ${siteConfig.shortUrl} : ce qui est collecté, pourquoi, combien de temps, et comment exercer vos droits.`;

export const Route = createFileRoute("/confidentialite")({
	head: () => legalHead(PATH, TITLE, DESCRIPTION),
	component: Confidentialite,
});

function ConsentButton() {
	return (
		<button
			type="button"
			onClick={openConsentBanner}
			className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#d93a3a] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#f25353]/25 transition-colors hover:bg-[#c93434]"
		>
			<Cookie aria-hidden="true" className="size-4" />
			Modifier mon choix
		</button>
	);
}

function Confidentialite() {
	const { legal } = siteConfig;
	const mail = (
		<TextLink href={`mailto:${siteConfig.email}`}>{siteConfig.email}</TextLink>
	);

	const sections: LegalSection[] = [
		{
			id: "responsable",
			title: "Responsable du traitement",
			content: (
				<p>
					<Strong>{legal.publisher}</Strong>, entrepreneur individuel (
					{siteConfig.local.businessName}), joignable à {mail}. Je n'utilise vos
					données que pour les besoins décrits ci-dessous. Je ne les vends pas
					et ne les utilise pas pour de la publicité.
				</p>
			),
		},
		{
			id: "contact",
			title: "Formulaire de contact",
			content: (
				<>
					<p>
						Quand vous m'écrivez, votre message m'arrive par e-mail. Il contient
						:
					</p>
					<ul>
						<li>votre nom, votre e-mail, le sujet et votre message ;</li>
						<li>
							des informations techniques pour repérer les abus : adresse IP,
							navigateur, page d'envoi, pays et ville approximatifs, date.
						</li>
					</ul>
					<Facts
						items={[
							["Pourquoi", "Vous répondre et, si besoin, préparer un devis"],
							[
								"Base légale",
								"Intérêt légitime à traiter votre demande, ou mesures précontractuelles",
							],
							[
								"Durée",
								"3 ans après notre dernier échange, sauf relation client (durée du contrat, puis obligations comptables)",
							],
							[
								"Prestataire",
								<>
									Resend (envoi des e-mails), États-Unis, encadré par des
									clauses contractuelles types
								</>,
							],
						]}
					/>
					<p>
						Pour limiter le spam, l'adresse IP est aussi gardée quelques minutes
						en mémoire sur le serveur, puis oubliée.
					</p>
				</>
			),
		},
		{
			id: "assistant",
			title: "Assistant IA",
			content: (
				<>
					<p>
						Les questions posées à l'assistant sont transmises à l'API{" "}
						<Strong>Gemini de Google</Strong> pour générer la réponse. Je ne les
						enregistre pas sur mon serveur.
					</p>
					<p>
						L'assistant utilise l'offre gratuite de l'API : Google peut
						conserver ces échanges et s'en servir pour améliorer ses produits, y
						compris par une relecture humaine, selon les{" "}
						<TextLink href="https://ai.google.dev/gemini-api/terms">
							conditions de l'API Gemini
						</TextLink>
						.
					</p>
					<p>
						L'historique de la conversation reste{" "}
						<Strong>dans votre navigateur</Strong>. La corbeille de l'assistant
						(« Effacer l'historique ») le supprime. Merci de ne pas y saisir
						d'informations personnelles : pour un projet, le formulaire de
						contact est fait pour ça.
					</p>
				</>
			),
		},
		{
			id: "rendez-vous",
			title: "Prise de rendez-vous",
			content: (
				<p>
					Le bouton « Prendre rendez-vous » ouvre l'agenda{" "}
					<Strong>Cal.com</Strong> (Cal.com, Inc., États-Unis). Les informations
					que vous y saisissez (nom, e-mail, note) servent à organiser l'échange
					et sont traitées par Cal.com selon sa{" "}
					<TextLink href="https://cal.com/privacy">
						politique de confidentialité
					</TextLink>
					. Rien n'est chargé tant que vous ne cliquez pas.
				</p>
			),
		},
		{
			id: "cookies",
			title: "Cookies et mesure d'audience",
			content: (
				<>
					<p>
						Avec votre accord seulement, j'utilise{" "}
						<Strong>Google Analytics</Strong> pour compter les visites et voir
						quelles pages et quels boutons sont utiles. Sans accord, aucun
						script Google n'est chargé.
					</p>
					<Facts
						items={[
							["Cookies", "_ga et _ga_<identifiant>"],
							["Durée", "13 mois au plus"],
							[
								"Prestataire",
								"Google Ireland Ltd ; transfert possible vers Google LLC (États-Unis), certifiée Data Privacy Framework",
							],
							[
								"Réglages",
								"Signaux Google et personnalisation publicitaire désactivés",
							],
						]}
					/>
					<p>
						Votre choix est gardé 13 mois si vous acceptez, 6 mois si vous
						refusez. Vous pouvez le changer à tout moment :
					</p>
					<ConsentButton />
					<p>
						Le site garde aussi dans votre navigateur quelques réglages
						nécessaires à son fonctionnement, sans traçage : thème clair ou
						sombre, choix ci-dessus, écran d'accueil déjà vu, historique de
						l'assistant.
					</p>
				</>
			),
		},
		{
			id: "hebergement",
			title: "Hébergement",
			content: (
				<p>
					Le site est hébergé par <Strong>{legal.host.name}</Strong>, aux
					États-Unis, qui enregistre des journaux techniques (adresse IP, date,
					page demandée) pour assurer la sécurité et le bon fonctionnement du
					service. Ces transferts sont encadrés par le Data Privacy Framework et
					des clauses contractuelles types.
				</p>
			),
		},
		{
			id: "droits",
			title: "Vos droits",
			content: (
				<>
					<p>
						Vous pouvez demander l'accès à vos données, leur rectification, leur
						suppression ou leur portabilité, vous opposer à leur traitement ou
						en demander la limitation. Écrivez-moi à {mail} : je réponds sous un
						mois.
					</p>
					<p>
						Si vous estimez que vos droits ne sont pas respectés, vous pouvez
						saisir la{" "}
						<TextLink href="https://www.cnil.fr/fr/plaintes">CNIL</TextLink>.
					</p>
				</>
			),
		},
	];

	return (
		<LegalPage
			eyebrow="Données personnelles"
			title="Politique de confidentialité"
			intro={
				<p>
					Ce que le site collecte, pourquoi, combien de temps, et comment
					reprendre la main. Version courte : le strict nécessaire, et rien sans
					votre accord pour la mesure d'audience.
				</p>
			}
			sections={sections}
		/>
	);
}
