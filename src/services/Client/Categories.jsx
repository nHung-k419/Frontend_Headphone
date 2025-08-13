import axios from "axios";

const GetAllCategory = async () => {
  try {
    const response = await axios.get("https://backend-headphone.onrender.com/api/GetAllCategory", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { GetAllCategory };