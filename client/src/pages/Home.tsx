import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen, Music, Trash2, Edit2, Check, X, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { toast } from "sonner";

interface MusicFile {
  handle: FileSystemFileHandle;
  name: string;
  editingName: string;
  isEditing: boolean;
  size: number;
  type: string;
  path: string; // Chemin complet du fichier
}

/**
 * Design: Minimalisme Moderne & Efficacité
 * - Interface de terminal professionnel
 * - Palette: Noir (#0a0a0a) + Vert électrique (#00ff00)
 * - Typographie: JetBrains Mono pour clarté maximale
 * - Layout: Sidebar gauche + Zone centrale avec tableau + Lecteur audio
 * - Interactions: Édition en place, clics directs, lecture audio
 */
export default function Home() {
  const [allFiles, setAllFiles] = useState<MusicFile[]>([]);
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Vérifier si le navigateur supporte l'API File System Access
  const supportsFileSystemAccess = "showDirectoryPicker" in window;

  // Récursivement lister tous les fichiers audio d'un répertoire
  const getAllAudioFiles = async (
    dirHandle: FileSystemDirectoryHandle,
    basePath: string = ""
  ): Promise<MusicFile[]> => {
    const files: MusicFile[] = [];
    const audioExtensions = [
      ".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a", ".wma",
      ".alac", ".ape", ".opus", ".wv", ".dsf", ".dff", ".dsd",
      ".m4b", ".aiff", ".au", ".mid", ".midi"
    ];

    try {
      for await (const entry of (dirHandle as any).entries()) {
        const [name, handle] = entry;

        if (handle.kind === "directory") {
          // Récursivement traiter les sous-dossiers
          const subFiles = await getAllAudioFiles(
            handle as unknown as FileSystemDirectoryHandle,
            basePath ? `${basePath}/${name}` : name
          );
          files.push(...subFiles);
        } else if (handle.kind === "file") {
          // Ajouter les fichiers audio
          const lastDotIndex = name.lastIndexOf(".");
          if (lastDotIndex === -1) continue;
          const ext = name.substring(lastDotIndex).toLowerCase();
          if (audioExtensions.includes(ext)) {
            const file = await handle.getFile();
            const fullPath = basePath ? `${basePath}/${name}` : name;
            files.push({
              handle,
              name,
              editingName: name,
              isEditing: false,
              size: file.size,
              type: ext,
              path: fullPath,
            });
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors de la lecture du répertoire:", error);
    }

    return files;
  };

  // Sélectionner un répertoire racine
  const handleSelectDirectory = async () => {
    if (!supportsFileSystemAccess) {
      toast.error("Votre navigateur ne supporte pas la sélection de répertoire. Utilisez Chrome, Edge ou Brave.");
      return;
    }

    try {
      setIsLoading(true);
      const dirHandle = await (window as any).showDirectoryPicker();
      setDirectoryHandle(dirHandle);

      // Récupérer tous les fichiers audio récursivement
      const files = await getAllAudioFiles(dirHandle);
      
      // Trier par chemin
      files.sort((a, b) => a.path.localeCompare(b.path));
      setAllFiles(files);
      
      toast.success(`${files.length} fichier(s) audio trouvé(s)`);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        toast.error("Erreur lors de la sélection du répertoire");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Jouer un fichier
  const playFile = (index: number) => {
    const file = allFiles[index];
    if (!audioRef.current) return;

    try {
      // Créer une URL temporaire pour le fichier
      (file.handle as any).getFile().then((fileObj: File) => {
        const url = URL.createObjectURL(fileObj);
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play();
          setCurrentPlayingIndex(index);
          setIsPlaying(true);
        }
      });
    } catch (error) {
      console.error("Erreur lors de la lecture:", error);
      toast.error("Erreur lors de la lecture du fichier");
    }
  };

  // Pause/Reprendre
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Piste suivante
  const nextTrack = () => {
    if (currentPlayingIndex !== null && currentPlayingIndex < allFiles.length - 1) {
      playFile(currentPlayingIndex + 1);
    }
  };

  // Piste précédente
  const previousTrack = () => {
    if (currentPlayingIndex !== null && currentPlayingIndex > 0) {
      playFile(currentPlayingIndex - 1);
    }
  };

  // Mettre à jour le volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  // Démarrer l'édition d'un fichier
  const startEditing = (index: number) => {
    const newFiles = [...allFiles];
    newFiles[index].isEditing = true;
    newFiles[index].editingName = newFiles[index].name;
    setAllFiles(newFiles);
  };

  // Annuler l'édition
  const cancelEditing = (index: number) => {
    const newFiles = [...allFiles];
    newFiles[index].isEditing = false;
    setAllFiles(newFiles);
  };

  // Sauvegarder le renommage
  const saveRename = async (index: number) => {
    const file = allFiles[index];
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
      if (allFiles.some((f, i) => i !== index && f.name.toLowerCase() === newName.toLowerCase())) {
        toast.error("Un fichier avec ce nom existe déjà");
        return;
      }

      // Renommer le fichier
      const newHandle = await (file.handle as unknown as any).move(newName);
      const newFiles = [...allFiles];
      newFiles[index] = {
        ...newFiles[index],
        handle: newHandle,
        name: newName,
        isEditing: false,
      };
      setAllFiles(newFiles);
      toast.success(`Fichier renommé en "${newName}"`);
    } catch (error: any) {
      console.error("Erreur lors du renommage:", error);
      toast.error("Erreur lors du renommage du fichier");
    }
  };

  // Supprimer un fichier
  const deleteFile = async (index: number) => {
    const file = allFiles[index];
    try {
      await (file.handle as unknown as any).remove();
      const newFiles = allFiles.filter((_, i) => i !== index);
      setAllFiles(newFiles);
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

  // Formater le temps
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Mettre à jour le temps de lecture
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentPlayingIndex, allFiles.length]);

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
        <p className="text-xs text-muted mt-2">Gestionnaire et lecteur audio avec vue plate de tous les fichiers</p>
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
              <p className="text-muted mb-2">Répertoire :</p>
              <p className="text-accent font-bold break-all">{directoryHandle.name}</p>
            </div>
          )}

          {allFiles.length > 0 && (
            <div className="text-xs border border-accent p-3">
              <p className="text-muted mb-2">Statistiques :</p>
              <p className="text-accent">Fichiers : {allFiles.length}</p>
              <p className="text-accent">
                Taille totale : {formatFileSize(allFiles.reduce((sum, f) => sum + f.size, 0))}
              </p>
              {currentPlayingIndex !== null && (
                <p className="text-accent mt-2">
                  En lecture : {allFiles[currentPlayingIndex].name}
                </p>
              )}
            </div>
          )}

          <div className="text-xs text-muted border border-accent p-3">
            <p className="font-bold text-accent mb-2">Raccourcis :</p>
            <p>• Clic pour lire</p>
            <p>• Double-clic pour renommer</p>
            <p>• Entrée pour confirmer</p>
            <p>• Échap pour annuler</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto flex flex-col">
          {allFiles.length === 0 ? (
            <div className="flex items-center justify-center flex-1">
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
            <div className="p-6 flex-1 overflow-auto">
              {/* Table Header */}
              <div className="border border-accent mb-0 bg-card">
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-accent uppercase tracking-wider border-b border-accent sticky top-0 bg-card">
                  <div className="col-span-1">#</div>
                  <div className="col-span-1">▶</div>
                  <div className="col-span-5">Nom du fichier</div>
                  <div className="col-span-2">Chemin</div>
                  <div className="col-span-1">Taille</div>
                  <div className="col-span-1">Actions</div>
                </div>

                {/* Table Rows */}
                {allFiles.map((file, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-12 gap-4 px-4 py-3 border-b border-accent hover:bg-muted/10 transition-colors text-sm ${
                      currentPlayingIndex === index ? "bg-accent/10" : ""
                    }`}
                  >
                    <div className="col-span-1 text-muted">{String(index + 1).padStart(2, "0")}</div>
                    <div className="col-span-1">
                      <button
                        onClick={() => playFile(index)}
                        className="p-1 hover:text-accent transition-colors"
                        title="Lire"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="col-span-5">
                      {file.isEditing ? (
                        <input
                          type="text"
                          value={file.editingName}
                          onChange={(e) => {
                            const newFiles = [...allFiles];
                            newFiles[index].editingName = e.target.value;
                            setAllFiles(newFiles);
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
                    <div className="col-span-2 text-muted text-xs truncate">{file.path}</div>
                    <div className="col-span-1 text-muted text-xs">{formatFileSize(file.size)}</div>
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

          {/* Audio Player */}
          {allFiles.length > 0 && (
            <div className="border-t border-accent bg-card p-4">
              <audio ref={audioRef} />
              
              {currentPlayingIndex !== null && (
                <div className="mb-4 pb-4 border-b border-accent">
                  <p className="text-xs text-muted mb-2">En lecture :</p>
                  <p className="text-accent font-bold truncate">{allFiles[currentPlayingIndex].name}</p>
                </div>
              )}

              {/* Progress Bar */}
              {currentPlayingIndex !== null && (
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = parseFloat(e.target.value);
                      }
                    }}
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between text-xs text-muted mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}

              {/* Player Controls */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  <Button
                    onClick={previousTrack}
                    variant="outline"
                    size="sm"
                    className="border-accent text-accent hover:bg-accent/10"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={togglePlayPause}
                    variant="outline"
                    size="sm"
                    className="border-accent text-accent hover:bg-accent/10"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    onClick={nextTrack}
                    variant="outline"
                    size="sm"
                    className="border-accent text-accent hover:bg-accent/10"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-accent" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 accent-accent"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Status Bar */}
      {allFiles.length > 0 && (
        <div className="status-bar">
          <span>{allFiles.length} fichier(s) | Taille totale : {formatFileSize(allFiles.reduce((sum, f) => sum + f.size, 0))}</span>
          <span>{currentPlayingIndex !== null ? "En lecture" : "Prêt"}</span>
        </div>
      )}
    </div>
  );
}
