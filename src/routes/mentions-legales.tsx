import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Facts,
	LegalPage,
	type LegalSection,
	legalHead,
	Strong,
	TextLink,
} from "#/components/legal-page";
import { siteConfig } from "#/config";

const PATH = "/mentions-legales";
const TITLE = `Mentions légales — ${siteConfig.local.businessName}`;
const DESCRIPTION = `Mentions légales du site ${siteConfig.shortUrl} : éditeur, hébergeur, propriété intellectuelle.`;

export const Route = createFileRoute("/mentions-legales")({
	head: () => legalHead(PATH, TITLE, DESCRIPTION),
	component: MentionsLegales,
});

function MentionsLegales() {
	const { legal, local } = siteConfig;
	const sections: LegalSection[] = [
		{
			id: "editeur",
			title: "Éditeur du site",
			content: (
				<>
					<p>
						Le site <Strong>{siteConfig.shortUrl}</Strong> est édité par :
					</p>
					<Facts
						items={[
							["Nom", `${legal.publisher} EI`],
							["Nom commercial", local.businessName],
							["Statut", legal.status],
							["SIRET", legal.siret],
							["Adresse", legal.address],
							[
								"E-mail",
								<TextLink key="email" href={`mailto:${siteConfig.email}`}>
									{siteConfig.email}
								</TextLink>,
							],
							["TVA", legal.vat],
						]}
					/>
					<p>
						Directeur de la publication : <Strong>{legal.publisher}</Strong>.
					</p>
				</>
			),
		},
		{
			id: "hebergeur",
			title: "Hébergement",
			content: (
				<Facts
					items={[
						["Hébergeur", legal.host.name],
						["Adresse", legal.host.address],
						[
							"Site",
							<TextLink key="host" href={legal.host.url}>
								{legal.host.url.replace("https://", "")}
							</TextLink>,
						],
					]}
				/>
			),
		},
		{
			id: "propriete",
			title: "Propriété intellectuelle",
			content: (
				<>
					<p>
						Les textes, illustrations, le logo {siteConfig.alias} et le code du
						site sont la propriété de {legal.publisher}, sauf mention contraire.
						Toute reproduction sans autorisation écrite est interdite.
					</p>
					<p>
						Les noms, marques et visuels des clients et projets présentés
						appartiennent à leurs titulaires respectifs. Ils sont cités à titre
						de références professionnelles.
					</p>
					<p>
						Polices de caractères : Fraunces et Manrope, sous licence SIL Open
						Font License.
					</p>
				</>
			),
		},
		{
			id: "liens",
			title: "Liens et responsabilité",
			content: (
				<>
					<p>
						Les informations du site sont fournies à titre indicatif et mises à
						jour régulièrement. Elles ne constituent pas une offre contractuelle
						: chaque prestation fait l'objet d'un devis.
					</p>
					<p>
						Le site contient des liens vers des sites tiers (réalisations,
						réseaux sociaux, fiche Google). {legal.publisher} n'est pas
						responsable de leur contenu.
					</p>
				</>
			),
		},
		{
			id: "donnees",
			title: "Données personnelles",
			content: (
				<p>
					Formulaire de contact, assistant, prise de rendez-vous, mesure
					d'audience : tout est expliqué dans la{" "}
					<Link
						to="/confidentialite"
						className="font-semibold text-[#b52f2f] underline underline-offset-4 hover:no-underline dark:text-[#ff7a7a]"
					>
						politique de confidentialité
					</Link>
					.
				</p>
			),
		},
	];

	return (
		<LegalPage
			eyebrow="Informations légales"
			title="Mentions légales"
			intro={
				<p>
					Qui édite ce site, où il est hébergé, et ce que vous pouvez en faire.
				</p>
			}
			sections={sections}
		/>
	);
}
