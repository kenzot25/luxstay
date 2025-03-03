import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function PaymentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="checkout"
        options={{
          title: "Checkout",
          headerStyle: {
            backgroundColor: Colors.white,
          },
          headerTintColor: Colors.primary,
          headerShadowVisible: false,
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="confirmation"
        options={{
          title: "Booking Confirmation",
          headerStyle: {
            backgroundColor: Colors.white,
          },
          headerTintColor: Colors.primary,
          headerShadowVisible: false,
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
