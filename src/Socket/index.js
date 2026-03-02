import { io } from "socket.io-client";
const socket = io('https://soundora-store.onrender.com'); // đúng địa chỉ server

export default socket;