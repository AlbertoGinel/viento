import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const Index: React.FC = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/snow.png")} // Replace with the correct path to the image
      style={styles.background}
      resizeMode="cover" // Ensure the image scales appropriately
    >
      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>VIENTO</Text>
        <Text style={styles.subtitle}>
          Don't stop scooting during winter{"\n"}Just snowscoot!
        </Text>
      </View>

      {/* Login Button at the Bottom */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  textContainer: {
    position: "absolute", // Allows explicit positioning
    top: "10%", // Positions the container at 25% of the screen height
    left: 0, // Ensures the container is left-aligned (optional, just for clarity)
    right: 0, // Ensures the container spans the full width (optional)
    alignItems: "center", // Centers text horizontally
    paddingHorizontal: 20, // Optional: add some horizontal padding for aesthetics
  },
  title: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#2e6ef7",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#2e6ef7",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Index;
