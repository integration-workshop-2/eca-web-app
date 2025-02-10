import api from './api';

class loginService{
    async login(password: string){
        console.log(password)
        try{
            const response = await api.post('/validate_admin_password', {password});
            return response.data; 
        }
        catch(error){
            console.log('Falha ao retornar usuario.', error);
            return null;
        }
    }
}
export default new loginService;