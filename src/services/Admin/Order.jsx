import axios from "axios";

const GetAllOrder = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/GetAllOrder", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateStatusOrder = async ({ id, data }) => { 
  try {
    const response = await axios.put(`http://localhost:3000/api/UpdateStatusOrder/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getAllCancleRequests = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/getAllCancleRequests", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
const updateStatusCancleRequest = async ({ id, data }) => {
  
  try {
    const response = await axios.put(`http://localhost:3000/api/updateStatusCancleRequest/${id}`, data, { withCredentials: true });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { GetAllOrder, UpdateStatusOrder,getAllCancleRequests,updateStatusCancleRequest };
