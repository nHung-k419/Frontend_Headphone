import axios from "axios";

 const GetAllUserAccount = async () => {
    try {
        const response = await axios.get("https://backend-headphone.onrender.com/api/getAllAccount", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const updateRoleAccount = async ({ id, data }) => {
    try {
        const response = await axios.put(`https://backend-headphone.onrender.com/api/updateRoleAccount/${id}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export { GetAllUserAccount, updateRoleAccount };