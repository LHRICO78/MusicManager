# 🎵 Music Manager

Un gestionnaire de fichiers musicaux moderne avec lecteur audio intégré. Sélectionnez un répertoire local, visualisez tous vos fichiers audio, renommez-les, supprimez-les et écoutez-les directement dans l'application.

## ✨ Fonctionnalités

- 📁 **Sélection de répertoire** : Parcourez vos dossiers locaux via l'API File System Access
- 🎵 **Vue plate de tous les fichiers** : Visualisez tous les fichiers audio de tous les sous-dossiers en une seule liste
- 🎧 **Lecteur audio intégré** : Écoutez vos fichiers directement dans l'application
- ▶️ **Contrôles complets** : Play/Pause, piste précédente/suivante, barre de progression, contrôle du volume
- ✏️ **Édition en place** : Renommez les fichiers directement depuis l'interface
- 🗑️ **Suppression** : Supprimez les fichiers que vous ne voulez plus
- 📊 **Statistiques** : Affichage du nombre de fichiers et de la taille totale
- 🎨 **Interface minimaliste** : Design de terminal professionnel avec accent vert électrique

## 🎼 Formats audio supportés

- MP3, WAV, FLAC, AAC, OGG, M4A, WMA
- ALAC, APE, OPUS, WV, DSF, DFF, DSD
- M4B, AIFF, AU, MID, MIDI

## 🚀 Installation Rapide

### Prérequis

- **Node.js** 18+ ([Télécharger](https://nodejs.org/))
- **pnpm** ([Installer](https://pnpm.io/installation))
- **Navigateur compatible** : Chrome, Edge, Brave (Firefox non supporté)

### Étapes d'installation

#### 1. Cloner le dépôt

```bash
git clone https://github.com/LHRICO78/MusicManager.git
cd MusicManager
```

#### 2. Installer les dépendances

```bash
pnpm install
```

#### 3. Lancer le serveur de développement

```bash
pnpm dev
```

L'application s'ouvrira automatiquement sur `http://localhost:3000`

#### 4. Utiliser l'application

1. Cliquez sur **"Sélectionner Répertoire"**
2. Choisissez un dossier contenant vos fichiers musicaux
3. Tous les fichiers audio s'affichent dans la liste
4. Cliquez sur le bouton ▶️ pour lire un fichier
5. Utilisez les contrôles pour naviguer et ajuster le volume

## 📦 Build pour la production

```bash
pnpm build
```

Les fichiers compilés seront dans le dossier `dist/`

## 🎮 Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| Clic sur fichier | Lire le fichier |
| Double-clic sur nom | Renommer le fichier |
| Entrée | Confirmer le renommage |
| Échap | Annuler le renommage |

## 🏗️ Architecture

```
music-manager/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Pages principales
│   │   ├── components/    # Composants réutilisables
│   │   ├── contexts/      # Contextes React
│   │   ├── lib/           # Utilitaires
│   │   ├── App.tsx        # Routeur principal
│   │   ├── main.tsx       # Point d'entrée
│   │   └── index.css      # Styles globaux
│   ├── public/            # Fichiers statiques
│   └── index.html         # Template HTML
├── server/                # Backend Express (placeholder)
├── package.json           # Dépendances du projet
├── vite.config.ts         # Configuration Vite
└── tailwind.config.ts     # Configuration Tailwind CSS
```

## 🛠️ Technologies utilisées

- **Frontend** : React 19, TypeScript, Tailwind CSS 4
- **Build** : Vite 7
- **UI Components** : shadcn/ui
- **Icons** : Lucide React
- **Notifications** : Sonner
- **Routing** : Wouter
- **API** : File System Access API (Chrome/Edge/Brave)

## ⚠️ Limitations

- **Navigateur** : Nécessite Chrome, Edge ou Brave (Firefox n'est pas supporté)
- **API File System** : Accès local uniquement, pas de cloud
- **Permissions** : L'utilisateur doit autoriser l'accès au dossier sélectionné

## 🐛 Dépannage

### L'application dit "Navigateur non supporté"

Utilisez Chrome, Edge ou Brave à la place de Firefox.

### Les fichiers ne s'affichent pas

Vérifiez que :
- Le dossier contient des fichiers audio avec les bonnes extensions
- Vous avez autorisé l'accès au dossier quand demandé
- Les fichiers ne sont pas corrompus

### Le lecteur audio ne fonctionne pas

- Vérifiez que votre navigateur a la permission d'accéder aux fichiers
- Essayez un autre format audio
- Vérifiez que le fichier n'est pas corrompu

## 📝 Licence

MIT

## 👨‍💻 Auteur

Créé avec ❤️ pour les amateurs de musique

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📞 Support

Pour toute question ou problème, ouvrez une [issue sur GitHub](https://github.com/LHRICO78/MusicManager/issues)

---

**Profitez de votre musique ! 🎵**
