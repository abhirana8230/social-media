const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
var cors = require("cors");
const multer = require("multer");
const path = require("path");

//dotenv configuration
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;

//importing routes
const authRoutes = require("./Routes/Auth.routes");
const userRoutes = require("./Routes/User");
const postRoutes = require("./Routes/Posts");
const conversationRoutes = require("./Routes/Conversation");
const messageRoutes = require("./Routes/Message");

const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database connected successfully!");
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//for cors-policy
app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin")
  next()
})

//for using image path directly from files on server
app.use("/images",express.static(path.join(__dirname, "Public/Images")));

//using multer for file upload on server
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,"Public/Images");
  },
  filename: (req,file,cb) => {
    cb(null,req.body.name);
  },
});//using diskStorage for storing files using multer 
const upload = multer({storage});
app.post("/upload",upload.single("file"), (req,res) => {
  try {
    return res.status(200).json({message:"file uploaded successfully!"});
  } catch (error) {
    console.log(error);
  }
})

//routes
app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/posts",postRoutes)
app.use("/conversation",conversationRoutes)
app.use("/message",messageRoutes)

app.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`);
});
