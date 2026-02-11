# 📖 Guide d'Installation Détaillé - Music Manager

Ce guide vous aidera à installer et configurer Music Manager sur votre ordinateur.

## 🖥️ Système d'exploitation supporté

- Windows 10/11
- macOS 10.15+
- Linux (Ubuntu, Debian, Fedora, etc.)

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

### 1. Node.js

**Windows/macOS/Linux :**

1. Allez sur [nodejs.org](https://nodejs.org/)
2. Téléchargez la version LTS (Long Term Support)
3. Installez en suivant les instructions
4. Vérifiez l'installation en ouvrant un terminal/CMD et tapez :

```bash
node --version
npm --version
```

Vous devriez voir les numéros de version.

### 2. Gestionnaires de paquets (pnpm, npm, yarn)

Vous pouvez utiliser pnpm (recommandé), npm ou yarn pour installer les dépendances du projet.

#### pnpm (recommandé)

**Installation :**

**Windows (PowerShell) :**

```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

**macOS/Linux :**

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

**Vérification :**

```bash
pnpm --version
```

#### npm (Node Package Manager)

npm est généralement installé avec Node.js. Si ce n'est pas le cas, ou si vous avez besoin de le mettre à jour :

**Installation :**

```bash
npm install -g npm@latest
```

**Vérification :**

```bash
npm --version
```

#### yarn

**Installation :**

```bash
npm install -g yarn
```

**Vérification :**

```bash
yarn --version
```

### 3. Git

1. Allez sur [git-scm.com](https://git-scm.com/)
2. Téléchargez et installez
3. Vérifiez :

```bash
git --version
```

### 4. Navigateur compatible

- ✅ **Chrome** (recommandé)
- ✅ **Edge** (Microsoft)
- ✅ **Brave**
- ❌ **Firefox** (non supporté)

## 🚀 Installation étape par étape

### Étape 1 : Cloner le dépôt

Ouvrez un terminal/CMD et exécutez :

```bash
git clone https://github.com/LHRICO78/MusicManager.git
cd MusicManager
```

### Étape 2 : Installer les dépendances

Utilisez le gestionnaire de paquets de votre choix :

**Avec pnpm (recommandé) :**

```bash
pnpm install
```

**Avec npm :**

```bash
npm install
```

**Avec yarn :**

```bash
yarn install
```

L'installation peut prendre quelques minutes. Attendez que le processus se termine.

### Étape 3 : Lancer l'application

```bash
pnpm dev
```

Vous devriez voir :

```
➜  Local:   http://localhost:3000/
➜  Network: http://169.254.0.21:3000/
```

### Étape 4 : Ouvrir dans le navigateur

Ouvrez votre navigateur et allez à : **http://localhost:3000**

## ✅ Première utilisation

1. **Cliquez sur "Sélectionner Répertoire"**
2. **Choisissez un dossier** contenant vos fichiers musicaux
3. **Attendez** que les fichiers se chargent
4. **Cliquez sur ▶️** pour lire un fichier

## 🔧 Commandes utiles

| Commande | Description | Gestionnaire de paquets |
|----------|-------------|-------------------------|
| `dev` | Lancer le serveur de développement | `pnpm dev`, `npm run dev`, `yarn dev` |
| `build` | Compiler pour la production | `pnpm build`, `npm run build`, `yarn build` |
| `preview` | Prévisualiser la version compilée | `pnpm preview`, `npm run preview`, `yarn preview` |
| `format` | Formater le code | `pnpm format`, `npm run format`, `yarn format` |
| `check` | Vérifier les erreurs TypeScript | `pnpm check`, `npm run check`, `yarn check` |

## 🐛 Dépannage

### Erreur : "command not found" (pnpm, npm ou yarn)

**Solution :**

Redémarrez votre terminal après l'installation du gestionnaire de paquets, ou assurez-vous qu'il est ajouté à votre PATH.

**Windows :**
```powershell
$env:Path += ";$env:APPDATA\npm"
```

**macOS/Linux :**
```bash
export PATH="$HOME/.local/bin:$PATH"
```

### Erreur : "Port 3000 already in use"

Le port 3000 est déjà utilisé. Utilisez un autre port :

```bash
pnpm dev -- --port 3001
```

Puis ouvrez http://localhost:3001

### Les fichiers ne s'affichent pas

1. Vérifiez que le dossier contient des fichiers audio (.mp3, .wav, .flac, etc.)
2. Vérifiez que vous avez autorisé l'accès au dossier
3. Essayez un autre dossier

### Le lecteur audio ne fonctionne pas

1. Vérifiez que vous utilisez Chrome, Edge ou Brave
2. Vérifiez que le fichier audio n'est pas corrompu
3. Essayez un autre format audio

### Erreur : "git: command not found"

Installez Git depuis [git-scm.com](https://git-scm.com/)

## 📦 Installation en tant qu'application autonome

Si vous voulez créer un exécutable Windows/macOS/Linux :

```bash
pnpm build
# ou
npm run build
# ou
yarn build
```

Les fichiers compilés seront dans le dossier `dist/`

## 🌐 Accès depuis un autre ordinateur

Pour accéder à l'application depuis un autre ordinateur sur le même réseau :

1. Trouvez votre adresse IP locale :

**Windows :**
```cmd
ipconfig
```

Cherchez "IPv4 Address"

**macOS/Linux :**
```bash
ifconfig
```

2. Sur l'autre ordinateur, ouvrez : **http://[VOTRE_IP]:3000**

Exemple : http://192.168.1.100:3000

## 💾 Mise à jour

Pour mettre à jour Music Manager :

```bash
cd MusicManager
git pull origin main

# Réinstaller les dépendances avec votre gestionnaire de paquets préféré
pnpm install # ou npm install ou yarn install

# Relancer l'application
pnpm dev # ou npm run dev ou yarn dev
```

## 🆘 Besoin d'aide ?

1. Vérifiez les [issues GitHub](https://github.com/LHRICO78/MusicManager/issues)
2. Ouvrez une nouvelle issue si votre problème n'est pas résolu
3. Décrivez le problème en détail avec :
   - Votre système d'exploitation
   - Votre navigateur
   - Les messages d'erreur
   - Les étapes pour reproduire le problème

## ✨ Prochaines étapes

Une fois installé, vous pouvez :

- Parcourir vos fichiers musicaux
- Renommer les fichiers
- Écouter vos musiques
- Supprimer les fichiers indésirables
- Organiser votre bibliothèque musicale

Profitez ! 🎵
