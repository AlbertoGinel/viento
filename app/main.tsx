import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location"; // For getting user location
import { useAuthStore } from "../store/useAuthStore"; // Zustand store for authentication
import { useRouter } from "expo-router"; // For navigation

const Main: React.FC = () => {
  const { isAuthenticated } = useAuthStore((state) => state); // Get auth state from Zustand store
  const router = useRouter(); // Use the router to navigate
  const [userLocation, setUserLocation] = useState(null); // Store user's location
  const [isReady, setIsReady] = useState(false); // To track when the component is mounted

  // Wait for the component to be ready (mounted) before attempting navigation
  useEffect(() => {
    setIsReady(true); // Mark the component as ready after it's mounted
  }, []);

  // If the user is not authenticated and the component is mounted, redirect to login
  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/login"); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, isReady, router]);

  // Request user location
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocation();
  }, []);

  if (!isAuthenticated || !userLocation) {
    // Optionally, you can return a loading state until location or authentication is ready
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject} // Fill the entire screen
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.005, // Close zoom level for user's location
          longitudeDelta: 0.005, // Close zoom level for user's location
        }}
        showsUserLocation={true} // Show the user's location as a blue dot
      >
        {/* Marker at the user's location */}
        <Marker
          coordinate={userLocation}
          title="You are here"
          description="This is your current location"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
