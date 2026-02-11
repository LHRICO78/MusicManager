import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen, Music, Trash2, Edit2, Check, X, ChevronRight, FolderUp } from "lucide-react";
import { toast } from "sonner";

interface MusicFile {
  handle: FileSystemFileHandle;
  name: string;
  editingName: string;
  isEditing: boolean;
  size: number;
  type: string;
  isDirectory?: boolean;
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
  const [items, setItems] = useState<MusicFile[]>([]);
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [currentPath, setCurrentPath] = useState<FileSystemDirectoryHandle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Vérifier si le navigateur supporte l'API File System Access
  const supportsFileSystemAccess = "showDirectoryPicker" in window;

  // Charger les fichiers et dossiers d'un répertoire
  const loadDirectoryContents = async (dirHandle: FileSystemDirectoryHandle) => {
    try {
      setIsLoading(true);
      const items: MusicFile[] = [];
      const audioExtensions = [
        ".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a", ".wma",
        ".alac", ".ape", ".opus", ".wv", ".dsf", ".dff", ".dsd",
        ".m4b", ".aiff", ".au", ".mid", ".midi"
      ];

      for await (const entry of (dirHandle as any).entries()) {
        const [name, handle] = entry;

        if (handle.kind === "directory") {
          // Ajouter les sous-répertoires
          items.push({
            handle,
            name,
            editingName: name,
            isEditing: false,
            size: 0,
            type: "folder",
            isDirectory: true,
          });
        } else if (handle.kind === "file") {
          // Ajouter les fichiers audio
          const lastDotIndex = name.lastIndexOf(".");
          if (lastDotIndex === -1) continue;
          const ext = name.substring(lastDotIndex).toLowerCase();
          if (audioExtensions.includes(ext)) {
            const file = await handle.getFile();
            items.push({
              handle,
              name,
              editingName: name,
              isEditing: false,
              size: file.size,
              type: ext,
              isDirectory: false,
            });
          }
        }
      }

      // Trier : dossiers d'abord, puis fichiers
      items.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });

      setItems(items);
      const fileCount = items.filter(i => !i.isDirectory).length;
      const folderCount = items.filter(i => i.isDirectory).length;
      toast.success(`${fileCount} fichier(s) audio, ${folderCount} dossier(s) trouvé(s)`);
    } catch (error: any) {
      console.error("Erreur lors du chargement:", error);
      toast.error("Erreur lors du chargement du répertoire");
    } finally {
      setIsLoading(false);
    }
  };

  // Sélectionner un répertoire racine
  const handleSelectDirectory = async () => {
    if (!supportsFileSystemAccess) {
      toast.error("Votre navigateur ne supporte pas la sélection de répertoire. Utilisez Chrome, Edge ou Brave.");
      return;
    }

    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      setDirectoryHandle(dirHandle);
      setCurrentPath([dirHandle]);
      await loadDirectoryContents(dirHandle);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        toast.error("Erreur lors de la sélection du répertoire");
      }
    }
  };

  // Naviguer dans un sous-dossier
  const navigateToFolder = async (item: MusicFile) => {
    if (!item.isDirectory) return;
    try {
      const newPath = [...currentPath, item.handle as unknown as FileSystemDirectoryHandle];
      setCurrentPath(newPath);
      await loadDirectoryContents(item.handle as unknown as FileSystemDirectoryHandle);
    } catch (error: any) {
      console.error("Erreur lors de la navigation:", error);
      toast.error("Erreur lors de l'accès au dossier");
    }
  };

  // Remonter d'un niveau
  const goBack = async () => {
    if (currentPath.length <= 1) return;
    const newPath = currentPath.slice(0, -1);
    setCurrentPath(newPath);
    await loadDirectoryContents(newPath[newPath.length - 1]);
  };

  // Démarrer l'édition d'un fichier
  const startEditing = (index: number) => {
    const newItems = [...items];
    newItems[index].isEditing = true;
    newItems[index].editingName = newItems[index].name;
    setItems(newItems);
  };

  // Annuler l'édition
  const cancelEditing = (index: number) => {
    const newItems = [...items];
    newItems[index].isEditing = false;
    setItems(newItems);
  };

  // Sauvegarder le renommage
  const saveRename = async (index: number) => {
    const item = items[index];
    const newName = item.editingName.trim();

    if (!newName) {
      toast.error("Le nom ne peut pas être vide");
      return;
    }

    if (newName === item.name) {
      cancelEditing(index);
      return;
    }

    try {
      // Vérifier si le fichier existe déjà
      if (items.some((f, i) => i !== index && f.name.toLowerCase() === newName.toLowerCase())) {
        toast.error("Un élément avec ce nom existe déjà");
        return;
      }

      // Renommer le fichier/dossier
      const newHandle = await (item.handle as unknown as any).move(newName);
      const newItems = [...items];
      newItems[index] = {
        ...newItems[index],
        handle: newHandle,
        name: newName,
        isEditing: false,
      };
      setItems(newItems);
      toast.success(`Élément renommé en "${newName}"`);
    } catch (error: any) {
      console.error("Erreur lors du renommage:", error);
      toast.error("Erreur lors du renommage de l'élément");
    }
  };

  // Supprimer un fichier ou dossier
  const deleteItem = async (index: number) => {
    const item = items[index];
    try {
      await (item.handle as any).remove();
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      toast.success(`"${item.name}" supprimé`);
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de l'élément");
    }
  };

  // Formater la taille du fichier
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "—";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  // Obtenir le chemin actuel
  const getCurrentPathDisplay = () => {
    if (currentPath.length === 0) return "";
    return currentPath.map(p => p.name).join(" / ");
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
        <p className="text-xs text-muted mt-2">Gestionnaire de fichiers musicaux locaux avec navigation de dossiers</p>
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
              <p className="text-muted mb-2">Répertoire racine :</p>
              <p className="text-accent font-bold break-all">{directoryHandle.name}</p>
            </div>
          )}

          {currentPath.length > 0 && (
            <div className="text-xs border border-accent p-3">
              <p className="text-muted mb-2">Chemin actuel :</p>
              <p className="text-accent font-bold break-all text-xs">{getCurrentPathDisplay()}</p>
            </div>
          )}

          {items.length > 0 && (
            <div className="text-xs border border-accent p-3">
              <p className="text-muted mb-2">Statistiques :</p>
              <p className="text-accent">Fichiers : {items.filter(i => !i.isDirectory).length}</p>
              <p className="text-accent">Dossiers : {items.filter(i => i.isDirectory).length}</p>
              <p className="text-accent">
                Taille : {formatFileSize(items.filter(i => !i.isDirectory).reduce((sum, f) => sum + f.size, 0))}
              </p>
            </div>
          )}

          <div className="text-xs text-muted border border-accent p-3">
            <p className="font-bold text-accent mb-2">Raccourcis :</p>
            <p>• Clic sur dossier pour naviguer</p>
            <p>• Double-clic pour renommer</p>
            <p>• Entrée pour confirmer</p>
            <p>• Échap pour annuler</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Music className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
                <p className="text-muted text-sm">
                  {directoryHandle
                    ? "Aucun fichier audio ou dossier trouvé dans ce répertoire"
                    : "Sélectionnez un répertoire pour commencer"}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {/* Navigation Bar */}
              {currentPath.length > 1 && (
                <div className="mb-4 flex gap-2">
                  <Button
                    onClick={goBack}
                    variant="outline"
                    size="sm"
                    className="border-accent text-accent hover:bg-accent/10"
                  >
                    <FolderUp className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                </div>
              )}

              {/* Table Header */}
              <div className="border border-accent mb-0 bg-card">
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-accent uppercase tracking-wider border-b border-accent">
                  <div className="col-span-1">#</div>
                  <div className="col-span-1">Type</div>
                  <div className="col-span-5">Nom</div>
                  <div className="col-span-2">Taille</div>
                  <div className="col-span-2">Ext.</div>
                  <div className="col-span-1">Actions</div>
                </div>

                {/* Table Rows */}
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-accent hover:bg-muted/10 transition-colors text-sm"
                  >
                    <div className="col-span-1 text-muted">{String(index + 1).padStart(2, "0")}</div>
                    <div className="col-span-1 flex items-center">
                      {item.isDirectory ? (
                        <FolderOpen className="w-4 h-4 text-accent" />
                      ) : (
                        <Music className="w-4 h-4 text-accent" />
                      )}
                    </div>
                    <div className="col-span-5">
                      {item.isEditing ? (
                        <input
                          type="text"
                          value={item.editingName}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].editingName = e.target.value;
                            setItems(newItems);
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
                          onClick={() => {
                            if (item.isDirectory) {
                              navigateToFolder(item);
                            } else {
                              startEditing(index);
                            }
                          }}
                          className={`cursor-pointer hover:text-accent transition-colors break-all ${
                            item.isDirectory ? "font-bold" : ""
                          }`}
                        >
                          {item.isDirectory && <ChevronRight className="w-3 h-3 inline mr-1" />}
                          {item.name}
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 text-muted">{formatFileSize(item.size)}</div>
                    <div className="col-span-2 text-muted uppercase">{item.type}</div>
                    <div className="col-span-1 flex gap-1">
                      {item.isEditing ? (
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
                            onClick={() => deleteItem(index)}
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
      {items.length > 0 && (
        <div className="status-bar">
          <span>
            {items.filter(i => !i.isDirectory).length} fichier(s) | {items.filter(i => i.isDirectory).length} dossier(s) |
            Taille : {formatFileSize(items.filter(i => !i.isDirectory).reduce((sum, f) => sum + f.size, 0))}
          </span>
          <span>Prêt</span>
        </div>
      )}
    </div>
  );
}
