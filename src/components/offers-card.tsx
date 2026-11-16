import { Code2, LifeBuoy, Users } from "lucide-react";
import { cn } from "#/lib/utils";
import { BentoCard } from "./bento-card";
import { CardTitle } from "./card-title";

const OFFERS = [
	{
		icon: Users,
		title: "Renfort React / Next.js",
		text: "J'intègre votre équipe en régie, à distance ou sur site (Paris, Rouen), pour développer, structurer ou accélérer votre produit.",
	},
	{
		icon: Code2,
		title: "Projet sur mesure",
		text: "Application web, SaaS, e-commerce ou site vitrine : je m'occupe de tout, de la conception à la mise en ligne.",
	},
	{
		icon: LifeBuoy,
		title: "Maintenance et évolutions",
		text: "Mises à jour, corrections et nouvelles fonctionnalités sur votre site existant, WordPress compris.",
	},
];

const STEPS = [
	{
		title: "Échange",
		text: "Un premier appel de 30 minutes pour comprendre votre besoin.",
	},
	{
		title: "Devis",
		text: "Une proposition claire : périmètre, délais et prix.",
	},
	{
		title: "Réalisation",
		text: "Des points réguliers et des livraisons fréquentes, jusqu'à la mise en ligne.",
	},
];

export function OffersCard({ className }: { className?: string }) {
	return (
		<BentoCard className={cn("flex flex-col gap-8", className)}>
			<div>
				<CardTitle>Ce que je propose</CardTitle>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					{OFFERS.map(({ icon: Icon, title, text }) => (
						<div
							key={title}
							className="flex flex-col gap-2 rounded-xl bg-[#f5efe0] dark:bg-[#1c2a3a] border border-[#d2c4a4] dark:border-[#253c59] hover:border-[#f25353]/50 dark:hover:border-[#f25353]/50 p-4 transition-colors"
						>
							<Icon className="size-5 text-[#f25353]" aria-hidden="true" />
							<h3 className="text-[#253c59] dark:text-white font-semibold">
								{title}
							</h3>
							<p className="text-[#4a6a8a] dark:text-[#a1adbc] text-sm leading-relaxed">
								{text}
							</p>
						</div>
					))}
				</div>
				<p className="mt-3 text-xs font-medium text-[#4a6a8a] dark:text-[#a1adbc]">
					Sur devis, selon votre besoin.
				</p>
			</div>

			<div>
				<CardTitle>Comment ça se passe</CardTitle>
				<ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{STEPS.map((step, i) => (
						<li key={step.title} className="flex gap-3">
							<span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#f25353]/60 text-xs font-semibold tabular-nums text-[#b52f2f] dark:text-[#ff7a7a]">
								{i + 1}
							</span>
							<div>
								<p className="font-semibold text-[#253c59] dark:text-white">
									{step.title}
								</p>
								<p className="text-sm text-[#4a6a8a] dark:text-[#a1adbc]">
									{step.text}
								</p>
							</div>
						</li>
					))}
				</ol>
			</div>
		</BentoCard>
	);
}
