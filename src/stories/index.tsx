import React, { useCallback, useRef, type FC } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Mousewheel, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomNavigationButton } from "./navigation";
import { StoryItem } from "./storyItem";
import {
  STORIES_SWIPER_BREAKPOINTS,
  type IStoriesCarouselProps,
  type IVideo,
} from "../data";

export const VideoStories: FC<IStoriesCarouselProps> = ({
  stories,
  onStoryClick,
}) => {
  const swiperRef = useRef<SwiperType>(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

  const handleStoryClick = useCallback(
    (story: IVideo): void => {
      onStoryClick?.(story.id);
    },
    [onStoryClick],
  );

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

  return (
    <div className="relative bg-white py-4">
      <div className="relative w-full max-w-4xl mx-auto">
        <CustomNavigationButton
          direction="prev"
          onClick={handlePrevClick}
          disabled={isBeginning}
        />
        <CustomNavigationButton
          direction="next"
          onClick={handleNextClick}
          disabled={isEnd}
        />

        <Swiper
          direction="horizontal"
          modules={[Navigation, Mousewheel, Virtual]}
          slidesPerView="auto"
          spaceBetween={0}
          breakpoints={STORIES_SWIPER_BREAKPOINTS}
          grabCursor={true}
          normalizeSlideIndex={false}
          preventClicks={false}
          preventClicksPropagation={false}
          navigation={false}
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          virtual
          mousewheel={{ enabled: true, thresholdDelta: 5 }}
        >
          {stories.map((story) => (
            <SwiperSlide key={story.id}>
              <StoryItem story={story} onClick={handleStoryClick} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
