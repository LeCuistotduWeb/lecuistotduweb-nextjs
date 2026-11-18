// Génère la couverture d'un projet au format des autres miniatures
// (public/works/*-1280.webp et *-640.webp, 16/9) :
// - avec `screens` : de vraies captures (données fictives) dans un ordinateur
//   et un téléphone, sources dans scripts/covers/<projet>/ ;
// - sinon : une interface illustrative, sans aucune donnée réelle.
// Usage : node scripts/work-cover.mjs <projet>   (ex. soliasso)
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const asset = (path) => readFileSync(resolve(root, path)).toString("base64");

/** Projets disponibles : nom affiché, couleur d'aplat, menu, liste, statuts. */
const COVERS = {
	soliasso: {
		file: "miniature-soliasso",
		name: "SOLIASSO",
		screens: {
			laptop: "scripts/covers/soliasso/dashboard.webp",
			phone: "scripts/covers/soliasso/mobile.webp",
			backdrop: "scripts/covers/soliasso/formulaires.webp",
		},
		color: "#1f6f6a",
		title: "Suivi des dossiers",
		list: "Dossiers récents",
		nav: [
			"Tableau de bord",
			"Dossiers",
			"Qualification",
			"Évaluations",
			"Planning",
			"Statistiques",
		],
		stats: ["Dossiers reçus", "À qualifier", "En évaluation", "Délai moyen"],
		statuses: [
			["À qualifier", "#e4b962"],
			["En évaluation", "#5096e6"],
			["Terminé", "#3aa17e"],
		],
	},
	trustmycontent: {
		file: "miniature-trustmycontent",
		name: "TrustMyContent",
		color: "#4b3b8f",
		title: "Bibliothèque de contenus",
		list: "Contenus récents",
		nav: [
			"Bibliothèque",
			"Importer",
			"Inspecter",
			"Étiqueter",
			"Signer",
			"Crédits",
		],
		stats: ["Images", "Signées C2PA", "Analyse IA", "Filigranées"],
		statuses: [
			["Signée C2PA", "#3aa17e"],
			["À signer", "#e4b962"],
			["Filigranée", "#7a5cd6"],
		],
	},
};

const key = process.argv[2];
const cover = COVERS[key];
if (!cover) {
	console.error(
		`Projet inconnu. Disponibles : ${Object.keys(COVERS).join(", ")}`,
	);
	process.exit(1);
}

const fraunces = asset(
	"node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2",
);
const manrope = asset(
	"node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
);

const image = (path) => `data:image/webp;base64,${asset(path)}`;
const shots = cover.screens;

const bar = (w, tone = "#e6e9ee") =>
	`<span class="bar" style="width:${w}px;background:${tone}"></span>`;

const rows = Array.from({ length: 6 }, (_, i) => {
	const [label, color] = cover.statuses[i % cover.statuses.length];
	return `<div class="row">
		<span class="avatar"></span>${bar(110 + ((i * 37) % 60), "#dfe3ea")}
		${bar(70 + ((i * 23) % 40))}${bar(54)}
		<span class="pill" style="color:${color};background:${color}1f">${label}</span>
	</div>`;
}).join("");

const screen = `
<div class="app">
	<aside>
		<div class="logo"><span class="mark"></span>${cover.name}</div>
		${cover.nav.map((item, i) => `<div class="nav${i === 0 ? " active" : ""}"><span class="ico"></span>${item}</div>`).join("")}
		<div class="user"><span class="avatar"></span>${bar(70, "#d5dae2")}</div>
	</aside>
	<main>
		<h2>${cover.title}</h2>
		<div class="stats">
			${cover.stats.map((label) => `<div class="stat"><span>${label}</span>${bar(46, "#253c59")}</div>`).join("")}
		</div>
		<div class="panel">
			<div class="panel-head"><b>${cover.list}</b>${bar(60, "#eef0f4")}</div>
			${rows}
		</div>
	</main>
</div>`;

const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><style>
@font-face { font-family: Fraunces; src: url(data:font/woff2;base64,${fraunces}) format("woff2"); font-weight: 100 900; }
@font-face { font-family: Manrope; src: url(data:font/woff2;base64,${manrope}) format("woff2"); font-weight: 200 800; }
* { margin: 0; box-sizing: border-box; }
body { width: 1280px; height: 720px; overflow: hidden; position: relative; background: #fff; font-family: Manrope, sans-serif; color: #253c59; }
.bar { display: inline-block; height: 10px; border-radius: 99px; }
.avatar { display: inline-block; width: 22px; height: 22px; border-radius: 50%; background: #d5dae2; flex: none; }
/* Fond : l'interface agrandie à gauche, aplat de couleur en diagonale */
.backdrop { position: absolute; inset: 0; padding: 26px; display: grid; grid-template-columns: repeat(3, 330px); gap: 26px; }
.backdrop .card { border: 2px solid #eceef2; border-radius: 26px; padding: 36px; display: flex; flex-direction: column; gap: 26px; height: 170px; }
.backdrop .card span:first-child { font-size: 30px; color: #6b7a8c; }
.backdrop .card .bar { height: 30px; width: 110px; background: #253c59; }
.backdrop .big { grid-column: span 2; height: 300px; }
.shot-bg { position: absolute; left: -60px; top: -90px; width: 1900px; }
/* Ordinateur (944 px avec son socle) + téléphone qui chevauche le socle de
   120 px : l'ensemble (1034 px) est centré, 123 px de marge de chaque côté. */
.shots .laptop { left: 595px; }
.display img { display: block; width: 100%; }
.shots .display { background: #fafafa; }
.phone { position: absolute; left: 947px; top: 250px; width: 210px; padding: 9px; border-radius: 36px; background: #1d1f22; box-shadow: 0 0 0 3px #9aa0a6 inset, 0 24px 40px rgba(0,0,0,.3); }
.phone img { display: block; width: 100%; border-radius: 28px; }
.slash { position: absolute; inset: 0; background: ${cover.color}; clip-path: polygon(66% 0, 100% 0, 100% 100%, 43% 100%); }
/* Ordinateur */
.laptop { position: absolute; left: 50%; top: 80px; width: 780px; transform: translateX(-50%); }
.lid { background: #1d1f22; border-radius: 26px 26px 0 0; padding: 30px 30px 26px; box-shadow: 0 0 0 3px #9aa0a6 inset; }
.display { height: 452px; background: #fff; overflow: hidden; }
.base { position: relative; height: 22px; margin: 0 -82px; background: linear-gradient(#d9dce0, #8e9399); border-radius: 0 0 22px 22px; box-shadow: 0 18px 30px rgba(0,0,0,.25); }
.base::before { content: ""; position: absolute; left: 50%; top: 0; width: 120px; height: 7px; transform: translateX(-50%); background: #a8adb3; border-radius: 0 0 8px 8px; }
/* Interface */
.app { display: grid; grid-template-columns: 170px 1fr; height: 100%; font-size: 11px; }
aside { background: #f4f5f7; padding: 16px 10px; display: flex; flex-direction: column; gap: 4px; }
.logo { display: flex; align-items: center; gap: 8px; font-family: Fraunces, serif; font-weight: 700; font-size: 14px; margin: 0 6px 14px; letter-spacing: .04em; }
.mark { flex: none; width: 18px; height: 18px; border-radius: 6px; background: ${cover.color}; }
.nav { display: flex; align-items: center; gap: 8px; padding: 7px 8px; border-radius: 8px; color: #4a5a6c; font-weight: 600; }
.nav.active { background: #fff; color: #253c59; box-shadow: 0 1px 2px rgba(0,0,0,.06); }
.ico { width: 12px; height: 12px; border-radius: 4px; border: 2px solid currentColor; opacity: .55; }
.user { margin-top: auto; display: flex; align-items: center; gap: 8px; padding: 6px; }
main { padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; }
h2 { font-family: Fraunces, serif; font-size: 18px; font-weight: 700; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.stat { border: 1px solid #eceef2; border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 10px; color: #6b7a8c; font-weight: 600; }
.stat .bar { height: 14px; }
.panel { border: 1px solid #eceef2; border-radius: 10px; padding: 12px 14px; display: flex; flex-direction: column; }
.panel-head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; font-size: 12px; }
.row { display: flex; align-items: center; gap: 14px; padding: 9px 0; border-top: 1px solid #f1f2f5; }
.pill { margin-left: auto; font-weight: 700; font-size: 10px; padding: 4px 9px; border-radius: 99px; }
</style></head><body${shots ? ' class="shots"' : ""}>
	${
		shots
			? `<img class="shot-bg" src="${image(shots.backdrop)}" alt="">`
			: `<div class="backdrop">
		${cover.stats
			.slice(0, 3)
			.map(
				(label) =>
					`<div class="card"><span>${label}</span><span class="bar"></span></div>`,
			)
			.join("")}
		<div class="card big"><span>${cover.list}</span></div>
	</div>`
	}
	<div class="slash"></div>
	<div class="laptop"><div class="lid"><div class="display">${
		shots ? `<img src="${image(shots.laptop)}" alt="">` : screen
	}</div></div><div class="base"></div></div>
	${shots?.phone ? `<div class="phone"><img src="${image(shots.phone)}" alt=""></div>` : ""}
</body></html>`;

const out = mkdtempSync(join(tmpdir(), "work-cover-"));
const png = join(out, "cover.png");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: png });
await browser.close();

for (const width of [1280, 640]) {
	const target = resolve(root, `public/works/${cover.file}-${width}.webp`);
	execFileSync("cwebp", [
		"-quiet",
		"-q",
		"82",
		"-resize",
		String(width),
		"0",
		png,
		"-o",
		target,
	]);
	console.log(`✓ ${target}`);
}
