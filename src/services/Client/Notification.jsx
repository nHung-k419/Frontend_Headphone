import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const getNotificationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getNotificationById/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const markAsRead = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/markAsRead/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { getNotificationById, markAsRead };
