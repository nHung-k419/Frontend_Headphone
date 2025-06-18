import axios from "axios";
const GetProductVariants = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/GetAllProductVariants", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { GetProductVariants };
