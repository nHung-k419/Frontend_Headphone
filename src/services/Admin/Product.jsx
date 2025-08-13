import axios from "axios";
// add product
const PostProduct = async (data) => {
  try {
    const response = await axios.post("https://backend-headphone.onrender.com/api/CreateProduct", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// get all product
const GetProducts = async () => {
  try {
    const response = await axios.get("https://backend-headphone.onrender.com/api/GetAllProduct", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteProduct = async (id) => {
  try {
    const response = await axios.delete(`https://backend-headphone.onrender.com/api/DeleteProduct/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateProduct = async ({id,data}) => {
  try {
    const response = await axios.put(`https://backend-headphone.onrender.com/api/UpdateProduct/${id}`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateStockProduct = async ({id, data}) => {
  console.log(data);
  
  try {
    const response = await axios.put(`https://backend-headphone.onrender.com/api/updateStockProduct/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { PostProduct, GetProducts,DeleteProduct,UpdateProduct,updateStockProduct };
