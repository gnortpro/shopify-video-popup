import { ShoppingBag, ShoppingCart, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Video } from "../data/videoData";
import { ProductModal } from "./ProductModal";
import { VideoPlayer } from "./VideoPlayer";
import cx from "classnames";
interface MobileAppProps {
  videos: Video[];
  onVideoChange?: (video: Video) => void;
  currentVideoItem: Video;
  onHideModal: () => void;
}

export const MobileApp: React.FC<MobileAppProps> = ({
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

  return currentVideoItem ? (
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
      {/* <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-6 z-30">
        <div className="text-center">
          <button
            onClick={handleLike}
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 transform hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <Heart
              className={`w-6 h-6 transition-all duration-300 ${
                currentVideoItem.isLiked
                  ? "text-red-500 fill-red-500 animate-pulse scale-110"
                  : "text-white hover:text-red-300"
              }`}
            />
          </button>
          <span className="text-white text-xs font-semibold">
            {currentVideoItem.likes}
          </span>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 transform hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs">
            {currentVideoItem.comments}
          </span>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 transform hover:scale-110 transition-transform">
            <Share className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs">Chia sẻ</span>
        </div>
        <div className="text-center">
          <button
            onClick={handleNextVideo}
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 transform hover:scale-110 transition-transform cursor-pointer"
          >
            <RotateCcw className="w-6 h-6 text-white" />
          </button>
          <span className="text-white text-xs">Next</span>
        </div>
      </div> */}

      {/* <div
        className={cx("absolute top-4 right-4 z-40 flex", {
          "gap-2": currentVideoItem.productCount > 0,
        })}
      >
        <button
          onClick={handleShoppingBagClick}
          className="relative w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          title={`${currentVideoItem.discount} - Xem sản phẩm (${currentVideoItem.productCount})`}
        >
          <ShoppingCart className="w-6 h-6 text-orange-500" />
          {currentVideoItem.productCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {currentVideoItem.productCount}
              </span>
            </div>
          )}
        </button>
        <button
          onClick={onHideModal}
          className={cx(
            "w-6 h-6 text-white cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full  flex items-center justify-center transition-colors duration-200",
            {
              "mt-3": currentVideoItem.productCount > 0,
            },
          )}
        >
          <X size={16} className="text-gray-600" />
        </button>
      </div> */}

      <div className="absolute bottom-8 left-4 right-20 text-white z-30"></div>
{/* 
      <ProductModal
        isOpen={showProductModal}
        onClose={handleProductModalClose}
        video={currentVideoItem}
        isMobile
      /> */}
    </div>
  ) : (
    <></>
  );
};
