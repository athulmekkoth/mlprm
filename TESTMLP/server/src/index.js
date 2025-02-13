import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import cors from "cors"
import TaskRouter from "./Routes/TaskRoute.js";
const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));


app.use("/task",TaskRouter)
const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/mydatabase")
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};


const server = app.listen(PORT, async () => {
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
