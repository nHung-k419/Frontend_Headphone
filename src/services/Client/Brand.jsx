import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
// get all Brand
const GetBrand = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllBrand`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { GetBrand };
