import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@frontend.suprasy.com/ui';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@web/libs/helpers/formatPrice';
import {
  getProductAttributeName,
  getProductAttributeOptions,
  getProductImages,
  getProductSku,
  getProductsDetails,
  getProductsDetailsById,
} from '@web/pages/products/api';
import { ProductCartType, useCartStore } from '@web/store/cartStore';
import { useModalStore } from '@web/store/modalStore';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const CartModal: React.FC = () => {
  const { modal, clearModalPath } = useModalStore((state) => state);
  const modalName = modal.modal;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (modalName === 'cart') {
      setModalOpen(true);
    }
  }, [modalName]);

  const closeModal = () => {
    setModalOpen(false);
    clearModalPath();
  };

  const { cart } = useCartStore((state) => state);

  return (
    <Sheet
      open={modalOpen}
      onOpenChange={(data) => {
        if (!data) {
          closeModal();
        }
      }}
    >
      <SheetContent className="p-3">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>Add items to cart</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {cart && (
            <div>
              {cart.map((cartEach) => (
                <CartItem Cart={cartEach} />
              ))}
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

interface CartItemPropsTypes {
  Cart: ProductCartType;
}

const CartItem: React.FC<CartItemPropsTypes> = ({ Cart }) => {
  const quantity = Cart.Quantity;
  const { removeFromCart, setQuantity } = useCartStore((state) => state);

  const { data: productsDetailsResponse } = useQuery({
    queryKey: ['getProductsDetailsByIdCart', Cart.ProductId],
    queryFn: () => getProductsDetailsById(Cart.ProductId.toString() || '0'),
    enabled: !!Cart.ProductId,
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
    <div className="flex p-2">
      <div className="mr-3">
        {productImages && (
          <div className="w-[60px] h-fit">
            <img
              src={productImages[0].ImageUrl}
              style={{ width: '100%', height: '100%' }}
              alt="product cart"
            />
          </div>
        )}
      </div>

      <div>
        <h1 className="text-sm">{productDetails?.Title}</h1>

        {productSku && !productDetails?.HasVariant && (
          <div>
            <h3 className="text-sm">
              Price: {formatPrice(productSku[0].Price)}
            </h3>
            <h3 className="text-sm">
              Total Price: {formatPrice(productSku[0].Price * Cart.Quantity)}
            </h3>{' '}
          </div>
        )}

        {productSku && productDetails?.HasVariant && (
          <div>
            {productSku.map((sku) => {
              if (sku.AttributeOptionId === Cart.ProductAttribute) {
                return (
                  <>
                    <h3 className="text-sm">Price: {formatPrice(sku.Price)}</h3>
                    <h3 className="text-sm">
                      Total Price: {formatPrice(sku.Price * Cart.Quantity)}
                    </h3>{' '}
                  </>
                );
              }
            })}
          </div>
        )}

        {productDetails?.HasVariant && (
          <div>
            <span className="block mb-2 font-light text-sm">
              {productAttributeName?.Name}:{' '}
              {productAttributeOptions &&
                productAttributeOptions.map((attribute) => {
                  if (attribute.Id === Cart.ProductAttribute) {
                    return attribute.Value;
                  }
                })}
            </span>
          </div>
        )}

        <span className="block mb-2 font-light text-sm">Quantity</span>
        <div className="flex justify-between">
          <div className="flex">
            <button
              className="border border-gray-400 py-2 px-5"
              onClick={(e) => {
                e.preventDefault();
                if (quantity - 1 >= 1) {
                  setQuantity(Cart.Id || '0', quantity - 1);
                }
              }}
            >
              -
            </button>
            <input
              onChange={(e) => {
                setQuantity(Cart.Id || '0', parseInt(e.target.value) || 1);
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

                setQuantity(Cart.Id || '0', quantity + 1);
              }}
            >
              +
            </button>
          </div>

          <button
            onClick={() => {
              if (Cart.Id) {
                removeFromCart(Cart.Id);
              }
            }}
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
