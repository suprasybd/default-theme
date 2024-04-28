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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Label } from '@frontend.suprasy.com/ui';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  RadioGroup,
  RadioGroupItem,
  FormMessage,
} from '@frontend.suprasy.com/ui';
import { Input } from '@frontend.suprasy.com/ui';

import { useQuery } from '@tanstack/react-query';
import { ProductCartType, useCartStore } from '@web/store/cartStore';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@frontend.suprasy.com/ui';
import { CartItem } from '@web/components/Modals/Cart/Cart';
import { getDevliveryMethods, getShippingMethods } from './api';

const formSchema = z.object({
  FirstName: z.string().min(2).max(50),
  LastName: z.string().min(2).max(50),
  Address: z.string().min(2).max(100),
  Email: z.string().min(2).max(100),
  Phone: z.string().min(2).max(100),
});

const Checkout = () => {
  const { cart, priceMap } = useCartStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { data: shippingMethodsResponse } = useQuery({
    queryKey: ['getShippingMethods'],
    queryFn: () => getShippingMethods(),
  });

  const { data: deliveryMethodsResponse } = useQuery({
    queryKey: ['getDevliveryMethods'],
    queryFn: () => getDevliveryMethods(),
  });

  const shippingMethods = shippingMethodsResponse?.Data;
  const deliveryMethods = deliveryMethodsResponse?.Data;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
            <div className="flex justify-between w-full">
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

      {/* devliary form */}

      <div className="my-5">
        <h1 className="text-2xl font-medium mb-3">Devilery</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex w-full gap-[10px]">
              <FormField
                control={form.control}
                name="FirstName"
                render={({ field }) => (
                  <FormItem className="!my-[10px] w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        FormError={!!form.formState.errors.FirstName}
                        placeholder="First name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="LastName"
                render={({ field }) => (
                  <FormItem className="!my-[10px] w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        FormError={!!form.formState.errors.LastName}
                        placeholder="Last name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem className="!my-[10px]">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6"
                      FormError={!!form.formState.errors.Email}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Phone"
              render={({ field }) => (
                <FormItem className="!my-[10px]">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6"
                      FormError={!!form.formState.errors.Phone}
                      placeholder="Phone"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Address"
              render={({ field }) => (
                <FormItem className="!my-[10px]">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      className="py-7"
                      FormError={!!form.formState.errors.Address}
                      placeholder="Address Example - Dhaka, Mirpur 10, Road #2 , House 29"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <h1 className="text-2xl font-medium mb-3">Shipping Method</h1>
            {shippingMethods && shippingMethods.length && (
              <RadioGroup
                defaultValue={shippingMethods[0].Id.toString()}
                className="border border-gray-200 rounded-md w-full  block"
              >
                {shippingMethods.map((method) => (
                  <Label
                    htmlFor={method.Id.toString()}
                    className="p-3 rounded-md py-5 w-full !my-0 block  bg-white  hover:cursor-pointer border-b border-gray-200"
                  >
                    <div className="flex gap-[7px]">
                      <RadioGroupItem
                        className=" !my-0 "
                        value={method.Id.toString()}
                        id={method.Id.toString()}
                      />
                      <div className="flex w-full justify-between">
                        <h3>{method.Area}</h3>
                        <p>
                          {method.Cost !== 0 && <>{formatPrice(method.Cost)}</>}
                          {method.Cost === 0 && 'Free'}
                        </p>
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            )}

            <h1 className="text-2xl font-medium mb-3">Delivery Method</h1>
            {deliveryMethods && deliveryMethods.length && (
              <RadioGroup
                defaultValue={`${deliveryMethods[0].Id.toString()}delivery`}
                className="border border-gray-200 rounded-md w-full block"
              >
                {deliveryMethods.map((method) => (
                  <Label
                    htmlFor={`${method.Id.toString()}delivery`}
                    className="p-3 rounded-md py-5 w-full !my-0 block   bg-white  hover:cursor-pointer border-b border-gray-200"
                  >
                    <div className="flex gap-[7px]">
                      <RadioGroupItem
                        className=" !my-0 "
                        value={`${method.Id.toString()}delivery`}
                        id={`${method.Id.toString()}delivery`}
                      />
                      <div className="flex w-full justify-between">
                        <h3 className="tracking-wide !leading-5">
                          {method.DeliveryMethod}
                        </h3>
                        <p>
                          {method.Cost !== 0 && <>{formatPrice(method.Cost)}</>}
                          {method.Cost === 0 && 'Free'}
                        </p>
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            )}

            <h1 className="text-2xl font-medium mb-3">Payment</h1>
            {deliveryMethods && deliveryMethods.length && (
              <RadioGroup
                defaultValue={'payment-cod'}
                className="border border-gray-200 rounded-md w-full block"
              >
                <Label
                  htmlFor={`payment-cod`}
                  className="p-3 rounded-md py-5 w-full !my-0 block   bg-white  hover:cursor-pointer border-b border-gray-200"
                >
                  <div className="flex gap-[7px]">
                    <RadioGroupItem
                      className=" !my-0 "
                      value={`payment-cod`}
                      id={`payment-cod`}
                    />
                    <div className="flex w-full justify-between">
                      <h3 className="tracking-wide !leading-5">
                        Cash On Delivery
                      </h3>
                    </div>
                  </div>
                </Label>
              </RadioGroup>
            )}

            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
