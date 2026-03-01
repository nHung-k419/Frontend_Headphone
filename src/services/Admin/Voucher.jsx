import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
 const GetAllVoucher = async () => {
    try {
        const response = await axios.get(`${API_URL}/GetAllVoucher`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const CreateVoucher = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/CreateVoucher`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
const getAllVouchers = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllVouchers`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export { GetAllVoucher, CreateVoucher,getAllVouchers };