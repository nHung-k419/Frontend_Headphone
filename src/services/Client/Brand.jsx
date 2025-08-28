import axios from "axios";
// get all Brand
const GetBrand = async () => {
  try {
    const response = await axios.get("https://backend-headphone.onrender.com/api/GetAllBrand", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { GetBrand };
