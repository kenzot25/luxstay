import { Room as ApiRoom, StrapiData, RoomResponse } from '@/types/api';
import { Room } from '@/store/types';

export function mapApiRoomToRoom(apiData: StrapiData<ApiRoom>): Room {
  const apiRoom = apiData.attributes;
  
  return {
    id: apiData.id.toString(),
    name: apiRoom.name,
    description: apiRoom.description,
    price: apiRoom.price,
    images: apiRoom.images.map(img => ({ uri: img })),
    location: apiRoom.location,
    amenities: apiRoom.amenities,
    rating: apiRoom.rating,
    reviews: 0, // Default value until reviews are implemented
    type: apiRoom.type,
    isAvailable: true, // Default value until availability system is implemented
    bedrooms: 1, // Default value
    bathrooms: 1, // Default value
    maxGuests: 2, // Default value based on room type
    size: 0, // Default value
    facilities: apiRoom.amenities, // Using amenities as facilities for now
    cancellationPolicy: 'Flexible', // Default value
    checkInTime: '14:00', // Default check-in time
    checkOutTime: '12:00', // Default check-out time
    houseRules: [], // Default value
  };
}

export function mapApiRoomsToRooms(response: RoomResponse): Room[] {
  return response.data.map(mapApiRoomToRoom);
}

// Helper function to determine max guests based on room type
export function getMaxGuestsByRoomType(type: ApiRoom['type']): number {
  switch (type) {
    case 'single':
      return 1;
    case 'double':
      return 2;
    case 'suite':
      return 4;
    case 'presidential':
      return 6;
    default:
      return 2;
  }
}

// Helper function to determine room size based on type
export function getRoomSizeByType(type: ApiRoom['type']): number {
  switch (type) {
    case 'single':
      return 20; // 20 sq m
    case 'double':
      return 30; // 30 sq m
    case 'suite':
      return 50; // 50 sq m
    case 'presidential':
      return 100; // 100 sq m
    default:
      return 25;
  }
}

// Helper function to get default amenities based on room type
export function getDefaultAmenities(type: ApiRoom['type']): string[] {
  const baseAmenities = ['WiFi', 'TV', 'Air Conditioning'];
  
  switch (type) {
    case 'single':
      return baseAmenities;
    case 'double':
      return [...baseAmenities, 'Mini Bar'];
    case 'suite':
      return [...baseAmenities, 'Mini Bar', 'Kitchen', 'Living Room'];
    case 'presidential':
      return [...baseAmenities, 'Mini Bar', 'Kitchen', 'Living Room', 'Private Pool', 'Gym'];
    default:
      return baseAmenities;
  }
}