import { io } from "socket.io-client";
const socket = io('https://backend-headphone.onrender.com'); // đúng địa chỉ server

export default socket;