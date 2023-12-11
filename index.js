const express = require("express");
const UserRouter=require("./routes/user.js");
const {connectMongodb}= require("./connection.js"); 
const {logReqRes}=require("./middlewares/index.js");
const app = express();

// connection
connectMongodb("mongodb://127.0.0.1:27017/user")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error", err));

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

app.use("/api/user",UserRouter);

app.listen(8002, () => {
  console.log("server is running on port 8002");
});
