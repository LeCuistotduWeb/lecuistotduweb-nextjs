import { useEffect, useRef, useState } from "react";
import { cn } from "#/lib/utils";

const projects = [
	{
		src: "/works/miniature-site-web-laclassedefleur.jpg",
		label: "La Classe de Fleur",
	},
	{
		src: "/works/miniature-site-web-portfolio-infogreffe.jpg",
		label: "Infogreffe",
	},
	{
		src: "/works/miniature-site-web.jpg",
		label: "Blissim",
	},
	{
		src: "/works/miniature-fnac-darty.jpeg",
		label: "Fnac Darty",
	},
	{
		src: "/works/thumbnail-work-musee-du-louvre-symfony.jpg",
		label: "Musée du Louvre",
	},
	{
		src: "/works/thumbnail-worksite-web-nomad-education.jpg",
		label: "Nomad Education",
	},
	{
		src: "/works/mon-vdi-assistant-miniature.png",
		label: "Mon VDI Assistant",
	},
];

export default function ProjectCard({ className }: { className?: string }) {
	const [current, setCurrent] = useState(0);
	const touchStartX = useRef<number | null>(null);

	useEffect(() => {
		const id = setInterval(() => {
			setCurrent((i) => (i + 1) % projects.length);
		}, 4000);
		return () => clearInterval(id);
	}, []);

	function handleTouchStart(e: React.TouchEvent) {
		touchStartX.current = e.touches[0].clientX;
	}

	function handleTouchEnd(e: React.TouchEvent) {
		if (touchStartX.current === null) return;
		const delta = touchStartX.current - e.changedTouches[0].clientX;
		touchStartX.current = null;
		if (Math.abs(delta) < 50) return;
		setCurrent((i) =>
			delta > 0
				? (i + 1) % projects.length
				: (i - 1 + projects.length) % projects.length,
		);
	}

	return (
		<div
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			className={cn(
				"relative overflow-hidden rounded-2xl border border-[#d2c4a4] dark:border-[#1c2a3a] min-h-64 md:min-h-180",
				className,
			)}
		>
			{projects.map((project, i) => (
				<img
					key={project.src}
					src={project.src}
					alt={project.label}
					className={cn(
						"absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
						i === current ? "opacity-100" : "opacity-0",
					)}
				/>
			))}

			<div className="absolute top-4 left-4">
				<span className="text-xs font-semibold text-white uppercase tracking-widest px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm">
					Projets
				</span>
			</div>

			<div className="absolute bottom-4 left-4 right-4">
				<div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2">
					<p className="text-white font-medium text-sm">{projects[current].label}</p>
					<div className="flex gap-1.5 mt-2">
						{projects.map((_, i) => (
							<button
								key={i}
								type="button"
								onClick={() => setCurrent(i)}
								className="py-2 px-0.5 flex items-center"
								aria-label={`Voir le projet ${projects[i].label}`}
							>
								<span
									className={cn(
										"h-4 rounded-full transition-all duration-300 block cursor-pointer",
										i === current ? "bg-white w-10" : "bg-white/40 w-4",
									)}
								/>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
