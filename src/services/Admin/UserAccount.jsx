import axios from "axios";

 const GetAllUserAccount = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/getAllAccount", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const updateRoleAccount = async ({ id, data }) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/updateRoleAccount/${id}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export { GetAllUserAccount, updateRoleAccount };