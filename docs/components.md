# LuxStay Component Library

## Core Components

### RoomCard
A card component for displaying room information.

```tsx
import RoomCard from '@/components/RoomCard';

<RoomCard
  room={roomData}
  horizontal={false}
  onPress={(room) => handleRoomPress(room)}
/>
```

Props:
- `room: Room` - Room data object
- `horizontal?: boolean` - Display in horizontal layout
- `onPress?: (room: Room) => void` - Press handler

### SearchBar
A reusable search input component.

```tsx
import SearchBar from '@/components/SearchBar';

<SearchBar
  placeholder="Search rooms..."
  value={searchQuery}
  onChangeText={handleSearch}
  showFilter={true}
  onFilterPress={handleFilterPress}
  autoFocus={false}
/>
```

Props:
- `placeholder?: string` - Placeholder text
- `value?: string` - Input value
- `onChangeText?: (text: string) => void` - Text change handler
- `showFilter?: boolean` - Show filter button
- `onFilterPress?: () => void` - Filter button press handler
- `autoFocus?: boolean` - Auto focus on mount

### EmptyState
A component for displaying empty state messages.

```tsx
import EmptyState from '@/components/EmptyState';

<EmptyState
  icon="search"
  title="No Results"
  message="Try adjusting your search"
  iconSize={50}
  iconColor={Colors.gray}
/>
```

Props:
- `icon: string` - FontAwesome icon name
- `title: string` - Main message
- `message: string` - Secondary message
- `iconSize?: number` - Icon size
- `iconColor?: string` - Icon color

### FilterModal
A modal component for filtering rooms.

```tsx
import FilterModal from '@/components/FilterModal';

<FilterModal
  visible={showFilters}
  onClose={handleClose}
/>
```

Props:
- `visible: boolean` - Modal visibility
- `onClose: () => void` - Close handler

## UI Components

### ThemedText
Text component with theme support.

```tsx
import { ThemedText } from '@/components/ThemedText';

<ThemedText
  style={styles.text}
  darkColor="#ffffff"
  lightColor="#000000"
>
  Hello World
</ThemedText>
```

Props:
- `style?: TextStyle` - Text style
- `darkColor?: string` - Dark mode color
- `lightColor?: string` - Light mode color

### ThemedView
View component with theme support.

```tsx
import { ThemedView } from '@/components/ThemedView';

<ThemedView
  style={styles.container}
  darkColor="#000000"
  lightColor="#ffffff"
>
  {children}
</ThemedView>
```

Props:
- `style?: ViewStyle` - Container style
- `darkColor?: string` - Dark mode background
- `lightColor?: string` - Light mode background

## Form Components

### Button
Custom button component with loading state.

```tsx
import Button from '@/components/Button';

<Button
  title="Book Now"
  onPress={handleBooking}
  loading={isLoading}
  disabled={!isAvailable}
  variant="primary"
/>
```

Props:
- `title: string` - Button text
- `onPress: () => void` - Press handler
- `loading?: boolean` - Loading state
- `disabled?: boolean` - Disabled state
- `variant?: 'primary' | 'secondary' | 'outline'` - Button style

### Input
Custom text input component.

```tsx
import Input from '@/components/Input';

<Input
  label="Email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
  autoCapitalize="none"
/>
```

Props:
- `label: string` - Input label
- `value: string` - Input value
- `onChangeText: (text: string) => void` - Change handler
- `error?: string` - Error message
- `keyboardType?: KeyboardType` - Keyboard type
- `autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'` - Auto capitalize

## Navigation Components

### TabBarIcon
Icon component for tab navigation.

```tsx
import TabBarIcon from '@/components/TabBarIcon';

<TabBarIcon
  name="home"
  color={Colors.primary}
  size={24}
  focused={true}
  badgeCount={2}
/>
```

Props:
- `name: string` - Icon name
- `color: string` - Icon color
- `size: number` - Icon size
- `focused: boolean` - Active state
- `badgeCount?: number` - Badge number

## Utility Components

### Collapsible
Animated collapsible component.

```tsx
import Collapsible from '@/components/Collapsible';

<Collapsible collapsed={!isExpanded}>
  <Text>Collapsible content</Text>
</Collapsible>
```

Props:
- `collapsed: boolean` - Collapsed state
- `children: React.ReactNode` - Content

### ParallaxScrollView
ScrollView with parallax header effect.

```tsx
import ParallaxScrollView from '@/components/ParallaxScrollView';

<ParallaxScrollView
  headerImage={headerImage}
  title="Room Details"
  height={300}
>
  <View>
    <Text>Scrollable content</Text>
  </View>
</ParallaxScrollView>
```

Props:
- `headerImage: ImageSourcePropType` - Header image
- `title?: string` - Header title
- `height?: number` - Header height
- `children: React.ReactNode` - Scrollable content

## Style Guide

### Colors
Use the Colors constant from `@/constants/Colors`:

```typescript
import { Colors } from '@/constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text.primary,
  },
});
```

### Typography
Consistent text styles:

```typescript
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  body: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
});
```

### Spacing
Consistent spacing units:

```typescript
const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
});
```

## Best Practices

1. Use TypeScript for all components
2. Include prop types documentation
3. Implement error boundaries
4. Add loading states
5. Handle edge cases
6. Write unit tests
7. Use memo for performance
8. Follow accessibility guidelines