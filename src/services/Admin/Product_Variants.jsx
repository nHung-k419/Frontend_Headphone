import axios from "axios";
// add product
const CreateProductVariants = async (data) => {
  try {
    const response = await axios.post("https://backend-headphone.onrender.com/api/CreateProductVariants", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// get all product
const GetProductVariants = async () => {
  try {
    const response = await axios.get("https://backend-headphone.onrender.com/api/GetAllProductVariants", { withCredentials: true });
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteProductVariants = async (id) => {
  try {
    const response = await axios.delete(`https://backend-headphone.onrender.com/api/DeleteProductVariants/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateProductVariant = async ({ id, data }) => {
  try {
    const response = await axios.put(`https://backend-headphone.onrender.com/api/UpdateProductVariants/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const GetAllProductVariants = async () => {
  try {
    const response = await axios.get("https://backend-headphone.onrender.com/api/GetAllProductVariants", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { CreateProductVariants, GetProductVariants, DeleteProductVariants, UpdateProductVariant,GetAllProductVariants };
