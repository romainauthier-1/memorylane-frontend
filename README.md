# 🎨 MemoryLane Frontend

> **Une interface élégante pour revivre vos souvenirs** — Une application React/Next.js qui transforme vos moments précieux en une timeline interactive et visuelle.

---

[![Next.js](https://img.shields.io/badge/Next.js-12.1.6-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-2.11.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-1.13.4-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-2.9.0-30A8EF?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge)](https://semver.org/)

---

## 📜 À propos du projet

**MemoryLane Frontend** est une **application web moderne** développée avec **Next.js** et **React**, conçue pour interagir avec le [MemoryLane Backend](../memoryLane-backend/README.md). Elle offre une expérience utilisateur immersive pour :

- **Visualiser** vos souvenirs sous forme de timeline dynamique avec des cartes positionnées de manière organique
- **Créer** de nouveaux souvenirs avec des médias (images, vidéos, audio)
- **Personnaliser** chaque souvenir avec des couleurs, des titres et des descriptions
- **Modifier** et **supprimer** vos souvenirs existants
- **S'authentifier** de manière sécurisée via un système de token
- **Uploader** vos médias directement avec Cloudinary

L'application mise sur une **expérience visuelle** avec des animations fluides, un design responsive et une interface intuitive.

---

## 🔧 Stack Technique

| Catégorie               | Technologie                                                 | Version | Rôle                                  |
| ----------------------- | ----------------------------------------------------------- | ------- | ------------------------------------- |
| **Framework**           | [Next.js](https://nextjs.org/)                              | 12.1.6  | Framework React avec SSR              |
| **Librairie UI**        | [React](https://reactjs.org/)                               | 18.1.0  | Construction de l'interface           |
| **State Management**    | [Redux Toolkit](https://redux-toolkit.js.org/)              | 2.11.2  | Gestion centralisée de l'état         |
| **Persistance**         | [Redux Persist](https://github.com/rt2zz/redux-persist)     | 6.0.0   | Sauvegarde du state dans localStorage |
| **Styling**             | [Tailwind CSS](https://tailwindcss.com/)                    | 3.4     | Framework CSS utility-first           |
| **HTTP Client**         | [Axios](https://axios-http.com/)                            | 1.13.4  | Requêtes HTTP vers le backend         |
| **Toast Notifications** | [react-toastify](https://fkhadra.github.io/react-toastify/) | 11.0.5  | Notifications utilisateur             |
| **Icons**               | [Lucide React](https://lucide.dev/)                         | 1.7.0   | Bibliothèque d'icônes                 |
| **Image Conversion**    | [heic2any](https://github.com/guolao/heic2any)              | 0.0.4   | Conversion des images HEIC            |
| **Preprocessor**        | [PostCSS](https://postcss.org/)                             | 8.5.6   | Traitement CSS                        |
| **Autoprefixer**        | [Autoprefixer](https://github.com/postcss/autoprefixer)     | 10.4.24 | Préfixes vendeurs CSS                 |
| **Testing**             | [Jest](https://jestjs.io/)                                  | 28.1.0  | Framework de tests                    |
| **Testing Library**     | [React Testing Library](https://testing-library.com/)       | 13.2.0  | Utilitaires de test React             |
| **Déploiement**         | [Vercel](https://vercel.com/)                               | -       | Hébergement optimisé pour Next.js     |

---

## ✨ Fonctionnalités

### 🎨 **Interface Utilisateur**

- **Timeline interactive** – Affichage des souvenirs avec positions aléatoires et rotations subtiles
- **Design responsive** – Adaptation optimale sur mobile, tablette et desktop
- **Animations fluides** – Transitions et effets visuels (scale, blur, loading)
- **Thème personnalisable** – Chaque souvenir a sa propre palette de couleurs

### 👤 **Authentification**

- **Connexion** – Formulaire de login avec validation
- **Inscription** – Création de nouveau compte utilisateur
- **Gestion de token** – Stockage sécurisé dans localStorage
- **Déconnexion** – Suppression du token et retour à l'écran de login
- **État de connexion persistant** – Maintien de la session après rafraîchissement

### 📚 **Gestion des Souvenirs**

- **Affichage en grille/timeline** – Cartes de souvenirs disposées de manière organique
- **Tri chronologique** – Les souvenirs sont triés par date de début
- **Création complète** – Formulaire avec titre, description, dates, type (moment/période), couleurs
- **Édition** – Modification des informations d'un souvenir existant
- **Suppression** – Confirmation avant suppression avec feedback visuel
- **Détail des souvenirs** – Modal avec toutes les informations et médias

### 🖼️ **Gestion des Médias**

- **Upload multiple** – Sélection de plusieurs fichiers (images, vidéos, audio)
- **Prévisualisation instantanée** – Aperçu des médias avant upload
- **Upload Cloudinary direct** – Upload sécurisé via signature du backend
- **Support multi-format** – Images, vidéos, audio, et fichiers HEIC (convertis)
- **Miniatures automatiques** – La première image devient la miniature du souvenir

### 🎯 **Types de Souvenirs**

- **Moment** – Souvenir ponctuel avec une seule date
- **Période** – Souvenir étendu avec date de début et de fin
- **Sélection visuelle** – Interface intuitive pour choisir le type

### 🎨 **Personnalisation Visuelle**

- **Sélecteur de couleurs** – Choix de la couleur principale et secondaire
- **Gradients dynamiques** – Boutons avec dégradés basés sur les couleurs choisies
- **Style des cartes** – Bordures et ombres personnalisées selon les couleurs
- **Positions aléatoires** – Disposition organique des cartes sur la timeline

### ⚡ **Performance & UX**

- **Chargement optimisé** – Images Next.js avec domains configurés pour Cloudinary
- **Loading states** – Indicateurs visuels pendant les requêtes
- **Feedback utilisateur** – Toasts pour les succès/erreurs
- **Confirmations** – Dialogues de confirmation pour les actions destructives

---

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [MemoryLane Backend](https://github.com/dankysten/memoryLane-backend) **en cours d'exécution** (ou URL du backend déployé)

### Étapes

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/dankysten/memoryLane-frontend.git
   cd memoryLane-frontend
   ```

2. **Installer les dépendances**

   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configurer l'environnement**
   Créer un fichier `.env.local` à la racine avec la variable suivante :

   ```env
   NEXT_PUBLIC_URL_BACKEND=https://memorylane-backend.vercel.app
   # Pour le développement local :
   # NEXT_PUBLIC_URL_BACKEND=http://localhost:5000
   ```

4. **Lancer l'application**

   ```bash
   # Mode développement
   yarn dev
   # ou
   npm run dev

   # Mode production
   yarn build && yarn start
   # ou
   npm run build && npm start
   ```

5. **Accéder à l'application**
   ```
   📱  Ready in 5s
   ✓ Compiled successfully
   🔗 Local:   http://localhost:3001
   ```
   L'application sera disponible à l'URL : `http://localhost:3001`

---

## 📁 Structure du Projet

```
memoryLane-frontend/
├── package.json               # Dépendances et scripts
├── next.config.js             # Configuration Next.js (domaines images)
├── tailwind.config.js         # Configuration Tailwind CSS
├── postcss.config.js          # Configuration PostCSS
├── jest.config.js            # Configuration Jest
├── .env.local                 # Variables d'environnement
├── .gitignore                 # Fichiers ignorés par Git
│
├── pages/
│   ├── index.js               # Page principale (Home)
│   └── _app.js                # Configuration Redux & layout global
│
├── components/
│   ├── Home.js                # Composant principal avec timeline
│   ├── Login.js               # Formulaire de connexion/inscription
│   ├── MemoryCard.js          # Carte individuelle de souvenir
│   ├── AddMemoryForm.js       # Formulaire d'ajout/modification
│   └── MemoryDetailModal.js   # Modal de détail d'un souvenir
│
├── reducers/
│   ├── memories.js            # Reducer pour la gestion des souvenirs
│   └── states.js              # Reducer pour l'état de l'application
│
├── services/
│   └── api.js                 # Appels API vers le backend
│
├── styles/
│   ├── globals.css            # Styles globaux
│   └── Home.module.css        # Styles spécifiques à Home
│
├── public/
│   ├── favicon.ico            # Favicon
│   ├── faviconMemoryLane.png  # Favicon PNG
│   └── AppIconMemoryLane_v2.png # Icône application
│
└── node_modules/              # Dépendances installées
```

---

## 🔌 Configuration Backend

L'application nécessite un backend fonctionnel. Par défaut, elle se connecte à :

```
https://memorylane-backend.vercel.app
```

**Pour utiliser un backend local :**

1. Lancer le [MemoryLane Backend](../memoryLane-backend/README.md) sur `http://localhost:5000`
2. Mettre à jour `.env.local` :
   ```env
   NEXT_PUBLIC_URL_BACKEND=http://localhost:5000
   ```

---

## 📡 Configuration Next.js

### Domaines d'images autorisés

Le fichier `next.config.js` est configuré pour autoriser les images depuis :

- `localhost` (développement)
- `memorylane-backend.vercel.app` (backend déployé)
- `res.cloudinary.com` (Cloudinary)

Cela permet à Next.js d'optimiser automatiquement les images provenant de ces sources.

---

## 🛠️ Architecture State Management (Redux)

### Store Redux

L'application utilise **Redux Toolkit** avec **Redux Persist** pour :

- Persister le state entre les sessions
- Gérer centralement les souvenirs et l'état de l'UI

### Reducers

#### `memories.js`

Gère la liste des souvenirs avec les actions :

- `setMemories` – Remplace la liste complète
- `addMemory` – Ajoute un nouveau souvenir
- `deleteMemory` – Supprime un souvenir par ID

#### `states.js`

Gère l'état de l'application avec :

- `isModalOpen` – Visibilité du modal d'ajout
- `isEditing` – Mode édition activé
- `isEditingCaption/Title/Description` – Édition de champs spécifiques
- `selectedMemory` – Souvenir actuellement sélectionné
- `isLogged` – État de connexion
- `isLoading` – Indicateur de chargement
- `isMobile` – Détection du device

---

## 🎯 Services API

Le fichier `services/api.js` fournit les fonctions pour interagir avec le backend :

```javascript
// Récupérer tous les souvenirs
const getAllMemories = async (token) => {...}

// Créer un nouveau souvenir
const createMemory = async (memoryData, token) => {...}

// Uploader un fichier vers Cloudinary
const uploadFile = async (file) => {...}
```

L'upload utilise un mécanisme de **signature Cloudinary** pour une sécurité optimale.

---

## 🎨 Composants Principaux

### 🏠 **Home.js**

- Affiche la timeline avec toutes les cartes de souvenirs
- Gère la logique de tri et de positionnement
- Intègre Login, AddMemoryForm et MemoryDetailModal
- Gestion du chargement et des états globaux

### 🔐 **Login.js**

- Formulaire double face (Connexion / Inscription)
- Appels API vers `/user/signup` et `/user/signin`
- Gestion des tokens via localStorage
- Notifications toast pour le feedback

### 📬 **MemoryCard.js**

- Affiche une carte de souvenir individuelle
- Gestion des médias (image ou vidéo)
- Boutons d'édition et de suppression
- Style dynamique basé sur les couleurs du souvenir
- Positionnement absolu avec rotation aléatoire

### ✏️ **AddMemoryForm.js**

- Formulaire modal pour créer/modifier un souvenir
- Upload multiple de fichiers avec prévisualisation
- Sélection du type (moment/période) avec dates
- Sélecteurs de couleurs visuels
- Validation et soumission vers le backend

### 🔍 **MemoryDetailModal.js**

- Affiche les détails complets d'un souvenir
- Galeries de médias
- Options d'édition et de suppression

---

## 🚀 Déploiement sur Vercel

### Déploiement automatique

1. Pousser le code sur un dépôt GitHub
2. Importer le projet sur [Vercel](https://vercel.com/)
3. Configurer la **Environment Variable** :
   - `NEXT_PUBLIC_URL_BACKEND` = URL de ton backend (ex: `https://memorylane-backend.vercel.app`)
4. Vercel détectera automatiquement Next.js et configurera le déploiement

### Configuration recommandée

- **Node.js Version** : 18+
- **Build Command** : `yarn build` ou `npm run build`
- **Output Directory** : `.next`
- **Development Command** : `yarn dev` ou `npm run dev`

---

## 📝 Exemples d'Utilisation

### Connexion

```bash
# 1. Ouvrir http://localhost:3001
# 2. Remplir le formulaire de connexion
# 3. Le token est stocké dans localStorage
```

### Création d'un souvenir

1. Cliquer sur "Ajouter un souvenir"
2. Remplir le titre et la description
3. Sélectionner un ou plusieurs fichiers médias
4. Choisir le type (Moment ou Période)
5. Sélectionner les dates appropriées
6. Personnaliser les couleurs
7. Cliquer sur "Ajouter le souvenir"

### Visualisation

- Les souvenirs apparaissent automatiquement sur la timeline
- Triés par date de début (du plus ancien au plus récent)
- Positionnés aléatoirement pour un effet organique
- Cliquer sur une carte pour voir les détails

---

## 🎨 Personnalisation

### Thème

Le thème principal utilise :

- **Couleur principale** : Violet (`#7c3aed`)
- **Couleurs par défaut** : `#803FCE` (principal) et `#C48BF2` (secondaire)
- **Polices** : `font-sans` (sans-serif par défaut)

Tu peux modifier ces valeurs dans les composants ou dans `tailwind.config.js`.

### Animation du titre

Le titre "Memory Lane" a une animation `animate-pulse` et `scale` pour un effet dynamique.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

- **Ouvrir une issue** pour signaler un bug ou proposer une amélioration
- **Forker le projet** et soumettre une Pull Request

---

## 📜 Licence

Ce projet est sous licence **[MIT](https://opensource.org/licenses/MIT)**.

---

## 👤 Auteur

📌 **Romain Authier**  
📧 [dankysten](https://github.com/dankysten)  
💼 Développeur Fullstack junior

---

> _"Chaque souvenir est une étoile dans votre ciel personnel, et MemoryLane est la constellation qui les relie."_ 🌌✨
