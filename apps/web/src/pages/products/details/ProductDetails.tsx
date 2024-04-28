import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import React, { useState } from 'react';
import { getProductImages, getProductSku, getProductsDetails } from '../api';
import {
  RichTextRender,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Card,
  CardContent,
  Button,
} from '@frontend.suprasy.com/ui';
import ProductImages from './components/ProductImages';
import ProductInfo from './components/ProductInfo';
import { formatPrice } from '@web/libs/helpers/formatPrice';

const ProductDetails: React.FC = () => {
  const { slug } = useParams({ strict: false }) as { slug: string };

  const [quantity, setQuantity] = useState<number>(1);

  const { data: productsDetailsResponse } = useQuery({
    queryKey: ['getProductsDetails', slug],
    queryFn: () => getProductsDetails(slug),
    enabled: !!slug,
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

  const productImages = productImagesResponse?.Data;
  const productSku = productSkuResponse?.Data;

  return (
    <section className="w-full max-w-[1220px] min-h-full mx-auto gap-6 py-6 px-4 sm:px-8">
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              {productImages && <ProductImages Images={productImages} />}
            </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              {productDetails && (
                <div>
                  <h1 className="text-4xl font-medium">
                    {productDetails.Title}
                  </h1>

                  {productSku && (
                    <p className="text-xl font-normal my-3 tracking-wider">
                      {' '}
                      {formatPrice(productSku[0].Price)}
                    </p>
                  )}

                  <div className="my-3">
                    <RichTextRender
                      className="min-h-fit"
                      initialVal={productDetails.Summary}
                    />
                  </div>
                </div>
              )}

              <span className="block mb-2 font-light">Quantity</span>
              <div className="flex">
                <button
                  className="border border-gray-400 py-2 px-5"
                  onClick={(e) => {
                    e.preventDefault();
                    if (quantity - 1 >= 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  -
                </button>
                <input
                  onChange={(e) => {
                    setQuantity(parseInt(e.target.value) || 1);
                  }}
                  type="number"
                  className="border w-[100px] border-gray-400 py-2 px-5"
                  value={quantity}
                  step={'any'}
                />
                <button
                  className="border border-gray-400 py-2 px-5"
                  onClick={(e) => {
                    e.preventDefault();

                    setQuantity(quantity + 1);
                  }}
                >
                  +
                </button>
              </div>
              <div className="my-3">
                <Button className="w-full my-1 bg-white border-2 border-gray-700 text-black hover:bg-white hover:shadow-lg">
                  Add to cart
                </Button>
                <Button className="w-full my-1 bg-green-500 hover:bg-green-500 hover:shadow-lg">
                  Buy it now
                </Button>
              </div>
            </div>
          </div>
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="w-full">
              {productDetails?.Description && (
                <RichTextRender initialVal={productDetails?.Description} />
              )}
            </TabsContent>
            <TabsContent value="reviews">Change your reviews here.</TabsContent>
          </Tabs>
        </div>
      </section>
    </section>
  );
};

export default ProductDetails;
