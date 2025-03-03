import React, { useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const categories = [
  { id: "1", name: "All", icon: "grid" },
  { id: "2", name: "Suites", icon: "crown" },
  { id: "3", name: "Ocean View", icon: "water" },
  { id: "4", name: "Family", icon: "people" },
  { id: "5", name: "Luxury", icon: "diamond" },
  { id: "6", name: "Spa", icon: "spa" },
];

const CategoryList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("1");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            selectedCategory === category.id ? styles.selectedCategory : {},
          ]}
          onPress={() => setSelectedCategory(category.id)}
        >
          <ThemedText
            style={[
              styles.categoryText,
              selectedCategory === category.id
                ? styles.selectedCategoryText
                : {},
            ]}
          >
            {category.name}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  selectedCategory: {
    backgroundColor: "#1E3A8A",
  },
  categoryText: {
    fontSize: 14,
  },
  selectedCategoryText: {
    color: "white",
  },
});

export default CategoryList;
