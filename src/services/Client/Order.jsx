import axios from "axios";
const getProductOrder = async (idUser) => {
  try {
    const response = await axios.get(`https://backend-headphone.onrender.com/api/GetOrder/${idUser}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
    console.log(error);
  }
};
const createProductOrder = async (data) => {
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/CreateOrder`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const PaymentProductOrder = async (data) => {
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/OrderPaymentZalo`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
    console.log(error);
  }
};
const getOrderItems = async ({ Id_User, status }) => {
  const data = status;
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/GetOrderItems/${Id_User}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAddressProvices = async () => {
  try {
    const response = await fetch(`https://backend-headphone.onrender.com/api/getProvinces`);
    if (!response.ok) throw new Error("Failed to fetch provinces");

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getAddressDistricts = async ({ code }) => {
  try {
    const response = await fetch(`https://backend-headphone.onrender.com/api/getDistricts/${code}`);
    if (!response.ok) throw new Error("Failed to fetch districts");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAddressCommune = async ({ code }) => {
  try {
    const response = await fetch(`https://backend-headphone.onrender.com/api/getWards/${code}`);
    if (!response.ok) throw new Error("Failed to fetch communes");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getInfoAddressOrder = async (Id_User) => {
  try {
    const response = await axios.get(`https://backend-headphone.onrender.com/api/GetAddressOrder/${Id_User}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const requestCancleOrder = async (data) => {
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/requestCancle`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
export {
  getProductOrder,
  createProductOrder,
  PaymentProductOrder,
  getOrderItems,
  getAddressProvices,
  getAddressDistricts,
  getAddressCommune,
  getInfoAddressOrder,
  requestCancleOrder,
};
