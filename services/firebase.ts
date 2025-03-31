import { initializeApp } from "firebase/app";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  Timestamp,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { store } from "@/store";
import { setError, setLoading, setUser } from "@/store/slices/authSlice";
import { AppUser } from "@/store/types";
import {
  Booking,
  CreateBookingRequest,
  Room,
  RoomFilters,
  UpdateProfileRequest,
  UserProfile,
  WishlistItem,
} from "@/types/api";

// Your Firebase configuration
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
const auth = getAuth(app);
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
        constraints.push(where("location", "==", filters.location_contains));
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

    return snapshot.docs.map((doc) => {
      const data = doc.data() as Room;
      return {
        id: doc.id,
        ...data,
        createdAt: "",
        updatedAt: "",
      };
    });
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
