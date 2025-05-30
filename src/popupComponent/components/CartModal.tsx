import React, { useCallback } from "react";
import { X } from "lucide-react";
import type { Video, Product } from "../data/videoData";
import { CartItem } from "./CartItem";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
  isMobile?: boolean;
  onOpenProductDetailModal: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  video,
  onOpenProductDetailModal,
  isMobile = false,
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
    <div
      className="fixed bottom-0 w-full z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-t-xl w-full max-h-[80vh] overflow-hidden animate-slideInUp">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Giỏ hàng ({video.productCount})
          </h3>
          <button
            onClick={handleCloseClick}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl cursor-pointer"
          >
            <X className="text-gray-400 w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
          {video.products?.map((product: Product) => (
            <CartItem
              key={product.id}
              product={product}
              isMobile={isMobile}
              onBuyNow={handleBuyNow}
              onOpenProductDetailModal={onOpenProductDetailModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
