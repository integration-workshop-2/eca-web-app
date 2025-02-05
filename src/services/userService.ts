import api from './api';

interface UserUpdateData {
    name: string;
  }
  
class userService {
  async all() {
    try {
      const response = await api.get('/patients');
      return response.data.data;

    } catch (error) {
      console.log('Falha ao retornar usuário.', error);
      return [];
    }
  }

   async updatePatientName(userId: string, newName: string) {
    const data: UserUpdateData = { name: newName };

    try {
      const response = await api.put(`/patients/${userId}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        params:{
          name: newName,
        },
      });
      return response.data;
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

export default new userService();