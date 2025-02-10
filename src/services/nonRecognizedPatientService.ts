import api from './api';

class nonRecognizedPatientService {
    async all() {
      try {
        const response = await api.get('/non_recognized_patients');
        return response.data.data; 
       
      } catch (error) {
        console.log('Falha ao retornar dados.', error);
        return [];
      }
    }
}

export default new nonRecognizedPatientService();