import axios from "axios";

export const sendChatBot = async (data) => {
    try {
        const response = await axios.post("https://backend-headphone.onrender.com/api/chat", data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};