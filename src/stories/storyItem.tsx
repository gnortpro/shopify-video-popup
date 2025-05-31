import cx from "classnames";
import { useCallback, useState, type FC } from "react";
import type { IStoryItemProps, IVideo } from "../data";

interface IStoryAvatarProps {
  story: IVideo;
}

export const StoryAvatar: FC<IStoryAvatarProps> = ({ story }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const isVideo = story.mediaType === "video" && story.videoUrl;

  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleVideoError = useCallback(() => {
    console.error("Video failed to load:", story.videoUrl);
    setIsVideoLoaded(false);
  }, [story.videoUrl]);

  return (
    <div className="relative">
      <div
        className={cx("w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5", {
          "bg-gray-300": !story.isRead,
          "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500":
            story.isRead,
        })}
      >
        <div className="w-full h-full bg-white rounded-full p-0.5 relative overflow-hidden">
          <img
            src={story.thumbnailUrl || story.image}
            alt={story.title}
            className={cx(
              "w-full h-full object-cover rounded-full transition-opacity duration-300",
              {
                "opacity-0": isVideoLoaded,
                "opacity-100": !isVideoLoaded,
              },
            )}
            draggable={false}
            loading="lazy"
          />
          {isVideo && (
            <video
              src={story.videoUrl}
              className={cx(
                "absolute inset-0 w-full h-full object-cover rounded-full transition-opacity duration-300",
                {
                  "opacity-100": isVideoLoaded,
                  "opacity-0": !isVideoLoaded,
                },
              )}
              muted
              loop
              autoPlay
              preload="metadata"
              onLoadedData={handleVideoLoaded}
              onError={handleVideoError}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const StoryItem: FC<IStoryItemProps> = ({ story, onClick }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      onClick(story);
    },
    [story, onClick],
  );

  return (
    <div
      className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity select-none"
      onClick={handleClick}
    >
      <StoryAvatar story={story} />

      <span className="text-xs text-gray-900 mt-1 max-w-14 sm:max-w-16 truncate text-center">
        {story.title}
      </span>
    </div>
  );
};
