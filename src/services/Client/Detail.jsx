import axios from "axios";
const GetProductVariants = async (id) => {
  try {
    const response = await axios.get(`https://backend-headphone.onrender.com/api/GetProductVariantsByid/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getDetailProduct = async (id) => {
  // console.log(id);
  
  try {
    const response = await axios.get(`https://backend-headphone.onrender.com/api/GetDetailProduct/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { GetProductVariants,getDetailProduct };
