import React, { useCallback, type FC } from "react";
import { X } from "lucide-react";
import { ProductItem } from "./ProductItem";
import type { IVideo, IProduct } from "../data";

interface IProductListModalProps {
  isOpen: boolean;
  onClose: () => void;
  openProductDetailModal: () => void;
  video: IVideo | null;
  width: number;
}

export const ProductListModal: FC<IProductListModalProps> = ({
  isOpen,
  onClose,
  video,
  openProductDetailModal,
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
      <div
        className="fixed inset-0 bg-[#000000c2] bg-opacity-50 bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={handleOverlayClick}
      />
      <div
        className="absolute px-10 m-auto md:px-0 bottom-0 left-0 w-full z-50 flex items-center justify-center"
        onClick={handleOverlayClick}
      >
        <div
          style={{ width }}
          className="bg-white rounded-t-xl w-full max-h-[80vh] overflow-hidden animate-slideInUp"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Sản phẩm trong video ({video.products.length})
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
              <ProductItem
                key={product.id}
                product={product}
                onBuyNow={handleBuyNow}
                onOpenProductDetailModal={openProductDetailModal}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
