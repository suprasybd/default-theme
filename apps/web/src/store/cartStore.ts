import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ProductCartType {
  ProductId: number;
  ProductAttribute?: number;
  Quantity: number;
}

export interface CartStoreTypes {
  cart: ProductCartType[];
  addToCart: (product: ProductCartType) => void;
  removeFromCart: (productId: number, productAttribute?: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStoreTypes>()(
  devtools((set) => ({
    cart: [],
    addToCart(product: ProductCartType) {
      set((state) => ({ cart: [...state.cart, product] }));
    },
    removeFromCart(productId, productAttribute) {
      set((state) => ({
        cart: state.cart.filter(
          (item) =>
            item.ProductId !== productId ||
            item.ProductAttribute !== productAttribute
        ),
      }));
    },
    clearCart() {
      set({ cart: [] });
    },
  }))
);
