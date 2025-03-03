import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";
import { selectCartItems } from "@/store/slices/cartSlice";
import { AppRoutePaths } from "@/types/router";

interface PaymentMethod {
  id: string;
  name: string;
  icon: keyof typeof FontAwesome.glyphMap;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "credit-card", name: "Credit Card", icon: "credit-card" },
  { id: "paypal", name: "PayPal", icon: "paypal" },
  { id: "apple-pay", name: "Apple Pay", icon: "apple" },
  { id: "google-pay", name: "Google Pay", icon: "google" },
];

const CheckoutScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ total: string; deposit: string }>();
  const cartItems = useSelector(selectCartItems);
  const [selectedMethod, setSelectedMethod] = useState<string>("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);

  const total = parseFloat(params.total || "0");
  const deposit = parseFloat(params.deposit || "0");

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      // TODO: Implement payment processing
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to confirmation screen
      router.push("/(payment)/confirmation" as AppRoutePaths, {
        bookingId: "BOOK" + Date.now().toString(),
      });
    } catch (error) {
      console.error("Payment failed:", error);
      // TODO: Show error message
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Initial Payment</Text>
            <Text style={styles.summaryValue}>${deposit.toFixed(2)}</Text>
          </View>
          {deposit !== total && (
            <Text style={styles.remainingNote}>
              Remaining balance of ${(total - deposit).toFixed(2)} will be due
              at check-in
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodOption,
                selectedMethod === method.id && styles.methodOptionSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <FontAwesome
                name={method.icon}
                size={24}
                color={Colors.primary}
              />
              <Text style={styles.methodName}>{method.name}</Text>
              <View style={styles.radio}>
                {selectedMethod === method.id && (
                  <View style={styles.radioSelected} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <Text style={styles.payButtonText}>
            {isProcessing
              ? "Processing..."
              : `Pay ${deposit === total ? "Full Amount" : "Deposit"}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: Colors.white,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  remainingNote: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontStyle: "italic",
    marginTop: 8,
  },
  methodOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    marginBottom: 8,
  },
  methodOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
  },
  methodName: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: Colors.text.primary,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  footer: {
    backgroundColor: Colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  payButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CheckoutScreen;
