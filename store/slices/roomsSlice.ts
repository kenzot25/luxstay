import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room, RoomFilters } from "@/store/types";
import { RootState } from "@/store";

interface RoomsState {
  rooms: Room[];
  filteredRooms: Room[];
  selectedRoom: Room | null;
  loading: boolean;
  error: string | null;
  filters: RoomFilters;
}

const initialState: RoomsState = {
  rooms: [],
  filteredRooms: [],
  selectedRoom: null,
  loading: false,
  error: null,
  filters: {},
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
      state.filteredRooms = state.rooms;
    },
    setSelectedRoom: (state, action: PayloadAction<Room | null>) => {
      state.selectedRoom = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<RoomFilters>) => {
      state.filters = { ...state.filters, ...action.payload };

      // Apply filters
      state.filteredRooms = state.rooms.filter((room) => {
        const filters = state.filters;
        let matches = true;

        if (filters.priceRange) {
          const [min, max] = filters.priceRange;
          matches = matches && room.price >= min && room.price <= max;
        }

        if (filters.type) {
          matches = matches && room.type === filters.type;
        }

        if (filters.amenities?.length) {
          matches =
            matches &&
            filters.amenities.every((amenity) =>
              room.amenities.includes(amenity)
            );
        }

        if (filters.rating) {
          matches = matches && room.rating >= filters.rating;
        }

        if (filters.guests) {
          matches = matches && room.maxGuests >= filters.guests;
        }

        if (filters.location) {
          matches =
            matches &&
            room.location
              .toLowerCase()
              .includes(filters.location.toLowerCase());
        }

        // Date filtering would go here when implemented
        if (filters.dates) {
          // TODO: Implement date availability checking
        }

        return matches;
      });
    },
    clearFilters: (state) => {
      state.filters = {};
      state.filteredRooms = state.rooms;
    },
  },
});

// Actions
export const {
  setRooms,
  setSelectedRoom,
  setLoading,
  setError,
  setFilters,
  clearFilters,
} = roomsSlice.actions;

// Selectors
export const selectRooms = (state: RootState) => state.rooms.rooms;
export const selectFilteredRooms = (state: RootState) =>
  state.rooms.filteredRooms;
export const selectSelectedRoom = (state: RootState) =>
  state.rooms.selectedRoom;
export const selectRoomsLoading = (state: RootState) => state.rooms.loading;
export const selectRoomsError = (state: RootState) => state.rooms.error;
export const selectRoomsFilters = (state: RootState) => state.rooms.filters;

export default roomsSlice.reducer;
