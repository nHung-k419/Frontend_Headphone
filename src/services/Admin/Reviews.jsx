import axios from "axios";

const GetAllReviews = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/getAllReviews", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { GetAllReviews };
