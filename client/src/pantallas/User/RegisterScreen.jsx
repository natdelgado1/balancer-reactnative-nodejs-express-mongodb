import { Button, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

const RegisterScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ADRIAN</Text>
      <Text style={styles.subtitle}>Hola crea una cuenta aquí</Text>
      <Pressable
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9F1B3",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RegisterScreen;
