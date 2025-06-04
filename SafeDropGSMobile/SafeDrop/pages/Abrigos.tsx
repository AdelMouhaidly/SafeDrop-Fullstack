import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

interface Abrigo {
  id_abrigo: number;
  nome: string;
  endereco: string;
  telefone: string;
  capacidade_total: number;
  vagas_disponiveis: number;
  status: "disponivel" | "lotado" | "inativo";
}

export default function Abrigos() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const [openVaga, setOpenVaga] = useState(false);
  const [vaga, setVaga] = useState<string | null>(null);
  const [vagas, setVagas] = useState([
    { label: "Todas", value: "todas" },
    { label: "0-10", value: "0-10" },
    { label: "11-30", value: "11-30" },
    { label: "31-50", value: "31-50" },
    { label: "51-100", value: "51-100" },
  ]);

  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [statusOptions, setStatusOptions] = useState([
    { label: "Disponível", value: "disponivel" },
    { label: "Lotado", value: "lotado" },
    { label: "Inativo", value: "inativo" },
  ]);

  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockAbrigos: Abrigo[] = [
      {
        id_abrigo: 1,
        nome: "Abrigo Central",
        endereco: "Rua das Flores, 123",
        telefone: "(11) 99999-0001",
        capacidade_total: 100,
        vagas_disponiveis: 15,
        status: "disponivel",
      },
      {
        id_abrigo: 2,
        nome: "Abrigo Norte",
        endereco: "Av. Brasil, 456",
        telefone: "(11) 99999-0002",
        capacidade_total: 50,
        vagas_disponiveis: 0,
        status: "lotado",
      },
      {
        id_abrigo: 3,
        nome: "Abrigo Sul",
        endereco: "Rua Verde, 789",
        telefone: "(11) 99999-0003",
        capacidade_total: 75,
        vagas_disponiveis: 40,
        status: "disponivel",
      },
      {
        id_abrigo: 4,
        nome: "Abrigo Leste",
        endereco: "Av. Leste, 101",
        telefone: "(11) 99999-0004",
        capacidade_total: 30,
        vagas_disponiveis: 5,
        status: "inativo",
      },
    ];

    setAbrigos(mockAbrigos);
    setLoading(false);
  }, []);

  const onOpenVaga = () => {
    setOpenVaga(true);
    setOpenStatus(false);
  };
  const onOpenStatus = () => {
    setOpenStatus(true);
    setOpenVaga(false);
  };

  const filtrarAbrigos = (): Abrigo[] => {
    return abrigos.filter((item) => {
      if (vaga && vaga !== "todas") {
        const [min, max] = vaga.split("-").map(Number);
        if (item.vagas_disponiveis < min || item.vagas_disponiveis > max) return false;
      }
      if (status && item.status !== status) return false;

      return true;
    });
  };

  const renderItem: ListRenderItem<Abrigo> = ({ item }) => {
    const statusMap = {
      disponivel: { label: "Disponível", color: "#AFFF4F" },
      lotado: { label: "Lotado", color: "#B00000" },
      inativo: { label: "Inativo", color: "#333" },
    };

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.nome}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusMap[item.status].color }]}>
            <Text style={styles.statusText}>{statusMap[item.status].label}</Text>
          </View>
        </View>

        <Text style={styles.cardText}>{item.endereco}</Text>
        <Text style={styles.cardText}>{item.telefone}</Text>

        <View style={styles.cardInfo}>
          <Text style={styles.infoText}>Vagas: {item.vagas_disponiveis}</Text>
          <Text style={styles.infoText}>Capacidade: {item.capacidade_total}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.checkinButton,
            item.vagas_disponiveis === 0 || item.status !== "disponivel" ? styles.buttonCheio : null,
          ]}
          disabled={item.vagas_disponiveis === 0 || item.status !== "disponivel"}
        >
          <Text style={styles.checkinText}>
            {item.vagas_disponiveis === 0 || item.status !== "disponivel"
              ? "Check-in (Cheio)"
              : "Check-in"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#196EEE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Abrigos</Text>

      <View style={styles.filtrosContainer}>
        <View style={{ flex: 1, zIndex: openVaga ? 2 : 1 }}>
          <DropDownPicker
            open={openVaga}
            value={vaga}
            items={vagas}
            setOpen={setOpenVaga}
            onOpen={onOpenVaga}
            setValue={setVaga}
            setItems={setVagas}
            placeholder="Filtrar por Vagas"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownMenu}
            textStyle={styles.dropdownText}
          />
        </View>

        <View style={{ flex: 1, zIndex: openStatus ? 2 : 1 }}>
          <DropDownPicker
            open={openStatus}
            value={status}
            items={statusOptions}
            setOpen={setOpenStatus}
            onOpen={onOpenStatus}
            setValue={setStatus}
            setItems={setStatusOptions}
            placeholder="Filtrar por Status"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownMenu}
            textStyle={styles.dropdownText}
          />
        </View>

        <TouchableOpacity style={styles.iconMapa} onPress={() => navigation.navigate("Mapa" as never)}>
          <Feather name="map-pin" size={24} color="#196EEE" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtrarAbrigos()}
        keyExtractor={(item) => item.id_abrigo.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    color: "#196EEE",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  filtrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
    zIndex: 10,
  },
  dropdown: {
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    borderWidth: 0,
    height: 44,
    paddingHorizontal: 12,
  },
  dropdownMenu: {
    borderRadius: 20,
    borderColor: "#ccc",
  },
  dropdownText: {
    fontFamily: "Montserrat-Regular",
    color: "#000",
    fontSize: 14,
  },
  lista: {
    gap: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    padding: 16,
    borderColor: "#00000022",
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
    color: "#fff",
  },
  cardText: {
    fontFamily: "Montserrat-Regular",
    color: "#444",
    fontSize: 14,
    marginBottom: 2,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 10,
  },
  infoText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  checkinButton: {
    backgroundColor: "#4894FE",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonCheio: {
    backgroundColor: "#888",
  },
  checkinText: {
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
  },
  iconMapa: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 100,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
