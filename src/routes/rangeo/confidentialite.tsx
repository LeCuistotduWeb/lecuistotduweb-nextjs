import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { RANGEO_ACCENT, RangeoShell } from "#/components/rangeo-shell";
import { siteConfig } from "#/config";

const TITLE = "Rangeo — Politique de confidentialité";
const DESCRIPTION =
	"Politique de confidentialité de l'application Android Rangeo : aucune donnée collectée, tout reste sur votre téléphone.";
const UPDATED_AT = "11 novembre 2026";

export const Route = createFileRoute("/rangeo/confidentialite")({
	head: () => ({
		meta: [
			{ title: TITLE },
			{ name: "description", content: DESCRIPTION },
			{ name: "og:title", content: TITLE },
			{ name: "og:description", content: DESCRIPTION },
			{ name: "og:url", content: `${siteConfig.rangeo.url}/confidentialite` },
		],
		links: [
			{ rel: "canonical", href: `${siteConfig.rangeo.url}/confidentialite` },
		],
	}),
	component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className="mt-8 border-t border-[#d2c4a4] pt-6 dark:border-[#253c59]">
			<h2 className="text-lg font-semibold text-[#253c59] dark:text-white">
				{title}
			</h2>
			<div className="mt-2 space-y-3">{children}</div>
		</section>
	);
}

function Strong({ children }: { children: ReactNode }) {
	return (
		<strong className="font-semibold text-[#253c59] dark:text-white">
			{children}
		</strong>
	);
}

function PrivacyPage() {
	return (
		<RangeoShell>
			<article className="mx-auto mt-4 max-w-3xl rounded-2xl border border-[#d2c4a4] bg-[#faf5ec]/95 p-6 leading-relaxed text-[#3a5570] backdrop-blur-sm md:p-12 dark:border-[#1c2a3a] dark:bg-[#121e2a]/95 dark:text-[#c5d5e5]">
				<h1 className="display-title text-3xl font-bold leading-tight text-[#253c59] dark:text-white">
					<span className={RANGEO_ACCENT}>Rangeo</span> — Politique de
					confidentialité
				</h1>
				<p className="mt-1 text-sm text-[#4a6a8a] dark:text-[#a1adbc]">
					Dernière mise à jour : {UPDATED_AT}
				</p>

				<p className="mt-6">
					Cette politique s'applique à l'application Android{" "}
					<Strong>Rangeo</Strong> (identifiant{" "}
					<code className="text-sm">{siteConfig.rangeo.packageId}</code>),
					application de rangement et de déménagement.
				</p>

				<Section title="En bref">
					<p>
						Rangeo fonctionne <Strong>entièrement hors ligne</Strong>.
						L'application{" "}
						<Strong>
							ne collecte, ne transmet et ne partage aucune donnée personnelle
						</Strong>
						.
					</p>
					<p>
						Aucun compte, aucune inscription, aucune publicité, aucun traqueur,
						aucun outil de mesure d'audience. Rangeo ne contacte aucun serveur.
					</p>
				</Section>

				<Section title="Où sont stockées vos données">
					<p>
						Tout ce que vous saisissez (lieux, contenants, objets, photos,
						checklist de déménagement) est stocké{" "}
						<Strong>uniquement sur votre téléphone</Strong>, dans l'espace privé
						de l'application : une base de données locale et un dossier de
						photos.
					</p>
					<p>
						Ces données ne quittent votre appareil que si <Strong>vous</Strong>{" "}
						décidez d'exporter un PDF ou une sauvegarde ZIP et de les partager
						avec l'application de votre choix.
					</p>
				</Section>

				<Section title="Autorisations utilisées">
					<ul className="list-disc space-y-2 pl-5">
						<li>
							<Strong>Appareil photo</Strong> : uniquement pour scanner les QR
							codes de vos contenants et photographier leur contenu. Les images
							restent sur le téléphone.
						</li>
						<li>
							<Strong>Photos</Strong> (facultatif) : uniquement si vous
							choisissez d'ajouter une image depuis votre galerie.
						</li>
						<li>
							<Strong>Notifications</Strong> (facultatif) : uniquement pour les
							rappels de votre checklist de déménagement, programmés localement.
						</li>
					</ul>
					<p>
						Vous pouvez retirer ces autorisations à tout moment dans les
						réglages d'Android.
					</p>
				</Section>

				<Section title="Partage avec des tiers">
					<p>
						Rangeo <Strong>ne partage aucune donnée avec des tiers</Strong> et
						n'intègre aucun service tiers de collecte (publicité, statistiques,
						rapports de plantage).
					</p>
				</Section>

				<Section title="Sauvegarde Android">
					<p>
						Si la sauvegarde automatique d'Android est activée sur votre
						téléphone, la base de données de Rangeo (sans les photos) peut être
						incluse dans la sauvegarde système, gérée par Android et votre
						compte Google. Rangeo n'a pas accès à cette sauvegarde et n'envoie
						rien de lui-même.
					</p>
				</Section>

				<Section title="Suppression des données">
					<p>
						Désinstaller l'application, ou effacer ses données depuis les
						réglages d'Android, supprime définitivement toutes les informations
						de Rangeo de votre téléphone. Aucune copie n'existe ailleurs, hormis
						vos propres exports et la sauvegarde Android éventuelle.
					</p>
				</Section>

				<Section title="Enfants">
					<p>Rangeo ne collecte aucune donnée, y compris auprès des enfants.</p>
				</Section>

				<Section title="Modifications">
					<p>
						Toute modification de cette politique sera publiée sur cette page
						avec sa date de mise à jour.
					</p>
				</Section>

				<Section title="Contact">
					<p>
						Pour toute question :{" "}
						<a
							href={`mailto:${siteConfig.email}`}
							className="font-medium underline underline-offset-4"
						>
							<span className={RANGEO_ACCENT}>{siteConfig.email}</span>
						</a>
					</p>
				</Section>
			</article>
		</RangeoShell>
	);
}
