const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();

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
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
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
    //todo
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
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
