import ApiClient from '@web/libs/ApiClient';
import { ResponseType } from '@web/libs/types/responseTypes';
import { ProductImagesTypes, ProductType } from './types';

export interface AreaType {
  Id: number;
  StoreKey: string;
  Area: string;
  Cost: number;
  CreatedAt: string;
  UpdatedAt: string;
}

export const getProductsDetails = async (
  slug: string
): Promise<ResponseType<ProductType>> => {
  const response = await ApiClient.get(`/storefront-products/product/${slug}`);

  return response.data;
};

export const getProductImages = async (
  productId: number
): Promise<ResponseType<ProductImagesTypes>> => {
  const response = await ApiClient.get(
    `/storefront-products/images/${productId}`
  );

  return response.data;
};
