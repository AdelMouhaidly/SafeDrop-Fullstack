import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import NovoIncidenteModal from "./components/NovoIncidenteModal";
import EditarIncidenteModal from "./components/EditarIncidenteModal";
import ocorrenciaService, { Ocorrencia } from "./services/ocorrenciaService";

export default function Ocorrencias() {
  const [openRisco, setOpenRisco] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [riscoValue, setRiscoValue] = useState<string | null>(null);
  const [statusValue, setStatusValue] = useState<string | null>(null);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedOcorrencia, setSelectedOcorrencia] = useState<Ocorrencia | null>(null);

  const riscos = [
    { label: "Todos", value: "Todos" },
    { label: "Baixo", value: "baixo" },
    { label: "Moderado", value: "moderado" },
    { label: "Alto", value: "alto" },
  ];

  const status = [
    { label: "Todos", value: "Todos" },
    { label: "Pendente", value: "pendente" },
    { label: "Em Andamento", value: "em andamento" },
    { label: "Resolvido", value: "resolvido" },
  ];

  const fetchOcorrencias = async () => {
    try {
      setLoading(true);
      const result = await ocorrenciaService.getAll();
      
      if (result.success && result.data) {
        setOcorrencias(result.data);
      } else {
        Alert.alert('Erro', result.error || 'Erro ao carregar ocorrências');
      }
    } catch (error) {
      console.error('Erro ao buscar ocorrências:', error);
      Alert.alert('Erro', 'Erro inesperado ao carregar ocorrências');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOcorrencias();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOcorrencias();
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta ocorrência?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const result = await ocorrenciaService.delete(id);
            if (result.success) {
              fetchOcorrencias(); 
            }
          },
        },
      ]
    );
  };

  const handleEdit = (ocorrencia: Ocorrencia) => {
    setSelectedOcorrencia(ocorrencia);
    setEditModalVisible(true);
  };

  const handleUpdateStatus = async (id: number, newStatus: 'pendente' | 'em andamento' | 'resolvido') => {
    const result = await ocorrenciaService.updateStatus(id, newStatus);
    if (result.success) {
      fetchOcorrencias(); 
    }
  };

  const showStatusOptions = (ocorrencia: Ocorrencia) => {
    const statusOptions = [
      { text: 'Pendente', onPress: () => handleUpdateStatus(ocorrencia.idOcorrencia!, 'pendente') },
      { text: 'Em Andamento', onPress: () => handleUpdateStatus(ocorrencia.idOcorrencia!, 'em andamento') },
      { text: 'Resolvido', onPress: () => handleUpdateStatus(ocorrencia.idOcorrencia!, 'resolvido') },
      { text: 'Cancelar', style: 'cancel' as const },
    ];

    Alert.alert('Alterar Status', 'Selecione o novo status:', statusOptions);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolvido":
        return "#28a745";
      case "em andamento":
        return "#ffc107";
      case "pendente":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const getRiscoColor = (risco: string) => {
    switch (risco.toLowerCase()) {
      case "alto":
        return "#dc3545";
      case "moderado":
        return "#ffc107";
      case "baixo":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  const filteredOcorrencias = ocorrencias.filter((o) => {
    const riscoOK =
      !riscoValue || riscoValue === "Todos" || o.nivelRisco === riscoValue;
    const statusOK =
      !statusValue || statusValue === "Todos" || o.status === statusValue;
    return riscoOK && statusOK;
  });

  const renderOcorrencia = ({ item }: { item: Ocorrencia }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitulo}>{item.nomeTipo}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status || 'pendente') },
          ]}
        >
          <Text style={styles.statusText}>{item.status || 'pendente'}</Text>
        </View>
      </View>
      
      <Text style={styles.cardTexto}>
        Data: {item.dataOcorrencia ? new Date(item.dataOcorrencia).toLocaleDateString('pt-BR') : 'N/A'}
      </Text>
      
      <Text style={styles.cardTexto}>
        Risco:{" "}
        <Text style={{ fontWeight: "bold", color: getRiscoColor(item.nivelRisco) }}>
          {item.nivelRisco}
        </Text>
      </Text>
      
      <Text style={styles.cardTexto} numberOfLines={2}>
        Descrição: {item.descricao}
      </Text>

      <View style={styles.cardAcoes}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
          <MaterialIcons name="edit" size={20} color="#007bff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => handleDelete(item.idOcorrencia!)} 
          style={styles.actionButton}
        >
          <MaterialIcons name="delete" size={20} color="#dc3545" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => showStatusOptions(item)} 
          style={styles.actionButton}
        >
          <Ionicons name="settings" size={20} color="#28a745" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#196EEE" />
        <Text style={styles.loadingText}>Carregando ocorrências...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ocorrências</Text>

      <View style={styles.filtrosWrapper}>
        <View style={{ zIndex: openRisco ? 2 : 0, flex: 1 }}>
          <DropDownPicker
            open={openRisco}
            value={riscoValue}
            items={riscos}
            setOpen={(e) => {
              setOpenRisco(e);
              setOpenStatus(false);
            }}
            setValue={setRiscoValue}
            setItems={() => {}}
            placeholder="Filtrar por Risco"
            style={styles.picker}
            dropDownContainerStyle={styles.dropDown}
            textStyle={styles.texto}
          />
        </View>

        <View style={{ zIndex: openStatus ? 2 : 0, flex: 1 }}>
          <DropDownPicker
            open={openStatus}
            value={statusValue}
            items={status}
            setOpen={(e) => {
              setOpenStatus(e);
              setOpenRisco(false);
            }}
            setValue={setStatusValue}
            setItems={() => {}}
            placeholder="Filtrar por Status"
            style={styles.picker}
            dropDownContainerStyle={styles.dropDown}
            textStyle={styles.texto}
          />
        </View>
      </View>

      <FlatList
        data={filteredOcorrencias}
        keyExtractor={(item) => String(item.idOcorrencia)}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={renderOcorrencia}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma ocorrência encontrada</Text>
            <Text style={styles.emptySubText}>Puxe para baixo para atualizar</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.botaoFlutuante}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.botaoTexto}>+ Nova Ocorrência</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <NovoIncidenteModal 
          onClose={() => setModalVisible(false)}
          onSuccess={() => {
            setModalVisible(false);
            fetchOcorrencias();
          }}
        />
      </Modal>

      <Modal visible={editModalVisible} animationType="slide">
        <EditarIncidenteModal 
          ocorrencia={selectedOcorrencia}
          onClose={() => {
            setEditModalVisible(false);
            setSelectedOcorrencia(null);
          }}
          onSuccess={() => {
            setEditModalVisible(false);
            setSelectedOcorrencia(null);
            fetchOcorrencias();
          }}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#196EEE",
    textAlign: "center",
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  filtrosWrapper: {
    flexDirection: "row",
    gap: 10,
    zIndex: 10,
    marginBottom: 20,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 50,
  },
  dropDown: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  texto: {
    color: "#333",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 11,
  },
  cardTexto: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  cardAcoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
  },
  botaoFlutuante: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#196EEE",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
  },
});