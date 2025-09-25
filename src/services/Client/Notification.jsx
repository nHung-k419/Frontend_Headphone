import axios from "axios";

const getNotificationById = async (id) => {
  try {
    const response = await axios.get(`https://backend-headphone.onrender.com/api/getNotificationById/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const markAsRead = async (id) => {
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/markAsRead/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { getNotificationById, markAsRead };
