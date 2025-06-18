import axios from "axios";
// add product
const PostProduct = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/api/CreateProduct", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// get all product
const GetProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/GetAllProduct", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteProduct = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/DeleteProduct/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateProduct = async ({id,data}) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/UpdateProduct/${id}`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { PostProduct, GetProducts,DeleteProduct,UpdateProduct };
