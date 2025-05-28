import React, { useCallback } from "react";
import { ShoppingBag } from "lucide-react";
import { ProductItem } from "./ProductItem";
import type { Video, Product } from "../data/videoData";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
  isMobile?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  video,
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

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-end"
        onClick={handleOverlayClick}
      >
        <div className="w-full bg-white rounded-t-2xl max-h-[70vh] overflow-hidden animate-slideInUp">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Xem sản phẩm ({video.productCount})
            </h3>
            <div className="flex items-center gap-2">
              <div className="bg-orange-100 p-2 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-orange-600" />
              </div>
              <button
                onClick={handleCloseClick}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                aria-label="Đóng modal"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-4 overflow-y-auto max-h-[calc(70vh-80px)]">
            {video.products?.map((product: Product) => (
              <ProductItem
                key={product.id}
                product={product}
                isMobile={true}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-slideInUp">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">
            Sản phẩm trong video ({video.productCount})
          </h3>
          <button
            onClick={handleCloseClick}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
          {video.products?.map((product: Product) => (
            <ProductItem
              key={product.id}
              product={product}
              isMobile={false}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
