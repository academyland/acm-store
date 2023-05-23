import { io } from "socket.io-client"
export default defineNuxtPlugin((nuxtApp) => {
    let socket = io('http://localhost:3001');
    const createConnectionWithToken = (token) => {
        socket.disconnect();
        socket = io('http://localhost:3001', { auth: { token } });
    }
    return {
        provide: {
            socket: {
                io: socket,
                createConnectionWithToken
            }
        }
    }
})