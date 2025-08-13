import axios from "axios";

const sendImageComment = async (data) => {
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/sendImageComment`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getReviewsById = async (idProduct) => {
  try {
    const response = await axios.get(`https://backend-headphone.onrender.com/api/getReviewsById/${idProduct}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { sendImageComment,getReviewsById };
