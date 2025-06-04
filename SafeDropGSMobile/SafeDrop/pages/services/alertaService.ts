import mqttService, { TOPICS } from './mqttService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Alerta {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  fonte: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
}

class AlertaService {
  alertas: Alerta[] = [];
  alertaCallbacks: Function[] = [];
  isInitialized: boolean = false;

  constructor() {
    
    this.loadAlertas();
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      await mqttService.connect();
      this.setupMQTTListeners();

      
      await this.buscarAlertasDoBackend();
    } catch (error) {
      console.error('Erro ao inicializar serviço de alertas:', error);
    } finally {
      this.isInitialized = true;
    }
  }

  setupMQTTListeners() {
    mqttService.subscribe(TOPICS.ENCHENTE, async (data: any) => {
      if (data.nivel_agua > 80) {
        
        await this.buscarAlertasDoBackend();
      }
    });

    mqttService.subscribe(TOPICS.TEMPERATURA_UMIDADE, async (data: any) => {
      if (data.temperatura > 35 || data.umidade > 90) {
        await this.buscarAlertasDoBackend();
      }
    });

    mqttService.subscribe(TOPICS.VIBRACAO, async (data: any) => {
      if (data.vibracao > 70) {
        await this.buscarAlertasDoBackend();
      }
    });
  }


  async removerAlerta(id: string) {
    try {
      const response = await fetch(`http://192.168.15.4:1880/alertas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir alerta no backend: ${response.status}`);
      }

      
      this.alertas = this.alertas.filter(alerta => alerta.id !== id);
      await this.saveAlertas();
      this.notifyAlertaCallbacks();

    } catch (error) {
      console.error('Erro ao excluir alerta:', error);
    }
  }

  async loadAlertas() {
    try {
      const alertasString = await AsyncStorage.getItem('alertas');
      if (alertasString) {
        this.alertas = JSON.parse(alertasString);
        this.notifyAlertaCallbacks();
      }
    } catch (error) {
      console.error('Erro ao carregar alertas do AsyncStorage:', error);
    }
  }

  async saveAlertas() {
    try {
      await AsyncStorage.setItem('alertas', JSON.stringify(this.alertas));
    } catch (error) {
      console.error('Erro ao salvar alertas no AsyncStorage:', error);
    }
  }

  getAlertas(): Alerta[] {
    return this.alertas;
  }

  subscribeToAlertas(callback: Function) {
    this.alertaCallbacks.push(callback);
    return () => {
      this.alertaCallbacks = this.alertaCallbacks.filter(cb => cb !== callback);
    };
  }

  notifyAlertaCallbacks() {
    this.alertaCallbacks.forEach(callback => callback(this.alertas));
  }

  async buscarAlertasDoBackend(): Promise<{ success: boolean; data?: Alerta[]; error?: string }> {
    try {
      const response = await fetch('http://192.168.15.4:1880/alertas'); // Mude o ip conforme o ip local
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if (json.sucesso === true && json.data) {
        this.alertas = json.data;
        await this.saveAlertas();
        this.notifyAlertaCallbacks();
        return { success: true, data: this.alertas };
      } else {
        return { success: false, error: 'Resposta inválida do backend' };
      }
    } catch (error: any) {
      console.error('Erro ao buscar alertas do backend:', error);
      return {
        success: false,
        error: error.message || 'Erro desconhecido',
      };
    }
  }
}

export const alertaService = new AlertaService();
export default alertaService;
