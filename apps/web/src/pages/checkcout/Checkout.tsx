import { formatPrice } from '@web/libs/helpers/formatPrice';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useMemo } from 'react';
import {
  getProductAttributeName,
  getProductAttributeOptions,
  getProductImages,
  getProductSku,
  getProductsDetailsById,
} from '../products/api';
import { useQuery } from '@tanstack/react-query';
import { ProductCartType, useCartStore } from '@web/store/cartStore';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@frontend.suprasy.com/ui';
import { CartItem } from '@web/components/Modals/Cart/Cart';

const Checkout = () => {
  const { cart, priceMap } = useCartStore((state) => state);

  console.log(priceMap);
  const estimatedTotal = useMemo(() => {
    if (priceMap) {
      let estimateTotal = 0;
      Object.keys(priceMap).forEach((key) => {
        estimateTotal += priceMap[key];
      });
      return estimateTotal;
    } else {
      return 0;
    }
  }, [priceMap]);

  return (
    <div className="w-full max-w-[1220px] min-h-full mx-auto gap-6 py-6 px-4 sm:px-8">
      {/* order summary */}

      <Accordion type="single" defaultValue="item-1" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-3xl font-medium tracking-wider">
            <div className="flex justify-between w-fullhttp://localhost:4201/products/draft-rpdocut-summary-tdest">
              <h2>Order Summary</h2>
              <h2>{formatPrice(estimatedTotal)}</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <h1>Your Order Summary</h1>
              <div className="my-3">
                {cart && cart.map((cartItem) => <CartItem Cart={cartItem} />)}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Checkout;
