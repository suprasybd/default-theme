import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import React from 'react';
import { getProductImages, getProductsDetails } from '../api';
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
} from '@frontend.suprasy.com/ui';

const ProductDetails: React.FC = () => {
  const { slug } = useParams({ strict: false }) as { slug: string };
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

  const productImages = productImagesResponse?.Data;

  return (
    <section className="w-full max-w-[1220px] min-h-full mx-auto gap-6 py-6 px-4 sm:px-8">
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">a</div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">b</div>
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
