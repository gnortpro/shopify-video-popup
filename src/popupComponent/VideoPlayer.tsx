import {
  Pause,
  Play,
  ShoppingBag,
  ShoppingCart,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
import { type IVideo } from "../data";
import { ProductItem } from "./ProductItem";

interface IVideoPlayerProps {
  video: IVideo;
  totalVideos: number;
  index: number;
  currentVideoIndex: number;
  muted: boolean;
  onUnmute: (muted: boolean) => void;
  handleOpenCartModal: () => void;
  handleOpenProductDetailModal: () => void;
  handleOpenProductListModal: () => void;
  onRefReady: (index: number, element: HTMLVideoElement | null) => void;
  handleVideoWrapperWidth: (width: number) => void;
}

export const VideoPlayer: FC<IVideoPlayerProps> = ({
  video,
  index,
  currentVideoIndex,
  onUnmute,
  muted,
  onRefReady,
  handleOpenCartModal,
  handleOpenProductDetailModal,
  handleOpenProductListModal,
  handleVideoWrapperWidth,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const productModalRef = useRef<HTMLDivElement>(null);

  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [localProgress, setLocalProgress] = useState<number>(0);
  // const [isOpenProductDetailModal, setOpenProductDetailModal] = useState(false);
  const [isShowFooter, setShowFooter] = useState(window.innerWidth >= 330);

  const handleResize = useCallback((): void => {
    if (productModalRef.current)
      handleVideoWrapperWidth(productModalRef.current?.clientWidth);
    setShowFooter(window.innerWidth >= 330);
  }, [handleVideoWrapperWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleTimeUpdate = useCallback((): void => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        setLocalProgress(progressPercent);
      }
    }
  }, []);

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
      setIsPlaying(!isPlaying);
    },
    [isPlaying, setShowPlayPauseIcon],
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
      }
    },
    [],
  );

  const handlePlayPauseClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      setIsPlaying(!isPlaying);
    },
    [isPlaying],
  );

  const handleMuteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      onUnmute(!muted);
    },
    [muted, onUnmute],
  );

  const handleBuyNow = useCallback((): void => {}, []);

  const handleCartModalClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      handleOpenCartModal();
    },
    [handleOpenCartModal],
  );

  const handleProductListModalClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      handleOpenProductListModal();
    },
    [handleOpenProductListModal],
  );

  const handleVideoLoadedData = useCallback((): void => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(console.error);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current && currentVideoIndex === index) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentVideoIndex, index, isPlaying]);

  useEffect(() => {
    if (showPlayPauseIcon) {
      setTimeout(() => {
        setShowPlayPauseIcon(false);
      }, 600);
    }
  }, [setShowPlayPauseIcon, showPlayPauseIcon]);

  useEffect(() => {
    onRefReady(index, videoRef.current);
  }, [index, onRefReady]);

  useEffect(() => {
    if (currentVideoIndex !== index) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      const video = videoRef.current;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        if (video) {
          setShowPlayPauseIcon(true);
          if (video.paused) {
            setIsPlaying(true);
            video.play().catch(() => {});
          } else {
            setIsPlaying(false);
            video.pause();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentVideoIndex, index]);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    if (currentVideoIndex === index) {
      setIsPlaying(true);
      const tryPlay = () => {
        video.play().catch(() => {});
      };

      if (video.readyState >= 3) {
        tryPlay();
      } else {
        video.addEventListener("canplay", tryPlay, { once: true });
      }
    } else {
      setIsPlaying(false);
      video.pause();
      video.currentTime = 0;
    }
  }, [currentVideoIndex, index]);

  useEffect(() => {
    if (productModalRef.current) {
      handleVideoWrapperWidth(productModalRef.current.clientWidth);
    }
  }, [handleVideoWrapperWidth, productModalRef]);

  return (
    <div
      ref={productModalRef}
      className="relative bg-black overflow-hidden aspect-[9/16] w-full h-full"
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-contain"
        loop
        playsInline
        muted={muted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleVideoLoadedData}
      />
      <div
        className="absolute inset-0 cursor-pointer z-10"
        onClick={handleVideoAreaClick}
      />
      {showPlayPauseIcon && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="w-10 h-10 md:w-20 md:h-20 bg-black/70 rounded-full flex items-center justify-center animate-ping">
            {isPlaying ? (
              <Pause className="md:w-8 md:h-8 w-4 h-4 text-white" />
            ) : (
              <Play className="md:w-8 md:h-8 w-4 h-4 text-white ml-1" />
            )}
          </div>
        </div>
      )}
      <div className="absolute top-4 left-0 flex justify-between md:px-6 pl-16 pr-28 w-full z-40">
        <div className="flex gap-2 items-center">
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
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
        <button
          onClick={handleCartModalClick}
          className="relative w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          title={`Xem sản phẩm (${video.products.length})`}
        >
          <ShoppingCart className="w-5 h-5 text-orange-500" />
          {video.products.length > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {video.products.length}
              </span>
            </div>
          )}
        </button>
      </div>

      {isShowFooter && (
        <div className="absolute bottom-0 left-0 p-4 pointer-events-none flex items-center gap-6 z-50 w-full px-16 md:px-4">
          <button
            className="relative p-4 bg-white/10 hover:bg-white/10 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer pointer-events-auto"
            onClick={handleProductListModalClick}
          >
            <ShoppingBag size="30" className="text-orange-500" />
            {video.products.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {video.products.length}
                </span>
              </div>
            )}
          </button>
          <ProductItem
            product={video.products[0]}
            onBuyNow={handleBuyNow}
            onOpenProductDetailModal={handleOpenProductDetailModal}
          />
        </div>
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
      {/* <ProductDetailModal
        isOpen={isOpenProductDetailModal}
        onClose={() => setOpenProductDetailModal(false)}
        product={video.products[0]}
      /> */}
    </div>
  );
};
