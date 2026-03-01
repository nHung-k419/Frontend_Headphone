import axios from "axios";

const getNotificationById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/getNotificationById/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const markAsRead = async (id) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/markAsRead/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { getNotificationById, markAsRead };
