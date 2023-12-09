const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();

// connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error", err));

//user Schema

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

//creating a model
const User = mongoose.model("user", userSchema);

//setuing up routes here only
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});
// send all users as html
app.get("/users", async (req, res) => {
  const allDbusers = await User.find({});
  const html = `
  <ul>
   ${allDbusers
     .map(
       (user) => `<li>${user.first_name} ${user.last_name} - ${user.email}</li>`
     )
     .join(" ")}
  </ul>
  `;
  res.send(html);
});

//get all users
app.get("/api/users", async (req, res) => {
  const allDbusers = await User.find({});
  return res.json(allDbusers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { last_name: "changed" });
    return res.json({ status: "Successfully updated " });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "succssfully deleted" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "Please provide all the fields" });
  }
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  return res.status(201).json({ msg: "success" });
});

app.listen(8002, () => {
  console.log("server is running on port 8002");
});
