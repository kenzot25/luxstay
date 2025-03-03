import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  initializeAuth,
  browserLocalPersistence,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { store } from "@/store";
import { setUser, setLoading, setError } from "@/store/slices/authSlice";
import { AppUser } from "@/store/types";
import {
  Room,
  Booking,
  UserProfile,
  WishlistItem,
  RoomFilters,
  CreateBookingRequest,
  UpdateProfileRequest,
} from "@/types/api";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});
const db = getFirestore(app);

// Collection references
const roomsCollection = collection(db, "rooms");
const bookingsCollection = collection(db, "bookings");
const usersCollection = collection(db, "users");
const wishlistsCollection = collection(db, "wishlists");

// Convert Firebase user to AppUser
const mapFirebaseUser = (firebaseUser: FirebaseUser): AppUser => {
  return {
    ...firebaseUser,
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    uid: firebaseUser.uid,
    wishlist: [], // Will be fetched separately
    providerData: firebaseUser.providerData,
  };
};

// Auth state observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(setUser(mapFirebaseUser(user)));
  } else {
    store.dispatch(setUser(null));
  }
});

export const firebaseService = {
  // Auth methods
  signIn: async (email: string, password: string) => {
    try {
      store.dispatch(setLoading(true));
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      store.dispatch(setUser(mapFirebaseUser(userCredential.user)));
      store.dispatch(setError(null));
    } catch (error) {
      store.dispatch(setError((error as Error).message));
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      store.dispatch(setLoading(true));
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      store.dispatch(setUser(mapFirebaseUser(userCredential.user)));
      store.dispatch(setError(null));
    } catch (error) {
      store.dispatch(setError((error as Error).message));
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  signOut: async () => {
    try {
      store.dispatch(setLoading(true));
      await signOut(auth);
      store.dispatch(setUser(null));
      store.dispatch(setError(null));
    } catch (error) {
      store.dispatch(setError((error as Error).message));
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  getCurrentUser: () => {
    return auth.currentUser;
  },

  getIdToken: async () => {
    const user = auth.currentUser;
    if (user) {
      return user.getIdToken();
    }
    return null;
  },

  // Room operations
  getRooms: async (filters?: RoomFilters) => {
    const constraints = [];

    if (filters) {
      if (filters.price_gte)
        constraints.push(where("price", ">=", filters.price_gte));
      if (filters.price_lte)
        constraints.push(where("price", "<=", filters.price_lte));
      if (filters.location_contains)
        constraints.push(where("location", ">=", filters.location_contains));
      if (filters.type) constraints.push(where("type", "==", filters.type));
      if (filters.rating_gte)
        constraints.push(where("rating", ">=", filters.rating_gte));
      if (filters.guests_gte)
        constraints.push(where("maxGuests", ">=", filters.guests_gte));
    }

    const q =
      constraints.length > 0
        ? query(roomsCollection, ...constraints)
        : query(roomsCollection);

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Room),
    }));
  },

  getRoomById: async (id: string) => {
    const docRef = doc(roomsCollection, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Room not found");
    return { id: docSnap.id, ...(docSnap.data() as Room) };
  },

  // Booking operations
  createBooking: async (booking: CreateBookingRequest) => {
    const newBooking: Booking = {
      ...booking,
      paymentStatus: "pending",
      bookingStatus: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = doc(bookingsCollection);
    await setDoc(docRef, newBooking);
    return { id: docRef.id, ...newBooking };
  },

  getUserBookings: async (userId: string) => {
    const q = query(
      bookingsCollection,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Booking),
    }));
  },

  // User Profile operations
  updateUserProfile: async (userId: string, profile: UpdateProfileRequest) => {
    const docRef = doc(usersCollection, userId);
    const updateData = {
      ...profile,
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(docRef, updateData);
    const updatedDoc = await getDoc(docRef);
    return { id: updatedDoc.id, ...(updatedDoc.data() as UserProfile) };
  },

  getUserProfile: async (userId: string) => {
    const docRef = doc(usersCollection, userId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("User profile not found");
    return { id: docSnap.id, ...(docSnap.data() as UserProfile) };
  },

  // Wishlist operations
  addToWishlist: async (roomId: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const newWishlist: WishlistItem = {
      userId: user.uid,
      roomId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = doc(wishlistsCollection);
    await setDoc(docRef, newWishlist);
    return { id: docRef.id, ...newWishlist };
  },

  removeFromWishlist: async (wishlistId: string) => {
    await deleteDoc(doc(wishlistsCollection, wishlistId));
  },

  getUserWishlist: async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const q = query(wishlistsCollection, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as WishlistItem),
    }));
  },
};
