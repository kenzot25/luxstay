import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Room, PaymentOption } from "@/store/types";
import { RootState } from "@/store";

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(
        (item) => item.roomId === action.payload.roomId
      );
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items[index] = action.payload;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.roomId !== action.payload
      );
    },
    updateCartItem: (
      state,
      action: PayloadAction<{ roomId: string; updates: Partial<CartItem> }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.roomId === action.payload.roomId
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
        };
      }
    },
    updatePaymentOption: (
      state,
      action: PayloadAction<{ roomId: string; paymentOption: PaymentOption }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.roomId === action.payload.roomId
      );
      if (index !== -1) {
        const item = state.items[index];
        const totalPrice = item.price || 0;
        const percentage = parseInt(action.payload.paymentOption) / 100;

        state.items[index] = {
          ...item,
          paymentOption: action.payload.paymentOption,
          depositAmount: totalPrice * percentage,
          totalPrice: totalPrice,
        };
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Actions
export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  updatePaymentOption,
  clearCart,
  setLoading,
  setError,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.totalPrice, 0);
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.length;
export const selectCartDeposit = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.depositAmount, 0);

// Helper function to find a room in cart
export const findCartItem = (state: RootState, roomId: string) =>
  state.cart.items.find((item) => item.roomId === roomId);

// Helper function to check if a room is in cart
export const isInCart = (state: RootState, roomId: string) =>
  state.cart.items.some((item) => item.roomId === roomId);

// Helper function to get room details for cart items
export const getCartItemWithRoom = (cartItem: CartItem, rooms: Room[]) => {
  const room = rooms.find((r) => r.id === cartItem.roomId);
  return room ? { ...cartItem, room } : cartItem;
};

export default cartSlice.reducer;
