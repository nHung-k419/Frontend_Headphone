import axios from "axios";
// add Category
const CreateCategory = async (data) => {
  try {
    const response = await axios.post("https://backend-headphone.onrender.com/api/CreateCategory", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// get all Category
const GetCategory = async () => {
  try {
    const response = await axios.get("https://backend-headphone.onrender.com/api/GetAllCategory", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteCategory = async (id) => {
  try {
    const response = await axios.delete(`https://backend-headphone.onrender.com/api/DeleteCategory/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateCategory = async ({id,data}) => {
  try {
    const response = await axios.put(`https://backend-headphone.onrender.com/api/UpdateCategory/${id}`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { CreateCategory, GetCategory,DeleteCategory,UpdateCategory };
