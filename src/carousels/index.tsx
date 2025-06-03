import cx from "classnames";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState, type FC } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Mousewheel, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import { VIDEOS } from "../data";
import { VideoSlideItem } from "./carouselItem";

interface IVideoSliderProps {
  onSlideClick: (slideId: number) => void;
}

export const VideoSlider: FC<IVideoSliderProps> = ({ onSlideClick }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideClick = useCallback(
    (id: number) => () => {
      onSlideClick(id);
    },
    [onSlideClick],
  );

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <Swiper
          modules={[Virtual, Mousewheel, Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={false}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          onSlideChange={handleSlideChange}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2.2,
            },
          }}
          virtual
          mousewheel={{ enabled: true, thresholdDelta: 5 }}
        >
          {VIDEOS.map((slide, index) => (
            <SwiperSlide key={slide.id} virtualIndex={index}>
              <VideoSlideItem
                slide={slide}
                onClick={handleSlideClick(slide.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={cx(
            "absolute right-0 top-0 z-10 h-full w-24 transition-all [background:linear-gradient(270deg,white_0%,transparent_100%)]",
            {
              "invisible opacity-0": isEnd,
              "visible opacity-100": !isEnd,
            },
          )}
        />

        <button
          className={cx(
            "swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 cursor-pointer",
            {
              "opacity-0 pointer-events-none": isBeginning,
              "opacity-100": !isBeginning,
            },
          )}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          className={cx(
            "swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 cursor-pointer",
            {
              "opacity-0 pointer-events-none": isEnd,
              "opacity-100": !isEnd,
            },
          )}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};
