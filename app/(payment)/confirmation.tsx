import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Colors } from "@/constants/Colors";
import { clearCart } from "@/store/slices/cartSlice";
import { AppRoutePaths } from "@/types/router";

const ConfirmationScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();

  const handleViewBookings = () => {
    dispatch(clearCart());
    router.push("/(tabs)/profile" as AppRoutePaths);
  };

  const handleContinueShopping = () => {
    dispatch(clearCart());
    router.push("/(tabs)/search" as AppRoutePaths);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.successIcon}>
        <FontAwesome name="check-circle" size={80} color={Colors.success} />
      </View>

      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.message}>
        Thank you for your booking. Your reservation has been confirmed and a
        confirmation email has been sent to your registered email address.
      </Text>

      <View style={styles.bookingInfo}>
        <Text style={styles.bookingId}>Booking ID: {bookingId}</Text>
        <Text style={styles.infoText}>
          You can view your booking details and manage your reservation in the
          bookings section of your profile.
        </Text>
      </View>

      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>Need Help?</Text>
        <Text style={styles.helpText}>
          If you have any questions or need to make changes to your booking,
          please contact our customer support team.
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleViewBookings}
        >
          <Text style={styles.primaryButtonText}>View My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleContinueShopping}
        >
          <Text style={styles.secondaryButtonText}>Continue Browsing</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  successIcon: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  bookingInfo: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    width: "100%",
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  helpSection: {
    width: "100%",
    marginBottom: 32,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  buttons: {
    width: "100%",
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ConfirmationScreen;
