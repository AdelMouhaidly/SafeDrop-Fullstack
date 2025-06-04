import { useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import usuarioService from './services/usuarioService';

const { height, width } = Dimensions.get("window");

export default function Cadastro() {
  const navigation = useNavigation<any>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: "Cidadão", value: "cidadao" },
    { label: "Voluntário", value: "voluntario" },
    { label: "Órgão Público", value: "orgaopublico"},
  ]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontescarregaveis] = useFonts({
    "RobotoBold": require('./assets/fonts/Roboto_Condensed-Bold.ttf'),
  });
  
  if (!fontescarregaveis) return null;

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCadastro = async () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "Por favor, digite seu nome.");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, digite seu email.");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Erro", "Por favor, digite um email válido.");
      return;
    }

    if (!senha.trim()) {
      Alert.alert("Erro", "Por favor, digite sua senha.");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (!value) {
      Alert.alert("Erro", "Por favor, selecione o tipo de usuário.");
      return;
    }

    try {
      setLoading(true);

      const dadosUsuario = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha,
        tipoUsuario: value
      };

      const resultado = await usuarioService.cadastrar(dadosUsuario);

      if (resultado.success) {
        Alert.alert(
          "Sucesso", 
          "Cadastro realizado com sucesso!", 
          [{
            text: "OK",
            onPress: () => {
              setNome("");
              setEmail("");
              setSenha("");
              setValue(null);
   
              navigation.navigate("Entrar");
            }
          }]
        );
      } else {
        Alert.alert("Erro", resultado.error || "Erro ao realizar cadastro. Tente novamente.");
      }

    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      Alert.alert("Erro", "Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/images/safeDropLogo.png")} style={styles.logo} />
      <View style={styles.linha} />
      <Text style={styles.titulo}>CADASTRO</Text>
      <View style={styles.inputLabel}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu nome" 
          placeholderTextColor="#FFFFFF"
          value={nome}
          onChangeText={setNome}
          editable={!loading}
        />
        
        <Text style={styles.label}>Email:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu email" 
          placeholderTextColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
        
        <Text style={styles.label}>Senha:</Text>
        <TextInput 
          style={styles.input} 
          secureTextEntry 
          placeholder="Digite sua senha" 
          placeholderTextColor="#FFFFFF"
          value={senha}
          onChangeText={setSenha}
          editable={!loading}
        />
        
        <Text style={styles.label}>Tipo de usuário:</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Selecione o tipo de usuário"
          style={styles.picker}
          dropDownContainerStyle={styles.dropDownIcone}
          textStyle={{ color: "#FFFFFF" }}
          listItemLabelStyle={{ color: "#000" }}
          disabled={loading}
        />
      </View>
      
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          loading && styles.buttonDisabled
        ]}
        onPress={handleCadastro}
        disabled={loading}
      >
        <Text style={styles.textobutton}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Text>
      </Pressable>
      
      <Text style={styles.textoLogin}>
        Já tem conta? {""} 
        <Text 
          style={styles.buttonLogin} 
          onPress={() => !loading && navigation.navigate("Entrar")}
        >
          Login
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
    fontWeight: "bold"
  },
  inputLabel: {
    width: "80%",
    alignItems: "flex-start",
  },
  label: {
    textAlign: "left",
    marginTop: 10,
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
  picker: {
    width: "100%",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: "#5EA9FF",
  },
  dropDownIcone: {
    borderColor: "#FFFFFF",
    backgroundColor: "#FFF",
  },
  button: {
    width: 362,
    height: 49,
    backgroundColor: "#196EEE",
    borderRadius: 8,
    marginTop: 70,
    justifyContent: "center"
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
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
  textoLogin: {
    marginTop: 20,
    color: "#FFFFFF"
  },
  buttonLogin: {
    fontWeight: "bold"
  }
});