import { create } from "zustand";
import { auth, signInWithEmailAndPassword, signOut } from "../utils/firebaseConfig";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../utils/firebaseConfig"; // Firestore instance

interface AuthState {
  user: User | null; // Firebase Auth user
  userData: { displayName: string; email: string; role: string } | null; // Firestore user data
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userData: null,
  isAuthenticated: false,

  // Login function
  login: async (email: string, password: string) => {
    try {
      // Authenticate user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user info from Firestore using the localId (Firebase uid)
      const userDocRef = doc(db, "users", user.uid); // Use user's uid as document ID
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as { displayName: string; email: string; role: string };

        // Set user and Firestore user data in the Zustand store
        set({
          user,
          userData,
          isAuthenticated: true,
        });
      } else {
        console.error("No Firestore user data found for the authenticated user.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  },

  // Logout function
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, userData: null, isAuthenticated: false });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },

  // Set user manually
  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
}));
