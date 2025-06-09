import {
  Pause,
  Play,
  ShoppingCart,
  Volume2,
  VolumeX,
  X,
  Minus,
  Plus,
} from "lucide-react";
import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  type FC,
  type ChangeEvent,
} from "react";
import cx from "classnames";
import type { IProduct, IProductMediaType, IProductVariant } from "../data";
import { Mousewheel, Pagination, Navigation, Virtual } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomNavigationButton } from "../stories/navigation";
import { ProductGalleryModal } from "./ProductGalleryModal";

interface IProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleOpenCartModal: () => void;
  product: IProduct;
  width: number;
}

export const ProductDetailModal: FC<IProductDetailModalProps> = ({
  isOpen,
  handleOpenCartModal,
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

  // State cho variant selection và quantity
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, IProductVariant>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [isVariantDropdownOpen, setIsVariantDropdownOpen] = useState<
    Record<string, boolean>
  >({});
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cartIconAnimation, setCartIconAnimation] = useState("");
  const [variantErrors, setVariantErrors] = useState<Record<string, boolean>>(
    {},
  );

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
    // Validate variants - check if product has variants and user has selected all required ones
    if (product.optionValues && product.optionValues.length > 0) {
      const variantGroups = product.optionValues.reduce(
        (groups, option) => {
          if (!groups[option.name]) {
            groups[option.name] = [];
          }
          groups[option.name].push(option);
          return groups;
        },
        {} as Record<string, typeof product.optionValues>,
      );

      const missingVariants: Record<string, boolean> = {};
      let hasErrors = false;

      Object.keys(variantGroups).forEach((optionName) => {
        if (!selectedVariants[optionName]) {
          missingVariants[optionName] = true;
          hasErrors = true;
        }
      });

      if (hasErrors) {
        setVariantErrors(missingVariants);
        // Auto-clear errors after 3 seconds
        setTimeout(() => {
          setVariantErrors({});
        }, 3000);
        return;
      }
    }

    // Clear any existing errors
    setVariantErrors({});

    console.log("Add to cart:", {
      productId: product.id,
      selectedVariants: selectedVariants,
      quantity,
    });

    // Trigger animation
    setIsAnimating(true);

    // Update cart count and trigger cart icon animation
    setTimeout(() => {
      setCartItemsCount((prev) => prev + quantity);
      setCartIconAnimation("animate-cart-pulse");
      setIsAnimating(false);
    }, 800);

    // Remove cart icon animation
    setTimeout(() => {
      setCartIconAnimation("");
    }, 1400);
  }, [product, selectedVariants, quantity]);

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

  // Handlers cho quantity
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

  // Handler cho variant selection
  const handleVariantSelect = useCallback(
    (optionName: string, variantId: string): void => {
      const selectedOption = product.optionValues?.find(
        (option) => option.variant.id === variantId,
      );
      if (selectedOption) {
        setSelectedVariants((prev) => ({
          ...prev,
          [optionName]: selectedOption.variant,
        }));
        setIsVariantDropdownOpen((prev) => ({ ...prev, [optionName]: false }));

        // Clear error for this option when user selects a variant
        setVariantErrors((prev) => ({
          ...prev,
          [optionName]: false,
        }));
      }
    },
    [product.optionValues],
  );

  const toggleVariantDropdown = useCallback((optionName: string) => {
    setIsVariantDropdownOpen((prev) => ({
      ...prev,
      [optionName]: !prev[optionName],
    }));
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
      // Reset selections khi mở modal
      setSelectedVariants({});
      setQuantity(1);
      setIsVariantDropdownOpen({});
      setVariantErrors({});
      // Không reset cart count khi mở modal
    }
  }, [isOpen, product.optionValues]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const hasOpenDropdown = Object.values(isVariantDropdownOpen).some(
        (isOpen) => isOpen,
      );
      if (hasOpenDropdown && !target.closest(".variant-dropdown")) {
        setIsVariantDropdownOpen({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVariantDropdownOpen]);

  if (!isOpen || !product) return null;

  return (
    <>
      <div
        className={cx(
          "fixed h-full m-auto top-0 z-100 animate-slideInUp left-0 w-full flex items-end justify-center transition-all",
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
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-2xl font-bold text-orange-500">
                  ₫{Object.values(selectedVariants)[0]?.price || product.price}
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
            {product.optionValues && product.optionValues.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Tùy chọn sản phẩm
                </h3>

                {/* Group variants by name */}
                {Object.entries(
                  product.optionValues.reduce(
                    (groups, option) => {
                      if (!groups[option.name]) {
                        groups[option.name] = [];
                      }
                      groups[option.name].push(option);
                      return groups;
                    },
                    {} as Record<string, typeof product.optionValues>,
                  ),
                ).map(([optionName, options]) => {
                  // Find current selected variant for this option group
                  const currentVariantForGroup = selectedVariants[optionName];

                  return (
                    <div key={optionName} className="mb-4 last:mb-0">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        {optionName === "Storage"
                          ? "Dung lượng"
                          : optionName === "Color"
                            ? "Màu sắc"
                            : optionName === "Size"
                              ? "Kích thước"
                              : optionName === "Flavor"
                                ? "Hương vị"
                                : optionName === "Model"
                                  ? "Phiên bản"
                                  : optionName === "Type"
                                    ? "Loại"
                                    : optionName}
                      </label>

                      <div className="relative variant-dropdown">
                        {/* Custom Select Button */}
                        <button
                          type="button"
                          onClick={() => toggleVariantDropdown(optionName)}
                          className={cx(
                            "w-full p-3 border rounded-lg bg-white hover:border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200 text-left flex items-center justify-between",
                            {
                              "border-red-500 ring-2 ring-red-200":
                                variantErrors[optionName],
                              "border-gray-300": !variantErrors[optionName],
                            },
                          )}
                        >
                          <div className="flex items-center flex-1">
                            {currentVariantForGroup ? (
                              <>
                                <div className="w-8 h-8 mr-3 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                  <img
                                    src={currentVariantForGroup.image}
                                    alt={currentVariantForGroup.displayName}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="flex-1">
                                  <span className="text-gray-900 font-medium text-sm">
                                    {currentVariantForGroup.displayName}
                                  </span>
                                  <span className="text-orange-600 font-semibold text-sm ml-2">
                                    ₫{currentVariantForGroup.price}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <span
                                className={cx("text-gray-500", {
                                  "text-red-500": variantErrors[optionName],
                                })}
                              >
                                Chọn {optionName}
                              </span>
                            )}
                          </div>

                          {/* Dropdown Arrow */}
                          <svg
                            className={cx(
                              "w-5 h-5 transition-transform duration-200",
                              {
                                "rotate-180": isVariantDropdownOpen[optionName],
                                "text-red-400": variantErrors[optionName],
                                "text-gray-400": !variantErrors[optionName],
                              },
                            )}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {/* Error Message */}
                        {variantErrors[optionName] && (
                          <div className="mt-1 text-red-500 text-xs flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Vui lòng chọn {optionName}
                          </div>
                        )}

                        {/* Dropdown Options */}
                        {isVariantDropdownOpen[optionName] && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                            {options.map((option) => (
                              <button
                                key={option.variant.id}
                                type="button"
                                onClick={() =>
                                  handleVariantSelect(
                                    optionName,
                                    option.variant.id,
                                  )
                                }
                                className={cx(
                                  "w-full p-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center border-b border-gray-100 last:border-b-0",
                                  {
                                    "bg-orange-50 text-orange-700":
                                      selectedVariants[optionName]?.id ===
                                      option.variant.id,
                                  },
                                )}
                              >
                                <div className="w-10 h-10 mr-3 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                  <img
                                    src={option.variant.image}
                                    alt={option.variant.displayName}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900 text-sm">
                                    {option.variant.displayName}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-orange-600 font-semibold text-sm">
                                      ₫{option.variant.price}
                                    </span>
                                    {option.variant.compareAtPrice && (
                                      <span className="text-gray-400 line-through text-xs">
                                        ₫{option.variant.compareAtPrice}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Selected indicator */}
                                {selectedVariants[optionName]?.id ===
                                  option.variant.id && (
                                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center ml-2">
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 4. Quantity */}
            <div className="mb-6" id="quantity-section">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Số lượng
              </h3>
              <div className="flex w-fit items-center rounded-lg bg-gray-50 border border-gray-200 shadow-sm relative">
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
                    id="quantity-input"
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

                {/* Animation Number - starts from quantity input */}
                {isAnimating && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
                    <div className="animate-bounce-to-cart bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      +{quantity}
                    </div>
                  </div>
                )}
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
            <div className="bg-orange-500 rounded-lg p-3 shadow-lg relative">
              <div className="flex items-center justify-between gap-3">
                {/* Cart Icon Button */}
                <button
                  onClick={handleOpenCartModal}
                  className={cx(
                    "w-12 h-12 bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer relative flex-shrink-0",
                    cartIconAnimation,
                  )}
                  title={`Giỏ hàng (${cartItemsCount})`}
                  id="cart-icon-button"
                >
                  <ShoppingCart className="text-white w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-white text-xs font-bold">
                        {cartItemsCount > 99 ? "99+" : cartItemsCount}
                      </span>
                    </div>
                  )}
                </button>

                {/* Add to Cart Button */}
                <button
                  className="flex-1 flex items-center justify-center gap-2 text-white cursor-pointer relative py-2"
                  onClick={onAddToCart}
                  id="add-to-cart-btn"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-md font-medium">Thêm vào Giỏ hàng</span>
                </button>
              </div>
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
