import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const sendImageComment = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/sendImageComment`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getReviewsById = async (idProduct) => {
  try {
    const response = await axios.get(`${API_URL}/getReviewsById/${idProduct}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { sendImageComment,getReviewsById };
