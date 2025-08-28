import axios from "axios";

const checkVoucher = async (data) => {
    try {
        const response = await axios.post(`https://backend-headphone.onrender.com/api/checkVoucher`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
export { checkVoucher };