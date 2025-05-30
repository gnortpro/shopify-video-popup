import React, { useCallback, useState, type ChangeEvent } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "../data/videoData";

interface CartItemProps {
  product: Product;
  isMobile?: boolean;
  onOpenProductDetailModal: () => void;
  onBuyNow?: (productId: number) => void;
}

export const CartItem: React.FC<CartItemProps> = React.memo(
  ({ product, isMobile = false, onBuyNow, onOpenProductDetailModal }) => {
    const [quantity, setQuantity] = useState(0);
    const handleProductBuyClick = useCallback((): void => {
      onBuyNow?.(product.id);
    }, [product.id, onBuyNow]);

    const decreaseQuantity = useCallback((): void => {
      setQuantity((current) => current - 1);
    }, []);

    const increaseQuantity = useCallback((): void => {
      setQuantity((current) => current + 1);
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

    const openProductDetailModal = useCallback((): void => {
      onOpenProductDetailModal();
    }, [onOpenProductDetailModal]);

    return (
      <div
        className={`bg-white w-full border border-gray-100 rounded-lg p-3 mb-3 shadow-sm hover:bg-gray-50 transition-colors ${
          !isMobile ? "bg-gray-50 p-4 mb-4" : ""
        }`}
      >
        <div className="flex gap-3">
          <div className="relative flex-shrink-0 m-auto">
            <div
              className={`bg-gray-200 rounded-lg flex items-center justify-center ${
                isMobile ? "w-20 h-20" : "w-24 h-24"
              }`}
            >
              <ShoppingBag
                className={`text-gray-400 ${isMobile ? "w-8 h-8" : "w-10 h-10"}`}
              />
            </div>
            {product.favorite && (
              <div
                className={`absolute bg-red-500 text-white text-xs px-1 rounded ${
                  isMobile ? "-top-1 -left-1" : "-top-2 -left-2 px-2 py-1"
                }`}
              >
                Yêu thích
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4
              onClick={openProductDetailModal}
              className={`font-medium text-gray-900 mb-2 cursor-pointer ${
                isMobile ? "text-sm leading-tight" : "text-base mb-3"
              }`}
            >
              <span className="line-clamp-2">{product.name}</span>
            </h4>
            <div
              className={`flex items-center justify-between ${isMobile ? "flex-col items-start gap-2" : ""}`}
            >
              <div
                className={`flex items-center gap-2 flex-wrap ${
                  !isMobile ? "gap-3" : ""
                }`}
              >
                <span
                  className={`font-bold text-red-600 whitespace-nowrap ${
                    isMobile ? "text-lg" : "text-xl"
                  }`}
                >
                  ₫{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through whitespace-nowrap">
                    {isMobile
                      ? product.originalPrice
                      : `₫${product.originalPrice}`}
                  </span>
                )}
                {product.discount && (
                  <span className="text-sm text-red-600 font-medium whitespace-nowrap">
                    -{product.discount}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="flex w-fit items-center rounded-lg bg-gray-50 border border-gray-200 shadow-sm">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className={`w-8 h-8 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    quantity <= 1
                      ? " text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-500 active:bg-orange-100"
                  }`}
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
                    className="w-12 h-8 text-center font-medium text-gray-800 text-md bg-transparent border-none outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>

                <button
                  onClick={increaseQuantity}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-500 active:bg-orange-100 transition-all duration-200 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleProductBuyClick}
                className="bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer w-fit px-6 py-2"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
