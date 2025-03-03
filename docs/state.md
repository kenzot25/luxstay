# LuxStay State Management Guide

## Overview

We use Redux Toolkit for state management with TypeScript. The store is organized into feature slices with proper typing and async thunks.

## Store Structure

```typescript
RootState {
  auth: AuthState;
  rooms: RoomsState;
  cart: CartState;
}
```

## Slices

### Auth Slice

Handles user authentication and profile management.

```typescript
interface AuthState {
  user: AppUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  wishlist: string[];
}

// Actions
import {
  login,
  logout,
  updateProfile,
  toggleWishlist,
} from "@/store/slices/authSlice";

// Usage
const dispatch = useDispatch();
dispatch(login({ email, password }));
```

Selectors:

```typescript
const isAuthenticated = useSelector(selectIsAuthenticated);
const user = useSelector(selectUser);
const wishlist = useSelector(selectWishlist);
```

### Rooms Slice

Manages room listings and filtering.

```typescript
interface RoomsState {
  rooms: Room[];
  filteredRooms: Room[];
  selectedRoom: Room | null;
  loading: boolean;
  error: string | null;
  filters: RoomFilters;
}

// Actions
import {
  setRooms,
  setSelectedRoom,
  setFilters,
  clearFilters,
} from "@/store/slices/roomsSlice";

// Usage
dispatch(setFilters({ priceRange: [100, 500], type: "suite" }));
```

Selectors:

```typescript
const rooms = useSelector(selectRooms);
const filteredRooms = useSelector(selectFilteredRooms);
const selectedRoom = useSelector(selectSelectedRoom);
```

### Cart Slice

Handles shopping cart and booking process.

```typescript
interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

// Actions
import {
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "@/store/slices/cartSlice";

// Usage
dispatch(addToCart(cartItem));
```

Selectors:

```typescript
const cartItems = useSelector(selectCartItems);
const cartTotal = useSelector(selectCartTotal);
const itemCount = useSelector(selectCartItemCount);
```

## Custom Hooks

### useAppDispatch and useAppSelector

Type-safe hooks for Redux:

```typescript
import { useAppDispatch, useAppSelector } from "@/store";

const Component = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
};
```

### useAuth

Hook for authentication state:

```typescript
import { useAuth } from "@/hooks/useAuth";

const Component = () => {
  const { user, isAuthenticated, login, logout, updateProfile } = useAuth();
};
```

## Data Flow

1. **API Calls**

```typescript
// services/api.ts
const response = await firebaseService.getRooms();
```

2. **Action Dispatch**

```typescript
dispatch(setLoading(true));
try {
  const rooms = await firebaseService.getRooms();
  dispatch(setRooms(rooms));
} catch (error) {
  dispatch(setError(error.message));
} finally {
  dispatch(setLoading(false));
}
```

3. **State Updates**

```typescript
// slices/roomsSlice.ts
reducers: {
  setRooms: (state, action: PayloadAction<Room[]>) => {
    state.rooms = action.payload;
    state.filteredRooms = action.payload;
  };
}
```

4. **Component Re-render**

```typescript
const Component = () => {
  const rooms = useSelector(selectRooms);
  return rooms.map(room => <RoomCard room={room} />);
};
```

## Async Operations

We use createAsyncThunk for async operations:

```typescript
const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await firebaseService.getRooms();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

## Error Handling

```typescript
// In components
const error = useSelector(selectError);
if (error) {
  return <ErrorMessage message={error} />;
}

// In slices
extraReducers: (builder) => {
  builder
    .addCase(fetchRooms.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
}
```

## Performance Considerations

1. Use selectors for derived data:

```typescript
const selectTotalPrice = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.price, 0)
);
```

2. Memoize expensive calculations:

```typescript
const filteredRooms = useMemo(
  () => rooms.filter((room) => room.price <= maxPrice),
  [rooms, maxPrice]
);
```

3. Use shallowEqual for object comparisons:

```typescript
const user = useSelector(selectUser, shallowEqual);
```

## Best Practices

1. Keep slices focused and minimal
2. Use TypeScript for type safety
3. Implement proper error handling
4. Write unit tests for reducers
5. Use selectors for data access
6. Handle loading states
7. Document state changes
8. Use action creators

## Testing

```typescript
// Example reducer test
test("should handle setRooms", () => {
  const initialState = roomsSlice.getInitialState();
  const rooms = [{ id: "1", name: "Suite" }];
  const newState = roomsSlice.reducer(initialState, setRooms(rooms));
  expect(newState.rooms).toEqual(rooms);
});
```
