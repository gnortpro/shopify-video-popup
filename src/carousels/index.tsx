import React, { useState, type FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useCallback } from "react";
import type { Swiper as SwiperType } from "swiper/types";
import { SLIDES } from "./const";

interface IProps {
  onSlideClick: (slideId: number) => void;
}

export const VideoSlider: FC<IProps> = ({ onSlideClick }) => {
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
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={false}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          onSlideChange={handleSlideChange}
          onSwiper={handleSlideChange}
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
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer transform transition-all duration-300"
                onClick={handleSlideClick(slide.id)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                />

                <div className="absolute inset-0 bg-black opacity-20" />

                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="relative h-full flex flex-col justify-between p-6 text-white">
                  <div className="text-center">
                    <h2 className="text-lg font-bold tracking-wider drop-shadow-lg">
                      {slide.title}
                    </h2>
                  </div>

                  <div className="flex justify-center items-center">
                    <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold drop-shadow-lg">
                      {slide.subtitle}
                    </h3>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black opacity-10 transition-opacity duration-300" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={`absolute right-0 top-0 z-10 h-full w-24 transition-all [background:linear-gradient(270deg,white_0%,transparent_100%)] ${
            isEnd ? "invisible opacity-0" : "visible opacity-100"
          }`}
        />

        <button
          className={`swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
            isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          className={`swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
            isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};
