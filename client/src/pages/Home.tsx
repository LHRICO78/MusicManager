import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen, Music, Trash2, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";

interface MusicFile {
  handle: FileSystemFileHandle;
  name: string;
  editingName: string;
  isEditing: boolean;
  size: number;
  type: string;
}

/**
 * Design: Minimalisme Moderne & Efficacité
 * - Interface de terminal professionnel
 * - Palette: Noir (#0a0a0a) + Vert électrique (#00ff00)
 * - Typographie: JetBrains Mono pour clarté maximale
 * - Layout: Sidebar gauche + Zone centrale avec tableau
 * - Interactions: Édition en place, clics directs
 */
export default function Home() {
  const [files, setFiles] = useState<MusicFile[]>([]);
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Vérifier si le navigateur supporte l'API File System Access
  const supportsFileSystemAccess = "showDirectoryPicker" in window;

  // Sélectionner un répertoire
  const handleSelectDirectory = async () => {
    if (!supportsFileSystemAccess) {
      toast.error("Votre navigateur ne supporte pas la sélection de répertoire. Utilisez Chrome, Edge ou Brave.");
      return;
    }

    try {
      setIsLoading(true);
      const dirHandle = await (window as any).showDirectoryPicker();
      setDirectoryHandle(dirHandle);

      // Lister les fichiers musicaux
      const musicFiles: MusicFile[] = [];
      const audioExtensions = [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a", ".wma"];

      for await (const entry of (dirHandle as any).entries()) {
        const [name, handle] = entry;
        if (handle.kind === "file") {
          const ext = name.substring(name.lastIndexOf(".")).toLowerCase();
          if (audioExtensions.includes(ext)) {
            const file = await handle.getFile();
            musicFiles.push({
              handle,
              name,
              editingName: name,
              isEditing: false,
              size: file.size,
              type: ext,
            });
          }
        }
      }

      // Trier par nom
      musicFiles.sort((a, b) => a.name.localeCompare(b.name));
      setFiles(musicFiles);
      toast.success(`${musicFiles.length} fichier(s) audio trouvé(s)`);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        toast.error("Erreur lors de la sélection du répertoire");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Démarrer l'édition d'un fichier
  const startEditing = (index: number) => {
    const newFiles = [...files];
    newFiles[index].isEditing = true;
    newFiles[index].editingName = newFiles[index].name;
    setFiles(newFiles);
  };

  // Annuler l'édition
  const cancelEditing = (index: number) => {
    const newFiles = [...files];
    newFiles[index].isEditing = false;
    setFiles(newFiles);
  };

  // Sauvegarder le renommage
  const saveRename = async (index: number) => {
    const file = files[index];
    const newName = file.editingName.trim();

    if (!newName) {
      toast.error("Le nom ne peut pas être vide");
      return;
    }

    if (newName === file.name) {
      cancelEditing(index);
      return;
    }

    try {
      // Vérifier si le fichier existe déjà
      if (files.some((f, i) => i !== index && f.name.toLowerCase() === newName.toLowerCase())) {
        toast.error("Un fichier avec ce nom existe déjà");
        return;
      }

      // Renommer le fichier via l'API
      const newHandle = await (file.handle as any).move(newName);
      const newFiles = [...files];
      newFiles[index] = {
        ...newFiles[index],
        handle: newHandle,
        name: newName,
        isEditing: false,
      };
      setFiles(newFiles);
      toast.success(`Fichier renommé en "${newName}"`);
    } catch (error: any) {
      console.error("Erreur lors du renommage:", error);
      toast.error("Erreur lors du renommage du fichier");
    }
  };

  // Supprimer un fichier
  const deleteFile = async (index: number) => {
    const file = files[index];
    try {
      await (file.handle as any).remove();
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      toast.success(`Fichier "${file.name}" supprimé`);
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression du fichier");
    }
  };

  // Formater la taille du fichier
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Browser Compatibility Warning */}
      {!supportsFileSystemAccess && (
        <div className="bg-destructive/20 border-b border-destructive px-6 py-3 text-sm">
          <p className="text-destructive font-bold">⚠️ Navigateur non supporté</p>
          <p className="text-destructive/80 text-xs mt-1">Cette application nécessite Chrome, Edge ou Brave. Firefox n'est pas supporté.</p>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-accent bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <Music className="w-6 h-6 text-accent" />
          <h1 className="text-2xl font-bold text-accent">MUSIC MANAGER</h1>
        </div>
        <p className="text-xs text-muted mt-2">Gestionnaire de fichiers musicaux locaux</p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-accent bg-card p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-xs font-bold text-accent uppercase mb-4 tracking-wider">Actions</h2>
            <Button
              onClick={handleSelectDirectory}
              disabled={isLoading}
              className="w-full bg-accent text-background hover:bg-accent/90 border border-accent text-sm font-mono"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              {isLoading ? "Chargement..." : "Sélectionner Répertoire"}
            </Button>
          </div>

          {directoryHandle && (
            <div className="text-xs border border-accent p-3">
              <p className="text-muted mb-2">Répertoire actif :</p>
              <p className="text-accent font-bold break-all">{directoryHandle.name}</p>
            </div>
          )}

          {files.length > 0 && (
            <div className="text-xs border border-accent p-3">
              <p className="text-muted mb-2">Statistiques :</p>
              <p className="text-accent">Fichiers : {files.length}</p>
              <p className="text-accent">
                Taille totale : {formatFileSize(files.reduce((sum, f) => sum + f.size, 0))}
              </p>
            </div>
          )}

          <div className="text-xs text-muted border border-accent p-3">
            <p className="font-bold text-accent mb-2">Raccourcis :</p>
            <p>• Double-clic pour renommer</p>
            <p>• Entrée pour confirmer</p>
            <p>• Échap pour annuler</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {files.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Music className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
                <p className="text-muted text-sm">
                  {directoryHandle
                    ? "Aucun fichier audio trouvé dans ce répertoire"
                    : "Sélectionnez un répertoire pour commencer"}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {/* Table Header */}
              <div className="border border-accent mb-0 bg-card">
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-accent uppercase tracking-wider border-b border-accent">
                  <div className="col-span-1">#</div>
                  <div className="col-span-6">Nom du fichier</div>
                  <div className="col-span-2">Taille</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-1">Actions</div>
                </div>

                {/* Table Rows */}
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-accent hover:bg-muted/10 transition-colors text-sm"
                  >
                    <div className="col-span-1 text-muted">{String(index + 1).padStart(2, "0")}</div>
                    <div className="col-span-6">
                      {file.isEditing ? (
                        <input
                          type="text"
                          value={file.editingName}
                          onChange={(e) => {
                            const newFiles = [...files];
                            newFiles[index].editingName = e.target.value;
                            setFiles(newFiles);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveRename(index);
                            if (e.key === "Escape") cancelEditing(index);
                          }}
                          autoFocus
                          className="terminal-input w-full"
                        />
                      ) : (
                        <span
                          onClick={() => startEditing(index)}
                          className="cursor-pointer hover:text-accent transition-colors break-all"
                        >
                          {file.name}
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 text-muted">{formatFileSize(file.size)}</div>
                    <div className="col-span-2 text-muted uppercase">{file.type}</div>
                    <div className="col-span-1 flex gap-1">
                      {file.isEditing ? (
                        <>
                          <button
                            onClick={() => saveRename(index)}
                            className="p-1 hover:text-accent transition-colors"
                            title="Confirmer"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => cancelEditing(index)}
                            className="p-1 hover:text-accent transition-colors"
                            title="Annuler"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(index)}
                            className="p-1 hover:text-accent transition-colors"
                            title="Renommer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteFile(index)}
                            className="p-1 hover:text-destructive transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Status Bar */}
      {files.length > 0 && (
        <div className="status-bar">
          <span>{files.length} fichier(s) | Taille totale : {formatFileSize(files.reduce((sum, f) => sum + f.size, 0))}</span>
          <span>Prêt</span>
        </div>
      )}
    </div>
  );
}
