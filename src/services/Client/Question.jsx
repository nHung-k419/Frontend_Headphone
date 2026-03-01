import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const GetAllConversation = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/GetAllConversation/${productId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const getConversation = async (questionId) => {
    try {
        const response = await axios.get(`${API_URL}/getConversation/${questionId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const createQuestion = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/createQuestion`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const addMessage = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/addMessage`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { GetAllConversation,getConversation,createQuestion,addMessage };