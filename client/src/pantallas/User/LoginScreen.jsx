import { Button, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>The best way to manage your finances</Text>
      <Pressable
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
