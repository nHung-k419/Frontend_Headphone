import axios from "axios";
// add Brand
const CreateBrand = async (data) => {
  try {
    const response = await axios.post("https://backend-headphone.onrender.com/api/CreateBrand", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// get all Brand
const GetBrand = async () => {
  try {
    const response = await axios.get("https://backend-headphone.onrender.com/api/GetAllBrand", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteBrand = async (id) => {
  try {
    const response = await axios.delete(`https://backend-headphone.onrender.com/api/DeleteBrand/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateBrand = async ({id,data}) => {
  try {
    const response = await axios.put(`https://backend-headphone.onrender.com/api/UpdateBrand/${id}`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { CreateBrand, GetBrand,DeleteBrand,UpdateBrand };
