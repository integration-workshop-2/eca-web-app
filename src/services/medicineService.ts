import api from './api';

class medicineService {
    async all() {
      try {
        const response = await api.get('/medicine');
        return response.data.data; 
      } catch (error) {
        console.log('Falha ao retornar medicamento.', error);
        return [];
      }
    }
}

export default new medicineService();