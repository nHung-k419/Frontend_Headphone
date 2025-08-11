import axios from "axios";

const RegisterAuth = async (data) => {
  try {
    const response = await axios.post("https://backend-headphone.onrender.com/api/Register", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const loginAuth = async (data) => {
  try {
    const response = await axios.post("https://backend-headphone.onrender.com/api/Login", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const LogoutAuth = async (data) => {
  try {
    const response = await axios.post("https://backend-headphone.onrender.com/api/Logout", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getProfileUser = async (id) => {
  try {
    const response = await axios.get(`https://backend-headphone.onrender.com/api/getProfileUser/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const updateProfile = async ({ id, data }) => {
  try {
    const response = await axios.put(`https://backend-headphone.onrender.com/api/updateProfile/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export { RegisterAuth, loginAuth, LogoutAuth, getProfileUser,updateProfile };
