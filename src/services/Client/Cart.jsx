import axios from "axios";

const AddProductCart = async ({idUser,data}) => {
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/AddCart/${idUser}`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const GetCartItemsByUser = async (idUser) => {
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/GetCart/${idUser}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const handlePrevious = async (data) => {
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/Previous`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const handleNext = async (data) => {
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/Next`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const handleDLcartItem = async (data) => {
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/DeleteCartItem`,data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { AddProductCart,GetCartItemsByUser,handlePrevious,handleNext,handleDLcartItem };