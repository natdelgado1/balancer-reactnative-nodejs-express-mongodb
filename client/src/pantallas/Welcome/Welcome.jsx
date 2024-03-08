import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import buttonStyles from "../../estilos/button.style";

const WelcomePage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textStyles}>Welcome</Text>
      <Pressable
        title="Register"
        onPress={() => navigation.navigate("Register")}
        style={buttonStyles.btnBasic}
      >
        <Text>Crear una cuenta</Text>
      </Pressable>
      <Pressable title="Login" onPress={() => navigation.navigate("Login")}>
        <Text>Iniciar Sección</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B9F1B3",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyles: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default WelcomePage;
