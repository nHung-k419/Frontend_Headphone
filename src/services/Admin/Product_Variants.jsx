import axios from "axios";
// add product
const CreateProductVariants = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/api/CreateProductVariants", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// get all product
const GetProductVariants = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/GetAllProductVariants", { withCredentials: true });
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteProductVariants = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/DeleteProductVariants/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UpdateProductVariant = async ({ id, data }) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/UpdateProductVariants/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const GetAllProductVariants = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/GetAllProductVariants", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { CreateProductVariants, GetProductVariants, DeleteProductVariants, UpdateProductVariant,GetAllProductVariants };
