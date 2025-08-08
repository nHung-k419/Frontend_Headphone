import axios from "axios";

const checkVoucher = async (data) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/checkVoucher`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
export { checkVoucher };