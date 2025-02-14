import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import cors from "cors"
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/mydatabase");
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(cors("*"))
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("message", (data) => {
        console.log("Message received:", data);
        io.emit("message", data); 
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


server.listen(PORT, async () => {
    await connectDb();
    console.log(`Server listening at port ${PORT}`);
});


// const wsServer = new WebSocketServer({ server });

// wsServer.on("connection", (ws) => {
//     console.log("New WebSocket connection established");

//     ws.on("message", (message) => {
//         console.log(`Received message: ${message}`);
//         ws.send(`Server received: ${message}`);
//     });

//     ws.on("close", () => {
//         console.log("WebSocket connection closed");
//     });
// });
