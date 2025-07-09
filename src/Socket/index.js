import { io } from "socket.io-client";
const socket = io('http://localhost:3000'); // đúng địa chỉ server

export default socket;