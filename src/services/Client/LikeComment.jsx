import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
 const LikeComment = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/CreateCommentLike`,data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const GetLikeComment = async (UserId) => {
    // console.log(UserId);
    
    try {
        const response = await axios.get(`${API_URL}/getLikeComment/${UserId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { LikeComment,GetLikeComment };