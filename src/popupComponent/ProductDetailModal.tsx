import {
  Pause,
  Play,
  ShoppingCart,
  Volume2,
  VolumeX,
  X,
  Minus,
  Plus,
  AlertCircle,
  Loader2,
} from "lucide-react";
import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  type FC,
  type ChangeEvent,
  useMemo,
} from "react";
import cx from "classnames";
import type { IProduct, IProductMediaType, ShopifyOptionValue } from "../data";
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
  const [showErrorBanner, setShowErrorBanner] = useState(true);
  const [errorMessage, setErrorMessage] = useState("This process has error");

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, ShopifyOptionValue>
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
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

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
    if (isAddingToCart) return;

    if (product.optionWithValues && product.optionWithValues.length > 0) {
      const missingVariants: Record<string, boolean> = {};
      let hasErrors = false;

      product.optionWithValues.forEach((option) => {
        if (!selectedVariants[option.name]) {
          missingVariants[option.name] = true;
          hasErrors = true;
        }
      });

      if (hasErrors) {
        setVariantErrors(missingVariants);
        setTimeout(() => {
          setVariantErrors({});
        }, 3000);
        return;
      }
    }

    setVariantErrors({});

    console.log("Add to cart:", {
      productId: product.id,
      selectedVariants: selectedVariants,
      quantity,
    });

    setIsAddingToCart(true);

    setIsAnimating(true);

    setTimeout(() => {
      setCartItemsCount((prev) => prev + quantity);
      setCartIconAnimation("animate-cart-pulse");
      setIsAnimating(false);
      setIsAddingToCart(false);
    }, 800);

    setTimeout(() => {
      setCartIconAnimation("");
    }, 1400);
  }, [product, selectedVariants, quantity, isAddingToCart]);

  const handleCloseClick = useCallback((): void => {
    onClose();
  }, [onClose]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>): void => {
      e.stopPropagation();
      const target = e.currentTarget;
      const scrollTop = target.scrollTop;

      if (window.innerWidth >= 768) {
        if (scrollTop > 50 && !isFullScreen) {
          setIsFullScreen(true);
        } else if (scrollTop <= 20 && isFullScreen) {
          setIsFullScreen(false);
        }
      } else {
        if (scrollTop > 100 && !isMobileExpanded) {
          setIsMobileExpanded(true);
        }
      }
    },
    [isFullScreen, isMobileExpanded],
  );

  const handleContentScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>): void => {
      if (window.innerWidth < 768) {
        const target = e.currentTarget;
        const scrollTop = target.scrollTop;

        if (scrollTop > 50 && !isMobileExpanded) {
          setIsMobileExpanded(true);
        } else if (scrollTop <= 20 && isMobileExpanded) {
          setIsMobileExpanded(false);
        }
      }
    },
    [isMobileExpanded],
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

  const handleVariantSelect = useCallback(
    (optionName: string, optionValue: ShopifyOptionValue): void => {
      setSelectedVariants((prev) => ({
        ...prev,
        [optionName]: optionValue,
      }));
      setIsVariantDropdownOpen((prev) => ({ ...prev, [optionName]: false }));

      setVariantErrors((prev) => ({
        ...prev,
        [optionName]: false,
      }));
    },
    [],
  );

  const toggleVariantDropdown = useCallback((optionName: string) => {
    setIsVariantDropdownOpen((prev) => {
      const newState = Object.keys(prev).reduce(
        (acc, key) => {
          acc[key] = false;
          return acc;
        },
        {} as Record<string, boolean>,
      );

      newState[optionName] = !prev[optionName];
      return newState;
    });
  }, []);

  const getCurrentPrice = useCallback((): string => {
    const selectedVariantValues = Object.values(selectedVariants);
    if (selectedVariantValues.length > 0) {
      return selectedVariantValues[0].price.replace("đ", "");
    }
    return product.price;
  }, [selectedVariants, product.price]);

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
      setSelectedVariants({});
      setQuantity(1);
      setIsVariantDropdownOpen({});
      setVariantErrors({});
    }
  }, [isOpen, product.optionWithValues]);

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

  const isAddToCartDisabled = useMemo(() => {
    if (isAddingToCart) return true;
    return false;
  }, [isAddingToCart]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsFullScreen(false);
      setIsMobileExpanded(false);
      setSelectedVariants({});
      setQuantity(1);
      setIsVariantDropdownOpen({});
      setVariantErrors({});
    }
  }, [isOpen, product.id]);

  if (!isOpen || !product) return null;

  return (
    <>
      <div
        className={cx(
          "fixed inset-0 bg-[#000000c2] transition-all duration-500 z-[99]",
          isMobileExpanded ? "bg-opacity-80" : "bg-opacity-40 md:bg-opacity-80",
        )}
        onClick={handleOverlayClick}
      />
      <div
        className={cx(
          "fixed md:h-full m-auto bottom-0 md:top-0 z-100 animate-slideInUp left-0 w-full flex items-end justify-center transition-all",
          isMobileExpanded ? "h-full" : "h-[70vh]",
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

            {!isFullScreen && !isMobileExpanded && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>
            )}
          </div>

          <div
            className={cx(
              "mobile-scroll-hidden md:scrollbar-auto",
              "bg-white px-4 py-4 overflow-y-auto",
              isMobileExpanded ? "pb-24" : "pb-32",
              "md:max-h-[calc(100%-270px)] md:pb-24",
              isMobileExpanded
                ? "max-h-[calc(100%-300px)]"
                : "max-h-[calc(70vh-200px)]",
            )}
            onScroll={handleContentScroll}
          >
            <h1 className="text-lg font-medium text-gray-800 mb-3 leading-tight">
              {product.name}
            </h1>

            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-2xl font-bold text-orange-500">
                  ₫{getCurrentPrice()}
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

            {product.optionWithValues &&
              product.optionWithValues.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Tùy chọn sản phẩm
                  </h3>

                  {product.optionWithValues.map((option) => {
                    const currentVariantForOption =
                      selectedVariants[option.name];

                    return (
                      <div key={option.name} className="mb-4 last:mb-0">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          {option.name}
                        </label>

                        <div className="relative variant-dropdown">
                          <button
                            type="button"
                            onClick={() => toggleVariantDropdown(option.name)}
                            className={cx(
                              "w-full p-3 border rounded-lg bg-white hover:border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200 text-left flex items-center justify-between",
                              {
                                "border-red-500 ring-2 ring-red-200":
                                  variantErrors[option.name],
                                "border-gray-300": !variantErrors[option.name],
                              },
                            )}
                          >
                            <div className="flex items-center flex-1">
                              {currentVariantForOption && (
                                <>
                                  <div className="w-8 h-8 mr-3 rounded overflow-hidden flex-shrink-0 relative">
                                    {currentVariantForOption.image && (
                                      <img
                                        src={currentVariantForOption.image}
                                        alt={currentVariantForOption.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                      />
                                    )}
                                    {currentVariantForOption.color && (
                                      <div
                                        className="absolute bottom-0 right-0 w-full h-full border-2 border-white rounded"
                                        style={{
                                          backgroundColor:
                                            currentVariantForOption.color,
                                        }}
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <span className="text-gray-900 font-medium text-sm">
                                      {currentVariantForOption.name}
                                    </span>
                                    <span className="text-orange-600 font-semibold text-sm ml-2">
                                      {currentVariantForOption.price}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>

                            <svg
                              className={cx(
                                "w-5 h-5 transition-transform duration-200",
                                {
                                  "rotate-180":
                                    isVariantDropdownOpen[option.name],
                                  "text-red-400": variantErrors[option.name],
                                  "text-gray-400": !variantErrors[option.name],
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

                          {variantErrors[option.name] && (
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
                              Vui lòng chọn {option.name}
                            </div>
                          )}

                          {isVariantDropdownOpen[option.name] && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                              {option.values.map((value) => (
                                <button
                                  key={value.id}
                                  type="button"
                                  onClick={() =>
                                    handleVariantSelect(option.name, value)
                                  }
                                  disabled={!value.available}
                                  className={cx(
                                    "w-full p-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center border-b border-gray-100 last:border-b-0",
                                    {
                                      "bg-orange-50 text-orange-700":
                                        selectedVariants[option.name]?.id ===
                                        value.id,
                                      "opacity-50 cursor-not-allowed":
                                        !value.available,
                                    },
                                  )}
                                >
                                  <div className="w-10 h-10 mr-3 bg-gray-100 rounded overflow-hidden flex-shrink-0 relative">
                                    {value.image && (
                                      <img
                                        src={value.image}
                                        alt={value.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                      />
                                    )}
                                    {value.color && (
                                      <div
                                        className="w-full h-full"
                                        style={{
                                          backgroundColor: value.color,
                                        }}
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900 text-sm flex items-center gap-2">
                                      {value.name}
                                      {!value.available && (
                                        <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
                                          Hết hàng
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-orange-600 font-semibold text-sm">
                                        {value.price}
                                      </span>
                                    </div>
                                  </div>

                                  {selectedVariants[option.name]?.id ===
                                    value.id && (
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

            {showErrorBanner && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-red-700 text-sm font-medium">
                      {errorMessage}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowErrorBanner(false);
                      setErrorMessage("");
                    }}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

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

                {isAnimating && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
                    <div className="animate-bounce-to-cart bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      +{quantity}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {product.description && (
              <div className="space-y-4 text-gray-600">
                {product.description}
              </div>
            )}
          </div>

          <div
            className={cx(
              "fixed bottom-4 left-4 right-4 mx-auto max-w-sm transition-all duration-300",
              isMobileExpanded ? "" : "md:bottom-4 bottom-6",
            )}
          >
            <div className="rounded-lg bg-white p-3 shadow-lg relative">
              <div className="flex items-center justify-between gap-3">
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

                <button
                  className={cx(
                    "flex-1 h-12 rounded-lg flex items-center justify-center gap-2 text-white cursor-pointer relative py-2 transition-all duration-200 hover:bg-orange-700",
                    {
                      "opacity-50 cursor-not-allowed": isAddToCartDisabled,
                      "bg-orange-500": !isAddToCartDisabled,
                      "bg-gray-400": isAddToCartDisabled,
                    },
                  )}
                  onClick={onAddToCart}
                  disabled={isAddToCartDisabled}
                  id="add-to-cart-btn"
                >
                  {isAddingToCart && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
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
