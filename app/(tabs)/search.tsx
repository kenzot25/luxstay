import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import EmptyState from "@/components/EmptyState";
import FilterModal from "@/components/FilterModal";
import RoomCard from "@/components/RoomCard";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { firebaseService } from "@/services/firebase";
import {
  selectFilteredRooms,
  selectRoomsLoading,
  setLoading,
  setRooms,
  setFilters as setStoreFilters,
} from "@/store/slices/roomsSlice";
import { Room, RoomFilters } from "@/store/types";
import { mapApiRoomsToRooms } from "@/utils/mappers";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const filteredRooms = useSelector(selectFilteredRooms);
  const isLoading = useSelector(selectRoomsLoading);

  // Debounced search function
  const debouncedSearch = useCallback(
    _.debounce(async (query: string) => {
      dispatch(setLoading(true));
      try {
        const filters: RoomFilters = {
          location_contains: query || undefined,
        };
        const response = await firebaseService.getRooms(filters);
        const mappedRooms = mapApiRoomsToRooms(response);
        dispatch(setRooms(mappedRooms));
        dispatch(setStoreFilters({ location: query }));
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        dispatch(setLoading(false));
      }
    }, 500),
    []
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await firebaseService.getRooms();
      const mappedRooms = mapApiRoomsToRooms(response);
      dispatch(setRooms(mappedRooms));
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderRoom = useCallback(
    ({ item }: { item: Room }) => <RoomCard room={item} />,
    []
  );

  const renderEmpty = useCallback(
    () => (
      <EmptyState
        icon="search"
        title="No rooms found"
        message={
          searchQuery
            ? `No rooms matching "${searchQuery}"`
            : "Try adjusting your search or filters"
        }
      />
    ),
    [searchQuery]
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Search by name or location..."
          value={searchQuery}
          onChangeText={handleSearch}
          showFilter
          onFilterPress={() => setShowFilters(true)}
          autoFocus
        />
      </View>

      {isLoading ? (
        renderLoading()
      ) : (
        <FlatList
          data={filteredRooms || []}
          renderItem={renderRoom}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.roomsList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.primary}
            />
          }
          ListEmptyComponent={renderEmpty}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
      )}

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  roomsList: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
