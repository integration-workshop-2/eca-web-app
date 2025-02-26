import api from './api';
import axios from 'axios';
class patientService {
  async all() {
    try {
      const response = await api.get('/patients');
      return response.data.data;

    } catch (error) {
      console.log('Falha ao retornar usuário.', error);
      return [];
    }
  }

  async captureImage() {
    try {
      await axios.get('http://10.42.0.2/capture');


    } catch (error) {
      console.log('Falha ao capturarImage.', error);

    }
  }
  async createPatient(name: string) {
    try {
      const response = await api.post('/patients', { name: name }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data.data;
    } catch (error) {
      console.log('Erro ao adicionar um novo usuário.');
      throw error;
    }
  }

  async updatePatientName(userId: string, newName: string) {

    try {
      const response = await api.put(`/patients/${userId}`, { name: newName }, {
        headers: {
          'Content-Type': 'application/json',
        }

      });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar nome do usuário:', error);
      throw error;
    }
  }

  async deletePatient(userId: string) {

    try {
      const response = await api.delete(`/patients/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  }

}

export default new patientService();