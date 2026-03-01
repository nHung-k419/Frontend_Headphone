import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
// add product
const PostProduct = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/CreateProduct`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  } 
};
// get all product
const GetProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllProduct`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/DeleteProduct/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateProduct = async ({id,data}) => {
  try {
    const response = await axios.put(`${API_URL}/UpdateProduct/${id}`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateStockProduct = async ({id, data}) => {
  console.log(data);
  
  try {
    const response = await axios.put(`${API_URL}/updateStockProduct/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { PostProduct, GetProducts,DeleteProduct,UpdateProduct,updateStockProduct };
