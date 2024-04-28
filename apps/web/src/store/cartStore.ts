import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';

export interface ProductCartType {
  Id?: string;
  ProductId: number;
  ProductAttribute?: number;
  Quantity: number;
}

export interface CartStoreTypes {
  cart: ProductCartType[];
  addToCart: (product: ProductCartType) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartStoreTypes>()(
  devtools((set) => ({
    cart: [],
    addToCart(product) {
      set((state) => ({ cart: [...state.cart, { ...product, Id: uuid() }] }));
    },
    removeFromCart(id) {
      set((state) => ({ cart: state.cart.filter((item) => item.Id !== id) }));
    },
    clearCart() {
      set({ cart: [] });
    },
    setQuantity(id, quantity) {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.Id === id ? { ...item, Quantity: quantity } : item
        ),
      }));
    },
  }))
);
