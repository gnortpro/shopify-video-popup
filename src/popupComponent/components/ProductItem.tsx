import { ShoppingBag } from "lucide-react";
import React, { useCallback } from "react";
import type { Product } from "../data/videoData";

interface ProductItemProps {
  product: Product;
  isMobile?: boolean;
  onBuyNow?: (productId: number) => void;
  onOpenProductDetailModal: () => void;
}

export const ProductItem: React.FC<ProductItemProps> = React.memo(
  ({ onOpenProductDetailModal, product, isMobile = false, onBuyNow }) => {
    const handleProductBuyClick = useCallback((): void => {
      onBuyNow?.(product.id);
    }, [product.id, onBuyNow]);

    const openProductDetailModal = useCallback((): void => {
      onOpenProductDetailModal();
    }, [onOpenProductDetailModal]);

    return (
      <div
        className={`bg-white w-full border border-gray-100 rounded-lg p-3 mb-3 shadow-sm hover:bg-gray-50 transition-colors pointer-events-auto ${
          !isMobile ? "bg-gray-50 p-4 mb-4" : ""
        }`}
      >
        <div className="flex gap-3">
          <div className="relative flex-shrink-0 m-auto">
            <div
              className={`bg-gray-200 rounded-lg flex items-center justify-center ${
                isMobile ? "w-16 h-16" : "w-16 h-16"
              }`}
            >
              <ShoppingBag
                className={`text-gray-400 ${isMobile ? "w-4 h-4" : "w-6 h-6"}`}
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
                isMobile ? "text-sm leading-tight" : "text-base"
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
              <button
                onClick={handleProductBuyClick}
                className={`bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer ${
                  isMobile ? "px-4 py-2 text-sm w-full mt-1" : "px-6 py-2"
                }`}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
