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

   async updateUserName(userId: number, newName: string) {
    const data: UserUpdateData = { name: newName };

    try {
      const response = await api.put(`/users/${userId}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar nome do usuário:', error);
      throw error;
    }
  }

  async deleteUser(userId: number) {

    try {
      const response = await api.put(`/delete/${userId}`, {
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