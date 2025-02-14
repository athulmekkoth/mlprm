import express from "express";
import http from "http";
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const socketIo = new Server(server); 

app.use(express.json()); 

export { socketIo };
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
    console.log("Server is running on port 3000");
});
