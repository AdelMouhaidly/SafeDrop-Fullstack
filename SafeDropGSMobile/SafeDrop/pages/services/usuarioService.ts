import api from './apiService';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  tipoUsuario: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class UsuarioService {
  
  async cadastrar(usuario: Usuario): Promise<ApiResponse<Usuario>> {
    try {
      const response = await api.post('/auth/registro', usuario);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.erro || error.response?.data?.message || error.message || 'Erro ao cadastrar usuário'
      };
    }
  }

  
  async login(email: string, senha: string): Promise<ApiResponse<any>> {
    try {
      const response = await api.post('/auth/login', { email, senha });
      
      
      if (response.data.token) {
        await AsyncStorage.setItem('jwt_token', response.data.token);
        await AsyncStorage.setItem('user_email', email);
      }
      
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.erro || error.response?.data?.message || error.message || 'Erro ao fazer login'
      };
    }
  }

  // Dá para utilizar no lugar na função de sair no Drawer
  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('jwt_token');
      await AsyncStorage.removeItem('user_email');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  
  async isLoggedIn(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      return !!token;
    } catch (error) {
      return false;
    }
  }

  
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('jwt_token');
    } catch (error) {
      return null;
    }
  }
}

export default new UsuarioService();