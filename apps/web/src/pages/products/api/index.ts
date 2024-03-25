import ApiClient from '@web/libs/ApiClient';
import { ResponseType } from '@web/libs/types/responseTypes';
import { ProductType } from './types';

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
  const response = await ApiClient.get(`/products/${slug}`);

  return response.data;
};
