import express from "express";
import http from "http";
import { Server } from 'socket.io';
import TaskRouter from "./Routes/TaskRoute.js";
import cors from "cors"
import mongoose from "mongoose"; 



const app = express();
const server = http.createServer(app);

app.use(cors())
app.use(express.json()); 
app.use("/task",TaskRouter)
export { socketIo };



const socketIo = new Server(server, {
    cors: {
      origin: "http://localhost:3000",  
      methods: ["GET", "POST"],      
    },
  });
  
const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/your_database_name', {  // Replace with your MongoDB URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process if DB connection fails
  }
};



app.post("/send", (req, res) => {
    const msg = req.body.message;  
 
    socketIo.emit("pushNotification", { message: msg });  // Use socketIo here, not io
    res.status(200).send("Message sent");
});


socketIo.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

 
    // socket.on("message", (data) => {
    //     console.log("Message received:", data);
    //     socketIo.emit("message", data);  // Broadcast the message to all clients
    // });

 
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


server.listen(8000, () => {
    connectToDB()
    console.log("Server is running on port 8000");
});
