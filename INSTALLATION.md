# 📖 Guide d'Installation Détaillé - Music Manager

Ce guide vous fournira des instructions complètes pour installer et configurer **Music Manager** sur votre système. Il couvre les prérequis, les étapes d'installation pour différents gestionnaires de paquets, et des conseils de dépannage.

## 🖥️ Systèmes d'exploitation supportés

Music Manager est compatible avec les systèmes d'exploitation suivants :

-   **Windows** 10/11
-   **macOS** 10.15+ (Catalina et versions ultérieures)
-   **Linux** (distributions basées sur Debian comme Ubuntu, Fedora, Arch Linux, etc.)

## 📋 Prérequis

Avant de procéder à l'installation de Music Manager, assurez-vous que les logiciels suivants sont installés sur votre machine :

### 1. Node.js (Version 18 ou supérieure)

Node.js est un environnement d'exécution JavaScript côté serveur nécessaire pour faire fonctionner l'application. Il inclut `npm` (Node Package Manager) par défaut.

**Instructions d'installation :**

1.  Rendez-vous sur le site officiel de Node.js : [nodejs.org](https://nodejs.org/)
2.  Téléchargez la version **LTS (Long Term Support)** recommandée pour la plupart des utilisateurs.
3.  Suivez les instructions d'installation spécifiques à votre système d'exploitation.

**Vérification de l'installation :**

Ouvrez un terminal (ou l'invite de commande/PowerShell sur Windows) et exécutez les commandes suivantes :

```bash
node --version
npm --version
```

Vous devriez voir les numéros de version de Node.js et npm affichés.

### 2. Gestionnaires de paquets (pnpm, npm, yarn)

Music Manager utilise un gestionnaire de paquets pour gérer ses dépendances. Vous pouvez choisir entre `pnpm` (recommandé), `npm` ou `yarn`.

#### pnpm (Recommandé)

pnpm est un gestionnaire de paquets rapide et efficace qui optimise l'espace disque.

**Installation :**

-   **Windows (PowerShell) :**

    ```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
    ```

-   **macOS/Linux :**

    ```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
    ```

**Vérification :**

```bash
pnpm --version
```

#### npm (Node Package Manager)

npm est le gestionnaire de paquets par défaut de Node.js. Il est généralement installé automatiquement avec Node.js.

**Mise à jour (si nécessaire) :**

```bash
npm install -g npm@latest
```

**Vérification :**

```bash
npm --version
```

#### Yarn

Yarn est un autre gestionnaire de paquets populaire, développé par Facebook.

**Installation :**

```bash
npm install -g yarn
```

**Vérification :**

```bash
yarn --version
```

### 3. Git

Git est un système de contrôle de version distribué, nécessaire pour cloner le dépôt du projet.

**Instructions d'installation :**

1.  Rendez-vous sur le site officiel de Git : [git-scm.com](https://git-scm.com/)
2.  Téléchargez et installez la version adaptée à votre système d'exploitation.

**Vérification :**

```bash
git --version
```

### 4. Navigateur compatible

Music Manager s'appuie sur l'API *File System Access*, qui n'est pas universellement supportée par tous les navigateurs. Pour une expérience optimale, utilisez :

-   ✅ **Google Chrome** (recommandé)
-   ✅ **Microsoft Edge**
-   ✅ **Brave Browser**
-   ❌ **Firefox** (non supporté pour l'API *File System Access*)
-   ❌ **Safari** (non supporté pour l'API *File System Access*)

## 🚀 Installation étape par étape

Suivez ces étapes pour obtenir une copie locale du projet et le faire fonctionner.

### Étape 1 : Cloner le dépôt

Ouvrez votre terminal (ou l'invite de commande/PowerShell) et exécutez la commande suivante pour cloner le dépôt GitHub :

```bash
git clone https://github.com/LHRICO78/MusicManager.git
cd MusicManager
```

### Étape 2 : Installer les dépendances

Naviguez dans le répertoire du projet et installez les dépendances en utilisant le gestionnaire de paquets que vous avez choisi :

#### Avec pnpm (Recommandé)

```bash
pnpm install
```

#### Avec npm

```bash
npm install
```

#### Avec Yarn

```bash
yarn install
```

L'installation des dépendances peut prendre quelques minutes. Veuillez patienter jusqu'à ce que le processus soit terminé.

### Étape 3 : Lancer l'application en mode développement

Une fois les dépendances installées, vous pouvez lancer l'application en mode développement :

#### Avec pnpm

```bash
pnpm dev
```

#### Avec npm

```bash
npm run dev
```

#### Avec Yarn

```bash
yarn dev
```

Vous devriez voir un message similaire à celui-ci dans votre terminal, indiquant que l'application est prête :

```
➜  Local:   http://localhost:3000/
➜  Network: http://169.254.0.21:3000/ # L'adresse IP peut varier
```

### Étape 4 : Ouvrir l'application dans le navigateur

Ouvrez votre navigateur web compatible (Chrome, Edge, Brave) et accédez à l'adresse : **http://localhost:3000**

## ✅ Première utilisation

Pour commencer à utiliser Music Manager :

1.  **Cliquez sur le bouton "Sélectionner Répertoire"** dans l'interface de l'application.
2.  **Choisissez un dossier** sur votre ordinateur contenant vos fichiers musicaux.
3.  **Autorisez l'accès** au dossier lorsque votre navigateur vous le demande.
4.  **Attendez** que l'application scanne et affiche tous les fichiers audio.
5.  **Cliquez sur le bouton ▶️** à côté d'un fichier pour commencer la lecture.

## 🔧 Commandes utiles

Voici un tableau récapitulatif des commandes courantes pour le développement et la gestion du projet, adaptées à chaque gestionnaire de paquets :

| Action | pnpm | npm | Yarn |
| :-------------------------------- | :------------------ | :------------------ | :------------------ |
| Lancer le serveur de développement | `pnpm dev` | `npm run dev` | `yarn dev` |
| Compiler pour la production | `pnpm build` | `npm run build` | `yarn build` |
| Prévisualiser la version compilée | `pnpm preview` | `npm run preview` | `yarn preview` |
| Formater le code | `pnpm format` | `npm run format` | `yarn format` |
| Vérifier les erreurs TypeScript | `pnpm check` | `npm run check` | `yarn check` |

## 🐛 Dépannage

### Erreur : "command not found" (pour pnpm, npm ou yarn)

Si votre terminal ne reconnaît pas les commandes de votre gestionnaire de paquets après l'installation :

**Solution :**

Redémarrez votre terminal. Si le problème persiste, assurez-vous que le chemin d'accès à votre gestionnaire de paquets est correctement ajouté à la variable d'environnement `PATH` de votre système.

-   **Windows (PowerShell) :**

    ```powershell
$env:Path += ";$env:APPDATA\npm"
    ```

-   **macOS/Linux :**

    ```bash
export PATH="$HOME/.local/bin:$PATH" # Ou le chemin d'installation spécifique
    ```

### Erreur : "Port 3000 already in use"

Cela signifie qu'une autre application utilise déjà le port 3000. Vous pouvez lancer Music Manager sur un autre port :

```bash
pnpm dev -- --port 3001
# ou
npm run dev -- --port 3001
# ou
yarn dev --port 3001
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:3001`.

### Les fichiers audio ne s'affichent pas

-   Vérifiez que le dossier sélectionné contient bien des fichiers audio avec les extensions supportées (.mp3, .wav, .flac, etc.).
-   Assurez-vous d'avoir autorisé l'accès au dossier lorsque le navigateur vous l'a demandé.
-   Essayez de sélectionner un autre dossier pour voir si le problème persiste.

### Le lecteur audio ne fonctionne pas

-   Vérifiez que vous utilisez un navigateur compatible (Chrome, Edge, Brave).
-   Assurez-vous que le fichier audio n'est pas corrompu.
-   Essayez de lire un autre format audio pour isoler le problème.

### Erreur : "git: command not found"

Si Git n'est pas reconnu, installez-le depuis [git-scm.com](https://git-scm.com/).

## 📦 Installation en tant qu'application autonome

Pour créer une version compilée de l'application (qui peut être déployée ou exécutée sans le serveur de développement) :

#### Avec pnpm

```bash
pnpm build
```

#### Avec npm

```bash
npm run build
```

#### Avec Yarn

```bash
yarn build
```

Les fichiers compilés seront générés dans le dossier `dist/` à la racine du projet.

## 🌐 Accès depuis un autre ordinateur sur le même réseau

Pour accéder à l'application Music Manager depuis un autre appareil connecté au même réseau local que votre machine de développement :

1.  **Trouvez l'adresse IP locale** de votre machine de développement :

    -   **Windows :** Ouvrez l'invite de commande et tapez `ipconfig`. Cherchez la ligne "Adresse IPv4".
    -   **macOS/Linux :** Ouvrez un terminal et tapez `ifconfig` ou `ip a`. Cherchez l'adresse IP associée à votre interface réseau (ex: `eth0`, `wlan0`).

2.  Sur l'autre ordinateur, ouvrez un navigateur web et accédez à : `http://[VOTRE_ADRESSE_IP_LOCALE]:3000`

    *Exemple :* Si votre adresse IP locale est `192.168.1.100`, vous accéderez à `http://192.168.1.100:3000`.

## 💾 Mise à jour de Music Manager

Pour mettre à jour votre copie locale de Music Manager avec les dernières modifications du dépôt :

1.  Naviguez dans le répertoire du projet :

    ```bash
cd MusicManager
    ```

2.  Récupérez les dernières modifications :

    ```bash
git pull origin main
    ```

3.  Réinstallez les dépendances (si de nouvelles dépendances ont été ajoutées ou mises à jour) :

    ```bash
pnpm install # ou npm install ou yarn install
    ```

4.  Relancez l'application en mode développement :

    ```bash
pnpm dev # ou npm run dev ou yarn dev
    ```

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes qui ne sont pas couverts par la section de dépannage :

1.  Consultez les [issues GitHub existantes](https://github.com/LHRICO78/MusicManager/issues) pour voir si votre problème a déjà été signalé ou résolu.
2.  Si votre problème n'est pas listé, ouvrez une [nouvelle issue sur GitHub](https://github.com/LHRICO78/MusicManager/issues/new).
3.  Lorsque vous ouvrez une issue, veuillez inclure le plus de détails possible :
    -   Votre système d'exploitation (Windows, macOS, Linux et version).
    -   Le navigateur que vous utilisez (Chrome, Edge, Brave et version).
    -   Les messages d'erreur complets que vous avez rencontrés.
    -   Les étapes précises pour reproduire le problème.

## ✨ Prochaines étapes

Une fois Music Manager installé et fonctionnel, vous êtes prêt à :

-   Parcourir et gérer votre collection de fichiers musicaux.
-   Renommer et supprimer des fichiers directement depuis l'interface.
-   Profiter de votre musique avec le lecteur audio intégré.
-   Organiser votre bibliothèque musicale de manière efficace.

**Profitez de votre musique ! 🎵**
