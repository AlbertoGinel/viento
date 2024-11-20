import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "expo-router"; // For navigation

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isAuthenticated } = useAuthStore((state) => state); // Zustand login and authentication state
  const router = useRouter();

  // Redirect to /protected if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/main"); // Redirect to the protected route
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      login(email, password); // Call the login function from Zustand store with email and password
    } else {
      Alert.alert("Please enter both email and password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {/* Login Button */}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
});

export default Login;
