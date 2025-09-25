import axios from "axios";

const GetAllConversation = async (productId) => {
    try {
        const response = await axios.get(`https://backend-headphone.onrender.com/api/GetAllConversation/${productId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const getConversation = async (questionId) => {
    try {
        const response = await axios.get(`https://backend-headphone.onrender.com/api/getConversation/${questionId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const createQuestion = async (data) => {
    try {
        const response = await axios.post(`https://backend-headphone.onrender.com/api/createQuestion`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const addMessage = async (data) => {
    try {
        const response = await axios.post(`https://backend-headphone.onrender.com/api/addMessage`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { GetAllConversation,getConversation,createQuestion,addMessage };