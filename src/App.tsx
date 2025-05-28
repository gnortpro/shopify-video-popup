import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { MobileApp } from "./popupComponent/components/MobileApp";
import { videos, type Video } from "./popupComponent/data/videoData";
import { DesktopApp } from "./popupComponent/components/DesktopApp";
import { VideoStories } from "./stories";
import { X } from "lucide-react";
import cx from "classnames";
import { VideoSlider } from "./carousels";
import { VideoPopup } from "./popup";

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [currentVideoItem, setCurrentVideoItem] = useState<Video | undefined>();

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleVideoChange = (video: Video) => {
    setCurrentVideoItem(video);
  };

  const handleStoryClick = (id: number) => {
    setCurrentVideoItem(
      videos.find((video) => video.id === Number(id)) || videos[0],
    );
  };

  const onHideModal = () => {
    setCurrentVideoItem(undefined);
  };

  return (
    <div className="">
      <div className="bg-white overflow-hidden mb-8">
        <VideoStories onStoryClick={handleStoryClick} />
      </div>
      <div className="bg-white overflow-hidden mb-8">
        <VideoSlider onSlideClick={handleStoryClick} />
      </div>
      <VideoPopup onVideoClick={() => handleStoryClick(1)} />
      {currentVideoItem && (
        <Modal
          isOpen
          onRequestClose={onHideModal}
          shouldCloseOnOverlayClick={false}
          overlayClassName="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          className="block outline-0"
          ariaHideApp={false}
        >
          <button
            onClick={onHideModal}
            className={cx(
              "absolute cursor-pointer z-10 top-4 bg-gray-200 hover:bg-gray-300 rounded-full  flex items-center justify-center transition-colors duration-200",
              {
                "w-8 h-8 right-4 ": !isMobile,
                "w-6 h-6 left-4 text-white": isMobile,
              },
            )}
          >
            <X size={16} className="text-gray-600" />
          </button>
          {isMobile ? (
            <MobileApp
              videos={videos}
              onVideoChange={handleVideoChange}
              currentVideoItem={currentVideoItem}
            />
          ) : (
            <DesktopApp
              videos={videos}
              onVideoChange={handleVideoChange}
              currentVideoItem={currentVideoItem}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default App;
