import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator, 
  RefreshControl,
  Alert 
} from 'react-native';

import alertaService, { Alerta } from './services/alertaService';
import mqttService, { TOPICS } from './services/mqttService';

const corPorPrioridade = (prioridade: Alerta['prioridade']) => {
  switch (prioridade) {
    case 'Alta':
      return '#D32F2F'; 
    case 'Média':
      return '#FBC02D';
    case 'Baixa':
      return '#8BC34A';
    default:
      return '#BDBDBD';
  }
};

export default function TelaAlertas() {
  const [listaAlertas, setListaAlertas] = useState<Alerta[]>([]);
  const [filtroPrioridade, setFiltroPrioridade] = useState<string | null>(null);
  const [filtroFonte, setFiltroFonte] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [statusSensores, setStatusSensores] = useState({
    nivelAgua: 0,
    temperatura: 0,
    umidade: 0,
    vibracao: 0
  });

  useEffect(() => {
    const iniciar = async () => {
      await alertaService.initialize();
      setListaAlertas(alertaService.getAlertas());

      const resposta = await alertaService.buscarAlertasDoBackend();
      if (resposta.success && resposta.data) {
        setListaAlertas(resposta.data);
      }
      setCarregando(false);
    };

    iniciar();

    const cancelarSubscricaoAlertas = alertaService.subscribeToAlertas((novosAlertas: Alerta[]) => {
      setListaAlertas(novosAlertas);
    });

    const cancelarEnchente = mqttService.subscribe(TOPICS.ENCHENTE, (dados: any) => {
      setStatusSensores(prev => ({ ...prev, nivelAgua: dados.nivel_agua }));
    });

    const cancelarTempUmid = mqttService.subscribe(TOPICS.TEMPERATURA_UMIDADE, (dados: any) => {
      setStatusSensores(prev => ({ 
        ...prev, 
        temperatura: dados.temperatura,
        umidade: dados.umidade 
      }));
    });

    const cancelarVibracao = mqttService.subscribe(TOPICS.VIBRACAO, (dados: any) => {
      setStatusSensores(prev => ({ ...prev, vibracao: dados.vibracao }));
    });

    return () => {
      cancelarSubscricaoAlertas();
      cancelarEnchente();
      cancelarTempUmid();
      cancelarVibracao();
    };
  }, []);

  const atualizarLista = async () => {
    setAtualizando(true);
    const resposta = await alertaService.buscarAlertasDoBackend();
    if (resposta.success && resposta.data) {
      setListaAlertas(resposta.data);
    }
    setAtualizando(false);
  };

  const excluirAlerta = (id: string) => {
    Alert.alert(
      'Excluir Alerta',
      'Tem certeza que deseja excluir este alerta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive', 
          onPress: () => {
            alertaService.removerAlerta(id);
            setListaAlertas(prev => prev.filter(alerta => alerta.id !== id));
          } 
        },
      ]
    );
  };

  const alertasFiltrados = listaAlertas
    .filter(alerta => filtroPrioridade ? alerta.prioridade === filtroPrioridade : true)
    .filter(alerta => filtroFonte ? alerta.fonte.toLowerCase() === filtroFonte.toLowerCase() : true);

  const alternarFiltroPrioridade = (prioridade: string) => {
    setFiltroPrioridade(filtroPrioridade === prioridade ? null : prioridade);
  };

  const alternarFiltroFonte = (fonte: string) => {
    setFiltroFonte(filtroFonte === fonte ? null : fonte);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alertas</Text>

      <View style={styles.statusSensores}>
        <Text style={styles.tituloSensores}>Status dos Sensores:</Text>
        <View style={styles.gridSensores}>
          <View style={styles.itemSensor}>
            <Text style={styles.labelSensor}>Nível Água:</Text>
            <Text style={[styles.valorSensor, statusSensores.nivelAgua > 80 && styles.alerta]}>
              {statusSensores.nivelAgua}%
            </Text>
          </View>
          <View style={styles.itemSensor}>
            <Text style={styles.labelSensor}>Temperatura:</Text>
            <Text style={[styles.valorSensor, statusSensores.temperatura > 35 && styles.alerta]}>
              {statusSensores.temperatura}°C
            </Text>
          </View>
          <View style={styles.itemSensor}>
            <Text style={styles.labelSensor}>Umidade:</Text>
            <Text style={styles.valorSensor}>{statusSensores.umidade}%</Text>
          </View>
          <View style={styles.itemSensor}>
            <Text style={styles.labelSensor}>Vibração:</Text>
            <Text style={[styles.valorSensor, statusSensores.vibracao > 70 && styles.alerta]}>
              {statusSensores.vibracao}%
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.filtros}>
        {['Alta', 'Média', 'Baixa'].map(prioridade => (
          <TouchableOpacity 
            key={prioridade}
            style={[styles.botaoFiltro, filtroPrioridade === prioridade && styles.botaoAtivo]}
            onPress={() => alternarFiltroPrioridade(prioridade)}
          >
            <Text style={[styles.textoFiltro, filtroPrioridade === prioridade && styles.textoAtivo]}>
              {prioridade}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.filtros}>
        {['IoT', 'Sistema', null].map(fonte => (
          <TouchableOpacity 
            key={String(fonte)}
            style={[styles.botaoFiltro, filtroFonte === fonte && styles.botaoAtivo]}
            onPress={() => alternarFiltroFonte(fonte || '')}
          >
            <Text style={[styles.textoFiltro, filtroFonte === fonte && styles.textoAtivo]}>
              {fonte === null ? 'Todos' : fonte}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#1976D2" style={styles.carregando} />
      ) : (
        <FlatList
          data={alertasFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartao}>
              <View style={styles.cabecalhoCartao}>
                <Text style={styles.tituloCartao}>{item.titulo}</Text>
                <View style={[styles.prioridade, { backgroundColor: corPorPrioridade(item.prioridade) }]}>
                  <Text style={styles.textoPrioridade}>{item.prioridade}</Text>
                </View>
              </View>

              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.data}>Data: {item.data}</Text>
              <Text style={styles.fonte}>
                Fonte: <Text style={styles.fonteNegrito}>{item.fonte}</Text>
              </Text>

              <View style={styles.botoes}>
                <TouchableOpacity style={styles.botaoDetalhes}>
                  <Text style={styles.textoBotao}>Ver Detalhes</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.botaoExcluir}
                  onPress={() => excluirAlerta(item.id)}
                >
                  <Text style={styles.textoBotao}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View style={styles.vazio}>
              <Text style={styles.textoVazio}>Nenhum alerta encontrado</Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={atualizarLista}
              colors={['#1976D2']}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1976D2',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusSensores: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  tituloSensores: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#424242',
  },
  gridSensores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemSensor: {
    width: '48%',
    marginBottom: 8,
  },
  labelSensor: {
    fontSize: 14,
    color: '#757575',
  },
  valorSensor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
  },
  alerta: {
    color: '#D32F2F',
    fontWeight: '700',
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  botaoFiltro: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  botaoAtivo: {
    backgroundColor: '#1976D2',
  },
  textoFiltro: {
    color: '#424242',
    fontWeight: '500',
  },
  textoAtivo: {
    color: '#FFFFFF',
  },
  carregando: {
    marginTop: 50,
  },
  cartao: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cabecalhoCartao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tituloCartao: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  prioridade: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  textoPrioridade: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  descricao: {
    marginTop: 8,
    color: '#555',
    fontSize: 14,
  },
  data: {
    marginTop: 4,
    color: '#555',
    fontSize: 14,
  },
  fonte: {
    marginTop: 2,
    color: '#555',
    fontSize: 14,
  },
  fonteNegrito: {
    fontWeight: '700',
  },
  botoes: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  botaoDetalhes: {
    backgroundColor: '#64B5F6',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  botaoExcluir: {
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  vazio: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  textoVazio: {
    fontSize: 16,
    color: '#757575',
  },
});
