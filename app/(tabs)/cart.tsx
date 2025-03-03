import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "@/constants/Colors";
import {
  selectCartItems,
  selectCartTotal,
  selectCartDeposit,
  removeFromCart,
  updatePaymentOption,
  getCartItemWithRoom,
} from "@/store/slices/cartSlice";
import { selectRooms } from "@/store/slices/roomsSlice";
import { PaymentOption } from "@/store/types";
import { RootState } from "@/store";
import { AppRoutePaths } from "@/types/router";

const PAYMENT_OPTIONS: PaymentOption[] = ["10%", "20%", "50%", "100%"];

const CartScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const rooms = useSelector(selectRooms);
  const cartTotal = useSelector(selectCartTotal);
  const depositTotal = useSelector(selectCartDeposit);

  const cartItemsWithRooms = cartItems.map((item) =>
    getCartItemWithRoom(item, rooms)
  );

  const handleRemoveItem = (roomId: string) => {
    dispatch(removeFromCart(roomId));
  };

  const handlePaymentOptionChange = (roomId: string, option: PaymentOption) => {
    dispatch(updatePaymentOption({ roomId, paymentOption: option }));
  };

  const handleCheckout = () => {
    router.push("/(payment)/checkout" as AppRoutePaths, {
      total: cartTotal,
      deposit: depositTotal,
    });
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome name="shopping-cart" size={50} color={Colors.lightGray} />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => router.push("/(tabs)/search" as AppRoutePaths)}
        >
          <Text style={styles.browseButtonText}>Browse Rooms</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemList}>
        {cartItemsWithRooms.map((item) => (
          <View key={item.roomId} style={styles.cartItem}>
            <View style={styles.itemHeader}>
              <Text style={styles.roomName}>{item.room?.name}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveItem(item.roomId)}
                style={styles.removeButton}
              >
                <FontAwesome name="trash" size={20} color={Colors.danger} />
              </TouchableOpacity>
            </View>

            <View style={styles.itemDetails}>
              <Text style={styles.dateRange}>
                {new Date(item.checkIn).toLocaleDateString()} -{" "}
                {new Date(item.checkOut).toLocaleDateString()}
              </Text>
              <Text style={styles.guests}>{item.guests} guests</Text>
            </View>

            <View style={styles.paymentOptions}>
              <Text style={styles.paymentLabel}>Payment Option:</Text>
              <View style={styles.optionsRow}>
                {PAYMENT_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      item.paymentOption === option &&
                        styles.optionButtonSelected,
                    ]}
                    onPress={() =>
                      handlePaymentOptionChange(item.roomId, option)
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item.paymentOption === option &&
                          styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.priceInfo}>
              <Text style={styles.priceLabel}>Total Price:</Text>
              <Text style={styles.price}>${item.totalPrice}</Text>
              {item.paymentOption !== "100%" && (
                <Text style={styles.deposit}>
                  Deposit Amount: ${item.depositAmount}
                </Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${cartTotal}</Text>
          <Text style={styles.depositTotal}>
            Initial Payment: ${depositTotal}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.gray,
    marginVertical: 20,
  },
  browseButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  browseButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  itemList: {
    flex: 1,
  },
  cartItem: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  removeButton: {
    padding: 8,
  },
  itemDetails: {
    marginTop: 8,
  },
  dateRange: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  guests: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  paymentOptions: {
    marginTop: 16,
  },
  paymentLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  optionButtonSelected: {
    backgroundColor: Colors.primary,
  },
  optionText: {
    color: Colors.primary,
    fontSize: 12,
  },
  optionTextSelected: {
    color: Colors.white,
  },
  priceInfo: {
    marginTop: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
  },
  deposit: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  footer: {
    backgroundColor: Colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  totalContainer: {
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.primary,
  },
  depositTotal: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CartScreen;
