import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import http from "http";
import { initSocket } from "./socket/index.js";

dotenv.config();

connectDB();

const server = http.createServer(app); //express or server same socket pe chal rhy

// socket server initialize
initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  //Server ko port 5000 pe listen karne ke liye.
  // invoke the express app's listen method, which starts the server and listens
  // for incoming requests on the specified port (5000 in this case). The callback function is executed once the
  // server is successfully running, and it logs a message to the console indicating that the server is running on port
  // 5000.
  console.log(`Server running on port ${PORT}`);
});
