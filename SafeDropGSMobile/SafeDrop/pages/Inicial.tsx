import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function Index() {
  const navigation = useNavigation<any>();

  const [fontescarregaveis] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf")
  });
  if (!fontescarregaveis) return null;

  return (
    <ImageBackground 
      source={require('./assets/images/fundoComeco.png')} 
      style={styles.background}
      resizeMode="cover"
    > 
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require("./assets/images/safeDropLogo.png")} style={{ width: 154, height: 150 }}/>
        </View>

        <View style={styles.textoPrincipal}>
          <Text style={styles.texto}>Seja Bem-vindo</Text>
          <Text style={styles.textoBold}>Tecnologia{'\n'}que salva.</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
          onPress={() => navigation.navigate("Entrar")}
        >
          <Text style={styles.textoEntrar}>Entrar</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.buttonCadastro,
            pressed && styles.buttonPressed
          ]} 
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.textoEntrar} >Cadastro</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  background: {
    flex: 1,
    height: height,
    width: width,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  textoPrincipal: {
    marginTop: 200,
    width: "70%",
    fontSize: 42,
  },
  texto: {
    fontSize: 24,
    color: "#FFFFFF",
    fontFamily: "Montserrat-Regular"
  },
  textoBold: {
    color: "#FFFFFF",
    fontSize: 40,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#196EEE",
    width: 317,
    height: 61,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonPressed: {
    backgroundColor: "#145DD1",
  },
  textoEntrar: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat-Regular"
  },
  buttonCadastro: {
    width: 317,
    height: 61,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#196EEE",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
