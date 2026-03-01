import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
 const GetAllUserAccount = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllAccount`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const updateRoleAccount = async ({ id, data }) => {
    try {
        const response = await axios.put(`${API_URL}/updateRoleAccount/${id}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export { GetAllUserAccount, updateRoleAccount };