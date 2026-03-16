import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const GetAllProducts = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/products`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getProductCompare = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/GetAllProduct`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const GetProductFilter = async ({ data, page, limit, keyWord, type }) => {

  try {
    const response = await axios.get(
      `${API_URL}/GetProductFilter?keyWord=${keyWord}&idCategory=${data.idCategory}&idBrand=${data.idBrand}&type=${type}&valuePrice=${data.valuePrice}&page=${page}&limit=6`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const SearchProducts = async (keyWord) => {
  try {
    const response = await axios.get(`${API_URL}/SearchProducts?keyWord=${keyWord}`, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
  }
};
const productBestSeller = async () => {
  try {
    const response = await axios.get(`${API_URL}/productBestSeller`, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error('Không thể tải sản phẩm bán chạy');
  }
};

const FavouriteProduct = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/handleAddFavourite`, data, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
  }
}

const getFavouriteByUser = async (idUser) => {
  try {
    const response = await axios.get(`${API_URL}/getFavouriteByUser/${idUser}`, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
  }
}

const CompareProducts = async (ids) => {
  try {
    const response = await axios.get(`${API_URL}/CompareProducts?ids=${ids}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { GetAllProducts,getProductCompare, GetProductFilter, SearchProducts, productBestSeller, FavouriteProduct, getFavouriteByUser, CompareProducts };
