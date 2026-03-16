import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const checkVoucher = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/checkVoucher`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

const getVouchersActive = async () => {
    try {
        const response = await axios.get(`${API_URL}/getVouchersActive`, { withCredentials: true });
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
export { checkVoucher, getVouchersActive };