import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuthStore } from "../store/useAuthStore"; // Zustand store for authentication
import { useRouter } from "expo-router";

const Main: React.FC = () => {
  const { isAuthenticated, userData } = useAuthStore((state) => state); // Zustand state
  const router = useRouter();

  // Redirect to /login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login"); // Replace the current route with /login
    }
  }, [isAuthenticated, router]);

  // Show nothing if not authenticated (redirecting)
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text>Redirecting...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Display the displayName from Firestore userData */}
      <Text style={styles.greeting}>
        Hello, {userData?.displayName || "User"}!
      </Text>
      <Text style={styles.title}>Main Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa", // Light background color for better readability
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555", // Medium text color
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Dark text color
  },
});

export default Main;
