import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import EmptyState from "@/components/EmptyState";
import RoomCard from "@/components/RoomCard";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { firebaseService } from "@/services/firebase";
import {
  selectRooms,
  selectRoomsLoading,
  setRooms,
  setLoading,
} from "@/store/slices/roomsSlice";
import { Room } from "@/store/types";

const FEATURED_COUNT = 5;

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const rooms = useSelector(selectRooms);
  const isLoading = useSelector(selectRoomsLoading);
  const [refreshing, setRefreshing] = useState(false);

  const featuredRooms = React.useMemo(() => {
    return rooms.filter((room) => room.rating >= 4.5).slice(0, FEATURED_COUNT);
  }, [rooms]);

  const loadRooms = async () => {
    try {
      dispatch(setLoading(true));
      const rooms = await firebaseService.getRooms();
      dispatch(setRooms(rooms));
    } catch (error) {
      console.error("Error loading rooms:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadRooms();
    setRefreshing(false);
  };

  const handleRoomPress = (room: Room) => {
    router.push(`/room/${room.id}`);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={Colors.primary}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Find your</Text>
        <Text style={styles.titleText}>Dream Room</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search rooms..."
          showFilter
          onFilterPress={() => router.push("/search")}
        />
      </View>

      {rooms.length === 0 && !isLoading ? (
        <EmptyState
          icon="home"
          title="No Rooms Available"
          message="Check back later for new listings"
        />
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Rooms</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
            >
              {featuredRooms.map((room) => (
                <View key={room.id} style={styles.featuredItem}>
                  <RoomCard
                    room={room}
                    horizontal
                    onPress={() => handleRoomPress(room)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>All Rooms</Text>
            <View style={styles.roomsList}>
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onPress={() => handleRoomPress(room)}
                />
              ))}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    color: Colors.text.secondary,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 20,
    marginBottom: 10,
    color: Colors.text.primary,
  },
  featuredList: {
    paddingLeft: 20,
  },
  featuredItem: {
    marginRight: 16,
    width: 280,
  },
  roomsList: {
    padding: 20,
  },
});
