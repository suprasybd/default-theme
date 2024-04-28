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
      <SheetContent>
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
  const [quantity, setQuantity] = useState<number>(Cart.Quantity);
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
    <div className="flex">
      <div className="p-3 m-3">
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
        <h1>{productDetails?.Title}</h1>

        {productSku && (
          <h3>
            Total Price: {formatPrice(productSku[0].Price * Cart.Quantity)}
          </h3>
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
      </div>
    </div>
  );
};

export default CartModal;
