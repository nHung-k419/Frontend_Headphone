import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const AddProductCart = async ({ idUser, data }) => {
  try {
    const response = await axios.post(`${API_URL}/AddCart/${idUser}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetCartItemsByUser = async (idUser) => {
  try {
    const response = await axios.post(`${API_URL}/GetCart/${idUser}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const handlePrevious = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/Previous`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const handleNext = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/Next`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const handleDLcartItem = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/DeleteCartItem`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { AddProductCart, GetCartItemsByUser, handlePrevious, handleNext, handleDLcartItem };