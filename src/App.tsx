import cx from "classnames";
import { X } from "lucide-react";
import { useCallback, useEffect, useState, type FC } from "react";
import Modal from "react-modal";
import { VideoSlider } from "./carousels";
import { VIDEOS, type IVideo } from "./data";
import { VideoPopup } from "./popup";
import { MainApp } from "./popupComponent/MainApp";
import { VideoStories } from "./stories";

const App: FC = () => {
  const [currentVideoItemId, setCurrentVideoItemId] = useState<
    number | undefined
  >();
  const [initVideoItemIndex, setInitVideoItemIndex] = useState<number>(-1);

  const handleVideoChange = useCallback((video: IVideo) => {
    setCurrentVideoItemId(video.id);
  }, []);

  const handleStoryClick = useCallback((id: number) => {
    const findIndex = VIDEOS.findIndex((video) => video.id === id);
    setInitVideoItemIndex(findIndex);
  }, []);

  const onHideModal = useCallback(() => {
    setCurrentVideoItemId(undefined);
    setInitVideoItemIndex(-1);
  }, []);

  const handleVideoPopupClick = useCallback(
    (id: number) => {
      const findIndex = VIDEOS.findIndex((video) => video.id === id);
      setInitVideoItemIndex(findIndex);
    },
    [setInitVideoItemIndex],
  );

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
      <VideoPopup onVideoClick={handleVideoPopupClick} video={VIDEOS[0]} />
      {(currentVideoItemId || initVideoItemIndex >= 0) && (
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
            initCurrentVideoIndex={initVideoItemIndex}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
