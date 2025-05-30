import { Play } from "lucide-react";
import { useCallback, type FC } from "react";
import type { ISlide } from "./const";

interface IVideoSlideItemProps {
  slide: ISlide;
  onClick: () => void;
}

export const VideoSlideItem: FC<IVideoSlideItemProps> = ({
  slide,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div
      className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer transform transition-all duration-300"
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-500 opacity-100"
        style={{
          backgroundImage: `url(${slide.thumbnailUrl || slide.image})`,
        }}
      />

      {slide.mediaType === "video" && (
        <video
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          src={slide.videoUrl}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      )}

      <div className="absolute inset-0 bg-black opacity-20" />

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative h-full flex flex-col justify-between p-6 text-white">
        <div className="flex justify-center items-center flex-1">
          {slide.mediaType !== "video" && (
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center h-1/6">
          <h3 className="text-md font-semibold drop-shadow-lg">
            {slide.title}
          </h3>
        </div>
      </div>

      <div className="absolute inset-0 bg-black opacity-10 transition-opacity duration-300" />
    </div>
  );
};
