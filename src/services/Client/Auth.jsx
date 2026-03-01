import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const RegisterAuth = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/Register`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const loginAuth = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/Login`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const LogoutAuth = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/Logout`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getProfileUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getProfileUser/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const updateProfile = async ({ id, data }) => {
  try {
    const response = await axios.put(`${API_URL}/updateProfile/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export { RegisterAuth, loginAuth, LogoutAuth, getProfileUser,updateProfile };
