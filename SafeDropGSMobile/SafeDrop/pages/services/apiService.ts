import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE_URL = 'http://192.168.15.4:8080/api'; //Endereço local 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const isAuthEndpoint = config.url?.includes('/auth/');
      
      if (!isAuthEndpoint) {
        const token = await AsyncStorage.getItem('jwt_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.code === 'ECONNABORTED') {
      Alert.alert('Erro', 'Tempo limite da requisição excedido');
    } else if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.erro || 'Erro desconhecido';
      
      switch (status) {
        case 400:
          Alert.alert('Erro', `Dados inválidos: ${message}`);
          break;
        case 401:
          await AsyncStorage.removeItem('jwt_token');
          Alert.alert('Sessão Expirada', 'Faça login novamente');
          break;
        case 403:
          Alert.alert('Acesso Negado', 'Você não tem permissão para esta ação.');
          break;
        case 404:
          Alert.alert('Erro', 'Recurso não encontrado');
          break;
        case 500:
          Alert.alert('Erro', 'Erro interno do servidor');
          break;
        default:
          Alert.alert('Erro', `Erro ${status}: ${message}`);
      }
    } else if (error.request) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    } else {
      Alert.alert('Erro', 'Erro inesperado');
    }
    
    return Promise.reject(error);
  }
);

export default api;