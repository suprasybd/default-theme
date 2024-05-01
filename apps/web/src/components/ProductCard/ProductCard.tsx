import { useQuery } from '@tanstack/react-query';
import {
  calculateDiscountPercentage,
  formatPrice,
} from '@web/libs/helpers/formatPrice';
import {
  getProductAttributeName,
  getProductAttributeOptions,
  getProductImages,
  getProductSku,
  getProductsDetails,
  getProductsDetailsById,
} from '@web/pages/products/api';
import React from 'react';

const ProductCard: React.FC<{ ProductId: number }> = ({ ProductId }) => {
  const { data: productsDetailsResponse } = useQuery({
    queryKey: ['getProductsDetails', ProductId],
    queryFn: () => getProductsDetailsById(ProductId.toString()),
    enabled: !!ProductId,
  });

  const productDetails = productsDetailsResponse?.Data;

  const { data: productImagesResponse } = useQuery({
    queryKey: ['getProductImages', productDetails?.Id],
    queryFn: () => getProductImages(productDetails?.Id || 0),
    enabled: !!productDetails?.Id,
  });

  const { data: productSkuResponse } = useQuery({
    queryKey: ['getProductSku', productDetails?.Id],
    queryFn: () => getProductSku(productDetails?.Id || 0),
    enabled: !!productDetails?.Id,
  });

  const { data: attributeNameResponse } = useQuery({
    queryKey: ['getProductAttributeName', productDetails?.Id],
    queryFn: () => getProductAttributeName(productDetails?.Id || 0),
    enabled: productDetails?.HasVariant && !!productDetails?.Id,
  });

  const { data: attributeOptionsResponse } = useQuery({
    queryKey: ['getProductAttributeOptions', productDetails?.Id],
    queryFn: () => getProductAttributeOptions(productDetails?.Id || 0),
    enabled: productDetails?.HasVariant && !!productDetails?.Id,
  });

  const productImages = productImagesResponse?.Data;
  const productSku = productSkuResponse?.Data;
  const HasVariant = productDetails?.HasVariant;
  const productAttributeName = attributeNameResponse?.Data;
  const productAttributeOptions = attributeOptionsResponse?.Data;

  return (
    <div className="max-w-[274px] h-[424px] hover:cursor-pointer">
      <div className="rounded-md overflow-hidden  relative">
        {productSku &&
          productSku.length > 0 &&
          productSku[0].ShowCompareAtPrice && (
            <span className="bg-green-600 text-sm font-light text-white px-2 py-1 absolute top-5 right-5 rounded-tr ">
              {calculateDiscountPercentage(
                productSku[0].CompareAtPrice,
                productSku[0].Price
              ).toFixed(2)}
              % off
            </span>
          )}

        {productImages && productImages.length > 0 && (
          <img
            className="w-full h-[200px] object-fill"
            src={productImages[0].ImageUrl}
            alt="Zifriend ZA981 Gaming Headset"
          />
        )}

        <div className="p-2">
          <div className="font-normal text-base mb-2">
            {productDetails?.Title}
          </div>

          {productSku && productSku.length > 0 && (
            <p className="text-gray-700 text-base">
              {productSku[0].ShowCompareAtPrice && (
                <span className="font-light line-through mr-3">
                  {formatPrice(productSku[0].CompareAtPrice)}
                </span>
              )}

              <span className="font-medium text-base">
                {formatPrice(productSku[0].Price)}
              </span>
            </p>
          )}
        </div>
        <div className="px-6 pt-4 pb-2">
          <div className="flex justify-center pb-2">
            <button className="w-full outline outline-3 outline-gray-600 hover:outline-black text-black font-bold py-2 px-4 rounded-xl">
              Choose Options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
