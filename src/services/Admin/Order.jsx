import axios from "axios";

const GetAllOrder = async () => {
  try {
    const response = await axios.get("https://backend-headphone.onrender.com/api/GetAllOrder", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateStatusOrder = async ({ id, data }) => { 
  try {
    const response = await axios.put(`https://backend-headphone.onrender.com/api/UpdateStatusOrder/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getAllCancleRequests = async () => {
  try {
    const response = await axios.get("https://backend-headphone.onrender.com/api/getAllCancleRequests", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
const updateStatusCancleRequest = async ({ id, data }) => {
  
  try {
    const response = await axios.put(`https://backend-headphone.onrender.com/api/updateStatusCancleRequest/${id}`, data, { withCredentials: true });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { GetAllOrder, UpdateStatusOrder,getAllCancleRequests,updateStatusCancleRequest };
