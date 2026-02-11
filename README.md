# 🎵 Music Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC.svg)](https://tailwindcss.com/)

Un gestionnaire de fichiers musicaux moderne, minimaliste et performant avec lecteur audio intégré. Conçu pour les audiophiles qui souhaitent organiser leur bibliothèque locale avec une interface de type terminal professionnel.

## ✨ Points Forts

*   📁 **Accès Direct au Système de Fichiers** : Utilise l'API *File System Access* pour manipuler vos fichiers locaux sans téléchargement.
*   🎵 **Vue Plate (Flat View)** : Visualisez tous les fichiers audio de vos sous-dossiers en une seule liste consolidée.
*   🎧 **Lecteur Audio Intégré** : Écoutez vos morceaux instantanément avec des contrôles complets (Volume, Navigation, Barre de progression).
*   ✏️ **Édition Rapide** : Renommez vos fichiers directement dans l'interface avec retour visuel immédiat.
*   📊 **Statistiques en Temps Réel** : Suivez le nombre de fichiers et la taille totale de votre collection sélectionnée.
*   🎨 **Design "Electric Terminal"** : Une esthétique sobre en noir et vert électrique pour un focus maximal sur vos données.

## 🎼 Formats Supportés

Music Manager supporte une large gamme de formats audio grâce aux capacités natives de votre navigateur :
- **Standard** : MP3, WAV, FLAC, AAC, OGG, M4A, WMA
- **Haute Qualité/Spécifiques** : ALAC, APE, OPUS, WV, DSF, DFF, DSD
- **Autres** : M4B, AIFF, AU, MID, MIDI

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** 18 ou supérieur
- **pnpm** (recommandé) ou npm
- **Navigateur compatible** : Chrome, Edge, ou Brave (L'API File System Access est requise)

### Installation

```bash
# 1. Cloner le projet
git clone https://github.com/LHRICO78/MusicManager.git
cd MusicManager

# 2. Installer les dépendances
pnpm install

# 3. Lancer en mode développement
pnpm dev
```

L'application sera disponible sur `http://localhost:3000`.

## 📖 Documentation Complète

Pour plus de détails, consultez nos guides dédiés :

- [**Guide d'Installation**](./INSTALLATION.md) : Instructions détaillées pour tous les OS.
- [**Guide de Démarrage Rapide**](./QUICKSTART.md) : Pour une prise en main en 2 minutes.
- [**Architecture du Projet**](./ARCHITECTURE.md) : Détails techniques et structure du code.
- [**Contribuer**](./CONTRIBUTING.md) : Comment aider à améliorer le projet.

## 🏗️ Stack Technique

- **Framework** : React 19 (TypeScript)
- **Build Tool** : Vite 7
- **Styling** : Tailwind CSS 4
- **UI Components** : shadcn/ui
- **Icons** : Lucide React
- **Notifications** : Sonner
- **Routing** : Wouter

## ⚠️ Limitations Actuelles

- **Compatibilité** : Ne fonctionne pas sur Firefox ou Safari car ils ne supportent pas encore l'API *File System Access* de manière complète.
- **Accès Local** : L'application ne stocke rien sur un serveur ; tout se passe localement dans votre navigateur.

## 🤝 Contribution

Les contributions sont ce qui rend la communauté open source incroyable. Toute contribution que vous faites est **grandement appréciée**.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

## 👨‍💻 Contact

LHRICO78 - [GitHub Profile](https://github.com/LHRICO78)

Projet : [https://github.com/LHRICO78/MusicManager](https://github.com/LHRICO78/MusicManager)

---
*Fait avec ❤️ pour simplifier la gestion musicale.*
