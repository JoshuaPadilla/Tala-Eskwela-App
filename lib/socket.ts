import { io } from "socket.io-client";
const SOCKET_URL = "http://192.168.101.9:3000";
const socket = io(SOCKET_URL, {
  transports: ["websocket"], // improves compatibility
});

export default socket;
