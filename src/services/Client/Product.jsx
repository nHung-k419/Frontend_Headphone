import axios from "axios";
const GetAllProducts = async (page) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/Products?page=${page}&limit=6`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const GetProductFilter = async ({ data, page, limit,keyWord }) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/GetProductFilter?keyWord=${keyWord}&idCategory=${data.idCategory}&idBrand=${data.idBrand}&valuePrice=${data.valuePrice}&page=${page}&limit=6`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const SearchProducts = async (keyWord) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/SearchProducts?keyWord=${keyWord}`, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
  }
};

export { GetAllProducts, GetProductFilter,SearchProducts };
