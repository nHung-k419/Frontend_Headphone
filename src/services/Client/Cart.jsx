import axios from "axios";

const AddProductCart = async ({idUser,data}) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/AddCart/${idUser}`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const GetCartItemsByUser = async (idUser) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/GetCart/${idUser}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const handlePrevious = async (data) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/Previous`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const handleNext = async (data) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/Next`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const handleDLcartItem = async (data) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/DeleteCartItem`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { AddProductCart,GetCartItemsByUser,handlePrevious,handleNext,handleDLcartItem };