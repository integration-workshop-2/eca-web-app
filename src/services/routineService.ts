import api from './api';

class routineService {
    async all() {
      try {
        const response = await api.get('/list_routines');
        console.log(response.data.data)
        return response.data.data; 
      } catch (error) {
        console.log('Falha ao retornar rotina.', error);
        return [];
      }
    }

    async createRoutine(requestBody: any) {
      try {
          const response = await api.post('/routines', requestBody, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          return response.data.data;
      } catch (error) {
          console.log('Erro ao adicionar uma nova rotina.', error);
          throw error; 
      }
  }

  async deleteRoutine(id: string) {
    try {
      const response = await api.delete(`/routines/${id}`, {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      return response.data.data;
    } catch (error) {
      console.log('Erro ao deletar rotina.', error);
      throw error; 
    }
  }
  
}

export default new routineService();