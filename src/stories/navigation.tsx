import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, type FC } from "react";
import cx from "classnames";

interface ICustomNavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}

export const CustomNavigationButton: FC<ICustomNavigationButtonProps> = ({
  direction,
  onClick,
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
        "absolute top-[40%] transform -translate-y-1/2 z-10 w-6.5 h-6.5 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg cursor-pointer transition-shadow",
        {
          "left-8 -translate-x-1 sm:-translate-x-2": direction === "prev",
          "right-8 translate-x-1 sm:translate-x-2": direction === "next",
        },
      )}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} stories`}
    >
      <Icon size={14} className="text-gray-600" />
    </button>
  );
};
