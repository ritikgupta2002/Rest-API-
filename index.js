const express = require("express");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();

// connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error", err));

//user Schema
const userSchema = new mongoose.Schema({
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
});

//creating a model
const User = mongoose.model("user", userSchema);

//setuing up routes here only
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  const html = `
  <ul>
   ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")}
  </ul>
  `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "Ritik Gupta");
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const jobtitle = req.body.job_title;
    const user = users.find((user) => user.id === id);
    user.job_title = jobtitle;
    users.push({ ...user });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success" });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const indexOfObjectToDelete = users.findIndex((user) => user.id === id);
    if (indexOfObjectToDelete != -1) {
      users.splice(indexOfObjectToDelete, 1);
    }
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "succssfully deleted" });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "Please provide all the fields" });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(8002, () => {
  console.log("server is running on port 8002");
});
