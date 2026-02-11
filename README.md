```markdown
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

Pour faire fonctionner Music Manager, assurez-vous d'avoir installé :

- **Node.js** 18 ou supérieur (disponible sur [nodejs.org](https://nodejs.org/))
- Un gestionnaire de paquets : **pnpm** (recommandé), **npm** ou **yarn**. Voici comment les installer si vous ne les avez pas déjà :

    #### Installer pnpm

    ```bash
    # Sur macOS/Linux
    curl -fsSL https://get.pnpm.io/install.sh | sh -

    # Sur Windows (PowerShell)
    iwr https://get.pnpm.io/install.ps1 -useb | iex
    ```

    #### Installer npm (généralement inclus avec Node.js)

    ```bash
    # Mettre à jour npm à la dernière version
    npm install -g npm@latest
    ```

    #### Installer Yarn

    ```bash
    # Via npm
    npm install -g yarn
    ```
- Un **navigateur compatible** : Chrome, Edge, ou Brave (l'API File System Access est essentielle et n'est pas entièrement supportée par Firefox ou Safari).

### Installation et Lancement

Suivez les étapes ci-dessous en fonction de votre gestionnaire de paquets préféré.

#### Avec pnpm (Recommandé)

```bash
# 1. Cloner le projet
git clone https://github.com/LHRICO78/MusicManager.git
cd MusicManager

# 2. Installer les dépendances
pnpm install

# 3. Lancer l'application en mode développement
pnpm dev
```

#### Avec npm

```bash
# 1. Cloner le projet
git clone https://github.com/LHRICO78/MusicManager.git
cd MusicManager

# 2. Installer les dépendances
npm install

# 3. Lancer l'application en mode développement
npm run dev
```

#### Avec Yarn

```bash
# 1. Cloner le projet
git clone https://github.com/LHRICO78/MusicManager.git
cd MusicManager

# 2. Installer les dépendances
yarn install

# 3. Lancer l'application en mode développement
yarn dev
```

L'application sera accessible dans votre navigateur à l'adresse `http://localhost:3000`.

## 📖 Documentation Complète

Pour plus de détails, consultez nos guides dédiés :

- [**Guide d'Installation**](./INSTALLATION.md) : Instructions détaillées pour tous les OS et gestionnaires de paquets.
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
```
