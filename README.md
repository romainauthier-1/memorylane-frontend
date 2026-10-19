# 🎨 MemoryLane — Frontend

Application web pour rassembler ses souvenirs (photos, vidéos, sons) sur une frise visuelle : chaque souvenir est une carte personnalisée, ponctuelle ou étalée sur une période.

**Démo :** [memorylane-frontend-ruddy.vercel.app](https://memorylane-frontend-ruddy.vercel.app) · **API :** [memorylane-backend](https://github.com/romainauthier-1/memorylane-backend)

![Next.js](https://img.shields.io/badge/Next.js-12-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-upload_direct-3448C5?logo=cloudinary&logoColor=white)

---

## Fonctionnalités

- **Compte utilisateur** : inscription et connexion. Chaque utilisateur ne voit et ne modifie que ses propres souvenirs.
- **Frise de souvenirs** : cartes triées par date, disposées de façon organique, aux couleurs de chaque souvenir.
- **Création d'un souvenir** : titre, description, type *moment* (une date) ou *période* (début et fin), deux couleurs, plusieurs médias avec aperçu avant envoi.
- **Médias** : images, vidéos et audio ; la première image sert de miniature.
- **Édition** : titre, description, légende de chaque média, ajout et suppression de médias, suppression du souvenir.
- **Responsive** : disposition adaptée au mobile.

## Stack technique

| Domaine      | Choix                                                   |
| ------------ | ------------------------------------------------------- |
| Framework    | Next.js 12, React 18                                    |
| État         | Redux Toolkit + redux-persist                           |
| Style        | Tailwind CSS 3, Lucide icons                            |
| Médias       | Upload direct navigateur → Cloudinary (signature fournie par l'API) |
| Feedback     | react-toastify                                          |
| Déploiement  | Vercel                                                  |

## Points techniques

- **Upload direct vers Cloudinary** : le front demande une signature à l'API (route authentifiée), puis envoie le fichier directement à Cloudinary. Les fichiers ne transitent pas par le serveur, et le secret Cloudinary reste côté API.
- **Authentification par token** : le token reçu à la connexion est envoyé en en-tête `Authorization: Bearer` sur toutes les routes de souvenirs, via un helper unique (`authHeaders()` dans `services/api.js`).

## Installation

Prérequis : Node.js 18+, [corepack](https://nodejs.org/api/corepack.html) (active la bonne version de Yarn), et l'[API MemoryLane](https://github.com/romainauthier-1/memorylane-backend) lancée en local (ou l'URL déployée).

```bash
git clone https://github.com/romainauthier-1/memorylane-frontend.git
cd memorylane-frontend
corepack enable
yarn install
cp .env.example .env.local   # renseigner NEXT_PUBLIC_URL_BACKEND
yarn dev                     # http://localhost:3001
```

| Variable                  | Rôle                                        |
| ------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_URL_BACKEND` | URL de l'API (ex. `http://localhost:5000`)  |

## Structure

```
pages/            index, _app (store Redux)
components/       Home (frise), Login, MemoryCard, AddMemoryForm, MemoryDetailModal
services/api.js   appels à l'API, en-têtes d'authentification, upload Cloudinary
reducers/         souvenirs, état de l'interface
```

---

Romain Authier — [GitHub](https://github.com/romainauthier-1)
