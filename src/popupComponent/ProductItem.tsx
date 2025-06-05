import { ShoppingBag } from "lucide-react";
import React, { useCallback, type FC } from "react";
import cx from "classnames";
import type { IProduct } from "../data";

interface IProductItemProps {
  product: IProduct;
  onBuyNow?: (productId: number) => void;
  onOpenProductDetailModal: () => void;
}

export const ProductItem: FC<IProductItemProps> = React.memo(
  ({ onOpenProductDetailModal, product, onBuyNow }) => {
    const handleProductBuyClick = useCallback((): void => {
      onBuyNow?.(product.id);
    }, [product.id, onBuyNow]);

    const openProductDetailModal = useCallback((): void => {
      onOpenProductDetailModal();
    }, [onOpenProductDetailModal]);

    return (
      <div
        className={cx(
          "bg-white w-full border border-gray-100 rounded-lg p-4 mb-4 md:p-3 md:mb-3 shadow-sm hover:bg-gray-50 transition-colors pointer-events-auto",
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
                className={cx("text-gray-400 w-4 h-4 md:w-6 md:h-6")}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4
              onClick={openProductDetailModal}
              className={cx(
                "font-medium text-gray-900 mb-2 cursor-pointer text-sm md:text-base leading-tight",
              )}
            >
              <span className="line-clamp-2">{product.name}</span>
            </h4>
            <div
              className={cx(
                "flex md:items-center justify-between flex-col md:flex-row items-start gap-2",
              )}
            >
              <div className={cx("flex items-center gap-1 flex-wrap")}>
                <span
                  className={cx(
                    "font-bold text-red-600 whitespace-nowrap text-lg md:text-xl",
                  )}
                >
                  ₫{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through whitespace-nowrap">
                    {`₫${product.originalPrice}`}
                  </span>
                )}
                {product.discount && (
                  <span className="text-sm text-red-600 font-medium whitespace-nowrap">
                    -{product.discount}
                  </span>
                )}
              </div>
              <div className="w-full">
                <button
                  onClick={handleProductBuyClick}
                  className={cx(
                    "bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer px-4 py-2 text-sm w-full mt-1 md:px-6 md:py-2 md:text-base",
                  )}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
