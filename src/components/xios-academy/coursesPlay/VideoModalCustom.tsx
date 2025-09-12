"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FiX,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiSkipBack,
  FiSkipForward,
  FiMaximize,
  FiMinimize,
} from "react-icons/fi";

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  lessonTitle: string;
  onClose: () => void;
  isPreview?: boolean;
  courseTitle?: string;
  onEnrollClick?: () => void;
}

// 🎥 Modal del reproductor de YouTube con controles personalizados
const VideoModalCustom: React.FC<VideoModalProps> = ({
  isOpen,
  videoUrl,
  lessonTitle,
  onClose,
  isPreview = false,
  courseTitle = "",
  onEnrollClick,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Extraer el ID del video de YouTube
  const getYouTubeId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYouTubeId(videoUrl);

  // Formatear tiempo
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Controles del reproductor
  const togglePlayPause = () => {
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
      // Cuando pausa, mostrar controles y mantenerlos visibles
      setShowControls(true);
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
    } else {
      player.playVideo();
      // Cuando reproduce, mostrar controles temporalmente
      showControlsTemporarily();
    }
  };

  const seekTo = (percentage: number) => {
    if (!player || !duration) return;
    const time = (percentage / 100) * duration;
    player.seekTo(time, true);
    setCurrentTime(time);
    showControlsTemporarily();
  };

  const handleVolumeChange = (newVolume: number) => {
    if (!player) return;
    player.setVolume(newVolume);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    showControlsTemporarily();
  };

  const toggleMute = () => {
    if (!player) return;

    if (isMuted) {
      player.unMute();
      setIsMuted(false);
      const currentVolume = player.getVolume();
      setVolume(currentVolume > 0 ? currentVolume : 50);
    } else {
      player.mute();
      setIsMuted(true);
    }
    showControlsTemporarily();
  };

  const skipBackward = () => {
    if (!player) return;
    const newTime = Math.max(0, currentTime - 10);
    player.seekTo(newTime, true);
    setCurrentTime(newTime);
    showControlsTemporarily();
  };

  const skipForward = () => {
    if (!player) return;
    const newTime = Math.min(duration, currentTime + 10);
    player.seekTo(newTime, true);
    setCurrentTime(newTime);
    showControlsTemporarily();
  };

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current);
    }
    // Ocultar controles después de 3 segundos solo si está reproduciendo
    hideControlsTimer.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  }, [isPlaying]);

  const toggleFullscreen = () => {
    if (!modalRef.current) return;

    if (!isFullscreen) {
      // Entrar en pantalla completa
      if (modalRef.current.requestFullscreen) {
        modalRef.current.requestFullscreen();
      } else if ((modalRef.current as any).webkitRequestFullscreen) {
        (modalRef.current as any).webkitRequestFullscreen();
      } else if ((modalRef.current as any).msRequestFullscreen) {
        (modalRef.current as any).msRequestFullscreen();
      }
    } else {
      // Salir de pantalla completa
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
    showControlsTemporarily();
  };

  const handleMouseMove = () => {
    showControlsTemporarily();
  };

  // Inicializar YouTube API
  useEffect(() => {
    if (!isOpen || !youtubeId) return;

    const initializeYouTubeAPI = () => {
      // Verificar si la API ya está cargada
      if ((window as any).YT && (window as any).YT.Player) {
        createPlayer();
      } else {
        // Cargar la API de YouTube
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        (window as any).onYouTubeIframeAPIReady = createPlayer;
      }
    };

    const createPlayer = () => {
      if (!playerRef.current) return;

      const newPlayer = new (window as any).YT.Player(playerRef.current, {
        height: "100%",
        width: "100%",
        videoId: youtubeId,
        playerVars: {
          controls: 0, // Ocultar controles nativos
          disablekb: 1, // Deshabilitar teclado
          fs: 0, // Deshabilitar pantalla completa
          iv_load_policy: 3, // Ocultar anotaciones
          modestbranding: 1, // Ocultar logo de YouTube
          playsinline: 1, // Reproducir en línea
          rel: 0, // No mostrar videos relacionados
          showinfo: 0, // No mostrar información del video
          autoplay: 0, // No autoplay
          origin: window.location.origin,
          enablejsapi: 1, // Habilitar JS API para controles
          // Parámetros adicionales para bloquear sugerencias
          endscreen: 0, // Deshabilitar pantalla final
          cc_load_policy: 0, // No cargar subtítulos automáticamente
          hl: "es", // Idioma español
          widget_referrer: window.location.origin, // Referrer específico
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target);
            setDuration(event.target.getDuration());
            setVolume(event.target.getVolume());
            setIsLoading(false);
          },
          onStateChange: (event: any) => {
            const playerState = event.data;
            const isCurrentlyPlaying = playerState === 1; // YT.PlayerState.PLAYING
            const isEnded = playerState === 0; // YT.PlayerState.ENDED
            const isPaused = playerState === 2; // YT.PlayerState.PAUSED

            setIsPlaying(isCurrentlyPlaying);

            // Si el video termina, reiniciar para evitar sugerencias
            if (isEnded) {
              setTimeout(() => {
                if (event.target && event.target.seekTo) {
                  event.target.seekTo(0, true);
                  event.target.pauseVideo();
                  setCurrentTime(0);
                  setIsPlaying(false);
                  showControlsTemporarily();
                }
              }, 100);
            }

            // Actualizar tiempo cada segundo cuando está reproduciendo
            if (isCurrentlyPlaying) {
              const interval = setInterval(() => {
                if (event.target.getPlayerState() === 1) {
                  setCurrentTime(event.target.getCurrentTime());
                } else {
                  clearInterval(interval);
                }
              }, 1000);
            }
          },
        },
      });

      setPlayer(newPlayer);
    };

    initializeYouTubeAPI();

    // Cleanup
    return () => {
      if (player && player.destroy) {
        player.destroy();
      }
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
    };
  }, [isOpen, youtubeId]); // Removemos player de las dependencias para evitar warning

  // Manejar cambios de pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  // Manejar visibilidad de controles según estado de reproducción
  useEffect(() => {
    if (isPlaying) {
      // Si está reproduciendo, iniciar temporizador para ocultar controles
      showControlsTemporarily();
    } else {
      // Si está pausado, mostrar controles y mantenerlos visibles
      setShowControls(true);
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
    }
  }, [isPlaying, showControlsTemporarily]);

  // Bloquear teclas globalmente cuando el modal está abierto
  useEffect(() => {
    if (!isOpen) return;

    // Inyectar CSS para bloquear sugerencias de YouTube
    const style = document.createElement("style");
    style.id = "youtube-suggestions-blocker";
    style.textContent = `
      /* Ocultar todos los elementos de sugerencias y pantalla final de YouTube */
      .ytp-endscreen-content,
      .ytp-ce-element,
      .ytp-pause-overlay,
      .ytp-show-cards-title,
      .ytp-videowall-still,
      .ytp-scroll-min,
      .ytp-suggestion-set,
      .ytp-cards-teaser,
      .ytp-cards-button,
      .ytp-suggested-action,
      .ytp-watermark,
      .ytp-chrome-top,
      .ytp-chrome-top-buttons,
      .ytp-youtube-button,
      .ytp-share-button,
      .ytp-watch-later-button,
      .ytp-copylink-button,
      .ytp-impression-link,
      .ytp-title-link,
      .ytp-title,
      .ytp-title-text,
      .ytp-upnext,
      .ytp-upnext-top,
      .ytp-upnext-autoplay-icon,
      .video-ads,
      .ytp-ad-overlay-container,
      .ytp-ad-text-overlay {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        z-index: -9999 !important;
      }
      
      /* Ocultar completamente el iframe cuando se muestran sugerencias */
      iframe[src*="youtube"].ytp-hide-info-bar {
        position: relative;
      }
      
      iframe[src*="youtube"].ytp-hide-info-bar::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: black;
        z-index: 999999;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Permitir solo espacio para play/pause
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
        return;
      }

      // Bloquear todas las demás teclas
      e.preventDefault();
      return false;
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.body.style.overflow = "unset";

      // Remover CSS de bloqueo de sugerencias
      const injectedStyle = document.getElementById(
        "youtube-suggestions-blocker"
      );
      if (injectedStyle) {
        injectedStyle.remove();
      }
    };
  }, [isOpen]); // Removemos isPlaying y togglePlayPause para evitar warnings

  if (!isOpen) return null;

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isFullscreen ? "bg-black" : "flex items-center justify-center"
      }`}
    >
      {/* Overlay - solo visible cuando NO está en pantalla completa */}
      {!isFullscreen && (
        <div className="absolute inset-0 bg-black/90" onClick={onClose} />
      )}

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative bg-black overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? "w-screen h-screen"
            : "w-full max-w-5xl mx-4 rounded-xl shadow-2xl"
        }`}
      >
        {/* Header - solo visible cuando NO está en pantalla completa */}
        {!isFullscreen && (
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-verde-oscuro to-piel-oscuro">
            <div className="flex items-center gap-3">
              {isPreview && (
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                  VISTA PREVIA GRATUITA
                </span>
              )}
              <h3 className="text-lg font-bold text-white truncate">
                {lessonTitle}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>
          </div>
        )}

        {/* Video Container */}
        <div
          className={`relative bg-black ${
            isFullscreen ? "w-full h-full" : "aspect-video"
          }`}
          onMouseMove={handleMouseMove}
          onContextMenu={(e) => e.preventDefault()}
          style={{ userSelect: "none" }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde-oscuro"></div>
                <p className="text-white">Cargando video...</p>
              </div>
            </div>
          )}

          {/* YouTube Player */}
          <div ref={playerRef} className="w-full h-full" />

          {/* Overlay de protección completa - SIEMPRE ACTIVO */}
          <div
            className="absolute inset-0 bg-transparent cursor-pointer"
            onClick={togglePlayPause}
            onDoubleClick={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              pointerEvents: "auto", // Siempre activo para bloquear YouTube
              userSelect: "none",
              WebkitUserSelect: "none",
              zIndex: 30, // Debajo de los controles
              // Recortar el área de los controles cuando están visibles
              clipPath: showControls
                ? "polygon(0% 0%, 100% 0%, 100% 70%, 0% 70%)"
                : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              transition: "clip-path 0.3s ease",
            }}
          />

          {/* Botón de cerrar en pantalla completa */}
          {isFullscreen && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors z-50"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Controles personalizados */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
            style={{
              pointerEvents: showControls ? "auto" : "none",
              zIndex: 40, // Sobre el overlay de protección
            }}
          >
            {/* Barra de progreso */}
            <div className="mb-4 relative">
              <div className="w-full h-2 bg-gray-600 rounded-full cursor-pointer">
                <div
                  className="h-full bg-verde-oscuro rounded-full relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercentage}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                style={{ pointerEvents: "auto" }}
              />
            </div>

            {/* Controles principales */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={skipBackward}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <FiSkipBack className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="p-3 hover:bg-white/20 rounded-full transition-colors bg-verde-oscuro"
                >
                  {isPlaying ? (
                    <FiPause className="w-8 h-8 text-white" />
                  ) : (
                    <FiPlay className="w-8 h-8 text-white ml-1" />
                  )}
                </button>

                <button
                  onClick={skipForward}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <FiSkipForward className="w-6 h-6 text-white" />
                </button>

                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Control de volumen */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  {isMuted ? (
                    <FiVolumeX className="w-6 h-6 text-white" />
                  ) : (
                    <FiVolume2 className="w-6 h-6 text-white" />
                  )}
                </button>

                <div className="w-20">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) =>
                      handleVolumeChange(parseFloat(e.target.value))
                    }
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${
                        isMuted ? 0 : volume
                      }%, #4b5563 ${isMuted ? 0 : volume}%, #4b5563 100%)`,
                    }}
                  />
                </div>

                {/* Botón de pantalla completa */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title={
                    isFullscreen
                      ? "Salir de pantalla completa"
                      : "Pantalla completa"
                  }
                >
                  {isFullscreen ? (
                    <FiMinimize className="w-6 h-6 text-white" />
                  ) : (
                    <FiMaximize className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* 🎯 Banner de Vista Previa */}
            {isPreview && onEnrollClick && (
              <div className="absolute bottom-24 left-4 right-4 bg-gradient-to-r from-verde-oscuro to-piel-oscuro rounded-xl p-4 shadow-lg z-50">
                <div className="text-center text-white">
                  <h4 className="font-bold text-lg mb-2">
                    🎓 ¿Te gusta lo que ves?
                  </h4>
                  <p className="text-sm text-piel-blanco/90 mb-3">
                    Esta es solo una muestra gratuita de{" "}
                    <strong>{courseTitle}</strong>
                  </p>
                  <button
                    onClick={onEnrollClick}
                    className="bg-white text-verde-oscuro px-6 py-2 rounded-lg font-bold hover:bg-piel-blanco transition-all duration-300 hover:scale-105"
                  >
                    Inscribirse al Curso Completo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModalCustom;
