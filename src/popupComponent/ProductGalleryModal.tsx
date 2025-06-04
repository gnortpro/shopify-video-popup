import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Mousewheel, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { IProductMediaType } from "../data";
import { CustomNavigationButton } from "../stories/navigation";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface IProductGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaFiles: IProductMediaType[];
  currentFileIndex: number;
}

export const ProductGalleryModal: FC<IProductGalleryModalProps> = ({
  isOpen,
  onClose,
  mediaFiles,
  currentFileIndex,
}) => {
  const localPlayState = localStorage.getItem("drv-video-state");
  const localSoundState = localStorage.getItem("drv-video-sound");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);
  const [isPlaying, setPlaying] = useState(
    localPlayState ? JSON.parse(localPlayState).playing : true,
  );
  const [isMuted, setMuted] = useState(
    localSoundState ? JSON.parse(localSoundState).isMuted : true,
  );
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePlayPauseClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      setPlaying(!isPlaying);
      localStorage.setItem(
        "drv-video-state",
        JSON.stringify({ playing: !isPlaying }),
      );
    },
    [isPlaying],
  );

  const handleMuteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      setMuted(!isMuted);
      localStorage.setItem(
        "drv-video-sound",
        JSON.stringify({ isMuted: !isMuted }),
      );
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
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handlePrevClick = useCallback((): void => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNextClick = useCallback((): void => {
    swiperRef.current?.slideNext();
  }, []);

  const handleThumbClick = useCallback((index: number): void => {
    swiperRef.current?.slideTo(index);
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

  useEffect(() => {
    if (!isOpen) {
      swiperRef.current = null;
      setThumbsSwiper(undefined);
    }
  }, [isOpen]);

  if (!isOpen || !mediaFiles?.length) return null;

  return (
    <div className="absolute left-0 w-full z-100 flex items-end justify-center transition-all duration-300 ease-out animation-slideInUp top-0 h-full">
      <div
        className="bg-white w-full transition-all duration-300 ease-out rounded-none flex flex-col h-full"
        ref={wrapperRef}
      >
        <div className="relative cursor-pointer h-full">
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
            className="h-full"
            direction="horizontal"
            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
            modules={[Navigation, Thumbs, Mousewheel]}
            slidesPerView={1}
            initialSlide={currentFileIndex}
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
                      autoPlay={isPlaying}
                      muted={isMuted}
                      loop
                      className="w-full object-cover h-full"
                    />
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

        {mediaFiles.length > 1 && (
          <div className="p-4 absolute bottom-2 left-0 w-full">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              slidesPerView="auto"
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              className="thumbs-swiper"
              centerInsufficientSlides={true}
              style={
                {
                  "--swiper-wrapper-transition-timing-function": "linear",
                } as React.CSSProperties
              }
            >
              {mediaFiles.map((media, index) => (
                <SwiperSlide
                  key={index}
                  className="!w-auto cursor-pointer"
                  onClick={() => handleThumbClick(index)}
                >
                  <div
                    className={`
                      relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden 
                      border-2 transition-all duration-200
                      ${
                        activeIndex === index
                          ? "border-blue-500 shadow-md"
                          : "border-gray-300 hover:border-gray-400"
                      }
                    `}
                  >
                    {media.type === "video" ? (
                      <>
                        <video
                          src={media.url}
                          className="w-full object-contain"
                          muted
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </>
                    ) : (
                      <img
                        src={media.url}
                        alt=""
                        className="w-full object-contain"
                      />
                    )}

                    {/* Active indicator */}
                    {activeIndex === index && (
                      <div className="absolute inset-0 bg-blue-500/20 border border-blue-500 rounded-lg" />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};
