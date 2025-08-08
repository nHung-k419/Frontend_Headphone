import axios from "axios";

const RegisterAuth = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/api/Register", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const loginAuth = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/api/Login", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const LogoutAuth = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/api/Logout", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getProfileUser = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/getProfileUser/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const updateProfile = async ({ id, data }) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/updateProfile/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export { RegisterAuth, loginAuth, LogoutAuth, getProfileUser,updateProfile };
