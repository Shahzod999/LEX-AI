import { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import ThemedButton from "../components/ThemedButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { isDarkMode, colors } = useTheme();
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      login();
      router.replace("/(tabs)");
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.loginContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Login</Text>

        <TextInput
          style={[
            styles.input, 
            { 
              borderColor: isDarkMode ? '#4A4A4A' : '#ddd',
              color: colors.text,
              backgroundColor: isDarkMode ? '#2A2E38' : 'white',
            }
          ]}
          placeholder="Email"
          placeholderTextColor={isDarkMode ? '#AAAAAA' : '#999999'}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={[
            styles.input, 
            { 
              borderColor: isDarkMode ? '#4A4A4A' : '#ddd',
              color: colors.text,
              backgroundColor: isDarkMode ? '#2A2E38' : 'white',
            }
          ]}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? '#AAAAAA' : '#999999'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <ThemedButton
          title="Login"
          onPress={handleLogin}
          loading={loading}
          icon="log-in-outline"
          iconPosition="right"
          style={{ marginTop: 15 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    width: "80%",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
});
