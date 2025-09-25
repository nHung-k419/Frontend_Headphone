import axios from "axios";

const GetAllReviews = async () => {
  try {
    const response = await axios.get("https://backend-headphone.onrender.com/api/getAllReviews", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { GetAllReviews };
