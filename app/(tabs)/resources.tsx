import { Text, View, StyleSheet } from "react-native";

export default function ResourcesScreen() {
  return (
    <View style={styles.container}>
      <Text>Resources Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}); 