import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Room } from "@/store/types";
import { Colors } from "@/constants/Colors";
import {
  selectIsAuthenticated,
  selectIsInWishlist,
  toggleWishlist,
} from "@/store/slices/authSlice";
import { RootState } from "@/store";
import { AppRoutePaths, RouterActions } from "@/types/router";

interface RoomCardProps {
  room: Room;
  horizontal?: boolean;
  onPress?: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  horizontal = false,
  onPress,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInWishlist = useSelector((state: RootState) =>
    selectIsInWishlist(state, room.id)
  );

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      router.push("/(auth)/login");
      return;
    }
    dispatch(toggleWishlist(room.id));
  };

  const handlePress = () => {
    if (onPress) {
      onPress(room);
    } else {
      router.push(`/(tabs)/room/${room.id}` as AppRoutePaths, { id: room.id });
    }
  };

  const renderImage = () => {
    if (typeof room.images[0] === "string") {
      return (
        <Image
          source={{ uri: room.images[0] as string }}
          style={styles.image}
          resizeMode="cover"
        />
      );
    }
    return (
      <Image
        source={room.images[0] as ImageSourcePropType}
        style={styles.image}
        resizeMode="cover"
      />
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, horizontal && styles.horizontalContainer]}
      onPress={handlePress}
    >
      <View
        style={[
          styles.imageContainer,
          horizontal && styles.horizontalImageContainer,
        ]}
      >
        {renderImage()}
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleWishlistToggle}
        >
          <FontAwesome
            name={isInWishlist ? "heart" : "heart-o"}
            size={24}
            color={isInWishlist ? Colors.danger : Colors.white}
          />
        </TouchableOpacity>
        {!room.isAvailable && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>Unavailable</Text>
          </View>
        )}
      </View>

      <View style={[styles.details, horizontal && styles.horizontalDetails]}>
        <Text style={styles.name} numberOfLines={1}>
          {room.name}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          <FontAwesome name="map-marker" size={14} color={Colors.gray} />{" "}
          {room.location}
        </Text>
        <View style={styles.infoRow}>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={14} color={Colors.warning} />
            <Text style={styles.rating}>{room.rating}</Text>
            <Text style={styles.reviews}>({room.reviews})</Text>
          </View>
          <Text style={styles.price}>
            ${room.price}
            <Text style={styles.perNight}>/night</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  horizontalContainer: {
    flexDirection: "row",
    height: 120,
  },
  imageContainer: {
    position: "relative",
    height: 200,
  },
  horizontalImageContainer: {
    flex: 1,
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  wishlistButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 8,
  },
  unavailableBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: Colors.danger,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unavailableText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  details: {
    padding: 12,
  },
  horizontalDetails: {
    flex: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.text.primary,
  },
  location: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  reviews: {
    marginLeft: 2,
    fontSize: 14,
    color: Colors.text.secondary,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  perNight: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
});

export default RoomCard;
