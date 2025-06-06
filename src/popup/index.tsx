import { X } from "lucide-react";
import React, { useCallback, useRef, useState, type FC } from "react";
import { type IVideo } from "../data";

interface IVideoPopupPlayerProps {
  video: IVideo;
  onVideoClick: (id: number) => void;
  onClose?: () => void;
}

export const VideoPopup: FC<IVideoPopupPlayerProps> = ({
  onVideoClick,
  onClose,
  video,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  const handleVideoClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onVideoClick(video.id);
    },
    [onVideoClick, video.id],
  );

  if (!isVisible) return null;

  return (
    <div className="relative">
      <div className="fixed bottom-5 right-5 z-50 transition-all duration-200">
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 cursor-pointer"
        >
          <X size={12} />
        </button>

        <div className="w-60 h-36 bg-black rounded-lg shadow-2xl overflow-hidden">
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full h-full object-cover cursor-pointer"
            autoPlay
            muted
            loop
            playsInline
            onClick={handleVideoClick}
          />
        </div>
      </div>
    </div>
  );
};
