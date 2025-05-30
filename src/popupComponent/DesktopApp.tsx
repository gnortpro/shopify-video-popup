import React, { useCallback, useEffect, useState, type FC } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import cx from "classnames";
import { VideoPlayer } from "./VideoPlayer";
import { VIDEOS, type IVideo } from "../data";

interface IDesktopAppProps {
  videos: IVideo[];
  currentVideoItem: IVideo;
  onVideoChange?: (currentVideoItem: IVideo) => void;
}

export const DesktopApp: FC<IDesktopAppProps> = ({
  videos,
  onVideoChange,
  currentVideoItem,
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<"up" | "down" | null>(
    null,
  );

  const handleNextVideo = useCallback((): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection("up");
    setTimeout(() => {
      const newIndex = (currentVideoIndex + 1) % videos.length;
      setCurrentVideoIndex(newIndex);
      setProgress(0);
      onVideoChange?.(VIDEOS[newIndex]);
      setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection(null);
      }, 150);
    }, 150);
  }, [isTransitioning, currentVideoIndex, videos.length, onVideoChange]);

  const handlePrevVideo = useCallback((): void => {
    const newIndex =
      currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1;

    setCurrentVideoIndex(newIndex);
    setProgress(0);
    onVideoChange?.(VIDEOS[newIndex]);
    setIsTransitioning(true);
    setSlideDirection("down");
    setTimeout(() => {
      setIsTransitioning(false);
      setSlideDirection(null);
    }, 150);
  }, [currentVideoIndex, videos.length, onVideoChange]);

  const handlePlayPause = useCallback((): void => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleMute = useCallback((): void => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleScreenClick = useCallback((): void => {}, []);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleProgressUpdate = useCallback((newProgress: number): void => {
    setProgress(newProgress);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevVideo();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNextVideo();
      }
    };

    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();
      const delta = e.deltaY;
      if (delta > 0) {
        handleNextVideo();
      } else if (delta < 0) {
        handlePrevVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handlePrevVideo, handleNextVideo]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNextVideo();
            return 0;
          }
          return prev + 100 / currentVideoItem.duration;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentVideoItem, handleNextVideo]);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center relative">
      <div className="relative">
        <div
          className={cx("transition-transform duration-300 ease-out", {
            "-translate-y-4 opacity-50":
              isTransitioning && slideDirection === "up",
            "translate-y-4 opacity-50":
              isTransitioning && slideDirection === "down",
            "translate-y-0 opacity-100": !isTransitioning,
          })}
        >
          <VideoPlayer
            video={currentVideoItem}
            totalVideos={videos.length}
            progress={progress}
            isPlaying={isPlaying}
            isMuted={isMuted}
            onScreenClick={handleScreenClick}
            onPlayPause={handlePlayPause}
            onMute={handleMute}
            formatTime={formatTime}
            isMobile={false}
            onProgressUpdate={handleProgressUpdate}
          />
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <button
              onClick={handlePrevVideo}
              disabled={currentVideoIndex === 0}
              className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <ChevronUpIcon />
            </button>
            <button
              onClick={handleNextVideo}
              disabled={currentVideoIndex === VIDEOS.length - 1}
              className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <ChevronDownIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
