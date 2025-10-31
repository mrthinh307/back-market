import { CartItem } from "./cards.type";

export interface CartContextType {
  cartItems: CartItem[];
  cartData: { items: CartItem[]; totalPrice: number } | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  handleRemoveItem: (
    productVariantId: string,
    productName: string,
  ) => Promise<void>;
  isRemoving: boolean;
}
