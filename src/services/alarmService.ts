import api from './api';

class alarmService {
    async all() {
      try {
        const response = await api.get('/alarms');
        return response.data.data; 
      } catch (error) {
        console.log('Falha ao retornar alarme.', error);
        return [];
      }
    }
}

export default new alarmService();