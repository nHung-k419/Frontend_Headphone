import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
// add Category
const CreateCategory = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/CreateCategory`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// get all Category
const GetCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllCategory`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/DeleteCategory/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateCategory = async ({id,data}) => {
  try {
    const response = await axios.put(`${API_URL}/UpdateCategory/${id}`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { CreateCategory, GetCategory,DeleteCategory,UpdateCategory };
