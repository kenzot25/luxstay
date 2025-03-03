import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { AppRoutePaths } from '@/types/router';

interface SearchBarProps {
  onPress?: () => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  showFilter?: boolean;
  onFilterPress?: () => void;
  disabled?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onPress,
  placeholder = 'Search rooms...',
  containerStyle,
  inputStyle,
  showFilter = false,
  onFilterPress,
  disabled = false,
  value,
  onChangeText,
  autoFocus = false,
}) => {
  const router = useRouter();
  const isInteractive = !!onChangeText;

  const handlePress = () => {
    if (disabled) return;
    if (onPress) {
      onPress();
    } else if (!isInteractive) {
      router.push('/(tabs)/search' as AppRoutePaths);
    }
  };

  const renderInput = () => {
    if (isInteractive) {
      return (
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray}
          value={value}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
        />
      );
    }

    return (
      <Text style={[styles.placeholder, inputStyle]}>
        {placeholder}
      </Text>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={handlePress}
        disabled={disabled || isInteractive}
      >
        <FontAwesome 
          name="search"
          size={20}
          color={Colors.gray}
          style={styles.searchIcon}
        />
        {renderInput()}
      </TouchableOpacity>

      {showFilter && (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={onFilterPress}
          disabled={disabled}
        >
          <FontAwesome
            name="sliders"
            size={20}
            color={Colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    padding: 0,
  },
  placeholder: {
    flex: 1,
    fontSize: 16,
    color: Colors.gray,
  },
  filterButton: {
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchBar;
