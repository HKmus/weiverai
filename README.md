# WeiverAI

Plateforme de développement d'applications IA qui transforme vos idées en applications fonctionnelles grâce à l'intelligence artificielle.

## Pile technologique (Tech Stack)

- **Framework** — Next.js 15.2.3 (App Router, Turbopack)
- **Langage** — TypeScript 5
- **Style** — Tailwind CSS 4.0.0
- **Icônes** — Lucide React 0.475.0
- **UI Components** — Radix UI + shadcn/ui
- **Base de données** — Supabase (PostgreSQL)
- **Authentification** — Supabase Auth
- **Intelligence Artificielle** — Google Gemini 2.0 Flash Lite
- **Theming** — next-themes
- **Notifications** — Sonner
- **Polices** — Lato (via `next/font/google`)

## Fonctionnalités

- Plateforme de développement d'applications IA 100% responsive
- Interface utilisateur moderne avec thème sombre/clair
- Authentification Google intégrée
- Gestion des espaces de travail (workspaces)
- Chat IA pour le développement d'applications
- Génération de code React avec IA
- Système de tokens pour l'utilisation de l'IAo
- Tableau de bord utilisateur
- Historique des conversations et projets
- Interface multilingue (anglais)

## Architecture du projet

```
app/
├── api/
│   ├── ai-chat/route.tsx      — API de chat IA
│   └── code-gen/route.tsx    — API de génération de code
├── (auth)/
│   └── actions.ts           — Actions d'authentification
├── (main)/
│   ├── dashboard/            — Tableau de bord utilisateur
│   └── workspace/           — Espaces de travail
├── components/              — Composants UI
├── layout.tsx               — Layout principal
└── page.tsx                 — Page d'accueil
components/
├── layout/                  — Sections de la page d'accueil
├── theme-provider.tsx       — Gestion des thèmes
├── ThemeToggle.tsx          — Toggle de thème
└── ui/                      — Composants UI de base
config/
├── AiModels.tsx             — Configuration des modèles IA
context/
├── AIModelContext.tsx       — Contexte des modèles IA
├── MessagesContext.tsx      — Contexte des messages
└── UserDetailsContext.tsx   — Contexte utilisateur
data/
├── lookup.tsx              — Données de référence
└── prompts.tsx             — Prompts IA
db/
├── profiles.ts             — Gestion des profils utilisateurs
├── promo_codes.ts          — Gestion des codes promo
└── workspace.ts           — Gestion des workspaces
utils/
├── supabase/
│   ├── client.ts          — Client Supabase
│   ├── middleware.ts      — Middleware d'authentification
│   └── server.ts          — Server Supabase
└── utils.ts               — Utilitaires
locale/
└── en.ts                  — Traductions anglaises
```

## Démarrage

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Copiez le fichier d'exemple et renseignez vos clés :

```bash
cp .env.local.example .env.local
```

| Variable                        | Description                                         |
| ------------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL de votre projet Supabase                        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique/anonyme Supabase                       |
| `SUPABASE_SERVICE_ROLE_KEY`     | Clé Service Role Supabase (côté serveur uniquement) |
| `GEMINI_API_KEY`                | Clé API Google Gemini                               |

### 3. Configurer la base de données

Exécutez le script SQL dans votre éditeur Supabase pour créer les tables suivantes :

- `profiles` - Informations utilisateur
- `workspace` - Espaces de travail
- `promo_codes` - Codes promotionnels

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez ensuite :

```
http://localhost:3000
```

## Compilation et exécution en production

```bash
npm run build
npm start
```

## Utilisation

1. **Authentification** : Connectez-vous avec Google
2. **Tableau de bord** : Accédez à votre tableau de bord personnel
3. **Création de projet** : Utilisez le chat IA pour générer des applications
4. **Génération de code** : Demandez à l'IA de créer des structures React
5. **Gestion des tokens** : Utilisez des tokens pour générer du code
6. **Abonnement Pro** : Upgradez avec des codes promo pour plus de tokens

## Structure des données

### Profiles

- `id` - ID utilisateur
- `email` - Email utilisateur
- `plan` - Plan (free/pro)
- `tokens` - Nombre de tokens disponibles
- `created_at` - Date de création

### Workspace

- `id` - ID workspace
- `user_id` - ID utilisateur
- `messages` - Historique des messages
- `created_at` - Date de création

## API Endpoints

### POST /api/ai-chat

Envoie un message au chat IA pour générer des applications.

### POST /api/code-gen

Génère du code React structuré en JSON.

## Déploiement

Le projet peut être déployé sur Vercel pour une expérience optimale :

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement à chaque push

## Licence

MIT License
