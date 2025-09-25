import axios from "axios";
const GetAllProducts = async (page) => {
  try {
    const response = await axios.get(`https://backend-headphone.onrender.com/api/Products`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const GetProductFilter = async ({ data, page, limit,keyWord,type }) => {
  
  try {
    const response = await axios.get(
      `https://backend-headphone.onrender.com/api/GetProductFilter?keyWord=${keyWord}&idCategory=${data.idCategory}&idBrand=${data.idBrand}&type=${type}&valuePrice=${data.valuePrice}&page=${page}&limit=6`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const SearchProducts = async (keyWord) => {
  try {
    const response = await axios.get(`https://backend-headphone.onrender.com/api/SearchProducts?keyWord=${keyWord}`, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
  }
};
const productBestSeller = async () => {
  try {
    const response = await axios.get(`https://backend-headphone.onrender.com/api/productBestSeller`, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
     throw new Error('Không thể tải sản phẩm bán chạy');
  }
};

const FavouriteProduct = async (data) => {
  try {
    const response = await axios.post(`https://backend-headphone.onrender.com/api/handleAddFavourite`, data, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
  }
}

const getFavouriteByUser = async (idUser) => {
  try {
    const response = await axios.get(`https://backend-headphone.onrender.com/api/getFavouriteByUser/${idUser}`, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export { GetAllProducts, GetProductFilter,SearchProducts,productBestSeller,FavouriteProduct,getFavouriteByUser };
