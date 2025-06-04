import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ocorrenciaService, { TipoOcorrencia } from "./../services/ocorrenciaService";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function NovoIncidenteModal({ onClose, onSuccess }: Props) {
  const [descricao, setDescricao] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState<number | null>(null);
  const [risco, setRisco] = useState<'baixo' | 'moderado' | 'alto' | null>(null);
  const [status, setStatus] = useState<'em andamento' | 'resolvido' | null>('em andamento'); 
  const [dataOcorrencia, setDataOcorrencia] = useState(new Date().toISOString().slice(0, 16)); 
  const [loading, setLoading] = useState(false);
  const [loadingTipos, setLoadingTipos] = useState(true);

  const [openTipo, setOpenTipo] = useState(false);
  const [openRisco, setOpenRisco] = useState(false);
  const [openStatus, setOpenStatus] = useState(false); 
  const [tipos, setTipos] = useState<{ label: string; value: number }[]>([]);
  
  const riscos = [
    { label: "Baixo", value: "baixo" as const },
    { label: "Moderado", value: "moderado" as const },
    { label: "Alto", value: "alto" as const },
  ];

  const statusOptions = [
    { label: "Em Andamento", value: "em andamento" as const },
    { label: "Resolvido", value: "resolvido" as const },
  ];

  useEffect(() => {
    loadTipos();
  }, []);

  const loadTipos = async () => {
    try {
      setLoadingTipos(true);
      const result = await ocorrenciaService.getTipos();
      
      if (result.success && result.data) {
        const tiposFormatados = result.data.map((tipo: TipoOcorrencia) => ({
          label: tipo.nomeTipo,
          value: tipo.idTipo,
        }));
        setTipos(tiposFormatados);
        
        if (result.message) {
          console.warn(result.message);
        }
      } else {
        Alert.alert('Aviso', 'Erro ao carregar tipos de ocorrência. Usando tipos padrão.');
      }
    } catch (error) {
      console.error('Erro ao carregar tipos:', error);
      Alert.alert('Erro', 'Erro inesperado ao carregar tipos de ocorrência');
    } finally {
      setLoadingTipos(false);
    }
  };

  const enviarIncidente = async () => {
   
    if (!descricao.trim()) {
      Alert.alert("Erro", "Por favor, preencha a descrição.");
      return;
    }
    
    if (!tipoSelecionado) {
      Alert.alert("Erro", "Por favor, selecione o tipo de ocorrência.");
      return;
    }
    
    if (!risco) {
      Alert.alert("Erro", "Por favor, selecione o nível de risco.");
      return;
    }

    if (!status) {
      Alert.alert("Erro", "Por favor, selecione o status.");
      return;
    }

    if (!dataOcorrencia) {
      Alert.alert("Erro", "Por favor, selecione a data da ocorrência.");
      return;
    }

    try {
      setLoading(true);
     
      const tipoEncontrado = tipos.find(t => t.value === tipoSelecionado);
      const nomeTipo = tipoEncontrado?.label || 'Outros';
      
      const novaOcorrencia = {
        descricao: descricao.trim(),
        nomeTipo,
        nivelRisco: risco,
        idTipo: tipoSelecionado,
        status: status, 
        dataOcorrencia: dataOcorrencia, 
      };

      const result = await ocorrenciaService.create(novaOcorrencia);
      
      if (result.success) {
        setDescricao("");
        setTipoSelecionado(null);
        setRisco(null);
        setStatus('em andamento');
        setDataOcorrencia(new Date().toISOString().slice(0, 16));
        
        onSuccess();
      } else {
        Alert.alert("Erro", result.error || "Erro ao criar ocorrência");
      }
    } catch (error) {
      console.error('Erro ao enviar incidente:', error);
      Alert.alert("Erro", "Erro inesperado ao criar ocorrência");
    } finally {
      setLoading(false);
    }
  };

  if (loadingTipos) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#196EEE" />
        <Text style={styles.loadingText}>Carregando tipos de ocorrência...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.titulo}>Nova Ocorrência</Text>

        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          placeholder="Descreva a ocorrência em detalhes"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={descricao}
          onChangeText={setDescricao}
          maxLength={500}
        />
        <Text style={styles.charCount}>{descricao.length}/500</Text>

        <Text style={styles.label}>Tipo de Ocorrência *</Text>
        <View style={{ zIndex: openTipo ? 4000 : 1 }}>
          <DropDownPicker
            open={openTipo}
            value={tipoSelecionado}
            items={tipos}
            setOpen={(open) => {
              setOpenTipo(open);
              setOpenRisco(false);
              setOpenStatus(false);
            }}
            setValue={setTipoSelecionado}
            setItems={setTipos}
            placeholder="Selecione o tipo"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>

        <Text style={styles.label}>Nível de Risco *</Text>
        <View style={{ zIndex: openRisco ? 3000 : 1 }}>
          <DropDownPicker
            open={openRisco}
            value={risco}
            items={riscos}
            setOpen={(open) => {
              setOpenRisco(open);
              setOpenTipo(false);
              setOpenStatus(false);
            }}
            setValue={setRisco}
            setItems={() => {}}
            placeholder="Selecione o nível de risco"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>

        <Text style={styles.label}>Status *</Text>
        <View style={{ zIndex: openStatus ? 2000 : 1 }}>
          <DropDownPicker
            open={openStatus}
            value={status}
            items={statusOptions}
            setOpen={(open) => {
              setOpenStatus(open);
              setOpenTipo(false);
              setOpenRisco(false);
            }}
            setValue={setStatus}
            setItems={() => {}}
            placeholder="Selecione o status"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>

        
        <Text style={styles.label}>Data da Ocorrência *</Text>
        <TextInput
          placeholder="Data e hora da ocorrência"
          style={styles.input}
          value={dataOcorrencia}
          onChangeText={setDataOcorrencia}
          keyboardType="default"
        />
        <Text style={styles.helpText}>Formato: AAAA-MM-DDTHH:MM (ex: 2024-01-15T14:30)</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.botao, styles.enviar, loading && styles.botaoDisabled]} 
            onPress={enviarIncidente}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.botaoTexto}>Criar Ocorrência</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.botao, styles.cancelar]} 
            onPress={onClose}
            disabled={loading}
          >
            <Text style={[styles.botaoTexto, styles.cancelarTexto]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    paddingTop: 60,
    flex: 1,
  },
  helpText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  dropdown: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderRadius: 8,
    height: 50,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderRadius: 8,
    maxHeight: 200,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 30,
    gap: 12,
  },
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  enviar: {
    backgroundColor: "#196EEE",
  },
  cancelar: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#dc3545",
  },
  botaoDisabled: {
    backgroundColor: "#ccc",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelarTexto: {
    color: "#dc3545",
  },
});
