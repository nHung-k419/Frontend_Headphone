import axios from "axios";

const GetAllCategory = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/GetAllCategory", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { GetAllCategory };