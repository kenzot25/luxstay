import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppUser } from "../types";

interface AuthState {
  user: AppUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    toggleWishlist: (state, action: PayloadAction<string>) => {
      if (!state.user) return;

      const roomId = action.payload;
      const index = state.user.wishlist.indexOf(roomId);

      if (index === -1) {
        // Add to wishlist
        state.user.wishlist.push(roomId);
      } else {
        // Remove from wishlist
        state.user.wishlist.splice(index, 1);
      }
    },
    clearWishlist: (state) => {
      if (state.user) {
        state.user.wishlist = [];
      }
    },
  },
});

// Actions
export const {
  setUser,
  setLoading,
  setError,
  logout,
  toggleWishlist,
  clearWishlist,
} = authSlice.actions;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectWishlist = (state: { auth: AuthState }) =>
  state.auth.user?.wishlist || [];
export const selectIsInWishlist = (
  state: { auth: AuthState },
  roomId: string
) => state.auth.user?.wishlist.includes(roomId) || false;

export default authSlice.reducer;
