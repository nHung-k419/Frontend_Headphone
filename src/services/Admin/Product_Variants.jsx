import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
// add product
const CreateProductVariants = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/CreateProductVariants`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  } 
};
// get all product
const GetProductVariants = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllProductVariants`, { withCredentials: true });
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteProductVariants = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/DeleteProductVariants/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateProductVariant = async ({ id, data }) => {
  try {
    const response = await axios.put(`${API_URL}/UpdateProductVariants/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const GetAllProductVariants = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllProductVariants`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { CreateProductVariants, GetProductVariants, DeleteProductVariants, UpdateProductVariant,GetAllProductVariants };
