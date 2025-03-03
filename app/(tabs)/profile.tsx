import Colors from "@/constants/Colors";
import { firebaseService } from "@/services/firebase";
import { selectIsAuthenticated, selectUser } from "@/store/slices/authSlice";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleSignOut = async () => {
    await firebaseService.signOut();
  };

  const navigateToEditProfile = () => {
    // navigation.navigate("editProfile" as never);
    router.push("editProfile" as never);
  };

  const navigateToSettings = () => {
    // navigation.navigate("settings" as never);
    router.push("settings" as never);
  };

  const navigateToBookings = () => {
    // navigation.navigate("bookings" as never);
    router.push("bookings" as never);
  };

  if (!isAuthenticated || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Please sign in to view your profile</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // navigation.navigate("(auth)/login" as never);
            router.push("(auth)/login" as never);
          }}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <FontAwesome name="user-circle" size={60} color={Colors.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.displayName || "Guest User"}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={navigateToEditProfile}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToBookings}>
          <FontAwesome name="calendar" size={24} color={Colors.primary} />
          <Text style={styles.menuText}>My Bookings</Text>
          <FontAwesome name="chevron-right" size={16} color={Colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="heart" size={24} color={Colors.primary} />
          <Text style={styles.menuText}>Wishlist</Text>
          <Text style={styles.count}>{user.wishlist?.length || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={navigateToSettings}>
          <FontAwesome name="cog" size={24} color={Colors.primary} />
          <Text style={styles.menuText}>Settings</Text>
          <FontAwesome name="chevron-right" size={16} color={Colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome
            name="question-circle"
            size={24}
            color={Colors.primary}
          />
          <Text style={styles.menuText}>Help & Support</Text>
          <FontAwesome name="chevron-right" size={16} color={Colors.gray} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: Colors.gray,
  },
  editButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  section: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  count: {
    backgroundColor: Colors.primary,
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 12,
  },
  signOutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: Colors.danger,
    borderRadius: 8,
    alignItems: "center",
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
