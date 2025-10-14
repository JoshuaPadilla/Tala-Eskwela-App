import { BASE_URL } from "@/src/constants/base-url.constant";
import { io } from "socket.io-client";
const socket = io(BASE_URL, {
  transports: ["websocket"], // improves compatibility
});

export default socket;
