import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const GetAllReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllReviews`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { GetAllReviews };
