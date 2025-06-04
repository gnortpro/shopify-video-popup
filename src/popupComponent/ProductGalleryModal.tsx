import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
import type { Swiper as SwiperType } from "swiper";
import {
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Thumbs,
  Virtual,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { IProductMediaType } from "../data";
import { CustomNavigationButton } from "../stories/navigation";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

interface IProductGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaFiles: IProductMediaType[];
  isMobile?: boolean;
}

export const ProductGalleryModal: FC<IProductGalleryModalProps> = ({
  isOpen,
  onClose,
  mediaFiles,
  isMobile,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);
  const [isPlaying, setPlaying] = useState(true);
  const [isMuted, setMuted] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();

  const handlePlayPauseClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      setPlaying(!isPlaying);
    },
    [isPlaying],
  );

  const handleMuteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      setMuted(!isMuted);
    },
    [isMuted],
  );

  const handleCloseClick = useCallback((): void => {
    onClose();
  }, [onClose]);

  const handleSwiperInit = useCallback((swiper: SwiperType): void => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handlePrevClick = useCallback((): void => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNextClick = useCallback((): void => {
    swiperRef.current?.slideNext();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  if (!isOpen || !mediaFiles?.length) return null;

  return (
    <div className="absolute left-0 w-full z-100 flex items-end justify-center transition-all duration-300 ease-out animation-slideInUp top-0 h-screen">
      <div
        className="bg-white w-full transition-all duration-300 ease-out h-full rounded-none"
        ref={wrapperRef}
      >
        <div className="relative cursor-pointer">
          <CustomNavigationButton
            direction="prev"
            onClick={handlePrevClick}
            disabled={isBeginning}
            size="medium"
            iconSize={16}
          />
          <CustomNavigationButton
            direction="next"
            onClick={handleNextClick}
            disabled={isEnd}
            size="medium"
            iconSize={16}
          />
          <Swiper
            direction="horizontal"
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Pagination, Thumbs, Mousewheel, Virtual]}
            slidesPerView={1}
            virtual
            pagination
            mousewheel={{ enabled: true }}
            onSwiper={handleSwiperInit}
            onSlideChange={handleSlideChange}
          >
            {mediaFiles.map((media, index) => (
              <SwiperSlide key={index} className="m-auto">
                {media.type === "video" ? (
                  <>
                    <div className="absolute top-4 left-4 flex flex-row gap-2 z-40">
                      <button
                        onClick={handlePlayPauseClick}
                        className="control-button w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <Pause className="w-3 h-3 text-white" />
                        ) : (
                          <Play className="w-3 h-3 text-white ml-0.5" />
                        )}
                      </button>
                      <button
                        onClick={handleMuteClick}
                        className="w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-3 h-3 text-white" />
                        ) : (
                          <Volume2 className="w-3 h-3 text-white" />
                        )}
                      </button>
                    </div>
                    <video
                      ref={videoRef}
                      src={media.url}
                      autoPlay
                      muted={isMuted}
                      loop
                      className="w-full object-contain h-full"
                    />
                    {/* <Product3DViewer src="./Astronaut.glb" /> */}
                  </>
                ) : (
                  <img
                    src={media.url}
                    alt=""
                    className="w-full object-contain h-full"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={handleCloseClick}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl cursor-pointer pointer-events-auto z-10"
          >
            <X className="text-gray-400 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
