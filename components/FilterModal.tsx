import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { setFilters, clearFilters, selectRoomsFilters } from '@/store/slices/roomsSlice';
import { Room, RoomFilters } from '@/store/types';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const ROOM_TYPES: Room['type'][] = ['single', 'double', 'suite', 'presidential'];
const AMENITIES = [
  'WiFi',
  'TV',
  'Kitchen',
  'Air Conditioning',
  'Pool',
  'Gym',
  'Parking',
  'Breakfast',
];

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const currentFilters = useSelector(selectRoomsFilters);
  
  const [priceRange, setPriceRange] = useState<[number, number]>(
    currentFilters.priceRange || [0, 1000]
  );
  const [selectedType, setSelectedType] = useState<Room['type'] | undefined>(
    currentFilters.type
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    currentFilters.amenities || []
  );
  const [guests, setGuests] = useState<number>(
    currentFilters.guests || 1
  );

  const handleApply = () => {
    const filters: RoomFilters = {
      priceRange,
      type: selectedType,
      amenities: selectedAmenities,
      guests,
    };
    dispatch(setFilters(filters));
    onClose();
  };

  const handleReset = () => {
    setPriceRange([0, 1000]);
    setSelectedType(undefined);
    setSelectedAmenities([]);
    setGuests(1);
    dispatch(clearFilters());
    onClose();
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <FontAwesome name="close" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.priceRangeContainer}>
              <Text style={styles.priceText}>${priceRange[0]}</Text>
              <Text style={styles.priceText}>${priceRange[1]}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1000}
              step={50}
              value={priceRange[1]}
              minimumTrackTintColor={Colors.primary}
              maximumTrackTintColor={Colors.lightGray}
              onValueChange={(value: number) => setPriceRange([priceRange[0], value])}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Room Type</Text>
            <View style={styles.typeContainer}>
              {ROOM_TYPES.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    selectedType === type && styles.typeButtonSelected,
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      selectedType === type && styles.typeTextSelected,
                    ]}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Guests</Text>
            <View style={styles.guestsContainer}>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => setGuests(prev => Math.max(1, prev - 1))}
              >
                <FontAwesome name="minus" size={16} color={Colors.primary} />
              </TouchableOpacity>
              <Text style={styles.guestsCount}>{guests}</Text>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => setGuests(prev => prev + 1)}
              >
                <FontAwesome name="plus" size={16} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {AMENITIES.map(amenity => (
                <TouchableOpacity
                  key={amenity}
                  style={[
                    styles.amenityButton,
                    selectedAmenities.includes(amenity) && styles.amenityButtonSelected,
                  ]}
                  onPress={() => toggleAmenity(amenity)}
                >
                  <Text
                    style={[
                      styles.amenityText,
                      selectedAmenities.includes(amenity) && styles.amenityTextSelected,
                    ]}
                  >
                    {amenity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  typeButtonSelected: {
    backgroundColor: Colors.primary,
  },
  typeText: {
    color: Colors.primary,
  },
  typeTextSelected: {
    color: Colors.white,
  },
  guestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  guestButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestsCount: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  amenityButtonSelected: {
    backgroundColor: Colors.primary,
  },
  amenityText: {
    color: Colors.primary,
  },
  amenityTextSelected: {
    color: Colors.white,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.white,
    gap: 8,
  },
  resetButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  resetButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FilterModal;