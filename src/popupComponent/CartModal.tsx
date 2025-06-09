import React, { useCallback, useState, type FC } from "react";
import { X, Loader2 } from "lucide-react";
import { CartItem } from "./CartItem";
import type { IProduct, IVideo } from "../data";

interface ICartModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: IVideo | null;
  width: number;
}

export const CartModal: FC<ICartModalProps> = ({
  isOpen,
  onClose,
  video,
  width,
}) => {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);

  const handleBuyNow = useCallback((productId: number): void => {
    console.log("Buy now clicked for product:", productId);
  }, []);

  const handleCheckout = useCallback(async (): Promise<void> => {
    if (isCheckoutLoading || isCheckoutDisabled) return;

    setIsCheckoutLoading(true);

    try {
      console.log("Checkout clicked");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsCheckoutLoading(false);
    }
  }, [isCheckoutLoading, isCheckoutDisabled]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const handleCloseClick = useCallback((): void => {
    onClose();
  }, [onClose]);

  if (!isOpen || !video) return null;

  const hasProducts = video.products && video.products.length > 0;
  const shouldDisableCheckout = !hasProducts || isCheckoutDisabled;

  const totalPrice = video.products.reduce((sum, product) => {
    const price = parseInt(product.price.replace(/\./g, ""));
    return sum + price;
  }, 0);

  const formatPrice = (price: number): string => {
    return price.toLocaleString("vi-VN");
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[#000000c2] bg-opacity-50 bg-opacity-50 z-[101] transition-opacity duration-300"
        onClick={handleOverlayClick}
      />

      <div className="fixed left-0 bottom-0 w-full z-[101] flex items-center justify-center">
        <div
          style={{ width }}
          className="bg-white rounded-t-xl w-full max-h-[80vh] overflow-hidden animate-slideInUp flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-900">
              Giỏ hàng ({video.products.length})
            </h3>
            <button
              onClick={handleCloseClick}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl cursor-pointer"
            >
              <X className="text-gray-400 w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 pb-24">
              {video.products?.map((product: IProduct) => (
                <CartItem
                  key={product.id}
                  product={product}
                  onBuyNow={handleBuyNow}
                  onOpenProductDetailModal={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 bg-white border-t border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-900">
                Tổng cộng:
              </span>
              <span className="text-xl font-bold text-orange-500">
                ₫{formatPrice(totalPrice)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={shouldDisableCheckout || isCheckoutLoading}
              className={`
                w-full font-medium py-3 px-6 rounded-lg transition-all duration-200 cursor-pointer
                flex items-center justify-center gap-2 relative
                ${
                  shouldDisableCheckout || isCheckoutLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white hover:scale-[1.02] active:scale-[0.98]"
                }
              `}
            >
              {isCheckoutLoading && (
                <Loader2 className="w-5 h-5 animate-spin" />
              )}

              <span>
                {isCheckoutLoading
                  ? "Đang xử lý..."
                  : shouldDisableCheckout
                    ? "Giỏ hàng trống"
                    : `Mua ngay (${video.products.length} sản phẩm)`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
