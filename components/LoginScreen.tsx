import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { useAuthStore } from "../store/useAuthStore"; // Assuming Zustand for state management

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // State for username
  const [password, setPassword] = useState<string>(""); // State for password
  const { login } = useAuthStore((state) => state); // Login function from Zustand store

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      login(username, password); // Assuming login function takes both username and password
    } else {
      Alert.alert("Please enter both username and password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Hide password text for security
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
