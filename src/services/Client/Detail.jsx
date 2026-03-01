import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const GetProductVariants = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/GetProductVariantsByid/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getDetailProduct = async (id) => {
  // console.log(id);
  
  try {
    const response = await axios.get(`${API_URL}/GetDetailProduct/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { GetProductVariants,getDetailProduct };
