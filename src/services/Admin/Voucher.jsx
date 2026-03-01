import axios from "axios";

 const GetAllVoucher = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/GetAllVoucher", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const CreateVoucher = async (data) => {
    try {
        const response = await axios.post("http://localhost:3000/api/CreateVoucher", data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
const getAllVouchers = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/getAllVouchers", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export { GetAllVoucher, CreateVoucher,getAllVouchers };