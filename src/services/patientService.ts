import api from './api';

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