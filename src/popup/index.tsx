import React, { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { VIDEO } from "./const";

interface VideoPopupPlayerProps {
  onVideoClick: () => void;
  onClose?: () => void;
  initialPosition?: { x: number; y: number };
  size?: { width: number; height: number };
}

export const VideoPopup: React.FC<VideoPopupPlayerProps> = ({
  onVideoClick,
  onClose,
  initialPosition = { x: 0, y: 0 },
  size = { width: 240, height: 144 },
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasDragged, setHasDragged] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>(
    initialPosition,
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
    hasMoved: boolean;
  }>({ startX: 0, startY: 0, startPosX: 0, startPosY: 0, hasMoved: false });

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  const handleVideoClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      // Chỉ trigger onClick nếu không phải đang drag
      if (!hasDragged) {
        onVideoClick();
      }
    },
    [onVideoClick, hasDragged],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Không drag nếu click vào nút close
      if ((e.target as HTMLElement).closest(".close-button")) return;

      e.preventDefault();
      setIsDragging(true);
      setHasDragged(false);

      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
        hasMoved: false,
      };
    },
    [position.x, position.y],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      e.preventDefault();
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      // Threshold để phân biệt click và drag (5px)
      const dragThreshold = 5;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > dragThreshold && !dragRef.current.hasMoved) {
        dragRef.current.hasMoved = true;
        setHasDragged(true);
      }

      // Chỉ update position nếu đã vượt threshold
      if (dragRef.current.hasMoved) {
        // Sử dụng requestAnimationFrame để làm mượt animation
        requestAnimationFrame(() => {
          setPosition({
            x: dragRef.current.startPosX + deltaX,
            y: dragRef.current.startPosY + deltaY,
          });
        });
      }
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    // Reset hasDragged sau một delay ngắn để tránh conflict với onClick
    setTimeout(() => {
      setHasDragged(false);
    }, 100);
  }, []);

  // Tối ưu event listeners với useCallback
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none"; // Tắt text selection khi drag

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Tối ưu hiệu suất với will-change CSS
  const containerStyle: React.CSSProperties = {
    bottom: `${20 - position.y}px`,
    right: `${20 - position.x}px`,
    willChange: isDragging ? "transform" : "auto",
    transition: isDragging ? "none" : "all 0.2s ease-out",
  };

  const videoContainerStyle: React.CSSProperties = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    cursor: isDragging ? "grabbing" : "grab",
    transform: isDragging ? "scale(1.02)" : "scale(1)",
    transition: isDragging
      ? "transform 0.1s ease-out"
      : "transform 0.2s ease-out",
  };

  if (!isVisible) return null;

  return (
    <div className="relative">
      {/* Video Player Popup */}
      <div
        className="fixed z-50 transition-all duration-200 select-none"
        style={containerStyle}
      >
        {/* Close button - nằm ngoài khung video */}
        <button
          onClick={handleClose}
          className="close-button absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 cursor-pointer"
        >
          <X size={12} />
        </button>

        {/* Video Container */}
        <div
          ref={playerRef}
          className="bg-black rounded-lg shadow-2xl overflow-hidden"
          style={videoContainerStyle}
          onMouseDown={handleMouseDown}
        >
          <video
            ref={videoRef}
            src={VIDEO}
            className="w-full h-full object-cover cursor-pointer"
            autoPlay
            muted
            loop
            playsInline
            onClick={handleVideoClick}
          />

          {/* Drag indicator khi đang drag */}
          {isDragging && hasDragged && (
            <div className="absolute inset-0 pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
};
