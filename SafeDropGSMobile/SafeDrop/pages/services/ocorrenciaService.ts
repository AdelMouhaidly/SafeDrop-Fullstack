import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './apiService';
import { Alert } from 'react-native';

export interface TipoOcorrencia {
  idTipo: number;
  nomeTipo: string;
  descricao?: string;
}

export interface Ocorrencia {
  idOcorrencia?: number;
  descricao: string;
  dataOcorrencia?: string;
  nivelRisco: 'baixo' | 'moderado' | 'alto';
  status?: 'em andamento' | 'resolvido';
  nomeTipo: string;
  idTipo?: number;
  idUsuario?: number;
  latitude?: number;
  longitude?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class OcorrenciaService {
  async getAll(): Promise<ApiResponse<Ocorrencia[]>> {
    try {
      const response = await api.get('/ocorrencias');
      return {
        success: true,
        data: response.data.content || response.data
      };
    } catch (error: any) {
      console.error(' Erro ao buscar ocorrências:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Erro ao buscar ocorrências',
        data: []
      };
    }
  }

  async getById(id: number): Promise<ApiResponse<Ocorrencia>> {
    try {
      const response = await api.get(`/ocorrencias/${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      console.error('❌ Erro ao buscar ocorrência:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Erro ao buscar ocorrência'
      };
    }
  }

  async create(ocorrencia: Omit<Ocorrencia, 'idOcorrencia'>): Promise<ApiResponse<Ocorrencia>> {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (!token) {
        Alert.alert('Erro de Autenticação', 'Você precisa estar logado para criar uma ocorrência. Faça login novamente.');
        return {
          success: false,
          error: 'Usuário não autenticado'
        };
      }
      
      const payload = {
        idTipo: Number(ocorrencia.idTipo),
        descricao: ocorrencia.descricao,
        nivelRisco: ocorrencia.nivelRisco,
        status: ocorrencia.status,
        dataOcorrencia: ocorrencia.dataOcorrencia, 
        idUsuario: 1,
        latitude: -23.5505,
        longitude: -46.6333
      };
 
      const response = await api.post('/ocorrencias', payload);
      
      Alert.alert('Sucesso', 'Ocorrência criada com sucesso!');
      
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      console.error('❌ Erro ao criar ocorrência:', error);

      if (error.response?.status === 403) {
        Alert.alert(
          'Erro de Autenticação', 
          'Sua sessão expirou ou você não tem permissão. Faça login novamente.',
          [
            {
              text: 'OK',
              onPress: async () => {
                await AsyncStorage.removeItem('jwt_token');
                await AsyncStorage.removeItem('user_email');
              }
            }
          ]
        );
      }
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Erro ao criar ocorrência'
      };
    }
  }

  async update(id: number, ocorrencia: Partial<Ocorrencia>): Promise<ApiResponse<Ocorrencia>> {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (!token) {
        Alert.alert('Erro de Autenticação', 'Você precisa estar logado para atualizar uma ocorrência. Faça login novamente.');
        return {
          success: false,
          error: 'Usuário não autenticado'
        };
      }
      
      const payload = {
        idTipo: ocorrencia.idTipo ? Number(ocorrencia.idTipo) : undefined,
        descricao: ocorrencia.descricao,
        nivelRisco: ocorrencia.nivelRisco,
        status: ocorrencia.status,
        dataOcorrencia: ocorrencia.dataOcorrencia, 
        idUsuario: 1,
        latitude: -23.5505,
        longitude: -46.6333
      };
      
      Object.keys(payload).forEach(key => {
        if (payload[key as keyof typeof payload] === undefined) {
          delete payload[key as keyof typeof payload];
        }
      });

      const response = await api.put(`/ocorrencias/${id}`, payload);
      
      Alert.alert('Sucesso', 'Ocorrência atualizada com sucesso!');
      
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      console.error('Erro ao atualizar ocorrência:', error);
   
      if (error.response?.status === 403) {
        Alert.alert(
          'Erro de Autenticação', 
          'Sua sessão expirou ou você não tem permissão. Faça login novamente.',
          [
            {
              text: 'OK',
              onPress: async () => {
                await AsyncStorage.removeItem('jwt_token');
                await AsyncStorage.removeItem('user_email');
              }
            }
          ]
        );
      }
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Erro ao atualizar ocorrência'
      };
    }
  }
  async delete(id: number): Promise<ApiResponse<boolean>> {
    try {
      await api.delete(`/ocorrencias/${id}`);
      Alert.alert('Sucesso', 'Ocorrência excluída com sucesso!');
      
      return {
        success: true,
        data: true
      };
    } catch (error: any) {
      console.error('❌ Erro ao deletar ocorrência:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Erro ao excluir ocorrência'
      };
    }
  }

  async getTipos(): Promise<ApiResponse<TipoOcorrencia[]>> {
    try {
      const response = await api.get('/ocorrencias/tipos');
  
      const tiposFormatados = response.data.map((tipo: any) => ({
        idTipo: tipo.idTipo,
        nomeTipo: tipo.nome, 
        descricao: tipo.descricao
      }));
  
      return {
        success: true,
        data: tiposFormatados
      };
    } catch (error: any) {
      console.warn('Erro ao buscar tipos da API, usando tipos padrão:', error.message);
  
      const tiposPadrao: TipoOcorrencia[] = [
        { idTipo: 1, nomeTipo: 'Enchente', descricao: 'Área com enchente' },
        { idTipo: 2, nomeTipo: 'Incêndio', descricao: 'Foco de incêndio' },
        { idTipo: 3, nomeTipo: 'Terremoto', descricao: 'Atividade sísmica' },
        { idTipo: 4, nomeTipo: 'Deslizamento', descricao: 'Deslizamento de terra' },
        { idTipo: 5, nomeTipo: 'Tempestade', descricao: 'Tempestade severa' },
        { idTipo: 6, nomeTipo: 'Acidente de Trânsito', descricao: 'Acidente de trânsito' },
        { idTipo: 7, nomeTipo: 'Emergência Médica', descricao: 'Emergência médica' },
        { idTipo: 8, nomeTipo: 'Outros', descricao: 'Outras ocorrências' }
      ];
  
      return {
        success: true,
        data: tiposPadrao,
        message: 'Usando tipos padrão (API indisponível)'
      };
    }
  }

  async updateStatus(id: number, status: 'pendente' | 'em andamento' | 'resolvido'): Promise<ApiResponse<Ocorrencia>> {
    try {
      const response = await api.put(`/ocorrencias/${id}/status`, { status });
      
      Alert.alert('Sucesso', `Status alterado para: ${status}`);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      console.error('❌ Erro ao atualizar status:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Erro ao atualizar status'
      };
    }
  }
}

export default new OcorrenciaService();

export async function getTipos(): Promise<ApiResponse<TipoOcorrencia[]>> {
  try {
    const response = await api.get('/ocorrencias/tipos');

    const tiposFormatados = response.data.map((tipo: any) => ({
      label: tipo.nome,
      value: tipo.idTipo,
      idTipo: tipo.idTipo,
      nome: tipo.nome
    }));

    return {
      success: true,
      data: tiposFormatados
    };
  } catch (error: any) {
    console.warn('Erro ao buscar tipos da API, usando tipos padrão:', error.message);

    const tiposPadrao = [
      { label: 'Enchente', value: 1, idTipo: 1, nome: 'Enchente' },
      { label: 'Incêndio', value: 2, idTipo: 2, nome: 'Incêndio' },
      { label: 'Terremoto', value: 3, idTipo: 3, nome: 'Terremoto' },
      { label: 'Deslizamento', value: 4, idTipo: 4, nome: 'Deslizamento' },
      { label: 'Tempestade', value: 5, idTipo: 5, nome: 'Tempestade' },
      { label: 'Acidente de Trânsito', value: 6, idTipo: 6, nome: 'Acidente de Trânsito' },
      { label: 'Emergência Médica', value: 7, idTipo: 7, nome: 'Emergência Médica' },
      { label: 'Outros', value: 8, idTipo: 8, nome: 'Outros' }
    ];

    return {
      success: true,
      data: tiposPadrao.map(tipo => ({
        idTipo: tipo.idTipo,
        nomeTipo: tipo.nome,
        descricao: tipo.nome
      })),
      message: 'Usando tipos padrão (API indisponível)'
    };
  }
}
