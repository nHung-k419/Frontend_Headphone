import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
// add Brand
const CreateBrand = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/CreateBrand`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// get all Brand
const GetBrand = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllBrand`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteBrand = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/DeleteBrand/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateBrand = async ({id,data}) => {
  try {
    const response = await axios.put(`${API_URL}/UpdateBrand/${id}`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { CreateBrand, GetBrand,DeleteBrand,UpdateBrand };
