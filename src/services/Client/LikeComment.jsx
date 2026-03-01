import axios from "axios";
 const LikeComment = async (data) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/CreateCommentLike`,data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const GetLikeComment = async (UserId) => {
    // console.log(UserId);
    
    try {
        const response = await axios.get(`http://localhost:3000/api/getLikeComment/${UserId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { LikeComment,GetLikeComment };