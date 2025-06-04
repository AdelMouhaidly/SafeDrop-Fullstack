import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import usuarioService from './services/usuarioService';

const { height, width } = Dimensions.get("window");

export default function Entrar() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const [fontescarregaveis] = useFonts({
    "RobotoBold": require('./assets/fonts/Roboto_Condensed-Bold.ttf'),
  });
  
  if (!fontescarregaveis) return null;

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setCarregando(true);
    try {
      const resultado = await usuarioService.login(email, senha);
      
      if (resultado.success) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Menu'); 
      } else {
        Alert.alert('Erro', resultado.error || 'Erro ao fazer login');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro inesperado ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/images/safeDropLogo.png")} style={styles.logo} />
      <View style={styles.linha} />
      <Text style={styles.titulo}>Login</Text>
      <View style={styles.inputLabel}>
        <Text style={styles.label}>Email:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu email" 
          placeholderTextColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput 
          style={styles.input} 
          secureTextEntry 
          placeholder="Digite sua senha" 
          placeholderTextColor="#FFFFFF"
          value={senha}
          onChangeText={setSenha}
        />
      </View>
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          carregando && styles.buttonDisabled
        ]}
        onPress={handleLogin}
        disabled={carregando}
      >
        <Text style={styles.textobutton}>
          {carregando ? 'Entrando...' : 'Login'}
        </Text>
      </Pressable>
      <Text style={styles.textoLogin}>
        Não tem uma conta? {""} 
        <Text style={styles.buttonLogin} onPress={() => navigation.navigate("Cadastro")}>
          Cadastro
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "#5EA9FF",
    alignItems: "center",
  },
  logo: {
    width: 194,
    height: 194,
    marginTop: 70,
  },
  linha: {
    backgroundColor: "#FFFFFF",
    width: 357,
    height: 1,
  },
  titulo: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 20,
    fontWeight: "bold",
  },
  inputLabel: {
    width: "80%",
    alignItems: "flex-start",
    marginTop: 50
  },
  label: {
    textAlign: "left",
    marginTop: 40,
    color: "#FFFFFF",
  },
  input: {
    width: "100%",
    height: 42,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
    color: "#FFFFFF",
    backgroundColor: "#5EA9FF",
  },
  button: {
    width: 362,
    height: 49,
    backgroundColor: "#196EEE",
    borderRadius: 8,
    marginTop: 130,
    justifyContent: "center"
  },
  textobutton: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 15,
    fontFamily: "RobotoBold"
  },
  buttonPressed: {
    backgroundColor: "#145DD1"
  },
  buttonDisabled: {
    backgroundColor: "#999999"
  },
  textoLogin: {
    marginTop: 20,
    color: "#FFFFFF"
  },
  buttonLogin: {
    fontWeight: "bold"
  }
});
