# Architecture du Projet

Ce document décrit l'organisation technique de **Music Manager**.

## 🏗️ Structure Globale

Le projet est structuré comme un monorepo simplifié (bien que principalement concentré sur le client actuellement) :

```
MusicManager/
├── client/              # Frontend React (Vite)
│   ├── src/
│   │   ├── components/  # Composants UI (shadcn/ui)
│   │   ├── contexts/    # Gestion d'état globale (Thème, etc.)
│   │   ├── hooks/       # Hooks personnalisés
│   │   ├── pages/       # Pages principales (Home, NotFound)
│   │   └── lib/         # Fonctions utilitaires
├── server/              # Backend (actuellement minimal/placeholder)
├── shared/              # Code partagé entre client et serveur
└── public/              # Assets statiques
```

## 🔑 Concepts Clés

### 1. File System Access API
Le cœur de l'application repose sur l'API native du navigateur `window.showDirectoryPicker()`. 
- **Sécurité** : L'utilisateur doit explicitement accorder la permission de lecture/écriture.
- **Performance** : La lecture est récursive pour offrir une "vue plate" de tous les fichiers audio, quel que soit leur niveau de profondeur dans les dossiers.

### 2. Gestion de l'Audio
L'application utilise l'élément HTML5 `<audio>` standard. Les fichiers locaux sont transformés en URLs temporaires via `URL.createObjectURL(file)` pour permettre la lecture sans upload.

### 3. Design System
Le design suit une approche "Brutalisme Numérique" :
- **Couleurs** : Contraste élevé entre le fond noir (`#0a0a0a`) et l'accent vert électrique (`#00ff00`).
- **Composants** : Basés sur Radix UI via shadcn/ui, personnalisés pour correspondre à l'esthétique terminal.

## 🛠️ Flux de Données

1. **Sélection** : L'utilisateur choisit un dossier.
2. **Scan** : L'application parcourt récursivement le dossier pour trouver les extensions supportées.
3. **Indexation** : Une liste d'objets `MusicFile` est créée en mémoire (contenant le `FileSystemFileHandle`).
4. **Interaction** : 
   - **Lecture** : Le handle récupère le `File` -> `ObjectURL` -> `<audio>`.
   - **Renommer** : Utilise la méthode `.move()` du handle de fichier.
   - **Supprimer** : Utilise la méthode `.remove()` du handle de fichier.

## 🚀 Évolutions Futures
- Support des métadonnées ID3 (pochettes, artiste, album).
- Création de playlists virtuelles.
- Recherche et filtrage avancés.
- Support de thèmes alternatifs (voir `ideas.md`).
