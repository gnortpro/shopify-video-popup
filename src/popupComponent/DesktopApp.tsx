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
import { type IVideo } from "../data";

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
  const [tempVideo, setTempVideo] = useState<IVideo>(currentVideoItem);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<"up" | "down" | null>(
    null,
  );
  const [shouldHideNavigation, setShouldHideNavigation] = useState(false);

  const animateAndChangeVideo = useCallback(
    (direction: "up" | "down") => {
      if (transitioningRef.current) return;

      setSlideDirection(direction);
      setIsTransitioning(true);
      transitioningRef.current = true;

      setTimeout(() => {
        const newIndex =
          direction === "up"
            ? (currentVideoIndex + 1) % videos.length
            : currentVideoIndex === 0
              ? videos.length - 1
              : currentVideoIndex - 1;

        setCurrentVideoIndex(newIndex);
        setTempVideo(videos[newIndex]);
        setProgress(0);
        onVideoChange?.(videos[newIndex]);

        setIsTransitioning(false);
        transitioningRef.current = false;
        setSlideDirection(null);
      }, 500); // delay đổi video sau animation
    },
    [currentVideoIndex, videos, onVideoChange],
  );

  const handleNextVideo = useCallback(() => {
    if (currentVideoIndex >= videos.length - 1) return;
    animateAndChangeVideo("up");
  }, [animateAndChangeVideo, currentVideoIndex, videos]);

  const handlePrevVideo = useCallback(() => {
    if (currentVideoIndex <= 0) return;
    animateAndChangeVideo("down");
  }, [animateAndChangeVideo, currentVideoIndex]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleHideNavigation = useCallback((value: boolean) => {
    setShouldHideNavigation(value);
  }, []);

  const handleScreenClick = useCallback(() => {}, []);
  
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleProgressUpdate = useCallback((newProgress: number) => {
    setProgress(newProgress);
  }, []);

  useEffect(() => {
    if (shouldHideNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevVideo();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNextVideo();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 1400 || transitioningRef.current)
        return;

      lastWheelTimeRef.current = now;
      e.preventDefault();

      if (e.deltaY > 0) handleNextVideo();
      else if (e.deltaY < 0) handlePrevVideo();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleNextVideo, handlePrevVideo, shouldHideNavigation]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNextVideo();
            return 0;
          }
          return prev + 100 / tempVideo.duration;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, tempVideo, handleNextVideo]);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center relative">
      <div className="relative w-full h-full">
        <div
          className={cx(
            "transition-transform duration-200 will-change-transform",
            {
              "translate-y-0": !isTransitioning,
              "-translate-y-full": isTransitioning && slideDirection === "up",
              "translate-y-full": isTransitioning && slideDirection === "down",
            },
          )}
        >
          <VideoPlayer
            video={tempVideo}
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
        </div>

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
              disabled={currentVideoIndex === videos.length - 1}
              className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <ChevronDownIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
