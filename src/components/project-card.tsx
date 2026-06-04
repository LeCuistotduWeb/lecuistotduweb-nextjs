import { useEffect, useState } from "react";
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
];

export default function ProjectCard({ className }: { className?: string }) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setCurrent((i) => (i + 1) % projects.length);
		}, 4000);
		return () => clearInterval(id);
	}, []);

	return (
		<div
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
								className={cn(
									"h-1 rounded-full transition-all duration-300",
									i === current ? "bg-white w-4" : "bg-white/40 w-1",
								)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
