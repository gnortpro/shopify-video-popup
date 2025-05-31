import React, { useState, useEffect, useCallback, type FC } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import cx from "classnames";
import { MobileApp } from "./popupComponent/MobileApp";
import { DesktopApp } from "./popupComponent/DesktopApp";
import { VideoStories } from "./stories";
import { VideoSlider } from "./carousels";
import { VideoPopup } from "./popup";
import { VIDEOS, type IVideo } from "./data";

const App: FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [currentVideoItem, setCurrentVideoItem] = useState<
    IVideo | undefined
  >();

  const handleResize = useCallback((): void => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleVideoChange = useCallback((video: IVideo) => {
    setCurrentVideoItem(video);
  }, []);

  const handleStoryClick = useCallback((id: number) => {
    setCurrentVideoItem(
      VIDEOS.find((video) => video.id === Number(id)) || VIDEOS[0],
    );
  }, []);

  const onHideModal = useCallback(() => {
    setCurrentVideoItem(undefined);
  }, []);

  const handleVideoPopupClick = useCallback(() => {
    handleStoryClick(1);
  }, [handleStoryClick]);

  const handleCloseModal = useCallback(() => {
    onHideModal();
  }, [onHideModal]);

  return (
    <div className="">
      <div className="bg-white overflow-hidden mb-8">
        <VideoStories stories={VIDEOS} onStoryClick={handleStoryClick} />
      </div>
      <div className="bg-white overflow-hidden mb-8">
        <VideoSlider onSlideClick={handleStoryClick} />
      </div>
      <VideoPopup onVideoClick={handleVideoPopupClick} />
      {currentVideoItem && (
        <Modal
          isOpen
          onRequestClose={onHideModal}
          shouldCloseOnOverlayClick={false}
          overlayClassName="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          className="block outline-0"
          ariaHideApp={false}
        >
          {!isMobile && (
            <button
              onClick={handleCloseModal}
              className={cx(
                "absolute cursor-pointer z-10 top-4 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200",
                {
                  "w-8 h-8 right-4": !isMobile,
                  "w-6 h-6 left-4 text-white": isMobile,
                },
              )}
            >
              <X size={16} className="text-gray-600" />
            </button>
          )}

          {isMobile ? (
            <MobileApp
              onHideModal={onHideModal}
              videos={VIDEOS}
              onVideoChange={handleVideoChange}
              currentVideoItem={currentVideoItem}
            />
          ) : (
            <DesktopApp
              videos={VIDEOS}
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
