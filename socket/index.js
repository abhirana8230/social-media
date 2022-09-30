const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");

app.use(cors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

let users = [];

const addUser = (userId,socketId) => {
  !users.some((user)=>user.userId===userId) && users.push({userId,socketId});
}

const removeUser = (socketId) => {
  users = users.filter((user)=> user.socketId !== socketId);
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId)
}


io.on("connection", (socket) => {
    //for checking connection done or not
    console.log(`User Connected:${socket.id}`);
    // io.emit("welcome","hello this is socket server!")//sending message to client

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId,socket.id);
      io.emit("getUsers",users);
    });

    //send and get message
    socket.on("sendMessage",({senderId,receiverId,text}) => {
     const user = getUser(receiverId);
     io.to(user.socketId).emit("getMessage",{
      senderId,text,
     });
    })

    //after diconnection
    socket.on("disconnect", ()=> {
      console.log("User Disconnected!");
      removeUser(socket.id);
      io.emit("getUsers",users);
    });
})

httpServer.listen(5000, () => {
    console.log("Socket server connected!")
})
