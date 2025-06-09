import React, { useCallback, type FC } from "react";
import { X } from "lucide-react";
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
  const handleBuyNow = useCallback((productId: number): void => {
    console.log("Buy now clicked for product:", productId);
  }, []);

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

  return (
    <>
      {/* Overlay Background */}
      <div
        className="fixed inset-0 bg-[#000000c2] bg-opacity-50 bg-opacity-50 z-[101] transition-opacity duration-300"
        onClick={handleOverlayClick}
      />

      {/* Modal Content */}
      <div className="fixed left-0 bottom-0 w-full z-[101] flex items-center justify-center">
        <div
          style={{ width }}
          className="bg-white rounded-t-xl w-full max-h-[80vh] overflow-hidden animate-slideInUp"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
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
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
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
      </div>
    </>
  );
};
