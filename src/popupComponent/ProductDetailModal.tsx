import { Pause, Play, ShoppingCart, Volume2, VolumeX, X, Minus, Plus } from "lucide-react";
import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  type FC,
  type ChangeEvent,
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
  width: number;
}

// Mock variant data - you can replace this with actual data from your product
const PRODUCT_VARIANTS = {
  colors: [
    { id: 'red', name: 'Đỏ', value: '#ef4444' },
    { id: 'blue', name: 'Xanh dương', value: '#3b82f6' },
    { id: 'green', name: 'Xanh lá', value: '#10b981' },
    { id: 'black', name: 'Đen', value: '#000000' },
  ],
  sizes: [
    { id: 'xs', name: 'XS' },
    { id: 's', name: 'S' },
    { id: 'm', name: 'M' },
    { id: 'l', name: 'L' },
    { id: 'xl', name: 'XL' },
  ]
};

export const ProductDetailModal: FC<IProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  width,
}) => {
  const localPlayState = localStorage.getItem("drv-video-state");
  const localSoundState = localStorage.getItem("drv-video-sound");

  const swiperRef = useRef<SwiperType>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setPlaying] = useState(
    localPlayState ? JSON.parse(localPlayState).playing : true,
  );
  const [isMuted, setMuted] = useState(
    localSoundState ? JSON.parse(localSoundState).isMuted : true,
  );
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [mediaModalFiles, setMediaModalFiles] = useState<IProductMediaType[]>(
    [],
  );

  // New state for variants and quantity
  const [selectedColor, setSelectedColor] = useState(PRODUCT_VARIANTS.colors[0].id);
  const [selectedSize, setSelectedSize] = useState(PRODUCT_VARIANTS.sizes[2].id); // Default to M
  const [quantity, setQuantity] = useState(1);

  const handlePlayPauseClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      setPlaying(!isPlaying);
      localStorage.setItem(
        "drv-video-state",
        JSON.stringify({ playing: !isPlaying }),
      );
    },
    [isPlaying],
  );

  const handleMuteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      setMuted(!isMuted);
      localStorage.setItem(
        "drv-video-sound",
        JSON.stringify({ isMuted: !isMuted }),
      );
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

  const onAddToCart = useCallback((): void => {
    console.log('Add to cart:', {
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
  }, [product.id, selectedColor, selectedSize, quantity]);

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
      } else if (scrollTop <= 20 && isFullScreen) {
        setIsFullScreen(false);
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
    setPlaying(isPlaying);
  }, [isPlaying]);

  const handleNextClick = useCallback((): void => {
    swiperRef.current?.slideNext();
    setPlaying(false);
  }, []);

  const handleSlideClick = useCallback(
    (index: number) => () => {
      setMediaModalFiles(product.mediaFiles);
      setCurrentFileIndex(index);
      setPlaying(false);
    },
    [product.mediaFiles],
  );

  // Quantity handlers
  const decreaseQuantity = useCallback((): void => {
    setQuantity((current) => Math.max(1, current - 1));
  }, []);

  const increaseQuantity = useCallback((): void => {
    setQuantity((current) => Math.min(999, current + 1));
  }, []);

  const handleQuantityChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = parseInt(e.target.value) || 1;
      if (value >= 1 && value <= 999) {
        setQuantity(value);
      }
    },
    [],
  );

  // Color selection handler
  const handleColorSelect = useCallback((colorId: string): void => {
    setSelectedColor(colorId);
  }, []);

  // Size selection handler
  const handleSizeSelect = useCallback((sizeId: string): void => {
    setSelectedSize(sizeId);
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
      <div
        className="fixed inset-0 bg-[#000000c2] bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={handleOverlayClick}
      />
      <div
        className={cx(
          "fixed h-full m-auto top-0 animate-slideInUp left-0 w-full z-100 flex items-end justify-center transition-all",
        )}
        onClick={handleOverlayClick}
      >
        <div
          className="bg-white h-full overflow-hidden w-full transition-all duration-300 ease-out"
          onScroll={handleScroll}
          onWheel={handleScroll}
          style={{ width }}
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
            >
              {product.mediaFiles.map((media, index) => (
                <SwiperSlide key={index} onClick={handleSlideClick(index)}>
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
                        autoPlay={isPlaying}
                        muted={isMuted}
                        loop
                        className={cx("w-full object-contain h-72 md:h-64")}
                      />
                    </>
                  ) : (
                    <img
                      src={media.url}
                      alt=""
                      className={cx("w-full object-contain h-72 md:h-64")}
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
            className={cx(
              "bg-white px-4 py-4 pb-24 max-h-[calc(100%-270px)] overflow-y-auto",
            )}
          >
            {/* 1. Title */}
            <h1 className="text-lg font-medium text-gray-800 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* 2. Price */}
            <div className="mb-4">
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

            {/* 3. Variants Picker */}
            <div className="mb-6 space-y-4">
              {/* Color Picker */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Màu sắc: <span className="text-gray-900">{PRODUCT_VARIANTS.colors.find(c => c.id === selectedColor)?.name}</span>
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {PRODUCT_VARIANTS.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelect(color.id)}
                      className={cx(
                        "w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110",
                        {
                          "border-gray-800 shadow-md": selectedColor === color.id,
                          "border-gray-300": selectedColor !== color.id,
                        }
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Picker */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Kích thước: <span className="text-gray-900">{PRODUCT_VARIANTS.sizes.find(s => s.id === selectedSize)?.name}</span>
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {PRODUCT_VARIANTS.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => handleSizeSelect(size.id)}
                      className={cx(
                        "px-3 py-2 border rounded-md text-sm font-medium transition-all duration-200",
                        {
                          "border-orange-500 bg-orange-50 text-orange-700": selectedSize === size.id,
                          "border-gray-300 bg-white text-gray-700 hover:border-gray-400": selectedSize !== size.id,
                        }
                      )}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Số lượng</h3>
              <div className="flex w-fit items-center rounded-lg bg-gray-50 border border-gray-200 shadow-sm">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className={cx(
                    "w-10 h-10 flex items-center justify-center transition-all duration-200 cursor-pointer rounded-l-lg",
                    {
                      "text-gray-400 cursor-not-allowed": quantity <= 1,
                      "text-gray-600 hover:bg-orange-50 hover:text-orange-500 active:bg-orange-100":
                        quantity > 1,
                    },
                  )}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center border-x border-gray-200">
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max="999"
                    className="w-16 h-10 text-center font-medium text-gray-800 text-lg bg-transparent border-none outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= 999}
                  className={cx(
                    "w-10 h-10 flex items-center justify-center transition-all duration-200 cursor-pointer rounded-r-lg",
                    {
                      "text-gray-400 cursor-not-allowed": quantity >= 999,
                      "text-gray-600 hover:bg-orange-50 hover:text-orange-500 active:bg-orange-100":
                        quantity < 999,
                    },
                  )}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 5. Description */}
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
        currentFileIndex={currentFileIndex}
        isOpen={!!mediaModalFiles.length}
        onClose={() => setMediaModalFiles([])}
        mediaFiles={mediaModalFiles}
      />
    </>
  );
};