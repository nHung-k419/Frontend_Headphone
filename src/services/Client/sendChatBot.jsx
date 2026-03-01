import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
export const sendChatBot = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/chat`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};  