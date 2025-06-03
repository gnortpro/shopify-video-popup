import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
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
  const transitioningRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<"up" | "down" | null>(
    null,
  );
  const [shouldHideNavigation, setShouldHideNavigation] = useState(false);

  const handleNextVideo = useCallback((): void => {
    if (transitioningRef.current) return;

    setIsTransitioning(true);
    transitioningRef.current = true;
    setSlideDirection("up");

    setTimeout(() => {
      const newIndex = (currentVideoIndex + 1) % videos.length;
      setCurrentVideoIndex(newIndex);
      setProgress(0);
      onVideoChange?.(videos[newIndex]);

      setIsTransitioning(false);
      transitioningRef.current = false;
      setSlideDirection(null);
    }, 150);
  }, [currentVideoIndex, videos, onVideoChange]);

  const handlePrevVideo = useCallback((): void => {
    if (transitioningRef.current) return;

    setIsTransitioning(true);
    transitioningRef.current = true;
    setSlideDirection("down");

    setTimeout(() => {
      const newIndex =
        currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1;
      setCurrentVideoIndex(newIndex);
      setProgress(0);
      onVideoChange?.(videos[newIndex]);

      setIsTransitioning(false);
      transitioningRef.current = false;
      setSlideDirection(null);
    }, 150);
  }, [currentVideoIndex, videos, onVideoChange]);

  const handlePlayPause = useCallback((): void => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleMute = useCallback((): void => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleHideNavigation = useCallback((value: boolean): void => {
    setShouldHideNavigation(value);
  }, []);

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
    if (shouldHideNavigation) return;
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
      const now = Date.now();
      const last = lastWheelTimeRef.current;

      if (now - last < 1400 || transitioningRef.current) return;

      lastWheelTimeRef.current = now;
      e.preventDefault();

      if (e.deltaY > 0) {
        handleNextVideo();
      } else if (e.deltaY < 0) {
        handlePrevVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handlePrevVideo, handleNextVideo, shouldHideNavigation]);

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

  useEffect(() => {
    transitioningRef.current = isTransitioning;
  }, [isTransitioning]);

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
            key={currentVideoItem.id}
            video={currentVideoItem}
            totalVideos={videos.length}
            progress={progress}
            isPlaying={isPlaying}
            isMuted={isMuted}
            onScreenClick={handleScreenClick}
            onPlayPause={handlePlayPause}
            onMute={handleMute}
            formatTime={formatTime}
            hideNavigation={handleHideNavigation}
            isMobile={false}
            onProgressUpdate={handleProgressUpdate}
          />
          {!shouldHideNavigation && (
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
          )}
        </div>
      </div>
    </div>
  );
};
