import { useCallback } from "react";
import type { StoryItemProps } from "./types";

export const StoryItem: React.FC<StoryItemProps> = ({ story, onClick }) => {
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
      <div className="relative">
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 ${
            story.hasNewStory
              ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500"
              : "bg-gray-300"
          }`}
        >
          <div className="w-full h-full bg-white rounded-full p-0.5">
            <img
              src={story.avatar}
              alt={story.username}
              className="w-full h-full object-cover rounded-full"
              draggable={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <span className="text-xs text-gray-900 mt-1 max-w-14 sm:max-w-16 truncate text-center">
        {story.username}
      </span>
    </div>
  );
};
