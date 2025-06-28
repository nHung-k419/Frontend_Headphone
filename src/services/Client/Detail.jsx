import axios from "axios";
const GetProductVariants = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/GetProductVariantsByid/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getDetailProduct = async (id) => {
  // console.log(id);
  
  try {
    const response = await axios.get(`http://localhost:3000/api/GetDetailProduct/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { GetProductVariants,getDetailProduct };
