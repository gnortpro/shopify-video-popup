import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShoppingBag,
  ShoppingCart,
  X,
} from "lucide-react";
import { videos, type Video as VideoType } from "../data/videoData";
import cx from "classnames";
import { ProductModal } from "./ProductModal";
import { ProductItem } from "./ProductItem";
import { CartModal } from "./CartModal";
import { ProductDetailModal } from "./ProductDetailModal";

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
  onProgressUpdate?: (progress: number) => void;
  onHideModal?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isPlaying,
  isMuted,
  onScreenClick,
  onPlayPause,
  onMute,
  isMobile = false,
  onProgressUpdate,
  onHideModal,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [localProgress, setLocalProgress] = useState<number>(0);
  const [isOpenProductModal, setOpenProductModal] = useState(false);
  const [isOpenCartModal, setOpenCartModal] = useState(false);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false);
  const [isOpenProductDetailModal, setOpenProductDetailModal] = useState(false);

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
      setShowPlayPauseIcon(true);
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

  const handleBuyNow = useCallback((): void => {}, []);

  const handleCartModalClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      // showProductModal?.();
      setOpenCartModal(true);
    },
    [],
  );

  const handleProductModalClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      // showProductModal?.();
      setOpenProductModal(true);
    },
    [],
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

  useEffect(() => {
    if (showPlayPauseIcon) {
      setTimeout(() => {
        setShowPlayPauseIcon(false);
      }, 600);
    }
  }, [showPlayPauseIcon]);

  return (
    <div
      className={cx(
        "relative bg-black overflow-hidden aspect-[9/16]",
        { "h-[80vh] w-auto rounded-xl group": !isMobile },
        { "w-full h-full": isMobile },
      )}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        className={cx("w-full h-full object-contain")}
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
      {showPlayPauseIcon && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="w-20 h-20 bg-black/70 rounded-full flex items-center justify-center animate-ping">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </div>
        </div>
      )}
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
      {/* <button
        onClick={handleCartModalClick}
        className="absolute top-4 right-8 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center z-40 transition-all duration-300 hover:scale-110 cursor-pointer pointer-events-auto"
      >
        <ShoppingCart className="w-5 h-5 text-orange-500" />
      </button>
      <button
        onClick={onHideModal}
        className={cx(
          "absolute top-4 right-4 z-40 w-6 h-6 text-white cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200",
          {
            "mt-3": videos[0].productCount > 0,
          },
        )}
      >
        <X size={16} className="text-gray-600" />
      </button> */}
      <div
        className={cx("absolute top-4 right-4 z-40 flex", {
          "gap-2": videos[0].productCount > 0,
        })}
      >
        <button
          onClick={handleCartModalClick}
          className="relative w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          title={`${videos[0].discount} - Xem sản phẩm (${videos[0].productCount})`}
        >
          <ShoppingCart className="w-6 h-6 text-orange-500" />
          {videos[0].productCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {videos[0].productCount}
              </span>
            </div>
          )}
        </button>
        {isMobile && (
          <button
            onClick={onHideModal}
            className={cx(
              "w-6 h-6 text-white cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full  flex items-center justify-center transition-colors duration-200",
              {
                "mt-3": videos[0].productCount > 0,
              },
            )}
          >
            <X size={16} className="text-gray-600" />
          </button>
        )}
      </div>
      <div className="absolute bottom-0 left-0 p-4 right-0 pointer-events-none flex items-center gap-6 z-50">
        <button
          className="relative w-14 h-14 bg-white/10 hover:bg-white/10 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer pointer-events-auto"
          onClick={handleProductModalClick}
        >
          <ShoppingBag size="30" className="text-orange-500" />
          {videos[0].productCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {videos[0].productCount}
              </span>
            </div>
          )}
        </button>
        <ProductItem
          product={videos[0].products[0]} // Assuming the first product for demo
          isMobile={isMobile}
          onBuyNow={handleBuyNow}
          onOpenProductDetailModal={() => setOpenProductDetailModal(true)}
        />
      </div>
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
      <ProductDetailModal
        isOpen={isOpenProductDetailModal}
        onClose={() => setOpenProductDetailModal(false)}
        product={videos[0].products[0]}
        isMobile={isMobile}
      />
      <ProductModal
        isOpen={isOpenProductModal}
        onClose={() => setOpenProductModal(false)}
        video={video}
        openProductDetailModal={() => setOpenProductDetailModal(true)}
        isMobile={isMobile}
      />
      <CartModal
        isOpen={isOpenCartModal}
        onClose={() => setOpenCartModal(false)}
        video={video}
        isMobile={isMobile}
        onOpenProductDetailModal={() => setOpenProductDetailModal(true)}
      />
    </div>
  );
};
