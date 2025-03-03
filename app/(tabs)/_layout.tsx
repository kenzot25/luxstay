import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { selectCartItemCount } from '@/store/slices/cartSlice';
import { TabIconProps } from '@/types/router';

export default function TabLayout() {
  const cartItemCount = useSelector(selectCartItemCount);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.lightGray,
          backgroundColor: Colors.white,
        },
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.primary,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <FontAwesome name={focused ? 'home' : 'home'} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <FontAwesome name={focused ? 'search' : 'search'} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <TabBarIcon
              name={focused ? 'shopping-cart' : 'shopping-cart'}
              size={size}
              color={color}
              focused={focused}
              badgeCount={cartItemCount}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <FontAwesome name={focused ? 'user' : 'user-o'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

interface TabBarIconProps extends TabIconProps {
  name: string;
  badgeCount?: number;
}

function TabBarIcon({ name, color, size, focused, badgeCount = 0 }: TabBarIconProps) {
  return (
    <View style={styles.iconContainer}>
      <FontAwesome name={name as keyof typeof FontAwesome.glyphMap} size={size} color={color} />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: Colors.danger,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
