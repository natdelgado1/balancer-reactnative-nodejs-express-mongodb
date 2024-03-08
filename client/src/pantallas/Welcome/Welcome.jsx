import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import buttonStyles from "../../estilos/button.style";
import textStyles from "../../estilos/text.style";

/*COMPONENTE DE LA PÁGINA DE BIENVENIDA*/
const WelcomePage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textStyles}>Bienvenido!</Text>
      <Pressable
        title="Register"
        onPress={() => navigation.navigate("Register")}
        style={buttonStyles.btnWelcome}
      >
        <Text style={textStyles.textGreen}>Crear una cuenta</Text>
      </Pressable>
      <Pressable
        title="Login"
        onPress={() => navigation.navigate("Login")}
        style={buttonStyles.btnWelcome}
      >
        <Text style={textStyles.textGreen}>Iniciar Sección</Text>
      </Pressable>
    </SafeAreaView>
  );
};

/*ESTILOS DE LA PÁGINA DE BIENVENIDA*/
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
    marginBottom: 20,
  },
});

export default WelcomePage;
