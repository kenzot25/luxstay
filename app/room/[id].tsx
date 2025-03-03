import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { AppRoutePaths } from "@/types/router";
import {
  selectIsAuthenticated,
  toggleWishlist,
  selectIsInWishlist,
} from "@/store/slices/authSlice";
import {
  selectRooms,
  setSelectedRoom,
  selectSelectedRoom,
} from "@/store/slices/roomsSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { Room, CartItem, PaymentOption } from "@/store/types";
import { RootState } from "@/store";

const RoomScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const rooms = useSelector(selectRooms);
  const selectedRoom = useSelector(selectSelectedRoom);
  const isInWishlist = useSelector((state: RootState) =>
    selectIsInWishlist(state, id)
  );

  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );

  useEffect(() => {
    const room = rooms.find((r) => r.id === id);
    if (room) {
      dispatch(setSelectedRoom(room));
    }
  }, [id, rooms, dispatch]);

  if (!selectedRoom) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleWishlist = () => {
    if (!isAuthenticated) {
      router.push("/(auth)/login" as AppRoutePaths);
      return;
    }
    dispatch(toggleWishlist(id));
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      router.push("/(auth)/login" as AppRoutePaths);
      return;
    }

    if (!selectedRoom.isAvailable) {
      Alert.alert(
        "Not Available",
        "This room is currently not available for booking."
      );
      return;
    }

    const cartItem: CartItem = {
      roomId: selectedRoom.id,
      checkIn,
      checkOut,
      guests,
      price: selectedRoom.price,
      paymentOption: "20%" as PaymentOption,
      totalPrice: selectedRoom.price,
      depositAmount: selectedRoom.price * 0.2,
    };

    dispatch(addToCart(cartItem));
    router.push("/(tabs)/cart" as AppRoutePaths);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedRoom.images[0]} style={styles.image} />
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleWishlist}
        >
          <FontAwesome
            name={isInWishlist ? "heart" : "heart-o"}
            size={24}
            color={isInWishlist ? Colors.danger : Colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{selectedRoom.name}</Text>
            <Text style={styles.location}>
              <FontAwesome name="map-marker" size={14} color={Colors.gray} />{" "}
              {selectedRoom.location}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color={Colors.warning} />
            <Text style={styles.rating}>{selectedRoom.rating}</Text>
            <Text style={styles.reviews}>({selectedRoom.reviews} reviews)</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detail}>
            <FontAwesome name="bed" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>
              {selectedRoom.bedrooms} Bedrooms
            </Text>
          </View>
          <View style={styles.detail}>
            <FontAwesome name="bath" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>
              {selectedRoom.bathrooms} Bathrooms
            </Text>
          </View>
          <View style={styles.detail}>
            <FontAwesome name="user" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>
              Up to {selectedRoom.maxGuests} Guests
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{selectedRoom.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenities}>
            {selectedRoom.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenity}>
                <FontAwesome
                  name="check-circle"
                  size={16}
                  color={Colors.primary}
                />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${selectedRoom.price}</Text>
            <Text style={styles.perNight}>/night</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.bookButton,
              !selectedRoom.isAvailable && styles.bookButtonDisabled,
            ]}
            onPress={handleBookNow}
            disabled={!selectedRoom.isAvailable}
          >
            <Text style={styles.bookButtonText}>
              {selectedRoom.isAvailable ? "Book Now" : "Not Available"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  wishlistButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 12,
    borderRadius: 20,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  reviews: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.text.secondary,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 16,
  },
  detail: {
    alignItems: "center",
  },
  detailText: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.text.secondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text.secondary,
  },
  amenities: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenity: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 8,
  },
  amenityText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text.secondary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.primary,
  },
  perNight: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.text.secondary,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookButtonDisabled: {
    backgroundColor: Colors.gray,
  },
  bookButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default RoomScreen;
