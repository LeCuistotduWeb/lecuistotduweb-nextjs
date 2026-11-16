// Génère l'image de partage public/og-image.png (1200×630, LinkedIn, Slack…).
// Usage : node scripts/og-image.mjs
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const asset = (path) => readFileSync(resolve(root, path)).toString("base64");

const fraunces = asset(
	"node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2",
);
const manrope = asset(
	"node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
);
const avatar = asset("public/lcdw-avatar.png");

const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><style>
@font-face { font-family: Fraunces; src: url(data:font/woff2;base64,${fraunces}) format("woff2"); font-weight: 100 900; }
@font-face { font-family: Manrope; src: url(data:font/woff2;base64,${manrope}) format("woff2"); font-weight: 200 800; }
* { margin: 0; box-sizing: border-box; }
body {
	width: 1200px; height: 630px; overflow: hidden; position: relative;
	font-family: Manrope, sans-serif; color: #fff;
	background: linear-gradient(135deg, #253c59 0%, #16253a 100%);
	display: flex; align-items: center; padding: 0 80px; gap: 48px;
}
.glow { position: absolute; border-radius: 50%; filter: blur(90px); }
.glow.coral { width: 520px; height: 520px; right: -120px; top: -180px; background: rgba(242, 83, 83, .35); }
.glow.gold { width: 420px; height: 420px; left: -160px; bottom: -220px; background: rgba(228, 185, 98, .18); }
.text { flex: 1; position: relative; display: flex; flex-direction: column; gap: 22px; }
.alias { font-size: 22px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #ff8a8a; }
h1 { font-family: Fraunces, serif; font-size: 84px; font-weight: 600; line-height: 1; letter-spacing: -.02em; }
.role { font-size: 34px; font-weight: 600; color: #c5d5e5; }
.pills { display: flex; gap: 12px; margin-top: 8px; }
.pill { font-size: 22px; font-weight: 700; padding: 10px 20px; border-radius: 999px; }
.pill.main { background: #f25353; }
.pill.ghost { border: 2px solid rgba(255, 255, 255, .25); }
.refs { font-size: 22px; color: #a1adbc; margin-top: 6px; }
.refs b { color: #fff; font-weight: 700; }
.avatar { position: relative; width: 380px; height: 380px; flex-shrink: 0; }
.avatar img { width: 100%; height: 100%; }
.url { position: absolute; right: 80px; bottom: 44px; font-size: 22px; font-weight: 700; color: #c5d5e5; }
</style></head><body>
<div class="glow coral"></div><div class="glow gold"></div>
<div class="text">
	<p class="alias">LeCuistotduWeb</p>
	<h1>Gaëtan Boyron</h1>
	<p class="role">Développeur Fullstack React / Node.js</p>
	<div class="pills"><span class="pill main">Freelance</span><span class="pill ghost">Régie ou forfait</span></div>
</div>
<div class="avatar"><img src="data:image/png;base64,${avatar}" alt=""></div>
<p class="url">lecuistotduweb.fr</p>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: resolve(root, "public/og-image.png") });
await browser.close();
console.log("public/og-image.png généré");
