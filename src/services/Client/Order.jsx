import axios from "axios";
const getProductOrder = async (idUser) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/GetOrder/${idUser}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
    console.log(error);
  }
};
const createProductOrder = async (data) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/CreateOrder`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const PaymentProductOrder = async (data) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/OrderPaymentZalo`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
    console.log(error);
  }
};
const getOrderItems = async (Id_User) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/GetOrderItems/${Id_User}`, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
  }
};
export { getProductOrder, createProductOrder,PaymentProductOrder,getOrderItems };
