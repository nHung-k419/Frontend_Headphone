import axios from "axios";
const GetAllProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/GetAllProduct", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { GetAllProducts };