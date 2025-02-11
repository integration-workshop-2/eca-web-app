import api from './api';

class routineService {
    async all() {
      try {
        const response = await api.get('/list_routines');
        return response.data.data; 
      } catch (error) {
        console.log('Falha ao retornar rotina.', error);
        return [];
      }
    }
}

export default new routineService();