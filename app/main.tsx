import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const Main: React.FC = () => {
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer
  const drawerAnimation = useState(new Animated.Value(-SCREEN_WIDTH))[0]; // Animation for the drawer

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocation();
  }, []);

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      Animated.timing(drawerAnimation, {
        toValue: -SCREEN_WIDTH, // Hide the drawer
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsDrawerOpen(false));
    } else {
      Animated.timing(drawerAnimation, {
        toValue: 0, // Show the drawer
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsDrawerOpen(true));
    }
  };

  if (!userLocation) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={userLocation}
          title="You are here"
          description="This is your current location"
        />
      </MapView>

      {/* Circular Button for the Drawer */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
        <MaterialIcons name="menu" size={24} color="white" />
      </TouchableOpacity>

      {/* Side Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX: drawerAnimation }] },
        ]}
      >
        <Text style={styles.drawerTitle}>Menu</Text>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => alert("My Wallet")}
        >
          <MaterialIcons name="account-balance-wallet" size={24} />
          <Text style={styles.drawerText}>My Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => alert("Get Free Rides")}
        >
          <MaterialIcons name="card-giftcard" size={24} />
          <Text style={styles.drawerText}>Get Free Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => alert("Tuul Rewards")}
        >
          <MaterialIcons name="star" size={24} />
          <Text style={styles.drawerText}>Tuul Rewards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => alert("Tuul Ticket")}
        >
          <MaterialIcons name="receipt" size={24} />
          <Text style={styles.drawerText}>Tuul Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => alert("My Rides")}
        >
          <MaterialIcons name="directions-bike" size={24} />
          <Text style={styles.drawerText}>My Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => alert("Tuul for Business")}
        >
          <MaterialIcons name="work" size={24} />
          <Text style={styles.drawerText}>Tuul for Business</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => alert("Support and Safety")}
        >
          <MaterialIcons name="support-agent" size={24} />
          <Text style={styles.drawerText}>Support and Safety</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.8, // Drawer width is 80% of the screen
    backgroundColor: "#ffffff",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 10, // Ensures the drawer is above the map
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  drawerText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Main;
