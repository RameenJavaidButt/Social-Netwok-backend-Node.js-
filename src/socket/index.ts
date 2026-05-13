import { Server } from "socket.io";
/*
👉 Socket sirf FEED ke liye hai
👉 Post create pe event fire hota hai
👉 Feed update hota hai

*/
let io: Server;
const onlineUsers = new Map<string, string>();
// userId → socketId
export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    // 👇 user registers himself
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};
export const getOnlineUsers = () => onlineUsers;
