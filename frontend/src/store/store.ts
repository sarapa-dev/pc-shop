import { create } from "zustand";
import { Product } from "../types/product";

export interface CartItem {
    product: Product;
    quantity: number;
}
interface CartState {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addItem: (product: Product) => {
        const existingItem = get().items.find((item) => item.product.product_id === product.product_id);

        if (existingItem) {
            set((state) => ({
                items: state.items.map((item) =>
                    item.product.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            }));
        } else {
            set((state) => ({ items: [...state.items, { product, quantity: 1 }] }));
        }
    },
    removeItem: (productId: number) => {
        set((state) => ({
            items: state.items.filter((item) => item.product.product_id !== productId),
        }));
    },
    updateQuantity: (productId: number, quantity: number) => {
        set((state) => ({
            items: state.items.map((item) =>
                item.product.product_id === productId ? { ...item, quantity } : item
            ),
        }));
    },
    clearCart: () => set({ items: [] }),
    totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    },
}));