import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const GetAllCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllCategory`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { GetAllCategory };