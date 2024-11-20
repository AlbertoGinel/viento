import React from "react";
import { Stack } from "expo-router";
import { useAuthStore } from "../store/useAuthStore";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  const { isAuthenticated } = useAuthStore((state) => state);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack initialRouteName={isAuthenticated ? "protected" : "login"}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="protected" options={{ headerShown: true }} />
        <Stack.Screen name="main" options={{ headerShown: true }} />
      </Stack>
    </>
  );
}
