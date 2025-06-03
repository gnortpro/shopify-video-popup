import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, type FC } from "react";
import cx from "classnames";

interface ICustomNavigationButtonProps {
  direction: "prev" | "next";
  size?: "small" | "medium" | "large";
  iconSize?: number;
  onClick: () => void;
  disabled: boolean;
}

export const CustomNavigationButton: FC<ICustomNavigationButtonProps> = ({
  direction,
  onClick,
  size = "small",
  iconSize = 14,
  disabled,
}) => {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  if (disabled) return null;

  return (
    <button
      onClick={handleClick}
      className={cx(
        "absolute top-1/2 transform -translate-y-1/2 z-10  bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg cursor-pointer transition-shadow",
        {
          "left-8 -translate-x-1 sm:-translate-x-2": direction === "prev",
          "right-8 translate-x-1 sm:translate-x-2": direction === "next",
          "w-6.5 h-6.5": size === "small",
          "w-10 h-10": size === "medium",
          "w-14 h-14": size === "large",
        },
      )}
    >
      <Icon size={iconSize} className="text-gray-600" />
    </button>
  );
};
