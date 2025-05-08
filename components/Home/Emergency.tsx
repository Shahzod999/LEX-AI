import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

const Emergency = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.emergencyButton}>
        <Ionicons name="shield-checkmark-outline" size={24} color="white" />
      </View>
    </View>
  );
};

export default Emergency;

const styles = StyleSheet.create({
  container: {
    position: "fixed",
    bottom: 100,
    right: 0,
    zIndex: 1000,
    width: 50,
    height: 50,
  },
  emergencyButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 50,
  },
});
