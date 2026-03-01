import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const GetAllOrder = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllOrder`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateStatusOrder = async ({ id, data }) => { 
  try {
    const response = await axios.put(`${API_URL}/UpdateStatusOrder/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getAllCancleRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllCancleRequests`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
const updateStatusCancleRequest = async ({ id, data }) => {
  
  try {
    const response = await axios.put(`${API_URL}/updateStatusCancleRequest/${id}`, data, { withCredentials: true });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { GetAllOrder, UpdateStatusOrder,getAllCancleRequests,updateStatusCancleRequest };
