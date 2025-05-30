import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
import type { IVideo } from "../data/videoData";
import { ProductModal } from "./ProductModal";
import { VideoPlayer } from "./VideoPlayer";

interface IMobileAppProps {
  videos: IVideo[];
  onVideoChange?: (video: IVideo) => void;
  currentVideoItem: IVideo;
  onHideModal: () => void;
}

export const MobileApp: FC<IMobileAppProps> = ({
  videos,
  currentVideoItem,
  onVideoChange,
  onHideModal,
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNextVideo = useCallback((): void => {
    const newIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(newIndex);
    setProgress(0);
    onVideoChange?.(currentVideoItem);
  }, [currentVideoIndex, videos.length, currentVideoItem, onVideoChange]);

  const handlePrevVideo = useCallback((): void => {
    const newIndex =
      currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1;
    setCurrentVideoIndex(newIndex);
    setProgress(0);
    onVideoChange?.(currentVideoItem);
  }, [currentVideoIndex, currentVideoItem, videos.length, onVideoChange]);

  const handlePlayPause = useCallback((): void => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleMute = useCallback((): void => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleScreenClick = useCallback((): void => {
    handlePlayPause();
  }, [handlePlayPause]);

  const handleProgressUpdate = useCallback((newProgress: number): void => {
    setProgress(newProgress);
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>): void => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientY);
    },
    [],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>): void => {
      setTouchEnd(e.targetTouches[0].clientY);
    },
    [],
  );

  const handleTouchEnd = useCallback((): void => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      handleNextVideo();
    }
    if (isDownSwipe) {
      handlePrevVideo();
    }
  }, [touchStart, touchEnd, handleNextVideo, handlePrevVideo]);

  const handleShoppingBagClick = useCallback((): void => {
    setShowProductModal(true);
  }, []);

  const handleProductModalClose = useCallback((): void => {
    setShowProductModal(false);
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
  }, [showProductModal, handlePrevVideo, handleNextVideo]);

  useEffect(() => {
    if (isPlaying && currentVideoItem) {
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
  }, [isPlaying, handleNextVideo, currentVideoItem]);

  if (!currentVideoItem) return null;

  return (
    <div className="relative w-screen h-screen">
      <div
        ref={containerRef}
        className="absolute inset-0 transition-transform duration-500 ease-out"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <VideoPlayer
          video={currentVideoItem}
          currentIndex={currentVideoIndex}
          totalVideos={videos.length}
          progress={progress}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onScreenClick={handleScreenClick}
          onPlayPause={handlePlayPause}
          onMute={handleMute}
          onPrevVideo={handlePrevVideo}
          onNextVideo={handleNextVideo}
          formatTime={formatTime}
          isMobile={true}
          onProgressUpdate={handleProgressUpdate}
          onHideModal={onHideModal}
        />
      </div>

      <div className="absolute bottom-8 left-4 right-20 text-white z-30"></div>
    </div>
  );
};
