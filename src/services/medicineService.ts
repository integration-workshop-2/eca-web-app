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

    async updateMedicine(id: string, name: string, cylinder_number: number) {

      try {
        const response = await api.put(`/medicine/${id}`, { name: name, cylinder_number: cylinder_number}, {
          headers: {
            'Content-Type': 'application/json',
          }
  
        });
        return response.data.data;
      } catch (error) {
        console.error('Erro ao atualizar o medicamento:', error);
        throw error;
      }
    }
  
    async deleteMedicine(id: string) {
  
      try {
        const response = await api.delete(`/medicine/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data.data;
      } catch (error) {
        console.error('Erro ao deletar o medicamento:', error);
        throw error;
      }
    }
}

export default new medicineService();