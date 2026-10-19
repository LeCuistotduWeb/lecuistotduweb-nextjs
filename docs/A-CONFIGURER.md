# À configurer / à compléter

Ce qui reste à régler sur le site après la refonte en chapitres (branche `test`, octobre 2026). Coche au fur et à mesure.

## 1. Prise de rendez-vous (Cal.com)

Le bouton « Prendre rendez-vous » de la carte Contact est déjà codé. Il est masqué tant qu'aucune URL n'est renseignée.

- [ ] Créer un type d'événement sur [cal.com](https://cal.com), par exemple « Échange découverte — 30 min ».
- [ ] Copier son lien public, de la forme `https://cal.com/<ton-identifiant>/<evenement>`.
- [ ] Le coller dans `src/config.ts` :

  ```ts
  contact: {
  	bookingUrl: "https://cal.com/<ton-identifiant>/<evenement>",
  },
  ```

- [ ] Vérifier sur `/contact` que le bouton apparaît et ouvre Cal.com dans un nouvel onglet. Le clic envoie l'événement `click_booking`.

Rien d'autre à faire : pas de clé API ni de dépendance. Pour intégrer le calendrier directement dans la page, au lieu d'un lien, il faudra le script d'embed de Cal.com. C'est une évolution à demander.

## 2. Formulaire de contact (pas encore codé)

Le formulaire a été validé mais attend le choix du service d'envoi d'e-mails. Recommandation : **Resend**. L'appel se fait via `fetch`, sans nouvelle dépendance, et l'offre gratuite suffit pour un portfolio.

- [ ] Créer un compte sur [resend.com](https://resend.com).
- [ ] Ajouter et vérifier le domaine `lecuistotduweb.fr`, avec les enregistrements DNS SPF et DKIM fournis par Resend, chez ton registrar.
- [ ] Créer une clé API (droit « Sending access » suffisant).
- [ ] Ajouter la variable d'environnement `RESEND_API_KEY` :
  - en local, dans `.env.local` (non commité) ;
  - en production, dans les variables d'environnement de ton hébergeur, au même endroit que `GEMINI_API_KEY`.
- [ ] Décider de l'adresse d'expédition (par ex. `site@lecuistotduweb.fr`) et de celle de réception (`contact@lecuistotduweb.fr`).
- [ ] Demander à Claude d'implémenter le formulaire. Prévu :
  - `@tanstack/react-form` et `zod` (déjà installés) ;
  - envoi par une server function ;
  - anti-spam par champ piège et limite de débit ;
  - message de confirmation.

## 3. Contenus à relire

Textes proposés par Claude à partir de ce qui existait déjà. Rien n'a été inventé sur tes projets, mais les formulations sont à valider.

- [ ] **Disponibilité freelance** (`src/config.ts`, `freelance`) :
  - `status` : `"available"` ou `"unavailable"` ;
  - `availableFrom` : actuellement `2026-12-01` (hypothèse). La date cesse de s'afficher une fois passée ;
  - `missions` : les 4 types de missions affichés.
- [ ] **Accroches des chapitres** (`src/lib/views.ts`, `PARCOURS_CONTENT`) :
  - Profil : « Développeur fullstack, reconverti par passion. »
  - Projets : « Du SaaS au site vitrine. »
  - Freelance : « Un projet React ou Node.js à lancer ? »
  - Contact : « On en parle ? »
- [ ] **Descriptions SEO** de chaque chapitre (`src/lib/views.ts`, `VIEWS[].description`).
- [ ] **Carte Contact** (`src/components/contact-card.tsx`) : « Un projet, une mission, une question ? » et la phrase en dessous.
- [ ] **Carte Freelance** (`src/components/freelance-card.tsx`) : « Je prends des missions freelance. » et sa variante quand tu es indisponible.
- [ ] **Accueil** (`src/components/chapters.tsx`) : le lien « Découvrir mon parcours ».

## 4. Contenus manquants

- [ ] **Descriptions des projets** dans la carte Projets : courte description et lien vers le site. Pour l'instant, seuls les noms s'affichent. `src/data/projects.ts` ne couvre que 4 projets, et pas les mêmes que le carrousel.
- [ ] **Image Fnac Darty** : `public/works/miniature-fnac-darty.webp` ne fait que 310 px de large et apparaît floue. Fournir une version 1280 px (et 640 px), comme les autres miniatures.

## 5. Dette technique repérée (antérieure à la refonte)

- [ ] **`pnpm check` échoue après un run Playwright.** `biome.json` inclut `**/index.html`, ce qui embarque le rapport généré `playwright-report/index.html`. Correction en une ligne dans `files.includes` :

  ```json
  "!**/playwright-report"
  ```

- [ ] **`src/lib/ai/claude.ts`** n'est importé nulle part, et `@anthropic-ai/sdk` n'est pas installé : `tsc` remonte 2 erreurs. Le chat utilise Gemini (`src/lib/ai/index.ts`). Supprimer le fichier, ou installer le SDK si un fournisseur Claude est prévu.
- [ ] **Vitest** : aucun test unitaire. `pnpm test` passe parce qu'il n'y a rien à exécuter.

## 6. Analytics (GA4)

Événements ajoutés pendant la refonte. Pour exploiter leurs paramètres dans les rapports GA4, déclare-les comme dimensions personnalisées (Admin › Définitions personnalisées).

| Événement | Paramètres | Déclenché quand |
|---|---|---|
| `click_freelance` | — | clic sur « Discutons de votre projet » |
| `view_chapter` | `chapter` | un chapitre est vu pour la première fois |
| `select_view` | `view` | clic dans le menu des chapitres |
| `intro_end` | `skipped` (0/1) | fin de l'écran de chargement |
| `copy_email` | — | bouton « Copier » de la carte Contact |
| `click_contact_email` | — | « Écrire un e-mail » |
| `click_booking` | — | « Prendre rendez-vous » (une fois Cal.com configuré) |
| `click_social` | `platform`, `source` | liens LinkedIn / GitHub de la carte Contact |
| `view_project` | `project`, `method` | navigation dans le carrousel Projets |

## 7. Réglages utiles

- **Rejouer l'intro** : elle ne se joue qu'une fois par session. Ouvre un nouvel onglet, ou supprime `lcdw-intro-seen` du `sessionStorage` (DevTools › Application).
- **Durée de l'intro** : constantes `DURATION` et timings du vol dans `src/components/intro-loader.tsx`.
- **Passer à GSAP + ScrollTrigger** : créer `src/lib/scroll-animations/gsap-engine.ts`, qui implémente `ScrollAnimationEngine` (`types.ts`), puis le retourner dans `getScrollEngine()` (`index.ts`). Les composants n'ont pas à changer.
