import axios from "axios";
class UserService {

    static BASE_URL = "http://localhost:8080"

    static async login(username, password) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/api/auth/authenticate`, {username, password})
            return response.data;

        } catch(error) {
            throw error;
        }
    }

    

}

export default UserService;