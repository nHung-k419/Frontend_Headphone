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
export { GetAllOrder, UpdateStatusOrder };
