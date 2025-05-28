import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, ShoppingBag } from "lucide-react";
import type { Video as VideoType } from "../data/videoData";
import cx from "classnames";

interface VideoPlayerProps {
  video: VideoType;
  currentIndex: number;
  totalVideos: number;
  progress: number;
  isPlaying: boolean;
  isMuted: boolean;
  onScreenClick: () => void;
  onPlayPause: () => void;
  onMute: () => void;
  onPrevVideo: () => void;
  onNextVideo: () => void;
  formatTime: (seconds: number) => string;
  isMobile?: boolean;
  showProductModal?: () => void;
  onProgressUpdate?: (progress: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isPlaying,
  isMuted,
  onScreenClick,
  onPlayPause,
  onMute,
  isMobile = false,
  showProductModal,
  onProgressUpdate,
}) => {
  const [localProgress, setLocalProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = useCallback((): void => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        setLocalProgress(progressPercent);
        onProgressUpdate?.(progressPercent);
      }
    }
  }, [onProgressUpdate]);

  const handleVideoAreaClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.classList.contains("control-button") ||
        target.closest(".control-button") ||
        target.closest(".group\\/volume")
      ) {
        return;
      }
      onPlayPause();
    },
    [onPlayPause],
  );

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      e.stopPropagation();
      if (videoRef.current) {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const clickProgress = (clickX / width) * 100;
        const newTime = (clickProgress / 100) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
        setLocalProgress(clickProgress);
        onProgressUpdate?.(clickProgress);
      }
    },
    [onProgressUpdate],
  );


  const handlePlayPauseClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      onPlayPause();
    },
    [onPlayPause],
  );

  const handleMuteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      onMute();
    },
    [onMute],
  );

  const handleVideoClick = useCallback((): void => {
    onScreenClick();
  }, [onScreenClick]);

  const handleProductModalClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      showProductModal?.();
    },
    [showProductModal],
  );

  const handleVideoLoadedData = useCallback((): void => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(console.error);
    }
  }, [isPlaying]);


  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.volume = isMuted ? 0 : volume / 100;
  //     videoRef.current.muted = isMuted;
  //   }
  // }, [volume, isMuted]);

  if (isMobile) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center relative"  style={{ aspectRatio: "9/16" }}>
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-contain"
          loop
          playsInline
          muted={isMuted}
          onClick={handleVideoClick}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleVideoLoadedData}
        />
      </div>
    );
  }

  return (
    <div
      className={cx(
        "relative w-auto bg-black rounded-xl overflow-hidden group",
        { "h-[80vh]": !isMobile },
      )}
      style={{ aspectRatio: "9/16" }}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-contain"
        loop
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleVideoLoadedData}
      />
      <div
        className="absolute inset-0 cursor-pointer z-10"
        onClick={handleVideoAreaClick}
      />
      <div className="absolute top-4 left-4 flex flex-row gap-2 z-40">
        <button
          onClick={handlePlayPauseClick}
          className="control-button w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>
        <div className="relative group/volume control-button">
          <button
            onClick={handleMuteClick}
            className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
      {showProductModal && (
        <button
          onClick={handleProductModalClick}
          className="control-button absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center z-40 transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5 text-orange-500" />
        </button>
      )}
      {!isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div
            className="h-1 bg-white/30 cursor-pointer relative group hover:h-1.5 transition-all duration-200 control-button"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-red-600 relative overflow-hidden transition-all duration-200"
              style={{ width: `${localProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full animate-shimmer"></div>
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/50"
              style={{ left: `calc(${localProgress}% - 6px)` }}
            ></div>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pointer-events-none">
        <div className="bg-red-600 text-white px-3 py-2 rounded-lg mb-3">
          <div className="font-bold text-sm">{video.title}</div>
        </div>
        <div className="text-sm opacity-90 mb-1">{video.username}</div>
        <div className="text-xs text-blue-300">{video.hashtags}</div>
      </div>
    </div>
  );
};
