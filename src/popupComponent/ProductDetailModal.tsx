import { Pause, Play, ShoppingCart, Volume2, VolumeX, X } from "lucide-react";
import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  type FC,
} from "react";
import cx from "classnames";
import type { IProduct, IProductMediaType } from "../data";
import { Mousewheel, Pagination, Navigation, Virtual } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomNavigationButton } from "../stories/navigation";
import { ProductGalleryModal } from "./ProductGalleryModal";

interface IProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct;
  isMobile?: boolean;
}

export const ProductDetailModal: FC<IProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  isMobile,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setPlaying] = useState(true);
  const [isMuted, setMuted] = useState(true);
  const [mediaModalFiles, setMediaModalFiles] = useState<IProductMediaType[]>(
    [],
  );

  const handlePlayPauseClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      setPlaying(!isPlaying);
    },
    [isPlaying],
  );

  const handleMuteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      setMuted(!isMuted);
    },
    [isMuted],
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const onAddToCart = useCallback((): void => {}, []);

  const handleCloseClick = useCallback((): void => {
    onClose();
  }, [onClose]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>): void => {
      e.stopPropagation();
      const target = e.currentTarget;
      const scrollTop = target.scrollTop;

      if (scrollTop > 50 && !isFullScreen) {
        setIsFullScreen(true);
        console.log("Switching to full screen");
      } else if (scrollTop <= 20 && isFullScreen) {
        setIsFullScreen(false);
        console.log("Switching back to 90vh");
      }
    },
    [isFullScreen],
  );

  const handleSwiperInit = useCallback((swiper: SwiperType): void => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handlePrevClick = useCallback((): void => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNextClick = useCallback((): void => {
    swiperRef.current?.slideNext();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isOpen) {
      setIsFullScreen(false);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <>
      {!isFullScreen && (
        <div
          className="fixed inset-0 bg-[#000000c2] bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={handleOverlayClick}
        />
      )}
      <div
        className={cx(
          "fixed left-0 w-full z-100 flex items-end justify-center transition-all duration-300 ease-out",
          {
            "top-0 h-screen": isFullScreen,
            "bottom-0 h-[90vh] animation-slideInUp": !isFullScreen && isMobile,
            "bottom-0 h-[90%] animation-slideInUp": !isFullScreen && !isMobile,
          },
        )}
        onClick={handleOverlayClick}
      >
        <div
          className={cx(
            "bg-white w-full transition-all duration-300 ease-out",
            {
              "h-full rounded-none": isFullScreen,
              "h-full rounded-t-xl": !isFullScreen,
            },
            {
              "overflow-y-auto overflow-x-hidden": isMobile,
              "overflow-hidden": !isMobile,
            },
          )}
          ref={wrapperRef}
          onScroll={handleScroll}
          onWheel={handleScroll}
        >
          <div className="relative cursor-pointer">
            <CustomNavigationButton
              direction="prev"
              onClick={handlePrevClick}
              disabled={isBeginning}
              size="medium"
              iconSize={16}
            />
            <CustomNavigationButton
              direction="next"
              onClick={handleNextClick}
              disabled={isEnd}
              size="medium"
              iconSize={16}
            />
            <Swiper
              direction="horizontal"
              modules={[Navigation, Pagination, Mousewheel, Virtual]}
              slidesPerView={1}
              virtual
              pagination
              mousewheel={{ enabled: true }}
              onSwiper={handleSwiperInit}
              onSlideChange={handleSlideChange}
              onClick={() => setMediaModalFiles(product.mediaFiles)}
            >
              {product.mediaFiles.map((media, index) => (
                <SwiperSlide key={index}>
                  {media.type === "video" ? (
                    <>
                      <div className="absolute top-4 left-4 flex flex-row gap-2 z-40">
                        <button
                          onClick={handlePlayPauseClick}
                          className="control-button w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                          title={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? (
                            <Pause className="w-3 h-3 text-white" />
                          ) : (
                            <Play className="w-3 h-3 text-white ml-0.5" />
                          )}
                        </button>
                        <button
                          onClick={handleMuteClick}
                          className="w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                          title={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? (
                            <VolumeX className="w-3 h-3 text-white" />
                          ) : (
                            <Volume2 className="w-3 h-3 text-white" />
                          )}
                        </button>
                      </div>
                      <video
                        ref={videoRef}
                        src={media.url}
                        autoPlay
                        muted={isMuted}
                        loop
                        className={cx("w-full object-contain", {
                          "h-64": isMobile,
                          "h-72": !isMobile,
                        })}
                      />
                    </>
                  ) : (
                    <img
                      src={media.url}
                      alt=""
                      className={cx("w-full object-contain", {
                        "h-64": isMobile,
                        "h-72": !isMobile,
                      })}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              onClick={handleCloseClick}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl cursor-pointer pointer-events-auto z-10"
            >
              <X className="text-gray-400 w-5 h-5" />
            </button>

            {!isFullScreen && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>
            )}
          </div>

          <div
            className={cx("bg-white px-4 py-4 pb-24", {
              "max-h-[calc(100vh-550px)] overflow-y-auto": !isMobile,
            })}
          >
            <div className="mb-3">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-2xl font-bold text-orange-500">
                  ₫{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ₫{product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-orange-500 text-white px-1 py-0.5 rounded text-xs font-medium">
                    -{product.discount}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-lg font-medium text-gray-800 mb-3 leading-tight">
              {product.name}
            </h1>

            <div className="space-y-4 text-gray-600">
              <p>
                Discover the perfect blend of style and functionality with our
                featured product. Crafted with premium materials, this item is
                designed to elevate your everyday experience. Whether you're
                looking for durability, comfort, or a touch of elegance, this
                product delivers on all fronts.
              </p>
              <p>
                Its sleek design seamlessly fits into any setting, making it a
                versatile addition to your collection. Enjoy the benefits of
                advanced technology and thoughtful engineering, ensuring
                long-lasting performance and reliability.
              </p>
              <p>
                The product's intuitive features make it easy to use, while its
                robust construction guarantees it will stand the test of time.
                Ideal for both personal use and gifting, it's a choice that
                brings satisfaction to every customer.
              </p>
              <p>
                Our commitment to quality means you can shop with confidence,
                knowing that each detail has been carefully considered. From the
                smooth finish to the ergonomic design, every aspect is tailored
                to meet your needs.
              </p>
              <p>
                Experience the difference that superior craftsmanship makes, and
                see why this product is a favorite among our customers. Don't
                miss out on this opportunity to own a product that combines
                innovation with classic appeal.
              </p>
              <p>
                Order now and take the first step toward enhancing your
                lifestyle with a product you'll love to use every day. Join
                thousands of satisfied customers who have made this their go-to
                choice.
              </p>
              <p>
                Discover the perfect blend of style and functionality with our
                featured product. Crafted with premium materials, this item is
                designed to elevate your everyday experience. Whether you're
                looking for durability, comfort, or a touch of elegance, this
                product delivers on all fronts.
              </p>
              <p>
                Its sleek design seamlessly fits into any setting, making it a
                versatile addition to your collection. Enjoy the benefits of
                advanced technology and thoughtful engineering, ensuring
                long-lasting performance and reliability.
              </p>
              <p>
                The product's intuitive features make it easy to use, while its
                robust construction guarantees it will stand the test of time.
                Ideal for both personal use and gifting, it's a choice that
                brings satisfaction to every customer.
              </p>
              <p>
                Our commitment to quality means you can shop with confidence,
                knowing that each detail has been carefully considered. From the
                smooth finish to the ergonomic design, every aspect is tailored
                to meet your needs.
              </p>
              <p>
                Experience the difference that superior craftsmanship makes, and
                see why this product is a favorite among our customers. Don't
                miss out on this opportunity to own a product that combines
                innovation with classic appeal.
              </p>
              <p>
                Order now and take the first step toward enhancing your
                lifestyle with a product you'll love to use every day. Join
                thousands of satisfied customers who have made this their go-to
                choice.
              </p>
              <p>
                Discover the perfect blend of style and functionality with our
                featured product. Crafted with premium materials, this item is
                designed to elevate your everyday experience. Whether you're
                looking for durability, comfort, or a touch of elegance, this
                product delivers on all fronts.
              </p>
              <p>
                Its sleek design seamlessly fits into any setting, making it a
                versatile addition to your collection. Enjoy the benefits of
                advanced technology and thoughtful engineering, ensuring
                long-lasting performance and reliability.
              </p>
              <p>
                The product's intuitive features make it easy to use, while its
                robust construction guarantees it will stand the test of time.
                Ideal for both personal use and gifting, it's a choice that
                brings satisfaction to every customer.
              </p>
              <p>
                Our commitment to quality means you can shop with confidence,
                knowing that each detail has been carefully considered. From the
                smooth finish to the ergonomic design, every aspect is tailored
                to meet your needs.
              </p>
              <p>
                Experience the difference that superior craftsmanship makes, and
                see why this product is a favorite among our customers. Don't
                miss out on this opportunity to own a product that combines
                innovation with classic appeal.
              </p>
              <p>
                Order now and take the first step toward enhancing your
                lifestyle with a product you'll love to use every day. Join
                thousands of satisfied customers who have made this their go-to
                choice.
              </p>
            </div>
          </div>

          <div className="fixed bottom-4 left-4 right-4 mx-auto max-w-sm">
            <div className="bg-orange-500 rounded-lg p-3 shadow-lg">
              <button
                className="flex m-auto justify-center items-center text-center gap-2 text-white cursor-pointer"
                onClick={onAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-md font-medium">Thêm vào Giỏ hàng</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductGalleryModal
        isOpen={!!mediaModalFiles.length}
        onClose={() => setMediaModalFiles([])}
        mediaFiles={mediaModalFiles}
      />
    </>
  );
};
