import React, { useCallback } from "react";
import { ShoppingBag } from "lucide-react";
import type { Product } from "../data/videoData";

interface ProductItemProps {
  product: Product;
  isMobile?: boolean;
  onBuyNow?: (productId: number) => void;
}

export const ProductItem: React.FC<ProductItemProps> = React.memo(
  ({ product, isMobile = false, onBuyNow }) => {
    const handleProductBuyClick = useCallback((): void => {
      onBuyNow?.(product.id);
    }, [product.id, onBuyNow]);

    const getTagClassName = useCallback((tag: string): string => {
      if (tag.includes("Giảm") || tag.includes("%")) {
        return "bg-red-100 text-red-600";
      } else if (tag === "COD") {
        return "bg-green-100 text-green-600";
      } else if (tag === "Rẻ Vô Địch") {
        return "bg-orange-100 text-orange-600";
      } else {
        return "bg-blue-100 text-blue-600";
      }
    }, []);

    return (
      <div
        className={`bg-white border border-gray-100 rounded-lg p-3 mb-3 shadow-sm hover:bg-gray-50 transition-colors ${
          !isMobile ? "bg-gray-50 p-4 mb-4" : ""
        }`}
      >
        <div className="flex gap-3">
          <div className="relative flex-shrink-0">
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
              className={`font-medium text-gray-900 mb-2 ${
                isMobile ? "text-sm leading-tight" : "text-base mb-3"
              }`}
            >
              <span className="line-clamp-2">{product.name}</span>
            </h4>
            <div
              className={`flex flex-wrap gap-1 mb-2 ${
                !isMobile ? "gap-2 mb-3" : ""
              }`}
            >
              {product.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded whitespace-nowrap ${getTagClassName(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              className={`flex items-center gap-2 mb-2 ${
                !isMobile ? "gap-4 mb-3" : ""
              }`}
            >
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {product.sold} Đã bán
              </span>
            </div>
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
