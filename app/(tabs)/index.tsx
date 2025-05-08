import { ScrollView, StyleSheet, Text } from "react-native";
import ThemedScreen from "../../components/ThemedScreen";
import HomeCard from "@/components/Card/HomeCard";
import { useTheme } from "@/context/ThemeContext";
import Header from "@/components/Card/Header";
import Emergency from "@/components/Home/Emergency";
export default function HomeScreen() {
  const { colors } = useTheme();
  return (
    <ThemedScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Welcome to Lex - Your Legal Guardian"
          subtitle="You're not alone your legal journey"
        />
        <Text
          style={[
            styles.quote,
            { color: colors.hint, borderColor: colors.accent },
          ]}>
          Trust the proccess
        </Text>

        <Text style={[styles.title, { color: colors.text }]}>
          How can we help you today?
        </Text>

        <HomeCard
          title="Upload Documents"
          description="Let AI analyze your legal papers"
          icon="cloud-upload-outline"
          color={colors.accent}
        />
        <HomeCard
          title="Immigration Help"
          description="Navigate visa and status options"
          icon="document-text"
          color={colors.accent}
        />
        <HomeCard
          title="Ask Question"
          description="Chat with AI legal assistant"
          icon="chatbubble-outline"
          color={colors.success}
        />
        <HomeCard
          title="Find Resources"
          description="local help and legal aid"
          icon="location-outline"
          color={colors.warning}
        />
      </ScrollView>
      <Emergency />
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  quote: {
    fontSize: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderRadius: 4,
    marginVertical: 16,
  },
});
