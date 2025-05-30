import { ShoppingBag } from "lucide-react";
import React, { useCallback, type FC } from "react";
import cx from "classnames";
import type { IProduct } from "../data/videoData";

interface IProductItemProps {
  product: IProduct;
  isMobile?: boolean;
  onBuyNow?: (productId: number) => void;
  onOpenProductDetailModal: () => void;
}

export const ProductItem: FC<IProductItemProps> = React.memo(
  ({ onOpenProductDetailModal, product, isMobile = false, onBuyNow }) => {
    const handleProductBuyClick = useCallback((): void => {
      onBuyNow?.(product.id);
    }, [product.id, onBuyNow]);

    const openProductDetailModal = useCallback((): void => {
      onOpenProductDetailModal();
    }, [onOpenProductDetailModal]);

    return (
      <div
        className={cx(
          "bg-white w-full border border-gray-100 rounded-lg p-3 mb-3 shadow-sm hover:bg-gray-50 transition-colors pointer-events-auto",
          {
            "bg-gray-50 p-4 mb-4": !isMobile,
          },
        )}
      >
        <div className="flex gap-3">
          <div className="relative flex-shrink-0 m-auto">
            <div
              className={cx(
                "bg-gray-200 rounded-lg flex items-center justify-center",
                {
                  "w-16 h-16": true,
                },
              )}
            >
              <ShoppingBag
                className={cx("text-gray-400", {
                  "w-4 h-4": isMobile,
                  "w-6 h-6": !isMobile,
                })}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4
              onClick={openProductDetailModal}
              className={cx("font-medium text-gray-900 mb-2 cursor-pointer", {
                "text-sm leading-tight": isMobile,
                "text-base": !isMobile,
              })}
            >
              <span className="line-clamp-2">{product.name}</span>
            </h4>
            <div
              className={cx("flex items-center justify-between", {
                "flex-col items-start gap-2": isMobile,
              })}
            >
              <div
                className={cx("flex items-center gap-2 flex-wrap", {
                  "gap-3": !isMobile,
                })}
              >
                <span
                  className={cx("font-bold text-red-600 whitespace-nowrap", {
                    "text-lg": isMobile,
                    "text-xl": !isMobile,
                  })}
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
                className={cx(
                  "bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer",
                  {
                    "px-4 py-2 text-sm w-full mt-1": isMobile,
                    "px-6 py-2": !isMobile,
                  },
                )}
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
