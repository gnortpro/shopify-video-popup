import React, { useState, useEffect, useCallback, type FC } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import cx from "classnames";
import { MainApp } from "./popupComponent/MainApp";
import { VideoStories } from "./stories";
import { VideoSlider } from "./carousels";
import { VideoPopup } from "./popup";
import { VIDEOS, type IVideo } from "./data";

const App: FC = () => {
  const [currentVideoItem, setCurrentVideoItem] = useState<
    IVideo | undefined
  >();

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
          <button
            onClick={handleCloseModal}
            className={cx(
              "absolute w-10 h-10 right-4 text-white cursor-pointer z-10 top-4 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200",
            )}
          >
            <X className="text-gray-600 w-5 h-5" />
          </button>

          <MainApp
            videos={VIDEOS}
            onVideoChange={handleVideoChange}
            currentVideoItem={currentVideoItem}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
