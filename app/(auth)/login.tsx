import { View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

export default function LoginScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText style={{ fontSize: 24 }}>Login Screen</ThemedText>
      </View>
    </ThemedView>
  );
}
