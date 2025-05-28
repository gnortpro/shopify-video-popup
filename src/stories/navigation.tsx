import { ChevronLeft, ChevronRight } from "lucide-react";

export const CustomNavigationButton: React.FC<{
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}> = ({ direction, onClick, disabled }) => {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const positionClass =
    direction === "prev"
      ? "left-8 -translate-x-1 sm:-translate-x-2"
      : "right-8 translate-x-1 sm:translate-x-2";

  if (disabled) return null;

  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClass} top-[40%] transform -translate-y-1/2 z-10 w-6.5 h-6.5 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg cursor-pointer transition-shadow`}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} stories`}
    >
      <Icon size={14} className="text-gray-600" />
    </button>
  );
};
