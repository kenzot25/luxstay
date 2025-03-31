import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  Timestamp,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa1z5zMb5aDcET_qpUGuV4TF_m63bBZNs",
  authDomain: "booking-app-ecf71.firebaseapp.com",
  projectId: "booking-app-ecf71",
  storageBucket: "booking-app-ecf71.firebasestorage.app",
  messagingSenderId: "375722571239",
  appId: "1:375722571239:android:5ec523c314f58e46f27942",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized", db);

const location = "Luxury Hotel Hanoi";

interface RoomData {
  name: string;
  description: string;
  price: number;
  images: string[];
  location: string;
  amenities: string[];
  rating: string;
  maxGuests: number;
  type: string;
  floor: number;
  roomNumber: string;
  createdAt: any;
  updatedAt: any;
  isAvailable: boolean;
}

type RoomType =
  | "standard"
  | "deluxe"
  | "suite"
  | "family"
  | "luxury"
  | "presidential";

// Room types configuration
const roomTypes: Record<RoomType, string> = {
  standard: "Phòng Tiêu Chuẩn",
  deluxe: "Phòng Deluxe",
  suite: "Phòng Suite",
  family: "Phòng Gia Đình",
  luxury: "Phòng Hạng Sang",
  presidential: "Phòng Tổng Thống",
};

// Generate a single room data object
const generateRoomData = (
  floor: number,
  roomNumber: number,
  type: RoomType
): RoomData => {
  const prices = {
    standard: [800000, 1200000],
    deluxe: [1200000, 2000000],
    suite: [2000000, 3500000],
    family: [2500000, 4000000],
    luxury: [4000000, 8000000],
    presidential: [8000000, 15000000],
  };

  const priceRange = prices[type];
  const price =
    Math.floor(Math.random() * (priceRange[1] - priceRange[0])) + priceRange[0];

  const amenitiesByType: Record<RoomType, string[]> = {
    standard: ["WiFi", "TV", "Máy lạnh", "Tủ lạnh mini", "Phòng tắm riêng"],
    deluxe: [
      "WiFi",
      "Smart TV",
      "Máy lạnh",
      "Tủ lạnh",
      "Phòng tắm sang trọng",
      "Ban công",
      "Bồn tắm",
    ],
    suite: [
      "WiFi",
      'Smart TV 55"',
      "Máy lạnh",
      "Tủ lạnh",
      "Phòng khách riêng",
      "Ban công lớn",
      "Bồn tắm",
      "Máy pha cà phê",
    ],
    family: [
      "WiFi",
      "Smart TV",
      "Máy lạnh",
      "Tủ lạnh lớn",
      "2 Phòng ngủ",
      "Phòng khách",
      "Bếp nhỏ",
      "Bồn tắm",
    ],
    luxury: [
      "WiFi",
      'Smart TV 65"',
      "Máy lạnh",
      "Tủ lạnh cao cấp",
      "Phòng khách lớn",
      "Ban công view thành phố",
      "Bồn tắm spa",
      "Bếp đầy đủ",
    ],
    presidential: [
      "WiFi",
      'Smart TV 75"',
      "Máy lạnh",
      "Tủ lạnh cao cấp",
      "Phòng khách VIP",
      "Sân vườn riêng",
      "Bồn tắm massage",
      "Bếp đầy đủ",
      "Phòng xông hơi",
    ],
  };

  return {
    name: `Phòng ${floor}${roomNumber.toString().padStart(2, "0")} - ${roomTypes[type]}`,
    description: `${roomTypes[type]} sang trọng tại tầng ${floor}, với view tuyệt đẹp và đầy đủ tiện nghi cao cấp.`,
    price,
    images: [
      `https://i.pinimg.com/736x/bd/42/68/bd4268a975c6856272fdd7bbb29fe024.jpg`,
      `https://i.pinimg.com/736x/bd/42/68/bd4268a975c6856272fdd7bbb29fe024.jpg`,
      `https://i.pinimg.com/736x/bd/42/68/bd4268a975c6856272fdd7bbb29fe024.jpg`,
    ],
    location,
    amenities: amenitiesByType[type],
    rating: (Math.random() * 2 + 3).toFixed(1),
    maxGuests: type === "family" ? 6 : type === "suite" ? 4 : 2,
    type,
    floor,
    roomNumber: `${floor}${roomNumber.toString().padStart(2, "0")}`,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
    isAvailable: true,
  };
};

// Generate rooms data
const rooms: RoomData[] = [];
const floors = 5;
const roomsPerFloor = 10;
const roomTypesArray: RoomType[] = [
  "standard",
  "deluxe",
  "suite",
  "family",
  "luxury",
  "presidential",
];

for (let floor = 1; floor <= floors; floor++) {
  for (let num = 1; num <= roomsPerFloor; num++) {
    // Randomly select a room type
    const randomType =
      roomTypesArray[Math.floor(Math.random() * roomTypesArray.length)];
    const room = generateRoomData(floor, num, randomType);
    rooms.push(room);
  }
}

// Sample users data
const users = [
  {
    id: "user1",
    displayName: "Nguyen Van A",
    email: "nguyenvana@example.com",
    preferences: {
      notifications: true,
      newsletter: false,
      language: "vi",
    },
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
  {
    id: "user2",
    displayName: "Tran Thi B",
    email: "tranthib@example.com",
    preferences: {
      notifications: false,
      newsletter: true,
      language: "vi",
    },
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
  {
    id: "user3",
    displayName: "Le Van C",
    email: "levanc@example.com",
    preferences: {
      notifications: true,
      newsletter: true,
      language: "en",
    },
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
  {
    id: "user4",
    displayName: "Pham Thi D",
    email: "phamthid@example.com",
    preferences: {
      notifications: false,
      newsletter: false,
      language: "vi",
    },
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
  {
    id: "user5",
    displayName: "Hoang Van E",
    email: "hoangvane@example.com",
    preferences: {
      notifications: true,
      newsletter: true,
      language: "en",
    },
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
];

// Seeder functions
const clearRooms = async () => {
  const roomsCollection = collection(db, "rooms");
  const snapshot = await getDocs(roomsCollection);
  const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletePromises);
  console.log("All old room data cleared.");
};

const seedRooms = async () => {
  const roomsCollection = collection(db, "rooms");
  for (const room of rooms) {
    const docRef = doc(
      roomsCollection,
      room.name.replace(/\s+/g, "_").toLowerCase()
    );
    await setDoc(docRef, room);
    console.log(`Room added with ID: ${docRef.id}`);
  }
};

const seedUsers = async () => {
  const usersCollection = collection(db, "users");
  for (const user of users) {
    const docRef = doc(usersCollection, user.id);
    await setDoc(docRef, user);
    console.log(`User added with ID: ${docRef.id}`);
  }
};

// Main seeder function
const runSeeder = async () => {
  console.log("Starting seeder...");
  await clearRooms();
  await seedRooms();
  await seedUsers();
  console.log("Seeding completed!");
};

runSeeder().catch((error) => {
  console.error("Error during seeding:", error);
});
