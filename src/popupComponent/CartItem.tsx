import React, { useCallback, useState, type ChangeEvent, type FC } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import cx from "classnames";
import type { IProduct } from "../data";

interface ICartItemProps {
  product: IProduct;
  onOpenProductDetailModal: () => void;
  onBuyNow?: (productId: number) => void;
}

export const CartItem: FC<ICartItemProps> = React.memo(
  ({ product, onBuyNow, onOpenProductDetailModal }) => {
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
        className={cx(
          "bg-white w-full border border-gray-100 rounded-lg p-4 mb-4 md:p-3 md:mb-3 shadow-sm hover:bg-gray-50 transition-colors",
        )}
      >
        <div className="flex gap-3">
          <div className="relative flex-shrink-0 m-auto">
            <div
              className={cx(
                "bg-gray-200 w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center",
              )}
            >
              <ShoppingBag
                className={cx("text-gray-400 w-8 h-8 md:w-10 md:h-10")}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4
              onClick={openProductDetailModal}
              className={cx(
                "font-medium text-sm leading-tight md:text-base md:leading-normal text-gray-900 mb-3 md:mb-2 cursor-pointer",
              )}
            >
              <span className="line-clamp-2">{product.name}</span>
            </h4>
            <div
              className={cx(
                "flex md:flex-row md:items-center justify-between flex-col items-start  gap-2",
              )}
            >
              <div className={cx("flex items-center gap-3 md:gap-2 flex-wrap")}>
                <span
                  className={cx(
                    "font-bold text-red-600 text-lg md:text-xl whitespace-nowrap",
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
            </div>
            <div className="flex gap-2 mt-2 flex-col md:flex-row">
              <div className="flex w-fit items-center rounded-lg bg-gray-50 border border-gray-200 shadow-sm">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className={cx(
                    "w-8 h-8 flex items-center justify-center transition-all duration-200 cursor-pointer",
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
              <div className="w-fit">
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
      </div>
    );
  },
);
