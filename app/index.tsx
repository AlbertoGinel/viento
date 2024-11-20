import { Link } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Viento</Text>
      {/* Link to navigate to the login screen */}
      <Link href="/login">
        <Button title="Go to Login" />
      </Link>
    </View>
  );
}
