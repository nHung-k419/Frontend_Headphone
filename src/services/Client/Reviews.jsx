import axios from "axios";

const sendImageComment = async (data) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/sendImageComment`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getReviewsById = async (idProduct) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/getReviewsById/${idProduct}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { sendImageComment,getReviewsById };
