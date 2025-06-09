import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Virtual } from "swiper/modules";
import { type IVideo } from "../data";
import { VideoPlayer } from "./VideoPlayer";
import { ProductListModal } from "./ProductListModal";
import { ProductDetailModal } from "./ProductDetailModal";
import { CartModal } from "./CartModal";

interface IMainAppProps {
  videos: IVideo[];
  initCurrentVideoIndex?: number;
  onVideoChange?: (currentVideoItem: IVideo) => void;
}

export const MainApp: FC<IMainAppProps> = ({
  videos,
  initCurrentVideoIndex,
  onVideoChange,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isOpenProductDetailModal, setOpenProductDetailModal] = useState(false);
  const [isOpenProductListModal, setOpenProductListModal] = useState(false);
  const [isOpenCartModal, setOpenCartModal] = useState(false);
  const [videoWrapperWidth, setVideoWrapperWidth] = useState(0);

  const shouldBlockInteractVideo =
    isOpenProductDetailModal || isOpenProductListModal || isOpenCartModal;

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      setCurrentVideoIndex(swiper.activeIndex);
      onVideoChange?.(videos[swiper.activeIndex]);

      videoRefs.current.forEach((video, index) => {
        if (!video) return;

        if (index === swiper.activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    },
    [onVideoChange, videos],
  );

  const handleSwiperInit = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;

    setTimeout(() => {
      const firstVideo = videoRefs.current[swiper.activeIndex];
      if (firstVideo) {
        const tryPlay = () => {
          firstVideo.play().catch((err) => {
            console.warn("Autoplay failed", err);
          });
        };
        if (firstVideo.readyState >= 3) {
          tryPlay();
        } else {
          firstVideo.addEventListener("canplay", tryPlay, { once: true });
        }
      }
    }, 100);
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return;

    if (shouldBlockInteractVideo) {
      swiperRef.current.mousewheel.disable();
    } else {
      swiperRef.current.mousewheel.enable();
    }
  }, [shouldBlockInteractVideo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!swiperRef.current) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentVideoIndex, handleNext, handlePrev]);

  useEffect(() => {
    if (
      !!initCurrentVideoIndex &&
      initCurrentVideoIndex >= 0 &&
      !!swiperRef.current
    ) {
      swiperRef.current.slideTo(initCurrentVideoIndex, 0);
    }
  }, [initCurrentVideoIndex]);

  return (
    <div className="bg-black text-white flex justify-center items-center relative h-screen">
      <div className="relative w-full h-full">
        <Swiper
          className="w-full h-full"
          direction="vertical"
          modules={[Mousewheel, Virtual]}
          grabCursor
          slidesPerView={1}
          virtual={{ addSlidesAfter: 5 }}
          mousewheel={{ enabled: true, thresholdDelta: 5 }}
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
        >
          {videos.map((video, index) => (
            <SwiperSlide
              key={video.id}
              className="flex items-center justify-center w-full h-full"
            >
              <VideoPlayer
                onUnmute={setIsMuted}
                video={video}
                totalVideos={videos.length}
                index={index}
                currentVideoIndex={currentVideoIndex}
                muted={isMuted}
                onRefReady={(i, el) => {
                  videoRefs.current[i] = el!;
                }}
                handleOpenProductDetailModal={() =>
                  setOpenProductDetailModal(true)
                }
                isOpenProductDetailModal={isOpenProductDetailModal}
                handleOpenProductListModal={() => setOpenProductListModal(true)}
                handleOpenCartModal={() => setOpenCartModal(true)}
                handleVideoWrapperWidth={setVideoWrapperWidth}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <ProductDetailModal
          isOpen={isOpenProductDetailModal}
          onClose={() => setOpenProductDetailModal(false)}
          product={videos[currentVideoIndex].products[0]}
          handleOpenCartModal={() => setOpenCartModal(true)}
          width={videoWrapperWidth}
        />

        <ProductListModal
          isOpen={isOpenProductListModal}
          onClose={() => setOpenProductListModal(false)}
          video={videos[currentVideoIndex]}
          openProductDetailModal={() => setOpenProductDetailModal(true)}
          width={videoWrapperWidth}
        />
        <CartModal
          isOpen={isOpenCartModal}
          onClose={() => setOpenCartModal(false)}
          video={videos[currentVideoIndex]}
          width={videoWrapperWidth}
        />

        {!shouldBlockInteractVideo && (
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <button
              onClick={handlePrev}
              disabled={currentVideoIndex === 0}
              className="cursor-pointer w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronUpIcon />
            </button>
            <button
              onClick={handleNext}
              disabled={currentVideoIndex === videos.length - 1}
              className="cursor-pointer w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronDownIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
